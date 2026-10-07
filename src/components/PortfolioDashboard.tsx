import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Bot,
  CalendarCheck,
  Cctv,
  Coffee,
  CheckCircle2,
  Clock,
  Cloud,
  Code,
  CreditCard,
  Database,
  FolderKanban,
  FolderTree,
  Globe,
  GraduationCap,
  HardDrive,
  Headset,
  Home,
  Laptop,
  Layers,
  Lock,
  LifeBuoy,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  PhoneCall,
  Phone,
  Cable,
  BadgeCheck,
  ClipboardList,
  Landmark,
  Cast,
  ListChecks,
  MessagesSquare,
  NotebookText,
  MonitorSmartphone,
  ScreenShare,
  Server,
  ShieldCheck,
  Star,
  MessageSquareQuote,
  Sparkles,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import {
  siAnydesk, siApple, siBmcsoftware, siCisco, siCss, siDeepseek, siGooglegemini, siHtml5, siJira, siLinux,
  siMikrotik, siMysql, siNotion, siPaloaltonetworks, siPerplexity, siPhp, siQnap, siTeamviewer, siTplink,
  siTrello, siUbiquiti, siIndeed, siGooglesheets, siVmware, siZendesk, siCalendly, siClaude, type SimpleIcon,
} from "simple-icons";
import ChatAssistant from "@/components/ChatAssistant";
import LiveBackdrop from "@/components/LiveBackdrop";
import LocationHover from "@/components/LocationHover";
import ContactSection from "@/components/ContactSection";
import Testimonials from "@/components/Testimonials";
import ScrollUX from "@/components/ScrollUX";
import { averageRating, testimonials } from "@/lib/testimonials";
import { CONTACT } from "@/lib/contact";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const profileImage = "/lovable-uploads/profile.webp";
/** Cartoon rendering of the profile photo, revealed on hover. */
const profileCartoon = "/lovable-uploads/profile-cartoon.webp";

/** Tool logos that orbit the profile photo on hover. */
const orbitLogos = ["microsoft", "google", "teams", "slack"];

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Services", href: "#services", icon: ListChecks },
  { label: "Tools", href: "#tools", icon: Layers },
  { label: "Testimonials", href: "#testimonials", icon: MessageSquareQuote },
  { label: "Experience", href: "#experience", icon: BriefcaseBusiness },
  { label: "Contact", href: "#contact", icon: Mail },
];

/** Highlights across every line of work, not just IT: each tile is a fact from the résumé. */
const highlights = [
  { icon: CalendarDays, tag: "Overall", value: "4+", label: "Years of combined experience in support, operations, executive assistance, and administration" },
  { icon: Headset, tag: "IT Support", value: "50+", label: "Weekly service requests resolved across PC, network, software, and telephony" },
  { icon: Server, tag: "Operations", value: "200+", label: "Windows 11 computers deployed, cutting device setup time by about 30%" },
  { icon: BriefcaseBusiness, tag: "Executive Support", value: "ET", label: "Eastern Time hours covered for executive and board support of a U.S.-based organization" },
  { icon: ClipboardList, tag: "Administration", value: "Board", label: "Records, documentation, and secure communication for a U.S.-based nonprofit" },
  { icon: Landmark, tag: "Government Service", value: "DFA", label: "Authentication applications processed under strict data privacy protocols" },
];

/** How I work: four promises, shown as numbered steps beside the services. */
const workPromises = [
  { icon: MessagesSquare, title: "Clear communication", text: "Updates in plain language, task by task." },
  { icon: NotebookText, title: "Organized documentation", text: "SOPs, articles, and records kept tidy." },
  { icon: BadgeCheck, title: "Dependable follow-through", text: "Tasks and tickets followed up until done." },
  { icon: ShieldCheck, title: "Confidential by default", text: "Professional handling of confidential information." },
];

const supportChannels = ["Chat", "Email", "Phone", "Remote access", "Onsite"];

type ServiceCard = { title: string; summary: string; badge: string; logos: ToolItem[]; items: string[] };

const serviceGroups: { title: string; note: string; cards: ServiceCard[] }[] = [
  {
    title: "IT and Technical Support",
    note: "Accounts, devices, and day-to-day technical issues.",
    cards: [
      {
        title: "Cloud & Endpoint Support",
        summary: "Accounts, apps, and Windows machines that just work.",
        badge: "Microsoft + Google",
        logos: [{ name: "Microsoft 365", img: "microsoft" }, { name: "Google Workspace", img: "google" }, { name: "Teams", img: "teams" }],
        items: [
          "Microsoft 365, Outlook, Teams, SharePoint, and Google Workspace",
          "Windows 10 and Windows 11 troubleshooting",
          "Active Directory, Microsoft Entra ID, and Intune",
          "User account setup, access management, and password assistance",
        ],
      },
      {
        title: "Troubleshooting & Remote Support",
        summary: "Fixes for the problems that stop work.",
        badge: "Remote or onsite",
        logos: [{ name: "AnyDesk", si: siAnydesk }, { name: "TeamViewer", si: siTeamviewer }, { name: "Zendesk", si: siZendesk }],
        items: [
          "Hardware, software, email, printer, VPN, and network troubleshooting",
          "Remote support through AnyDesk, TeamViewer, RDP, and Splashtop",
          "Ticket management using BMC Remedy, Jira, and Zendesk",
        ],
      },
      {
        title: "Deployment & Infrastructure",
        summary: "Devices set up, secured, and documented.",
        badge: "Set up and documented",
        logos: [{ name: "Windows", glyph: "windows" }, { name: "QNAP", si: siQnap }, { name: "CCTV", icon: Cctv }],
        items: [
          "Computer imaging, device deployment, updates, backups, and security checks",
          "IT asset tracking, technical documentation, SOPs, and knowledge-base articles",
          "QNAP NAS, POS systems, websites, CCTV, servers, and basic network support",
        ],
      },
    ],
  },
  {
    title: "Executive and Administrative Support",
    note: "Inboxes, calendars, records, and recruiting support.",
    cards: [
      {
        title: "Inbox, Calendar & Meetings",
        summary: "Your schedule and communication kept in order.",
        badge: "Executive and board",
        logos: [{ name: "Outlook", img: "outlook" }, { name: "Google Calendar", img: "calendar" }, { name: "Calendly", si: siCalendly }],
        items: [
          "Inbox and calendar management",
          "Meeting scheduling, confirmations, and follow-ups",
          "Executive and board administrative support",
          "Client communication and task coordination",
        ],
      },
      {
        title: "Research & Records",
        summary: "Clean documents, files, and summaries.",
        badge: "Organized records",
        logos: [{ name: "Word", img: "word" }, { name: "Excel", img: "excel" }, { name: "Google Drive", img: "drive" }],
        items: [
          "Online research and summary preparation",
          "Document formatting, data entry, and records management",
          "File and cloud-storage organization",
        ],
      },
      {
        title: "Recruiting & Workflow",
        summary: "Hiring support and projects that stay on track.",
        badge: "Track and recruit",
        logos: [{ name: "LinkedIn", img: "linkedin" }, { name: "Indeed", si: siIndeed }, { name: "Canva", img: "canva" }],
        items: [
          "LinkedIn and Indeed recruitment support",
          "Workflow and project tracking",
          "Basic Canva graphics and visual materials",
        ],
      },
    ],
  },
];

