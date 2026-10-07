/** Project case-study data for the Projects carousel (the tile components live in src/components). */

/**
 * Google Sheets outreach projects. The screenshots have prospect names, emails, and HR contacts masked,
 * so no personal details of the people listed in the trackers appear on the public page.
 */
export const sheetProjects = [
  {
    title: "Nonprofit Outreach Tracker & Dashboard",
    role: "Google Sheets · Outreach management",
    tags: ["Google Sheets", "Prospect Research", "Outreach Management"],
    description:
      "A Google Sheets outreach CRM for nonprofit prospecting, combining organization research, decision-maker identification, HR signals, contact verification, multi-touch follow-ups, and pipeline reporting.",
    summary:
      "A structured outreach tracker and dashboard for nonprofit organizations to manage prospect research, contact verification, HR signals, and multi-stage outreach. The system tracks prospects from initial outreach through follow-ups, review, nurture, replies, and declined status.",
    bullets: [
      "Researched nonprofit organizations and key decision-makers, including Executive Directors and HR contacts.",
      "Organized verified emails, source links, organization size, HR presence, and qualification notes.",
      "Built a multi-touch outreach workflow with Touch 1, Touch 2, review, Touch 3, and nurture stages.",
      "Created a dashboard to monitor pipeline status, outreach progress, HR signals, and prospect counts.",
      "Added follow-up dates, dropdown statuses, lead pain points, and workflow controls for easier campaign management.",
    ],
    dashboard: { src: "/projects/nonprofit-outreach-dashboard.webp", alt: "Nonprofit outreach dashboard with a pipeline status summary, HR signal breakdown, and weekly workflow checklist" },
    tracker: { src: "/projects/nonprofit-outreach-tracker.webp", alt: "Nonprofit outreach tracker spreadsheet with prospect info, research and fit, HR signal, outreach dates, and Touch 3 gate columns" },
  },
  {
    title: "SMB Outreach Tracker & Dashboard",
    role: "Google Sheets · Lead generation",
    tags: ["Google Sheets", "Lead Generation", "CRM Tracking"],
    description:
      "A centralized SMB prospecting and outreach dashboard to manage lead research, executive and HR contacts, outreach schedules, follow-ups, responses, and pipeline status.",
    summary:
      "An outreach tracking system for small and medium-sized businesses that organizes prospecting, lead qualification, HR research, and follow-up activities in one centralized spreadsheet.",
    bullets: [
      "Researched SMB prospects, founders, CEOs, presidents, and HR/People contacts.",
      "Tracked company information, verified contact details, company size, research sources, and qualification notes.",
      "Built structured outreach stages covering Touch 1, Touch 2, review, nurture, replies, and declined leads.",
      "Designed a dashboard showing pipeline distribution, HR-person availability, prospect totals, and campaign status.",
      "Added reply tracking, lead pain points, escalation flags, and “Do Not Respond” controls to support an organized outreach process.",
    ],
    dashboard: { src: "/projects/smb-outreach-dashboard.webp", alt: "SMB outreach dashboard with a pipeline status summary, HR signal breakdown, and weekly workflow checklist" },
    tracker: { src: "/projects/smb-outreach-tracker.webp", alt: "SMB outreach tracker spreadsheet with prospect info, research and fit, SMB signal, outreach dates, Touch 3 gate, and reply tracking columns" },
  },
];

/**
 * Calendar and scheduling project. The screenshots have event titles, client and organization names, account
 * emails, and team member names blurred, so only the layout and structure of the calendars is shown.
 */
export const calendarProject = {
  title: "Executive Calendar & Schedule Management",
  role: "Scheduling · Executive support",
  tags: ["Google Calendar", "Microsoft Outlook", "HoneyBook"],
  description:
    "Managed complex executive and team calendars using Google Calendar, Outlook, and HoneyBook, coordinating meetings, client appointments, recurring events, availability, and schedule changes while minimizing conflicts and maintaining accurate, organized calendars.",
  summary:
    "Managed busy executive and team calendars across multiple scheduling platforms, coordinating meetings, recurring events, client appointments, work blocks, and time-sensitive commitments while maintaining an organized schedule.",
  bullets: [
    "Managed and organized high-volume calendars with multiple meetings and priorities throughout the week.",
    "Scheduled and coordinated internal meetings, client calls, audit meetings, check-ins, and recurring appointments.",
    "Reviewed calendar availability to identify suitable meeting times and avoid scheduling conflicts.",
    "Created, updated, and maintained calendar invitations based on changing schedules.",
    "Coordinated schedules across Google Calendar, Microsoft Outlook, and HoneyBook.",
    "Used calendar blocking and categorization to keep meetings, projects, deadlines, and focused work organized.",
    "Supported executive scheduling by monitoring upcoming commitments and ensuring calendar information remained accurate.",
    "Managed recurring meetings and adjusted schedules when availability changed.",
  ],
  outlook: { src: "/projects/calendar-outlook.webp", alt: "Microsoft Outlook week view for May 10 to 16, 2026, with event titles blurred for privacy, showing a full week of color-coded recurring and one-time events" },
  honeybook: { src: "/projects/calendar-honeybook.webp", alt: "HoneyBook month view with calendar categories for booked projects, meetings, payments, tentative projects, and archived projects, and recurring weekly events such as check-ins, deep focus, and huddles; account names are blurred" },
  google: { src: "/projects/calendar-google.webp", alt: "Google Calendar week view for October 2024 with every event title blurred, showing color-coded time blocks from early morning to afternoon" },
};

/** Single-screenshot support projects (Upwork case studies). */
export const supportProjects = [
  {
    title: "Microsoft 365 to OVH Cloud",
    role: "IT Support",
    description: "Domain, mail, and calendar integration for OVH email hosting with Microsoft 365.",
    image: "/projects/microsoft-365-ovh-cloud.webp",
    alt: "OVH Cloud and Microsoft 365 email hosting configuration",
    skills: ["Hosting Setup", "Microsoft Windows", "Microsoft Office", "Administrative Support"],
  },
  {
    title: "MikroTik WLAN & Hotspot",
    role: "Remote Support",
    description: "Step-by-step RouterBOARD WLAN and hotspot configuration through Winbox.",
    image: "/projects/mikrotik-winbox-configuration.webp",
    alt: "MikroTik RouterOS Winbox wireless network configuration",
    skills: ["MikroTik", "MikroTik RouterBOARD", "MikroTik RouterOS"],
  },
];
