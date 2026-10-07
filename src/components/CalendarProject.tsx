import { CheckCircle2 } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { calendarProject } from "@/lib/project-data";

/** Dialog content for the executive calendar project: what was handled plus the three calendar views. */
export const CalendarDialogBody = () => {
  const project = calendarProject;
  return (
    <>
    <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left">
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>{project.summary}</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 overflow-auto bg-muted p-3 sm:p-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary">What I handled</h3>
          <ul className="mt-3 grid gap-x-8 gap-y-2.5 md:grid-cols-2">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                <CheckCircle2 aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
    
        <figure>
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
            <img src={project.honeybook.src} alt={project.honeybook.alt} decoding="async" className="h-auto w-full min-w-[52rem]" />
          </div>
          <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">HoneyBook: month view with calendar categories and recurring weekly events. Account names, team members, and personal or third-party events are blurred.</figcaption>
        </figure>
    
        <div className="grid gap-4 lg:grid-cols-2">
          <figure>
            <img src={project.outlook.src} alt={project.outlook.alt} loading="lazy" decoding="async" className="h-auto w-full rounded-xl border border-border bg-card shadow-card" />
            <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">Microsoft Outlook: a full week of recurring and one-time events. Event titles are blurred for privacy.</figcaption>
          </figure>
          <figure>
            <img src={project.google.src} alt={project.google.alt} loading="lazy" decoding="async" className="h-auto w-full rounded-xl border border-border bg-card shadow-card" />
            <figcaption className="mt-2 text-xs font-semibold text-muted-foreground">Google Calendar: color-coded time blocking. All event titles are blurred.</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};
