import { useState } from "react";
import { ArrowUpRight, BarChart3, CalendarDays, Flag, LayoutDashboard, Lock, Mail, Users } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectImage from "@/components/ProjectImage";
import { CRM_URL } from "@/lib/contact";
import { crmGallery, crmSrc, crmSummary } from "@/lib/crm-data";

const crmFeatures = [
  { icon: BarChart3, title: "Prospect pipeline", text: "Track prospects through New, T1 and T2 follow-up, Review, Nurture, Replied, DNR, and Converted." },
  { icon: Users, title: "User and role management", text: "Admin, Manager, User, Viewer, and Super Admin access levels." },
  { icon: Mail, title: "Email outreach", text: "Outreach queues, email templates, follow-ups, replies, and multi-touch campaigns." },
  { icon: CalendarDays, title: "Outreach calendar", text: "Scheduled touches and upcoming prospect activities in one view." },
  { icon: Flag, title: "Compliance and risk tracking", text: "Record issues such as worker classification, documentation gaps, and regulatory concerns." },
  { icon: LayoutDashboard, title: "Admin dashboard", text: "Monitor users, active prospects, conversions, flagged records, and pipeline performance." },
  { icon: Lock, title: "Secure authentication", text: "Username and password or Google sign-in, with role-based workspace access." },
];

const CrmGallery = () => {
  const [index, setIndex] = useState(0);
  const current = crmGallery[index];
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <div className="bg-muted p-3 sm:p-6">
        <ProjectImage src={crmSrc(current.file)} alt={current.alt} className="mx-auto h-auto max-h-[60vh] w-auto max-w-full rounded-xl border border-border bg-card shadow-card" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-muted-foreground"><span className="font-semibold text-foreground">{current.title}.</span> {current.caption}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Screenshots">
          {crmGallery.map((shot, i) => (
            <li key={shot.file}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${shot.title}`}
                aria-current={i === index ? "true" : undefined}
                className={`block h-14 w-24 overflow-hidden rounded-lg border-2 bg-card transition ${i === index ? "border-primary" : "border-border opacity-70 hover:opacity-100"}`}
              >
                <img src={crmSrc(shot.file)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">
          A custom CRM platform designed for nonprofits and small businesses to manage prospects, outreach, compliance-related notes, and follow-up activities in one centralized workspace.
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <a
            href={CRM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit live CRM, NC Compliance CRM (opens in new tab)"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary-foreground px-3.5 py-2 text-[13px] font-bold text-background shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-secondary-foreground/90"
          >
            Visit live CRM <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="text-xs text-muted-foreground">Opens the live site in a new tab.</span>
        </div>
        {crmFeatures.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Dialog content for the NC Compliance CRM: header plus the screenshot gallery and feature list. */
export const CrmDialogBody = () => (
  <>
    <DialogHeader className="border-b border-border px-5 py-4 pr-12 text-left">
      <DialogTitle>NC Compliance CRM</DialogTitle>
      <DialogDescription>{crmSummary}</DialogDescription>
    </DialogHeader>
    <CrmGallery />
  </>
);