const companyLogo: Record<string, string> = {
  upwork: "/logos/upwork.png",
  boundless: "/logos/boundless.png",
  bladegrass: "/logos/bladegrass.png",
  ew: "/logos/ew.png",
  dfa: "/logos/dfa.png",
};

/**
 * Recoloured dark-mode copies for the marks that read well without a backing. The others
 * (Bladegrass, E&W, Department of Foreign Affairs) keep their original artwork on a white backing in dark mode.
 */
const companyLogoDark: Record<string, string> = {
  upwork: "/logos/dark/upwork.png",
  boundless: "/logos/dark/boundless.png",
};

const experience = [
  {
    role: "Independent IT Support Specialist",
    company: "Upwork",
    logo: "upwork",
    period: "2025–Present",
    track: "IT Support",
    bullets: [
      "Deliver remote IT support for hardware, software, VPN, firewall, and network connectivity issues",
      "Administer Microsoft 365 and Google Workspace accounts, permissions, and security policies",
      "Run system updates, data backups, and security audits while keeping documentation and SOPs current",
    ],
  },
  {
    role: "Board Administrative Assistant",
    company: "Boundless Freedom Project",
    logo: "boundless",
    period: "2025–2026",
    track: "Executive Support",
    bullets: [
      "Maintained technical and administrative records, secure digital communication, and board documentation",
      "Supported leadership with software access, digital workspace coordination, and technical troubleshooting",
    ],
  },
  {
    role: "IT Support Engineer",
    company: "Bladegrass Technologies / Concentrix",
    logo: "bladegrass",
    period: "2025",
    track: "IT Support",
    bullets: [
      "Resolved 50+ weekly incidents and service requests in BMC Remedy across PC, network, software, and telephony",
      "Imaged, configured, and deployed 200+ Windows 11 desktops, cutting setup time by roughly 30%",
      "Handled Active Directory OU moves, Entra ID and Intune compliance, access provisioning, and asset tracking",
    ],
  },
  {
    role: "IT Technical Support",
    company: "E&W Group of Companies",
    logo: "ew",
    period: "2023–2025",
    track: "IT Support",
    bullets: [
      "Provided Tier 1 and Tier 2 remote and onsite support for websites, servers, POS systems, QNAP NAS, CCTV, and endpoints",
      "Diagnosed hardware, software, connectivity, and performance issues to keep daily operations running",
      "Managed the full IT asset lifecycle: inventory, hardware upgrades, and infrastructure maintenance",
    ],
  },
  {
    role: "Passport / Authentication Staff",
    company: "Department of Foreign Affairs",
    logo: "dfa",
    period: "2022–2023",
    track: "Administration",
    bullets: [
      "Assisted the internal IT officer with hardware and software troubleshooting and digital records maintenance",
      "Processed authentication applications in strict compliance with data privacy and security protocols",
    ],
  },
];

const logo: Record<string, string> = {
  microsoft: "/tools/microsoft.png",
  google: "/tools/google.png",
  gmail: "/tools/gmail.png",
  drive: "/tools/drive.png",
  calendar: "/tools/calendar.png",
  chat: "/tools/chat.png",
  maps: "/tools/maps.png",
  chrome: "/tools/chrome.png",
  search: "/tools/search.png",
  outlook: "/tools/outlook.png",
  word: "/tools/word.png",
  excel: "/tools/excel.png",
  powerpoint: "/tools/powerpoint.png",
  onedrive: "/tools/onedrive.png",
  onenote: "/tools/onenote.png",
  sharepoint: "/tools/sharepoint.png",
  teams: "/tools/teams.png",
  freshdesk: "/tools/freshdesk.png",
  zoom: "/tools/zoom.png",
  flare: "/tools/flare.png",
  slack: "/tools/slack.png",
  asana: "/tools/asana.png",
  airtable: "/tools/airtable.png",
  canva: "/tools/canva.png",
  chatgpt: "/tools/chatgpt.png",
  linkedin: "/tools/linkedin.png",
  whatsapp: "/tools/whatsapp.png",
  telegram: "/tools/telegram.png",
  viber: "/tools/viber.png",
  snapseed: "/tools/snapseed.png",
  picsart: "/tools/picsart.png",
  capcut: "/tools/capcut.png",
};

const googleApps = [
  { name: "Gmail", logo: "gmail" },
  { name: "Google Drive", logo: "drive" },
  { name: "Google Calendar", logo: "calendar" },
  { name: "Google Chat", logo: "chat" },
  { name: "Google Maps", logo: "maps" },
  { name: "Chrome", logo: "chrome" },
  { name: "Google Search", logo: "search" },
];

const microsoftApps = [
  { name: "Outlook", logo: "outlook" },
  { name: "Word", logo: "word" },
  { name: "Excel", logo: "excel" },
  { name: "PowerPoint", logo: "powerpoint" },
  { name: "OneDrive", logo: "onedrive" },
  { name: "OneNote", logo: "onenote" },
  { name: "SharePoint", logo: "sharepoint" },
  { name: "Teams", logo: "teams" },
];

/** Brand colours that are too dark to read in dark mode fall back to the text colour. */
const brandFill = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.22 ? "currentColor" : `#${hex}`;
};

const WindowsGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="#0078D4">
    <path d="M2 4.6 10.3 3.4v7.9H2zM11.3 3.3 22 1.8v9.5H11.3zM2 12.3h8.3v7.9L2 19zM11.3 12.3H22v9.9l-10.7-1.5z" />
  </svg>
);

const LightroomGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <rect width="24" height="24" rx="4" fill="#001E36" />
    <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#31A8FF">Lr</text>
  </svg>
);

type ToolItem = { name: string; img?: string; si?: SimpleIcon; icon?: typeof Home; glyph?: "windows" | "lightroom"; color?: string };

/** Brand icon scaled to fill its box, so wide logos (Cisco, VMware, QNAP) stay legible at chip size. */
const SiIcon = ({ icon }: { icon: SimpleIcon }) => {
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const svg = ref.current;
    const path = svg?.querySelector("path");
    if (!svg || !path) return;
    try {
      const b = path.getBBox();
      if (b.width && b.height) svg.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
    } catch {
      /* keep the default 24x24 viewBox */
    }
  }, [icon]);
  return (
    <svg ref={ref} viewBox="0 0 24 24" aria-hidden="true" preserveAspectRatio="xMidYMid meet" className="h-4 w-5 shrink-0" fill={brandFill(icon.hex)}>
      <path d={icon.path} />
    </svg>
  );
};

const ToolIcon = ({ item }: { item: ToolItem }) => {
  if (item.img) return <img src={logo[item.img]} alt="" loading="lazy" decoding="async" className="h-4 w-4 shrink-0 object-contain" />;
  if (item.si) return <SiIcon icon={item.si} />;
  if (item.glyph === "windows") return <WindowsGlyph />;
  if (item.glyph === "lightroom") return <LightroomGlyph />;
  if (item.icon) {
    const Icon = item.icon;
    return <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" style={item.color ? { color: item.color } : undefined} />;
  }
  return null;
};

const toolCategories: { icon: typeof Home; title: string; items: ToolItem[] }[] = [
  {
    icon: Cloud,
    title: "Directory & cloud suites",
    items: [
      { name: "Active Directory", icon: FolderTree, color: "#0078D4" },
      { name: "Entra ID", icon: ShieldCheck, color: "#0078D4" },
      { name: "Intune", icon: MonitorSmartphone, color: "#0078D4" },
      { name: "Google Workspace", img: "google" },
      { name: "Microsoft 365", img: "microsoft" },
    ],
  },
  {
    icon: Laptop,
    title: "Operating systems",
    items: [
      { name: "Windows 10/11", glyph: "windows" },
      { name: "Windows Server", glyph: "windows" },
      { name: "Linux", si: siLinux },
      { name: "macOS", si: siApple },
      { name: "ChromeOS", img: "chrome" },
    ],
  },
  {
    icon: HardDrive,
    title: "Infrastructure",
    items: [
      { name: "CCTV", icon: Cctv },
      { name: "NAS (QNAP)", si: siQnap },
      { name: "Servers", icon: Server },
      { name: "PABX", icon: PhoneCall },
      { name: "POS", icon: CreditCard },
      { name: "VoIP", icon: Phone },
      { name: "VMware / virtual machines", si: siVmware },
    ],
  },
  {
    icon: Network,
    title: "Networking",
    items: [
      { name: "DNS", icon: Globe },
      { name: "LAN/WAN/VLAN", icon: Network },
      { name: "VPN", icon: Lock },
      { name: "TCP/IP", icon: Cable },
      { name: "MikroTik", si: siMikrotik },
      { name: "Ubiquiti", si: siUbiquiti },
      { name: "UniFi", si: siUbiquiti },
      { name: "TP-Link", si: siTplink },
      { name: "Omada", si: siTplink },
      { name: "Cisco", si: siCisco },
      { name: "Palo Alto", si: siPaloaltonetworks },
    ],
  },
  {
    icon: Headset,
    title: "Remote support & ticketing",
    items: [
      { name: "AnyDesk", si: siAnydesk },
      { name: "TeamViewer", si: siTeamviewer },
      { name: "Microsoft Remote Desktop (RDP)", icon: ScreenShare },
      { name: "Splashtop", icon: Cast, color: "#2E8BFF" },
      { name: "BMC Remedy", si: siBmcsoftware },
      { name: "Jira", si: siJira },
      { name: "Zendesk", si: siZendesk },
      { name: "SolvNow", icon: LifeBuoy },
      { name: "Freshdesk", img: "freshdesk" },
      { name: "Zoom", img: "zoom" },
      { name: "Flare", img: "flare" },
    ],
  },
  {
    icon: Phone,
    title: "Messaging & social",
    items: [
      { name: "WhatsApp", img: "whatsapp" },
      { name: "Slack", img: "slack" },
      { name: "Telegram", img: "telegram" },
      { name: "Viber", img: "viber" },
      { name: "LinkedIn", img: "linkedin" },
      { name: "Indeed", si: siIndeed },
      { name: "Google Voice", icon: PhoneCall, color: "#34A853" },
    ],
  },
  {
    icon: Sparkles,
    title: "Creative & AI tools",
    items: [
      { name: "Canva", img: "canva" },
      { name: "Snapseed", img: "snapseed" },
      { name: "PicsArt", img: "picsart" },
      { name: "Lightroom", glyph: "lightroom" },
      { name: "CapCut", img: "capcut" },
      { name: "ChatGPT", img: "chatgpt" },
      { name: "Gemini", si: siGooglegemini },
      { name: "Claude", si: siClaude },
      { name: "DeepSeek", si: siDeepseek },
      { name: "Microsoft Copilot", icon: Bot, color: "#0F6CBD" },
      { name: "Grok", icon: Bot },
      { name: "Perplexity", si: siPerplexity },
    ],
  },
  {
    icon: CalendarCheck,
    title: "Planning & scheduling",
    items: [
      { name: "Calendly", si: siCalendly },
      { name: "HoneyBook", icon: CalendarCheck, color: "#2563eb" },
      { name: "Asana", img: "asana" },
      { name: "Notion", si: siNotion },
      { name: "Airtable", img: "airtable" },
      { name: "Trello", si: siTrello },
    ],
  },
  {
    icon: Code,
    title: "Web & data",
    items: [
      { name: "HTML", si: siHtml5 },
      { name: "CSS", si: siCss },
      { name: "PHP", si: siPhp },
      { name: "Java", icon: Coffee, color: "#E76F00" },
      { name: "Google Sheets", si: siGooglesheets },
      { name: "MySQL", si: siMysql },
      { name: "SQL", icon: Database },
    ],
  },
];

