import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

const PLACE = { name: "Davao City, Philippines", lat: 7.1907, lng: 125.4553 };
const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(PLACE.name)}&z=11&output=embed`;
const OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PLACE.name)}`;
const POPOVER_WIDTH = 320;
const POPOVER_HEIGHT = 292;

/** Theme-aware illustrated map. It always renders, and sits under the live Google map where embedding is allowed. */
const MapArt = () => (
  <svg viewBox="0 0 320 176" role="img" aria-label={`Map preview of ${PLACE.name}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="176" fill="hsl(var(--muted))" />
    {/* water along the gulf */}
    <path d="M0 118 C 40 104, 70 132, 120 124 S 200 96, 250 118 S 300 140, 320 128 L 320 176 L 0 176 Z" fill="hsl(var(--primary) / 0.16)" />
    {/* parks */}
    <rect x="212" y="26" width="64" height="38" rx="10" fill="hsl(var(--success) / 0.18)" />
    <rect x="30" y="40" width="46" height="30" rx="9" fill="hsl(var(--success) / 0.14)" />
    {/* city blocks */}
    <g fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1">
      <rect x="92" y="22" width="44" height="30" rx="4" />
      <rect x="146" y="22" width="52" height="30" rx="4" />
      <rect x="92" y="62" width="44" height="34" rx="4" />
      <rect x="190" y="70" width="46" height="30" rx="4" />
      <rect x="244" y="74" width="50" height="26" rx="4" />
      <rect x="30" y="84" width="48" height="26" rx="4" />
    </g>
    {/* main roads */}
    <g fill="none" strokeLinecap="round">
      <path d="M-10 60 C 80 54, 150 64, 330 52" stroke="hsl(var(--primary) / 0.45)" strokeWidth="5" />
      <path d="M150 -10 C 148 40, 170 90, 160 190" stroke="hsl(var(--primary) / 0.45)" strokeWidth="5" />
      <path d="M-10 100 L 330 92" stroke="hsl(var(--border))" strokeWidth="3" />
      <path d="M84 -10 L 90 190" stroke="hsl(var(--border))" strokeWidth="3" />
      <path d="M246 -10 L 238 190" stroke="hsl(var(--border))" strokeWidth="3" />
    </g>
    <text x="22" y="164" fontSize="9" fontWeight="700" letterSpacing="1.4" fill="hsl(var(--primary))" opacity="0.7">DAVAO GULF</text>
    {/* pin */}
    <g transform="translate(160 78)">
      <circle r="16" fill="hsl(var(--primary) / 0.18)">
        <animate attributeName="r" values="10;24;10" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <path d="M0 14 C -9 2, -12 -3, -12 -8 a12 12 0 1 1 24 0 C 12 -3, 9 2, 0 14 Z" transform="translate(0 -6)" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
      <circle cy="-14" r="4.2" fill="hsl(var(--card))" />
    </g>
  </svg>
);

/**
 * "Davao City, Philippines" line that opens a map card on hover, focus, or tap. The card shows an
 * illustrated map and, where the page is allowed to embed other sites, the live Google map on top of it.
 */
const LocationHover = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>();
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0, width: POPOVER_WIDTH });
  const open = hovering || pinned;

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(POPOVER_WIDTH, window.innerWidth - 24);
    const aside = trigger.closest("aside");
    if (!aside) {
      // On phones the trigger sits in the page, not the sidebar: centre the card under it.
      setPos({
        left: Math.max(12, (window.innerWidth - width) / 2),
        top: Math.max(12, Math.min(rect.bottom + 8, window.innerHeight - POPOVER_HEIGHT - 12)),
        width,
      });
      return;
    }
    setPos({
      left: Math.max(12, Math.min(aside.getBoundingClientRect().right + 12, window.innerWidth - width - 12)),
      top: Math.max(12, Math.min(rect.top - 70, window.innerHeight - POPOVER_HEIGHT - 12)),
      width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    place();
    setEverOpened(true);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open, place]);

  // Embedding other sites can be blocked by the host page's content security policy; fall back to the illustrated map.
  useEffect(() => {
    const onViolation = (event: SecurityPolicyViolationEvent) => {
      if (/frame-src|child-src/.test(event.violatedDirective) && event.blockedURI.includes("google.com")) setBlocked(true);
    };
    document.addEventListener("securitypolicyviolation", onViolation);
    return () => document.removeEventListener("securitypolicyviolation", onViolation);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!popRef.current?.contains(target) && !triggerRef.current?.contains(target)) setPinned(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPinned(false);
        setHovering(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const enter = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHovering(true), 120);
  };
  const leave = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHovering(false), 280);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onClick={() => setPinned((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${PLACE.name}. Show map`}
        className="location-trigger group/loc mx-auto mt-2 flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <MapPin className="location-pin h-3.5 w-3.5 text-primary" />
        <span className="underline decoration-dotted decoration-transparent underline-offset-4 transition-colors duration-200 group-hover/loc:decoration-primary/60">{PLACE.name}</span>
      </button>

      {createPortal(
        <div
          ref={popRef}
          role="dialog"
          aria-label={`Map of ${PLACE.name}`}
          onMouseEnter={enter}
          onMouseLeave={leave}
          style={{ left: pos.left, top: pos.top, width: pos.width }}
          className={`fixed z-[60] origin-left overflow-hidden rounded-2xl border border-border bg-card shadow-profile transition-[transform,opacity,visibility] duration-200 ease-out ${open ? "visible translate-x-0 scale-100 opacity-100" : "pointer-events-none invisible -translate-x-2 scale-95 opacity-0"}`}
        >
          <div className="relative h-44 w-full overflow-hidden bg-muted">
            <MapArt />
            {everOpened && !blocked && (
              <iframe
                title={`Google Map of ${PLACE.name}`}
                src={EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <p className="whitespace-nowrap text-sm font-bold text-foreground">{PLACE.name}</p>
              <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                {PLACE.lat.toFixed(2)}° N, {PLACE.lng.toFixed(2)}° E
              </p>
            </div>
            <a
              href={OPEN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary-foreground px-3 py-1.5 text-xs font-bold text-background transition-transform duration-200 hover:scale-105"
            >
              Google Maps <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default LocationHover;
