import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { sheetProjects } from "@/lib/project-data";

type SheetProject = (typeof sheetProjects)[number];

const SheetProjectTile = ({ project }: { project: SheetProject }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="group h-full min-h-0 w-full flex-col items-stretch justify-start overflow-hidden rounded-2xl border border-border bg-background p-0 text-left hover:bg-background">
        <span className="block aspect-[16/9] overflow-hidden bg-muted">
          <img src={project.dashboard.src} alt={project.dashboard.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
        </span>
        <span className="block whitespace-normal p-4">
          <span className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{project.role}</span>
            <span className="text-[11px] font-semibold text-muted-foreground">2 screens</span>
          </span>
          <span className="mt-1 block text-lg font-bold leading-snug text-foreground">{project.title}</span>
          <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{project.description}</span>
          <span className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="hover-chip rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{tag}</span>
            ))}
          </span>
        </span>
      </Button>
    </DialogTrigger>
    <DialogContent className="flex max-h-[94vh] w-[96vw] max-w-6xl flex-col overflow-hidden p-0">
      <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left">
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>{project.summary}</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 overflow-auto bg-muted p-3 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
          <figure>
            <img src={project.dashboard.src} alt={project.dashboard.alt} decoding="async" className="h-auto w-full rounded-xl border border-border bg-card shadow-card" />
            <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">Dashboard: pipeline status, HR signals, and the weekly workflow checklist.</figcaption>
          </figure>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">What I built</h3>
            <ul className="mt-3 space-y-2.5">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                  <CheckCircle2 aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure>
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
            <img src={project.tracker.src} alt={project.tracker.alt} decoding="async" className="h-auto w-full min-w-[52rem]" />
          </div>
          <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">Tracker: contact names, emails, and HR contacts are masked for privacy.</figcaption>
        </figure>
      </div>
    </DialogContent>
  </Dialog>
);

export default SheetProjectTile;