/** Brand-icon tools for the hero marquee: one entry per distinct logo. */
const marqueeTools: ToolItem[] = (() => {
  const seen = new Set<string>();
  return toolCategories
    .flatMap((c) => c.items)
    .filter((item) => {
      const key = item.img ?? item.si?.slug ?? item.glyph;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
})();

const ToolsMarquee = () => (
  <div
    role="region"
    aria-label="Tools and software I use"
    className="tools-marquee group mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-card"
  >
    <div className="tools-marquee-track flex w-max items-center py-3.5">
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined} className="flex shrink-0 items-center">
          {marqueeTools.map((item) => (
            <li key={item.name} className="marquee-item flex items-center gap-2.5 border-r border-border px-7 text-sm font-semibold text-foreground [&_img]:h-5 [&_img]:w-5 [&_svg]:h-5 [&_svg]:w-6">
              <ToolIcon item={item} />
              <span className="whitespace-nowrap">{item.name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

const AppStrip = ({ label, apps }: { label: string; apps: { name: string; logo: string }[] }) => (
  <div className="mt-4 first-of-type:mt-5">
    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {apps.map((app) => (
        <li key={app.name} className="hover-chip flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-1.5 pr-2.5 text-xs font-medium text-foreground">
          <img src={logo[app.logo]} alt="" loading="lazy" decoding="async" className="h-5 w-5 shrink-0 object-contain" />
          {app.name}
        </li>
      ))}
    </ul>
  </div>
);

const certifications = [
  { title: "Rekruuto Level 1 Virtual Assistant", issuer: "Rekruuto", date: "July 2025", image: "/lovable-uploads/rekruuto-level1-cert.png" },
  { title: "Attention to Detail Level 2", issuer: "Rekruuto", date: "July 2025", image: "/lovable-uploads/rekruuto-level2-cert.png" },
  { title: "Introduction to Programming Using Java", issuer: "Microsoft MTA", date: "Certified", image: "/lovable-uploads/mta-java-cert.png" },
];

const scrollTo = (href: string) => {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", href);
  } catch {
    /* history updates can be blocked in embedded frames */
  }
};

/** Text whose letters hop in a wave (and flash the accent colour) when an ancestor `.name-wave` is hovered. */
const WaveText = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={className}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {[...text].map((char, i) => (
        <span key={i} className="name-char" style={{ "--i": i } as React.CSSProperties}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  </span>
);

const sectionIds = navItems.map((item) => item.href.slice(1));

/** Highlights the nav item for the section currently in view. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
};


/** Light/dark theme: follows the system until the visitor picks one. */
const useTheme = () => {
  const [dark, setDark] = useState(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      /* storage can be unavailable */
    }
    return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  /** Switches theme with a circular reveal from the clicked button; falls back to a colour fade, or no motion if the visitor prefers that. */
  const toggle = (event?: React.MouseEvent<HTMLElement>) => {
    const next = !dark;
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle("dark", next);
      flushSync(() => setDark(next));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    const start = (document as Document & { startViewTransition?: (callback: () => void) => { ready: Promise<void> } }).startViewTransition;
    if (!start) {
      root.classList.add("theme-fade");
      apply();
      window.setTimeout(() => root.classList.remove("theme-fade"), 650);
      return;
    }
    const rect = event?.currentTarget.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = start.call(document, apply);
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => undefined);
  };
  return { dark, toggle };
};

const CardHeading = ({ icon: Icon, title, subtitle }: { icon: typeof Home; title: string; subtitle?: string }) => (
  <div className="flex items-start gap-3">
    <span className="icon-chip"><Icon className="h-5 w-5" /></span>
    <div className="min-w-0">
      <h2 className="text-lg font-bold leading-tight text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 text-sm leading-snug text-muted-foreground">{subtitle}</p>}
    </div>
  </div>
);

/** Explicit paths (not built from a template string) so every screenshot can be found by search and inlined by the artifact build. */
const serviceImages: Record<string, string> = {
  "Cloud & Endpoint Support": "/projects/service-cloud.webp",
  "Troubleshooting & Remote Support": "/projects/service-remote.webp",
  "Deployment & Infrastructure": "/projects/service-deploy.webp",
  "Inbox, Calendar & Meetings": "/projects/service-inbox.webp",
  "Research & Records": "/projects/service-research.webp",
  "Recruiting & Workflow": "/projects/service-recruit.webp",
};

const serviceImagesLight: Record<string, string> = {
  "Cloud & Endpoint Support": "/projects/service-cloud-light.webp",
  "Troubleshooting & Remote Support": "/projects/service-remote-light.webp",
  "Deployment & Infrastructure": "/projects/service-deploy-light.webp",
  "Inbox, Calendar & Meetings": "/projects/service-inbox-light.webp",
  "Research & Records": "/projects/service-research-light.webp",
  "Recruiting & Workflow": "/projects/service-recruit-light.webp",
};

/** Current time, ticking every second. */
const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
};

const MELJHON_TZ = "Asia/Manila"; // Davao City, Philippines: GMT+8 all year, no daylight saving
const MELJHON_GMT = "GMT+8";

/** Date and time in Meljhon's time zone (GMT+8), whatever zone the visitor's browser is in. */
const useMeljhonTime = () => {
  const now = useNow();
  const time = new Intl.DateTimeFormat("en-US", { timeZone: MELJHON_TZ, hour: "numeric", minute: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat("en-US", { timeZone: MELJHON_TZ, weekday: "short", month: "short", day: "numeric" }).format(now);
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: MELJHON_TZ, hourCycle: "h23", hour: "numeric", minute: "numeric", second: "numeric" }).formatToParts(now);
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { now, time, date, zone: MELJHON_GMT, hour: part("hour") % 24, minute: part("minute"), second: part("second") };
};

/** Seconds into the current minute at mount, as a negative delay so the sweep animations stay in step with the real clock. */
const useSweepOffset = () => useState(() => {
  const d = new Date();
  return `-${(d.getSeconds() + d.getMilliseconds() / 1000).toFixed(2)}s`;
})[0];

/** Small analog face showing Meljhon's time. The second hand appears and sweeps while the clock card is hovered. */
const ClockFace = ({ hour, minute, second, className }: { hour: number; minute: number; second: number; className: string }) => {
  const minutes = minute + second / 60;
  const hours = (hour % 12) + minutes / 60;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1="12" y1="3.6" x2="12" y2="5" strokeWidth="1.4" transform={`rotate(${deg} 12 12)`} />
      ))}
      <line className="clock-hand" x1="12" y1="12" x2="12" y2="7.4" strokeWidth="2.2" style={{ transform: `rotate(${hours * 30}deg)` }} />
      <line className="clock-hand" x1="12" y1="12" x2="12" y2="5.2" strokeWidth="1.8" style={{ transform: `rotate(${minutes * 6}deg)` }} />
      <line className="clock-hand clock-hand-s" x1="12" y1="14" x2="12" y2="4.6" strokeWidth="1" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
};

/** Compact live clock for the profile card, in Meljhon's time zone (GMT+8). */
const SidebarClock = () => {
  const { now, time, date, zone, hour, minute, second } = useMeljhonTime();
  const sweep = useSweepOffset();
  return (
    <div role="group" aria-label="Meljhon's local time" style={{ "--sec": sweep } as React.CSSProperties} className="clock-card relative mt-4 flex items-center max-lg:justify-center gap-2.5 overflow-hidden rounded-2xl border border-border bg-background p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm">
      <span className="clock-icon relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span aria-hidden="true" className="clock-ring rounded-lg" />
        <ClockFace hour={hour} minute={minute} second={second} className="relative h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1 max-lg:flex-none max-lg:text-center">
        <p className="truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Meljhon's time · Davao</p>
        <p className="text-sm font-extrabold leading-tight tabular-nums text-foreground">
          <time className="clock-time" dateTime={now.toISOString()}>{time}</time>
          <span className="ml-1.5 text-[11px] font-semibold text-muted-foreground">{date}{zone && ` · ${zone}`}</span>
        </p>
      </div>
      <span aria-hidden="true" className="clock-progress" />
    </div>
  );
};

/** "Open to remote work" status with a live ping dot. */
const AvailabilityBadge = () => (
  <span className="group/live inline-flex cursor-default items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary">
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success transition-transform duration-200 group-hover/live:scale-125" />
    </span>
    Open to remote work
  </span>
);

/**
 * Photo, name, roles, location, local time, and contact icons. The same block is the top of the desktop sidebar and
 * the top of the page on phones, so Meljhon's photo and name look identical on every screen.
 */
const ProfileIdentity = ({ themeButton, avatarSize = "h-32 w-32" }: { themeButton?: React.ReactNode; avatarSize?: string }) => (
  <div className="text-center">
    <div
      className={`avatar group/avatar relative mx-auto ${avatarSize}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const box = event.currentTarget.getBoundingClientRect();
        const tilt = event.currentTarget.querySelector<HTMLElement>(".avatar-tilt");
        if (!tilt) return;
        tilt.style.setProperty("--ry", `${((event.clientX - box.left) / box.width - 0.5) * 22}deg`);
        tilt.style.setProperty("--rx", `${-((event.clientY - box.top) / box.height - 0.5) * 22}deg`);
        tilt.style.setProperty("--s", "1.07");
      }}
      onPointerLeave={(event) => {
        const tilt = event.currentTarget.querySelector<HTMLElement>(".avatar-tilt");
        ["--rx", "--ry", "--s"].forEach((name) => tilt?.style.removeProperty(name));
      }}
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-primary/25 blur-2xl transition-all duration-300 group-hover/avatar:scale-125 group-hover/avatar:bg-primary/45" />
      <span aria-hidden="true" className="avatar-ring" />
      <span aria-hidden="true" className="avatar-ripple" />
      <span aria-hidden="true" className="avatar-ripple avatar-ripple-2" />
      <span aria-hidden="true" className="avatar-orbit">
        {orbitLogos.map((name, i) => (
          <span key={name} className="avatar-orbit-item" style={{ "--i": i } as React.CSSProperties}>
            <span className="avatar-orbit-chip" style={{ "--i": i } as React.CSSProperties}>
              <img src={logo[name]} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
            </span>
          </span>
        ))}
      </span>
      <span className="avatar-tilt relative block h-full w-full">
        <span className="avatar-face relative block h-full w-full overflow-hidden rounded-full border-4 border-card shadow-profile transition-colors duration-300 group-hover/avatar:border-primary/60">
          <img src={profileImage} alt="Meljhon Deaño" width={300} height={300} fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center" />
          <img src={profileCartoon} alt="" aria-hidden="true" width={300} height={300} decoding="async" className="avatar-cartoon absolute inset-0 h-full w-full object-cover object-center" />
          <span aria-hidden="true" className="avatar-shine" />
        </span>
      </span>
    </div>
    <div className="name-wave relative z-10 mt-4 flex cursor-default items-center justify-center gap-2">
      <p className="text-2xl font-extrabold tracking-tight text-foreground">
        <WaveText text="Meljhon Deaño" />
      </p>
      <span className="verified-badge relative flex h-5 w-5 shrink-0 items-center justify-center">
        <span aria-hidden="true" className="verified-ring" />
        <CheckCircle2 className="relative h-5 w-5 fill-primary text-primary-foreground" aria-label="Verified" />
      </span>
    </div>
    <p className="role-wave mt-1 cursor-default text-sm font-medium leading-snug text-muted-foreground">
      <span className="block"><WaveText text="Technical Virtual Assistant" /></span>
      <span className="block"><WaveText text="IT Support · Executive Assistant" /></span>
    </p>
    <LocationHover />
    <SidebarClock />
    <div className="mt-4 flex items-center justify-center gap-2.5">
      <a href={`mailto:${CONTACT.email}`} aria-label="Email Meljhon" className="sidebar-social"><Mail className="h-4 w-4" /></a>
      <a href={CONTACT.phoneHref} aria-label="Call Meljhon" className="sidebar-social"><Phone className="h-4 w-4" /></a>
      <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="Meljhon on LinkedIn (opens in new tab)" className="sidebar-social"><Linkedin className="h-4 w-4" /></a>
      {themeButton}
    </div>
  </div>
);

const PortfolioDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      return sessionStorage.getItem("sidebar") !== "hidden";
    } catch {
      return true;
    }
  });
  const activeSection = useActiveSection(sectionIds);
  const { dark, toggle } = useTheme();

  // The sidebar profile slides in as the loading screen lifts, so a first-time visitor sees it arrive.
  const [entered, setEntered] = useState(() => !document.getElementById("app-loader"));
  useEffect(() => {
    if (entered) return;
    const done = () => setEntered(true);
    window.addEventListener("splash-done", done, { once: true });
    const failsafe = window.setTimeout(done, 9000);
    return () => {
      window.removeEventListener("splash-done", done);
      window.clearTimeout(failsafe);
    };
  }, [entered]);
  const showSidebar = sidebarOpen && entered;

  // On phones the profile card opens the page; once it scrolls away the header shows a compact photo and name instead.
  const profileRef = useRef<HTMLDivElement>(null);
  const [profileInView, setProfileInView] = useState(true);
  useEffect(() => {
    const el = profileRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setProfileInView(entry.isIntersecting), { rootMargin: "-64px 0px 0px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const headerRef = useRef<HTMLElement>(null);

  // Cursor spotlight: tell the hovered card where the pointer is so its glow can follow it.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = (event.target as Element | null)?.closest<HTMLElement>(".bento-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menuOpen]);

  const toggleSidebar = () =>
    setSidebarOpen((open) => {
      try {
        sessionStorage.setItem("sidebar", open ? "hidden" : "open");
      } catch {
        /* storage unavailable: the choice just won't persist */
      }
      return !open;
    });

  const handleNavigate = (href: string) => {
    scrollTo(href);
    setMenuOpen(false);
  };

  const themeButton = (
    <button type="button" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark} className="sidebar-social">
      {dark ? <Sun key="sun" className="theme-icon h-4 w-4" /> : <Moon key="moon" className="theme-icon h-4 w-4" />}
    </button>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <LiveBackdrop />
      <ScrollUX onTop={() => scrollTo("#home")} />
      <a href="#main" className="skip-link">Skip to main content</a>

      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/90 px-4 backdrop-blur sm:px-5 lg:hidden">
        {profileInView ? (
          <button type="button" onClick={() => handleNavigate("#home")} className="name-wave text-lg font-extrabold text-foreground" aria-label="MJD, go to top">
            <WaveText text="MJD" /><span className="name-char name-dot text-primary" style={{ "--i": 3 } as React.CSSProperties}>.</span>
          </button>
        ) : (
          <button type="button" onClick={() => handleNavigate("#home")} className="flex min-w-0 items-center gap-2.5 text-left animate-in fade-in slide-in-from-left-2 duration-300" aria-label="Meljhon Deaño, go to top">
            <img src={profileImage} alt="" width={36} height={36} decoding="async" className="h-9 w-9 shrink-0 rounded-full border-2 border-card object-cover shadow-profile" />
            <span className="flex min-w-0 items-center gap-1.5 text-[17px] font-extrabold tracking-tight text-foreground">
              <span className="truncate">Meljhon Deaño</span>
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 fill-primary text-primary-foreground" />
            </span>
          </button>
        )}
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {dark ? <Sun key="sun" className="theme-icon h-5 w-5" /> : <Moon key="moon" className="theme-icon h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-nav">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" aria-label="Primary" className="absolute left-4 right-4 top-[4.5rem] rounded-2xl border border-border bg-card p-2 shadow-card">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Button key={href} variant="ghost" className={`group/nav w-full justify-start gap-3 rounded-xl transition-all duration-200 hover:translate-x-1 hover:bg-primary/10 hover:text-primary ${activeSection === href.slice(1) ? "bg-primary/10 text-primary" : ""}`} aria-current={activeSection === href.slice(1) ? "true" : undefined} onClick={() => handleNavigate(href)}>
                <Icon className="h-4 w-4 text-primary transition-transform duration-200 group-hover/nav:scale-125" /> {label}
              </Button>
            ))}
          </nav>
        )}
      </header>

      <aside
        id="side-nav"
        aria-label="Profile and navigation"
        className={`fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col overflow-y-auto border-r border-border bg-card/90 px-6 py-6 backdrop-blur transition-[transform,visibility] duration-300 ease-out lg:flex ${showSidebar ? "translate-x-0" : "invisible -translate-x-full"}`}
      >
        <button type="button" onClick={toggleSidebar} aria-label="Hide side navigation" aria-expanded={sidebarOpen} aria-controls="side-nav" className="sidebar-social absolute right-3 top-3 h-9 w-9">
          <PanelLeftClose className="h-4 w-4" />
        </button>
        <ProfileIdentity themeButton={themeButton} />

        <nav aria-label="Primary" className="mt-4 space-y-0.5 border-t border-border pt-4">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = activeSection === href.slice(1);
            return (
              <Button
                key={href}
                variant="ghost"
                onClick={() => handleNavigate(href)}
                aria-current={active ? "true" : undefined}
                className={`group/nav h-10 w-full justify-start gap-3 rounded-xl px-4 text-[15px] transition-all duration-200 hover:translate-x-1 hover:bg-primary/10 hover:text-primary ${active ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="h-[18px] w-[18px] transition-transform duration-200 group-hover/nav:scale-125 group-hover/nav:-rotate-6" /> {label}
              </Button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          <AvailabilityBadge />
        </div>
      </aside>

      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Show side navigation"
        aria-expanded={sidebarOpen}
        aria-controls="side-nav"
        tabIndex={sidebarOpen ? -1 : 0}
        className={`sidebar-social fixed left-4 top-4 z-40 hidden h-11 w-11 bg-card shadow-card transition-all duration-300 lg:flex ${sidebarOpen ? "pointer-events-none scale-75 opacity-0" : "scale-100 opacity-100"}`}
      >
        <PanelLeftOpen className="h-5 w-5" />
      </button>

      <main id="main" tabIndex={-1} className={`relative pt-16 outline-none transition-[margin,padding] duration-300 ease-out ${sidebarOpen ? "lg:ml-[280px] lg:pt-0" : "lg:ml-0 lg:pt-12"}`}>
        <div className="mx-auto max-w-[1280px] px-3 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <section id="home" className="scroll-mt-20 lg:scroll-mt-6">
            <div ref={profileRef} className="mx-auto mb-6 max-w-lg rounded-3xl border border-border bg-card/90 px-5 pb-5 pt-7 shadow-card backdrop-blur lg:hidden">
              <ProfileIdentity />
              <div className="mt-4 flex justify-center border-t border-border pt-4">
                <AvailabilityBadge />
              </div>
            </div>
            <ToolsMarquee />
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">Technical Virtual Assistant · IT Support · Executive Assistant</p>
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground [text-wrap:balance] sm:text-5xl lg:text-[3.5rem]">
                  Reliable systems. Organized operations.
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                  Need one reliable professional who can manage your administrative workload and resolve day-to-day technical issues?
                </p>
              </div>
              <Button size="lg" onClick={() => scrollTo("#contact")} className="shrink-0 gap-2 rounded-full bg-secondary-foreground px-6 text-background shadow-card hover:bg-secondary-foreground/90">
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          <div className="mt-7 rounded-[1.5rem] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-primary/[0.16] p-2 sm:rounded-[2rem] sm:p-4">
            <ul aria-label="Highlights" className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {highlights.map(({ icon: Icon, tag, value, label }) => (
                <li key={tag} className="stat-tile group/stat">
                  <span className="stat-icon"><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{tag}</p>
                    <p className="stat-value">{value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{label}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <ProjectsShowcase />
            </div>

            <section id="about" className="bento-card mb-4 scroll-mt-24">
              <CardHeading icon={UserRound} title="About" subtitle="Who I am and how I work." />
              <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
              <div>
              <p className="text-[15px] font-medium leading-7 text-foreground">
                I’m a Technical Virtual Assistant, IT Support Specialist, and Executive Assistant with more than four years of combined experience across technical support, remote operations, executive assistance, nonprofit administration, and government service.
              </p>
              <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  I help businesses stay organized, productive, and technically supported by managing inboxes, calendars, meetings, documentation, workflows, user accounts, devices, and common IT problems.
                </p>
                <p>
                  My technical experience spans service desk support and Windows 11 desktop deployment, and I have provided executive and board administrative support to a U.S.-based organization while working independently during Eastern Time hours.
                </p>
                <p>
                  I also build practical tools, like NC Compliance CRM, a role-based CRM that helps nonprofits and small businesses manage prospects, outreach, and compliance follow-ups, plus Google Sheets outreach trackers and dashboards for nonprofit and SMB prospecting.
                </p>
              </div>
              </div>
              <figure className="rounded-2xl border border-primary/20 bg-primary/5 p-4 lg:sticky lg:top-6">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  Clients describe me as reliable, proactive, and detail-oriented, and say I communicate clearly and follow through until the work is done.
                </blockquote>
                <figcaption className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span role="img" aria-label="5 out of 5 stars" className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} aria-hidden="true" className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                      ))}
                    </span>
                    {averageRating} across {testimonials.length} client reviews
                  </span>
                  <button type="button" onClick={() => scrollTo("#testimonials")} className="font-semibold text-primary hover:underline">Read the reviews</button>
                </figcaption>
              </figure>
              </div>
            </section>

            <section id="education" className="bento-card scroll-mt-24">
                <CardHeading icon={GraduationCap} title="Education & Credentials" subtitle="Academic foundation and professional certifications." />
                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><GraduationCap className="h-3.5 w-3.5 text-primary" /> Education</h3>
                <div className="mt-3 space-y-3">
                  <div className="hover-row -mx-2 rounded-xl px-2 py-1.5">
                    <p className="font-bold text-foreground">Information Technology</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">University of Mindanao · 2019–2021</p>
                  </div>
                  <div className="hover-row -mx-2 rounded-xl px-2 py-1.5">
                    <p className="font-bold text-foreground">Senior High School, ICT</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">University of Mindanao · 2017–2019</p>
                  </div>
                </div>
                </div>
                <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><Award className="h-3.5 w-3.5 text-primary" /> Certifications</h3>
                <div className="mt-3 space-y-2.5">
                  {certifications.map((cert) => (
                    <Dialog key={cert.title}>
                      <DialogTrigger asChild>
                        <button type="button" className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5">
                          <img src={cert.image} alt="" loading="lazy" decoding="async" width={56} height={44} className="h-11 w-14 shrink-0 rounded-lg border border-border bg-card object-contain" />
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-foreground">{cert.title}</span>
                            <span className="mt-0.5 block text-xs text-muted-foreground">{cert.issuer} · {cert.date} · <span className="font-semibold text-primary">View</span></span>
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader className="text-left">
                          <DialogTitle>{cert.title}</DialogTitle>
                          <DialogDescription>{cert.issuer} · {cert.date}</DialogDescription>
                        </DialogHeader>
                        <img src={cert.image} alt={`${cert.title} certificate`} className="mx-auto h-auto max-h-[70vh] w-auto max-w-full rounded-xl border border-border" />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
                </div>
                </div>
            </section>
          </div>

          <section id="services" className="mt-7 scroll-mt-24 rounded-[1.5rem] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-primary/[0.16] p-2 sm:rounded-[2rem] sm:p-4 lg:scroll-mt-6">
            <div className="px-3 pb-4 pt-3 sm:px-4">
              <CardHeading icon={ListChecks} title="Services" subtitle="Technical and administrative work I take off your plate." />
            </div>

            <div className="grid gap-4 rounded-3xl border border-border bg-card p-3 shadow-card sm:p-4 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
              <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-primary/[0.04] to-transparent p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">How I work</p>
                <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-foreground">
                  Technical and nontechnical users, <span className="text-muted-foreground">supported end to end.</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Support is available through:</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Support channels">
                  {supportChannels.map((channel) => (
                    <li key={channel} className="hover-chip rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground">{channel}</li>
                  ))}
                </ul>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {workPromises.map(({ icon: Icon, title, text }, index) => (
                  <li
                    key={title}
                    className="hover-row group/step relative flex flex-col rounded-2xl border border-border bg-background p-4 xl:[&:not(:last-child)]:after:absolute xl:[&:not(:last-child)]:after:-right-3 xl:[&:not(:last-child)]:after:top-9 xl:[&:not(:last-child)]:after:z-10 xl:[&:not(:last-child)]:after:w-3 xl:[&:not(:last-child)]:after:border-t-2 xl:[&:not(:last-child)]:after:border-dashed xl:[&:not(:last-child)]:after:border-primary/40 xl:[&:not(:last-child)]:after:content-['']"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1 text-6xl font-extrabold leading-none tracking-tight text-foreground/[0.06]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-all duration-200 group-hover/step:scale-110 group-hover/step:bg-primary group-hover/step:text-primary-foreground"><Icon className="h-5 w-5" /></span>
                    <h4 className="mt-3 text-base font-extrabold leading-tight text-foreground">{title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {serviceGroups.map((group) => (
              <div key={group.title} className="mt-6 px-0.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-2 sm:px-3">
                  <h3 className="text-lg font-extrabold tracking-tight text-foreground">{group.title}</h3>
                  <p className="text-sm text-muted-foreground">{group.note}</p>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:[&>*:last-child:nth-child(odd)]:col-span-2 xl:[&>*:last-child:nth-child(odd)]:col-span-1">
                  {group.cards.map((card, index) => (
                    <article key={card.title} className="bento-card service-card flex flex-col">
                      <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-primary/20">
                        <img src={serviceImagesLight[card.title]} alt="" aria-hidden="true" loading="lazy" decoding="async" className="service-art absolute inset-0 h-full w-full object-cover dark:hidden" />
                        <img src={serviceImages[card.title]} alt="" aria-hidden="true" loading="lazy" decoding="async" className="service-art absolute inset-0 hidden h-full w-full object-cover dark:block" />
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <ul className="flex -space-x-2.5" aria-label={`Tools: ${card.logos.map((l) => l.name).join(", ")}`}>
                          {card.logos.map((item) => (
                            <li key={item.name} title={item.name} className="logo-wrap flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white shadow-sm [&_img]:h-6 [&_img]:w-6 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-slate-700">
                              <ToolIcon item={item} />
                            </li>
                          ))}
                        </ul>
                        <span className="pt-1 text-xs font-bold tabular-nums tracking-wider text-primary">{String(index + 1).padStart(2, "0")} / {String(group.cards.length).padStart(2, "0")}</span>
                      </div>
                      <h4 className="mt-4 text-lg font-extrabold leading-tight text-foreground">{card.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.summary}</p>
                      <p className="mt-3 w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary">{card.badge}</p>
                      <ul className="mt-4 space-y-1">
                        {card.items.map((item) => (
                          <li key={item} className="hover-row group/row -mx-2 flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm leading-relaxed text-muted-foreground">
                            <CheckCircle2 aria-hidden="true" className="mt-[3px] h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover/row:scale-125" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section id="tools" className="mt-7 scroll-mt-24 rounded-[1.5rem] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-primary/[0.16] p-2 sm:rounded-[2rem] sm:p-4 lg:scroll-mt-6">
            <div className="px-3 pb-4 pt-3 sm:px-4">
              <CardHeading icon={Layers} title="Tools & Software" subtitle="The apps, platforms, and systems I use day to day." />
            </div>
            <div className="columns-1 gap-4 md:columns-2 xl:columns-3 [&>section]:mb-4 [&>section]:break-inside-avoid">
              {toolCategories.map(({ icon: Icon, title, items }) => (
                <section key={title} className="bento-card">
                  <h3 className="flex items-center gap-3 text-base font-bold leading-tight text-foreground">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-[18px] w-[18px]" /></span>
                    {title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <li key={item.name} className="hover-chip flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-2 pr-2.5 text-xs font-medium text-foreground">
                        <ToolIcon item={item} />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  {title === "Directory & cloud suites" && (
                    <>
                      <AppStrip label="Google apps" apps={googleApps} />
                      <AppStrip label="Microsoft 365 apps" apps={microsoftApps} />
                    </>
                  )}
                </section>
              ))}
            </div>
          </section>

          <Testimonials onContact={() => scrollTo("#contact")} />

          <section id="experience" className="mt-7 scroll-mt-24 rounded-[1.5rem] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-primary/[0.16] p-2 sm:rounded-[2rem] sm:p-4 lg:scroll-mt-6">
            <div className="px-3 pb-4 pt-3 sm:px-4">
              <CardHeading icon={BriefcaseBusiness} title="Experience" subtitle="IT support, executive assistance, and administrative operations." />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:[&>article:last-child:nth-child(odd)]:col-span-2 xl:grid-cols-3 xl:[&>article:last-child:nth-child(3n+2)]:col-span-2 xl:[&>article:last-child:nth-child(3n+1)]:col-span-3">
              {experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="bento-card">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant="secondary" className="rounded-full">{item.track}</Badge>
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><CalendarDays className="h-3.5 w-3.5 text-primary" />{item.period}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className={`logo-wrap flex h-14 w-24 shrink-0 items-center justify-center rounded-xl p-1 ${companyLogoDark[item.logo] ? "" : "dark:bg-white/90"}`}>
                      <img src={companyLogo[item.logo]} alt={`${item.company} logo`} loading="lazy" decoding="async" className={`max-h-full max-w-full object-contain ${companyLogoDark[item.logo] ? "dark:hidden" : ""}`} />
                      {companyLogoDark[item.logo] && (
                        <img src={companyLogoDark[item.logo]} alt={`${item.company} logo`} loading="lazy" decoding="async" className="hidden max-h-full max-w-full object-contain dark:block" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-snug text-foreground">{item.role}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.company}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="hover-row group/row -mx-2 flex items-start gap-2 rounded-lg px-2 py-1 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-primary transition-transform duration-200 group-hover/row:scale-150" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="mt-7 scroll-mt-24 rounded-[1.5rem] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-primary/[0.16] p-2 sm:rounded-[2rem] sm:p-4 lg:scroll-mt-6">
            <div className="px-3 pb-4 pt-3 sm:px-4">
              <CardHeading icon={Mail} title="Let’s Work Together" subtitle="Available for remote technical, executive, and administrative support." />
            </div>
            <ContactSection />
          </section>

          <footer className="flex flex-col gap-2 px-2 pb-24 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Meljhon Deaño</p>
          </footer>
        </div>
      </main>

      <ChatAssistant onNavigate={scrollTo} profileImage={profileImage} />
    </div>
  );
};

export default PortfolioDashboard;
