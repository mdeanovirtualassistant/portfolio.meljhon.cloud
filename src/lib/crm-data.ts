/** NC Compliance CRM gallery data (screenshots and summary). */

export const crmGallery = [
  { file: "dashboard", title: "Dashboard", caption: "Pipeline status, vertical and market breakdowns, and Touch 2 and Touch 3 alerts at a glance.", alt: "NC Compliance CRM dashboard with pipeline status and due-touch alerts" },
  { file: "prospects", title: "Prospects", caption: "Searchable prospect table with status, vertical, market, and priority filters.", alt: "NC Compliance CRM prospect table with filters and status badges" },
  { file: "email", title: "Email outreach", caption: "Outreach queue grouped by Touch 1, 2, and 3, with compose, Gmail, and mark-sent actions.", alt: "NC Compliance CRM outreach queue grouped by touch sequence" },
  { file: "calendar", title: "Calendar", caption: "Monthly view of scheduled touches and upcoming prospect activity.", alt: "NC Compliance CRM outreach calendar for May 2026" },
  { file: "finder", title: "Prospect finder", caption: "Search by organization type, vertical, and city, then add selected results to the CRM.", alt: "NC Compliance CRM prospect finder with map and results table" },
  { file: "admin", title: "Admin panel", caption: "System overview with live metrics, pipeline counts, and the user roster.", alt: "NC Compliance CRM admin panel with system overview and user roster" },
  { file: "login", title: "Sign in", caption: "Username and password sign-in, plus Google sign-in, with role-based access.", alt: "NC Compliance CRM sign-in screen" },
];

export const crmSummary =
  "A full-featured CRM built to help nonprofit organizations and small businesses organize prospect relationships, automate structured outreach, track compliance risks, and manage follow-ups through a centralized, role-based dashboard.";

/** Explicit paths (not built from a template string) so every screenshot can be found by search and inlined by the artifact build. */
const crmImages: Record<string, string> = {
  dashboard: "/projects/nc-crm-dashboard.webp",
  login: "/projects/nc-crm-login.webp",
  prospects: "/projects/nc-crm-prospects.webp",
  email: "/projects/nc-crm-email.webp",
  finder: "/projects/nc-crm-finder.webp",
  calendar: "/projects/nc-crm-calendar.webp",
  admin: "/projects/nc-crm-admin.webp",
};
export const crmSrc = (file: string) => crmImages[file] ?? crmImages.dashboard;
