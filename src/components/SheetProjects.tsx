import { CheckCircle2 } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { sheetProjects } from "@/lib/project-data";

export type SheetProject = (typeof sheetProjects)[number];

/** Dialog content for a Google Sheets outreach project: dashboard, tracker, and what was built. */
export const SheetDialogBody = ({ project }: { project: SheetProject }) => (
  <>
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
  </>
);
