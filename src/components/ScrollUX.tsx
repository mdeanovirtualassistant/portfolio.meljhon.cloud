import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** A thin reading-progress bar along the top edge, plus a back-to-top button that appears once the visitor has scrolled a while. */
const ScrollUX = ({ onTop }: { onTop: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <button
        type="button"
        onClick={onTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-[5.5rem] right-4 z-40 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
};

export default ScrollUX;
