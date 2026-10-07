import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderKanban, Images, Layers, Pause, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectImage from "@/components/ProjectImage";
import { CrmDialogBody } from "@/components/CrmDetails";
import { SheetDialogBody, type SheetProject } from "@/components/SheetProjects";
import { CalendarDialogBody } from "@/components/CalendarProject";
import { CRM_URL } from "@/lib/contact";
import { crmGallery, crmSrc } from "@/lib/crm-data";
import { calendarProject, sheetProjects, supportProjects } from "@/lib/project-data";

type SupportProject = (typeof supportProjects)[number];

type Detail =
  | { kind: "crm" }
  | { kind: "sheet"; project: SheetProject }
  | { kind: "calendar" }
  | { kind: "shot"; project: SupportProject };

type Item = {
  id: string;
  title: string;
  category: string;
  /** Giant outlined word behind the cards. */
  word: string;
  /** Accent hue (all within the site's blue family). */
  hue: number;
  image: string;
  alt: string;
  blurb: string;
  tags: string[];
  screens: number;
  platform: string;
  detail: Detail;
};

/** The last part of "Google Sheets · Outreach management", which is what the card pill shows. */
const lastPart = (role: string) => role.split(" · ").pop() ?? role;

const [nonprofit, smb] = sheetProjects;
const [m365, mikrotik] = supportProjects;

/** Short card blurbs are condensed from each project's own description; the dialogs keep the full text. */
const items: Item[] = [
  {
    id: "crm",
    title: "NC Compliance CRM",
    category: "Featured · CRM",
    word: "CRM",
    hue: 211,
    image: crmSrc("dashboard"),
    alt: crmGallery[0].alt,
    blurb: "A role-based CRM for managing prospects, outreach, and compliance follow-ups.",
    tags: ["Prospect Pipeline", "Role-Based Access", "Email Outreach", "Compliance Tracking"],
    screens: crmGallery.length,
    platform: "Web app",
    detail: { kind: "crm" },
  },
  {
    id: "nonprofit",
    title: nonprofit.title,
    category: lastPart(nonprofit.role),
    word: "Outreach",
    hue: 224,
    image: nonprofit.dashboard.src,
    alt: nonprofit.dashboard.alt,
    blurb: "A Google Sheets outreach CRM for nonprofit prospecting, follow-ups, and pipeline reporting.",
    tags: nonprofit.tags,
    screens: 2,
    platform: "Google Sheets",
    detail: { kind: "sheet", project: nonprofit },
  },
  {
    id: "smb",
    title: smb.title,
    category: lastPart(smb.role),
    word: "SMB",
    hue: 198,
    image: smb.dashboard.src,
    alt: smb.dashboard.alt,
    blurb: "A centralized SMB lead research and outreach dashboard with follow-ups and pipeline status.",
    tags: smb.tags,
    screens: 2,
    platform: "Google Sheets",
    detail: { kind: "sheet", project: smb },
  },
  {
    id: "calendar",
    title: calendarProject.title,
    category: lastPart(calendarProject.role),
    word: "Calendar",
    hue: 238,
    image: calendarProject.outlook.src,
    alt: calendarProject.outlook.alt,
    blurb: "Scheduling for executive and team calendars across Google Calendar, Outlook, and HoneyBook.",
    tags: calendarProject.tags,
    screens: 3,
    platform: "3 calendar apps",
    detail: { kind: "calendar" },
  },
  {
    id: "m365",
    title: m365.title,
    category: m365.role,
    word: "Cloud",
    hue: 205,
    image: m365.image,
    alt: m365.alt,
    blurb: m365.description,
    tags: m365.skills,
    screens: 1,
    platform: "Email hosting",
    detail: { kind: "shot", project: m365 },
  },
  {
    id: "mikrotik",
    title: mikrotik.title,
    category: mikrotik.role,
    word: "Network",
    hue: 188,
    image: mikrotik.image,
    alt: mikrotik.alt,
    blurb: mikrotik.description,
    tags: mikrotik.skills,
    screens: 1,
    platform: "RouterOS",
    detail: { kind: "shot", project: mikrotik },
  },
];

const count = items.length;
const pad = (value: number) => String(value).padStart(2, "0");
const css = (vars: Record<string, string | number>) => vars as CSSProperties;

/** Signed, shortest distance (in slots) from the active card to card i, going round the loop. */
const offsetOf = (i: number, cur: number) => {
  let d = i - cur;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
};

