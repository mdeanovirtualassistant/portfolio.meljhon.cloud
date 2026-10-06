import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Live page background: soft drifting colour glows, slowly flowing contour lines, and a network of
 * connected nodes that reacts to the cursor. It follows the theme's primary colour, pauses when the tab
 * is hidden, and renders a single still frame for visitors who prefer reduced motion.
 */
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const LINK = 150;
    const POINTER = 190;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let last = 0;
    let rgb = "30 144 255";
    let lineAlpha = 0.22;
    const pointer = { x: -9999, y: -9999 };

    const readTheme = () => {
      const primary = getComputedStyle(root).getPropertyValue("--primary").trim().replace(/\s+/g, " ");
      if (primary) rgb = primary;
      lineAlpha = root.classList.contains("dark") ? 0.3 : 0.22;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(70, Math.round((width * height) / 24000)));
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 8 + Math.random() * 14; // px per second
        return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.strokeStyle = `hsl(${rgb} / ${((1 - dist / LINK) * lineAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < POINTER) {
          ctx.strokeStyle = `hsl(${rgb} / ${((1 - pd / POINTER) * (lineAlpha + 0.18)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `hsl(${rgb} / ${(lineAlpha + 0.2).toFixed(3)})`;
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.05) || 0;
      last = time;
      nodes.forEach((node) => {
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;
      });
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduceMotion) draw();
      }, 150);
    };

    readTheme();
    resize();
    const observer = new MutationObserver(() => {
      readTheme();
      if (reduceMotion) draw();
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      draw();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame((time) => {
        last = time;
        raf = requestAnimationFrame(tick);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />;
};

const LiveBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="live-glow live-glow-a" />
    <div className="live-glow live-glow-b" />
    <div className="live-glow live-glow-c" />

    <svg className="live-contours absolute inset-0 h-full w-full text-primary" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.14">
        <path className="live-contour live-contour-1" d="M-50 620 C 200 520, 330 760, 620 640 S 1000 460, 1260 560" />
        <path className="live-contour live-contour-2" d="M-50 680 C 220 580, 360 820, 640 700 S 1020 520, 1260 620" />
        <path className="live-contour live-contour-3" d="M300 -40 C 380 160, 560 120, 640 300 S 640 560, 900 620" />
        <path className="live-contour live-contour-4" d="M760 -40 C 820 120, 960 140, 1020 280 S 1100 420, 1260 400" />
      </g>
    </svg>

    <NetworkCanvas />
  </div>
);

export default LiveBackdrop;