const DetailBody = ({ detail }: { detail: Detail }) => {
  if (detail.kind === "crm") return <CrmDialogBody />;
  if (detail.kind === "sheet") return <SheetDialogBody project={detail.project} />;
  if (detail.kind === "calendar") return <CalendarDialogBody />;
  return (
    <>
      <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left">
        <DialogTitle>{detail.project.title}</DialogTitle>
        <DialogDescription>{detail.project.description}</DialogDescription>
      </DialogHeader>
      <div className="overflow-auto bg-muted p-3 sm:p-6">
        <ProjectImage src={detail.project.image} alt={detail.project.alt} className="mx-auto h-auto max-h-[76vh] w-auto max-w-full rounded-xl border border-border bg-card shadow-card" />
      </div>
    </>
  );
};

/**
 * Projects as a 3D coverflow: the active card sits in front with a glowing edge, its neighbours fan out behind it,
 * and the stage background and giant outlined word follow the active project. Arrows, dots, swipe/drag, and the
 * keyboard all move it; autoplay pauses on hover, focus, an open dialog, or off-screen, and has an explicit pause button.
 */
const ProjectsShowcase = () => {
  const [pos, setPos] = useState({ cur: 0, prev: 0 });
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [auto, setAuto] = useState(() => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const [dialog, setDialog] = useState<{ item: Item; open: boolean } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const drag = useRef({ x: 0, y: 0, down: false, moved: false });
  const { cur, prev } = pos;
  const active = items[cur];

  const go = (next: number, manual = true) => {
    setPos((p) => ({ cur: (next + count) % count, prev: p.cur }));
    if (manual) setAuto(false);
  };

  const openDetails = (item: Item, trigger: HTMLElement) => {
    opener.current = trigger;
    setDialog({ item, open: true });
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || paused || !inView || dialog?.open) return;
    const id = window.setInterval(() => setPos((p) => ({ cur: (p.cur + 1) % count, prev: p.cur })), 6500);
    return () => window.clearInterval(id);
  }, [auto, paused, inView, dialog?.open, cur]);

  const live = auto && !paused ? "off" : "polite";

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        aria-labelledby="projects-title"
        className="pc-stage relative isolate scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card px-3 pb-6 pt-5 shadow-card sm:px-6 sm:pt-6"
        style={css({ "--ph": active.hue })}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(event) => {
          if (!event.currentTarget.contains(event.target as Node)) return;
          if (event.key === "ArrowLeft") go(cur - 1);
          else if (event.key === "ArrowRight") go(cur + 1);
          else if (event.key === "Home") go(0);
          else if (event.key === "End") go(count - 1);
        }}
      >
        {items.map((item) => (
          <div key={item.id} aria-hidden="true" className="pc-bg" data-on={item.id === active.id} style={css({ "--ph": item.hue })} />
        ))}
        <div aria-hidden="true" className="pc-dots-grid" />

        <header className="relative z-10 flex flex-wrap items-start justify-between gap-x-4 gap-y-3 px-1 sm:px-0">
          <div className="flex items-start gap-3">
            <span className="icon-chip"><FolderKanban className="h-5 w-5" /></span>
            <div className="min-w-0">
              <h2 id="projects-title" className="text-lg font-bold leading-tight text-foreground">Projects</h2>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">Real support, configuration, and build work.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm font-bold tabular-nums text-foreground" aria-hidden="true">
              {pad(cur + 1)}<span className="text-muted-foreground"> / {pad(count)}</span>
            </p>
            <button
              type="button"
              onClick={() => setAuto((value) => !value)}
              aria-label={auto ? "Pause automatic project rotation" : "Start automatic project rotation"}
              className="pc-nav pc-nav-sm"
            >
              {auto ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
          </div>
        </header>

        <div role="group" aria-roledescription="carousel" aria-label="Projects" className="relative z-[1] mt-4">
          {items.map((item) => (
            <div key={item.id} aria-hidden="true" className="pc-layer" data-on={item.id === active.id} style={css({ "--ph": item.hue, "--n": item.word.length })}>
              <span className="pc-word" data-word={item.word} />
              <span className="pc-floor" />
            </div>
          ))}

          <div
            className="pc-track"
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              drag.current = { x: event.clientX, y: event.clientY, down: true, moved: false };
            }}
            onPointerMove={(event) => {
              if (drag.current.down && Math.abs(event.clientX - drag.current.x) > 10) drag.current.moved = true;
            }}
            onPointerUp={(event) => {
              const d = drag.current;
              if (!d.down) return;
              d.down = false;
              const dx = event.clientX - d.x;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(event.clientY - d.y)) go(cur + (dx < 0 ? 1 : -1));
            }}
            onPointerCancel={() => { drag.current.down = false; }}
            onClickCapture={(event) => {
              if (!drag.current.moved) return;
              drag.current.moved = false;
              event.stopPropagation();
              event.preventDefault();
            }}
            onDragStart={(event) => event.preventDefault()}
          >
            {items.map((item, i) => {
              const d = offsetOf(i, cur);
              const abs = Math.abs(d);
              const isActive = d === 0;
              const jump = Math.abs(d - offsetOf(i, prev)) > count / 2;
              const rest = item.tags.length > 2 ? item.tags.length - 2 : 0;
              const state = isActive ? "is-active" : abs === 1 ? "is-near" : abs === 2 ? "is-far" : "is-gone";
              return (
                <div
                  key={item.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}: ${item.title}`}
                  aria-hidden={isActive ? undefined : true}
                  className={`pc-card ${state} ${jump ? "pc-jump" : ""}`}
                  style={css({ "--d": Math.max(-3, Math.min(3, d)), "--abs": Math.min(3, abs), "--ph": item.hue, zIndex: 20 - abs * 2 })}
                  onClick={() => { if (!isActive) go(i); }}
                >
                  <div className="pc-face">
                    <div className="pc-shot" onClick={isActive ? (event) => openDetails(item, event.currentTarget.closest(".pc-card")?.querySelector<HTMLElement>(".pc-cta") ?? event.currentTarget) : undefined}>
                      <ProjectImage lazy src={item.image} alt={item.alt} className="h-full w-full object-cover object-top" />
                      <span className="pc-pill">{item.category}</span>
                      <span className="pc-index" aria-hidden="true">{pad(i + 1)}</span>
                    </div>
                    <div className="pc-body">
                      <p className="pc-meta">
                        <span><Images aria-hidden="true" className="h-3.5 w-3.5" /> {item.screens} {item.screens === 1 ? "screen" : "screens"}</span>
                        <span><Layers aria-hidden="true" className="h-3.5 w-3.5" /> {item.platform}</span>
                      </p>
                      <h3 className="pc-title">{item.title}</h3>
                      <p className="pc-desc">{item.blurb}</p>
                      <ul className="pc-tags" aria-label="Skills">
                        {item.tags.slice(0, 2).map((tag) => <li key={tag}>{tag}</li>)}
                        {rest > 0 && <li className="pc-more" aria-label={`and ${rest} more`}>+{rest}</li>}
                      </ul>
                      <div className="pc-actions">
                        <button type="button" tabIndex={isActive ? 0 : -1} className="pc-cta" onClick={(event) => openDetails(item, event.currentTarget)}>
                          View details <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </button>
                        {item.id === "crm" && (
                          <a href={CRM_URL} tabIndex={isActive ? 0 : -1} target="_blank" rel="noreferrer" aria-label="Visit live CRM, NC Compliance CRM (opens in new tab)" className="pc-icon-btn">
                            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-[1] mt-7 flex items-center justify-center gap-3 sm:gap-4">
          <button type="button" onClick={() => go(cur - 1)} aria-label="Previous project" className="pc-nav">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="pc-dots" role="group" aria-label="Choose project">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-current={i === cur ? "true" : undefined}
                aria-label={`Show project ${i + 1}: ${item.title}`}
                onClick={() => go(i)}
                className="pc-dot"
              >
                <span />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(cur + 1)} aria-label="Next project" className="pc-nav">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{live === "polite" ? `Project ${cur + 1} of ${count}: ${active.title}` : ""}</p>
      </section>

      <Dialog open={!!dialog?.open} onOpenChange={(open) => { if (!open) setDialog((d) => (d ? { ...d, open: false } : d)); }}>
        <DialogContent
          className={`flex max-h-[94vh] w-[96vw] flex-col overflow-hidden p-0 ${dialog?.item.detail.kind === "shot" ? "max-w-7xl" : "max-w-6xl"}`}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
        >
          {dialog && <DetailBody detail={dialog.item.detail} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsShowcase;
