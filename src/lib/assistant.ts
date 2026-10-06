/**
 * Knowledge base and matcher for the portfolio's built-in Q&A assistant.
 *
 * It runs entirely in the browser: no server, API key, or AI model. Every answer is written from
 * content that already appears on the site, so keep this file in step with Meljhon Deaño's résumé
 * (see AGENTS.md) whenever the portfolio content changes.
 */

import { CONTACT, CRM_HOST, CRM_URL } from "./contact";

export type AssistantLink = { label: string; href: string };

export type KnowledgeEntry = {
  id: string;
  /** Short question shown on suggestion chips (also echoed as the visitor's message). */
  label: string;
  /** Single words match tokens; multi-word phrases match anywhere in the question. */
  keywords: string[];
  answer: string;
  links?: AssistantLink[];
  /** Follow-up entry ids offered after this answer. */
  next?: string[];
};

const contactLinks: AssistantLink[] = [
  { label: "Email Meljhon", href: `mailto:${CONTACT.email}` },
  { label: "LinkedIn", href: CONTACT.linkedin },
];

export const knowledge: KnowledgeEntry[] = [
  {
    id: "about",
    label: "Who is Meljhon?",
    keywords: ["who is", "tell me about him", "about him", "introduce", "introduction", "background", "summary", "profile", "bio", "overview", "meljhon", "deano"],
    answer:
      "Meljhon Deaño is a Technical Virtual Assistant, IT Support Specialist, and Executive Assistant with more than four years of combined experience across technical support, remote operations, executive assistance, nonprofit administration, and government service.\n\nHe helps businesses stay organized, productive, and technically supported. He is based in Davao City, Philippines, and is open to remote work.",
    links: [{ label: "Read the About section", href: "#about" }],
    next: ["experience", "services", "contact"],
  },
  {
    id: "experience",
    label: "Where has he worked?",
    keywords: ["experience", "work history", "career", "job", "jobs", "role", "roles", "employer", "employers", "company", "companies", "worked", "work", "employment", "history", "where has he worked", "positions", "previous", "previously", "before"],
    answer:
      "• Independent IT Support Specialist, Upwork (2025 to present)\n• Board Administrative Assistant, Boundless Freedom Project (2025 to 2026)\n• IT Support Engineer, Bladegrass Technologies / Concentrix (2025)\n• IT Technical Support, E&W Group of Companies (2023 to 2025)\n• Passport / Authentication Staff, Department of Foreign Affairs (2022 to 2023)",
    links: [{ label: "See full experience", href: "#experience" }],
    next: ["metrics", "current", "education"],
  },
  {
    id: "current",
    label: "What is he working on now?",
    keywords: ["current", "currently", "latest", "recent", "recently", "working on", "right now", "these days"],
    answer:
      "Since 2025 Meljhon has worked as an independent IT support specialist on Upwork, giving international clients remote help with hardware, software, VPN, firewall, and network issues, plus Microsoft 365 and Google Workspace administration.\n\nFrom 2025 to 2026 he also served as Board Administrative Assistant at Boundless Freedom Project, a U.S.-based nonprofit.",
    links: [{ label: "See experience", href: "#experience" }],
    next: ["availability", "reviews", "contact"],
  },
  {
    id: "services",
    label: "What services does he offer?",
    keywords: ["service", "services", "offer", "offers", "skill", "skills", "expertise", "specialize", "specialty", "capabilities", "help with", "what can he do", "what does he do", "do for me", "strengths", "virtual assistant", "executive assistant"],
    answer:
      "He offers two groups of services.\n\nIT and technical support: Microsoft 365, Outlook, Teams, SharePoint, and Google Workspace; Windows 10 and 11 troubleshooting; Active Directory, Entra ID, and Intune; account setup and access management; hardware, software, email, printer, VPN, and network troubleshooting; remote support (AnyDesk, TeamViewer, RDP, Splashtop); ticketing in BMC Remedy, Jira, and Zendesk; imaging, deployment, updates, backups, and security checks; IT asset tracking, SOPs, and knowledge-base articles; and QNAP NAS, POS, websites, CCTV, servers, and basic network support.\n\nExecutive and administrative support: inbox and calendar management; meeting scheduling and follow-ups; executive and board support; client communication and task coordination; online research and summaries; document formatting, data entry, and records management; file and cloud-storage organization; LinkedIn and Indeed recruitment support; workflow and project tracking; and basic Canva graphics.",
    links: [{ label: "See Services", href: "#services" }],
    next: ["tools", "projects", "availability"],
  },
  {
    id: "tools",
    label: "What tools does he use?",
    keywords: ["tool", "tools", "software", "tech", "stack", "technologies", "technology", "apps", "platforms", "tech stack", "what does he use", "what do you use", "what he uses", "proficient"],
    answer:
      "His toolkit covers:\n• Directory and cloud suites: Active Directory, Entra ID, Intune, Google Workspace, Microsoft 365\n• Systems: Windows 10/11, Windows Server, Linux, macOS, ChromeOS\n• Infrastructure: CCTV, QNAP NAS, servers, PABX, POS, VoIP, VMware\n• Networking: DNS, LAN/WAN/VLAN, VPN, TCP/IP, MikroTik, Ubiquiti, UniFi, TP-Link, Omada, Cisco, Palo Alto\n• Remote support and ticketing: AnyDesk, TeamViewer, RDP, Microsoft Remote Desktop, Splashtop, BMC Remedy, Jira, Zendesk, SolvNow, Freshdesk, Zoom, Flare\n• Planning and scheduling: Calendly, HoneyBook, Asana, Notion, Airtable, Trello\n• Messaging and recruiting: WhatsApp, Slack, Telegram, Viber, Google Voice, LinkedIn, Indeed\n• Creative and AI tools, plus HTML, CSS, PHP, Java, Google Sheets, MySQL, and SQL",
    links: [{ label: "See Tools & Software", href: "#tools" }],
    next: ["microsoft", "networking", "ai"],
  },
  {
    id: "microsoft",
    label: "Does he manage Microsoft 365 and Google Workspace?",
    keywords: ["microsoft", "microsoft 365", "m365", "office 365", "office", "outlook", "teams", "sharepoint", "onedrive", "google", "google workspace", "workspace", "gmail", "entra", "intune", "active directory", "administer", "mailbox", "email hosting", "ovh", "domain"],
    answer:
      "Yes. He administers Microsoft 365 and Google Workspace accounts, permissions, and security policies for clients.\n\nAt Bladegrass Technologies he also handled Active Directory OU moves, Entra ID and Intune compliance, access provisioning, and asset tracking. For a client project he connected Microsoft 365 with OVH email hosting (domain, mail, and calendar).",
    links: [{ label: "See the project", href: "#projects" }, { label: "See Tools & Software", href: "#tools" }],
    next: ["projects", "reviews", "contact"],
  },
  {
    id: "networking",
    label: "What networking experience does he have?",
    keywords: ["network", "networking", "router", "routers", "switch", "switches", "mikrotik", "ubiquiti", "unifi", "tp link", "tplink", "omada", "cisco", "palo alto", "vpn", "vlan", "lan", "wan", "dns", "tcp", "firewall", "wifi", "wlan", "hotspot", "winbox", "connectivity", "routeros", "routerboard"],
    answer:
      "He works with DNS, LAN/WAN/VLAN, VPN, and TCP/IP, and with MikroTik, Ubiquiti, UniFi, TP-Link, Omada, Cisco, and Palo Alto gear. He has resolved VPN, firewall, and network connectivity issues for remote clients.\n\nOne featured project walks through a MikroTik RouterBOARD WLAN and hotspot configuration in Winbox.",
    links: [{ label: "See the MikroTik project", href: "#projects" }],
    next: ["infrastructure", "tools", "projects"],
  },
  {
    id: "infrastructure",
    label: "Has he supported servers, CCTV, or POS systems?",
    keywords: ["cctv", "nas", "qnap", "server", "servers", "pos", "pabx", "voip", "vmware", "virtual machine", "virtual machines", "hardware", "infrastructure", "desktop", "desktops", "endpoint", "endpoints", "windows", "linux", "macos", "chromeos", "deploy", "deployment", "imaging", "onsite", "asset", "assets", "inventory", "camera", "cameras", "telephony"],
    answer:
      "Yes. At E&W Group of Companies he gave Tier 1 and Tier 2 remote and onsite support for websites, servers, POS systems, QNAP NAS, CCTV, and endpoints, and managed the full IT asset lifecycle.\n\nAt Bladegrass Technologies he imaged, configured, and deployed 200+ Windows 11 desktops, cutting setup time by roughly 30%. He also works with PABX, VoIP, and VMware virtual machines.",
    links: [{ label: "See experience", href: "#experience" }],
    next: ["metrics", "supporttools", "networking"],
  },
  {
    id: "supporttools",
    label: "Which support and ticketing tools does he use?",
    keywords: ["ticket", "tickets", "ticketing", "remedy", "bmc", "jira", "zendesk", "freshdesk", "solvnow", "anydesk", "teamviewer", "rdp", "remote support", "remote desktop", "helpdesk", "help desk", "incident", "incidents", "service desk", "tier 1", "tier 2", "troubleshoot", "troubleshooting"],
    answer:
      "For remote support he uses AnyDesk, TeamViewer, RDP (including Microsoft Remote Desktop), and Splashtop. For ticketing and service desk work: BMC Remedy, Jira, Zendesk, SolvNow, and Freshdesk, with Zoom for calls.\n\nAt Bladegrass Technologies he resolved 50+ weekly incidents and service requests in BMC Remedy across PC, network, software, and telephony.",
    links: [{ label: "See Tools & Software", href: "#tools" }],
    next: ["metrics", "experience", "infrastructure"],
  },
  {
    id: "metrics",
    label: "What results has he achieved?",
    keywords: ["metrics", "results", "numbers", "achievement", "achievements", "accomplishment", "accomplishments", "impact", "stats", "statistics", "how many", "proof", "track record", "highlights"],
    answer:
      "Highlights from his work:\n• 4+ years of experience\n• 50+ weekly incidents and service requests resolved in BMC Remedy\n• 200+ Windows 11 desktops imaged, configured, and deployed, cutting setup time by roughly 30%\n• Executive and board administrative support for a U.S.-based organization, worked independently during Eastern Time hours\n• A 5.0 average across five client reviews",
    links: [{ label: "See experience", href: "#experience" }, { label: "Read reviews", href: "#testimonials" }],
    next: ["reviews", "experience", "contact"],
  },
  {
    id: "projects",
    label: "What has he built?",
    keywords: ["project", "projects", "portfolio", "work samples", "sample", "samples", "built", "build", "case study", "case studies", "examples", "featured"],
    answer:
      "Featured projects:\n• NC Compliance CRM: a role-based CRM for nonprofits and small businesses to manage prospects, outreach, and compliance follow-ups.\n• Nonprofit Outreach Tracker & Dashboard: a Google Sheets outreach CRM for nonprofit prospecting, from organization research to pipeline reporting.\n• SMB Outreach Tracker & Dashboard: a centralized SMB prospecting and outreach dashboard covering lead research, contacts, follow-ups, and pipeline status.\n• Executive Calendar & Schedule Management: executive and team calendars managed across Google Calendar, Outlook, and HoneyBook.\n• Microsoft 365 to OVH Cloud: domain, mail, and calendar integration for OVH email hosting with Microsoft 365.\n• MikroTik WLAN & Hotspot: step-by-step RouterBOARD WLAN and hotspot configuration through Winbox.",
    links: [{ label: "Browse the projects", href: "#projects" }],
    next: ["crm", "outreach", "calendar"],
  },
  {
    id: "calendar",
    label: "Does he manage calendars and scheduling?",
    keywords: ["calendar", "calendars", "scheduling", "schedule", "schedules", "appointments", "appointment", "meetings", "recurring", "honeybook", "outlook calendar", "google calendar", "availability", "time blocking", "agenda"],
    answer:
      "Yes. Meljhon manages busy executive and team calendars across Google Calendar, Microsoft Outlook, and HoneyBook. He schedules internal meetings, client calls, audit meetings, check-ins, and recurring appointments, reviews availability to avoid conflicts, keeps calendar invitations up to date as schedules change, and uses calendar blocking and categorization to keep meetings, projects, deadlines, and focused work organized.\n\nThe project gallery shows calendar screenshots from all three tools. Event titles, names, and account details are blurred for privacy.",
    links: [{ label: "Open the projects", href: "#projects" }, { label: "See Services", href: "#services" }],
    next: ["admin", "outreach", "tools"],
  },
  {
    id: "outreach",
    label: "Tell me about the outreach trackers",
    keywords: ["outreach tracker", "tracker", "trackers", "google sheets", "sheets", "spreadsheet", "spreadsheets", "smb", "small business", "lead generation", "leads", "lead", "prospecting", "prospect research", "hr signal", "hr signals", "touch 1", "touch 2", "touch 3", "nurture", "decision maker", "decision makers"],
    answer:
      "Meljhon built two Google Sheets outreach trackers with dashboards:\n• Nonprofit Outreach Tracker & Dashboard: organization research, decision-maker identification, HR signals, contact verification, multi-touch follow-ups, and pipeline reporting.\n• SMB Outreach Tracker & Dashboard: lead research, executive and HR contacts, outreach schedules, follow-ups, responses, and pipeline status.\n\nBoth use a Touch 1, Touch 2, review, Touch 3, and nurture workflow, with dropdown statuses, follow-up dates, lead pain points, and reply tracking. Contact details are masked in the screenshots for privacy.",
    links: [{ label: "Open the projects", href: "#projects" }],
    next: ["crm", "projects", "admin"],
  },
  {
    id: "crm",
    label: "Tell me about NC Compliance CRM",
    keywords: ["crm", "nc compliance", "compliance", "prospect", "prospects", "pipeline", "outreach", "nonprofit", "nonprofits", "dashboard", "role based", "outreach calendar", "touch"],
    answer:
      `NC Compliance CRM is a full-featured CRM built to help nonprofit organizations and small businesses organize prospect relationships, automate structured outreach, track compliance risks, and manage follow-ups through a centralized, role-based dashboard.\n\nKey features: prospect pipeline, user and role management, email outreach, an outreach calendar, compliance and risk tracking, an admin dashboard, and secure sign-in (username and password or Google).\n\nThe CRM is live at ${CRM_HOST}, and the Projects section links to it.`,
    links: [{ label: "Visit the live CRM", href: CRM_URL }, { label: "Open the project gallery", href: "#projects" }],
    next: ["projects", "web", "contact"],
  },
  {
    id: "education",
    label: "What is his education?",
    keywords: ["education", "school", "university", "degree", "study", "studied", "graduate", "graduated", "college", "mindanao", "course", "academic", "senior high", "diploma", "student"],
    answer:
      "• Information Technology, University of Mindanao (2019 to 2021)\n• Senior High School, ICT track, University of Mindanao (2017 to 2019)",
    links: [{ label: "See Education & Credentials", href: "#education" }],
    next: ["certs", "experience", "about"],
  },
  {
    id: "certs",
    label: "Does he have certifications?",
    keywords: ["certification", "certifications", "certificate", "certificates", "certified", "rekruuto", "java", "mta", "attention to detail", "virtual assistant", "credentials", "credential", "training", "licenses", "license"],
    answer:
      "• Rekruuto Level 1 Virtual Assistant (July 2025)\n• Attention to Detail Level 2, Rekruuto (July 2025)\n• Introduction to Programming Using Java, Microsoft MTA",
    links: [{ label: "View the certificates", href: "#education" }],
    next: ["education", "admin", "web"],
  },
  {
    id: "reviews",
    label: "What do clients say?",
    keywords: ["review", "reviews", "testimonial", "testimonials", "client", "clients", "feedback", "rating", "ratings", "upwork", "recommend", "recommendation", "references", "reference", "reputation", "trust", "reliable", "what do people say", "customers", "customer"],
    answer:
      "Clients rate his work 5.0 across five reviews.\n\nMatt D., a nonprofit founder/CFO, called him “an incredible support to me as my executive assistant,” praising his calendar management, proactive deadline reminders, and organized inbox summaries. Rebecca H., a Director of Operations, called him “a tremendous support to our team and daily operations” and highlighted his initiative and follow-through. Jun V., an IT Manager / Head, called him “dependable, responsive,” and praised his initiative: “he does not wait to be asked.” Charlotte B. called him “highly reliable, professional, and detail-oriented.” Daryna K. (Ukraine) said he “provided excellent technical support and was very easy to work with.”",
    links: [{ label: "Read the reviews", href: "#testimonials" }],
    next: ["metrics", "availability", "contact"],
  },
  {
    id: "contact",
    label: "How can I contact him?",
    keywords: ["contact", "email", "mail", "phone", "call", "number", "reach", "linkedin", "message", "get in touch", "connect", "address", "telephone", "mobile"],
    answer: `You can reach Meljhon here:\n• Email: ${CONTACT.email}\n• Phone: ${CONTACT.phone}\n• LinkedIn: ${CONTACT.linkedinLabel}\n\nThe Contact section also has a short FAQ and a message form that opens your email app with your message ready to send.`,
    links: [...contactLinks, { label: "Contact section", href: "#contact" }],
    next: ["availability", "reviews", "projects"],
  },
  {
    id: "availability",
    label: "Is he available for work?",
    keywords: ["available", "availability", "hire", "hiring", "freelance", "freelancer", "remote", "open to", "work together", "rate", "rates", "pricing", "price", "cost", "how much", "contract", "full time", "part time", "engage", "book", "quote", "budget", "recruit", "discount", "discounts", "charge", "fee", "fees"],
    answer:
      "Yes. Meljhon is open to remote work and available for remote technical, executive, and administrative support.\n\nRates and availability are not listed on this site, so the best next step is to email him with your priorities.",
    links: contactLinks,
    next: ["services", "reviews", "location"],
  },
  {
    id: "location",
    label: "Where is he based?",
    keywords: ["where is he", "where are you", "where does he live", "where do you live", "location", "located", "based", "live", "lives", "country", "philippines", "davao", "timezone", "time zone", "time zones", "city", "hours", "working hours", "what hours", "eastern time", "est", "schedule overlap"],
    answer:
      "Meljhon is based in Davao City, Philippines (Philippine Standard Time, UTC+8) and works remotely with international clients across time zones. He has also covered Eastern Time hours independently for a U.S.-based organization. The clock on this page shows Meljhon's current local time (GMT+8).",
    links: [{ label: "See the profile", href: "#home" }],
    next: ["availability", "contact", "about"],
  },
  {
    id: "ai",
    label: "Which AI tools does he use?",
    keywords: ["ai", "chatgpt", "gemini", "claude", "deepseek", "copilot", "grok", "perplexity", "artificial intelligence", "llm", "chatbot tools", "gpt"],
    answer:
      "His AI toolkit includes ChatGPT, Gemini, Claude, DeepSeek, Microsoft Copilot, Grok, and Perplexity.",
    links: [{ label: "See Tools & Software", href: "#tools" }],
    next: ["tools", "productivity", "web"],
  },
  {
    id: "productivity",
    label: "What creative and planning tools does he use?",
    keywords: ["canva", "lightroom", "capcut", "slack", "asana", "notion", "airtable", "trello", "calendly", "picsart", "snapseed", "creative", "planning", "scheduling tool", "design", "video", "photo", "editing", "project management"],
    answer:
      "• Creative: Canva, Lightroom, CapCut, PicsArt, Snapseed\n• Collaboration: Slack, Zoom\n• Planning and scheduling: Calendly, HoneyBook, Asana, Notion, Airtable, Trello",
    links: [{ label: "See Tools & Software", href: "#tools" }],
    next: ["ai", "tools", "admin"],
  },
  {
    id: "web",
    label: "Does he know web and database skills?",
    keywords: ["html", "css", "php", "mysql", "sql", "coding", "programming", "developer", "development", "web", "website", "websites", "code", "database", "databases", "frontend", "backend", "javascript"],
    answer:
      "He works with HTML, CSS, PHP, Java, MySQL, and SQL, has supported clients' websites, and built NC Compliance CRM.",
    links: [{ label: "See the CRM project", href: "#projects" }],
    next: ["crm", "certs", "tools"],
  },
  {
    id: "admin",
    label: "Can he do administrative and virtual assistant work?",
    keywords: ["administrative", "admin assistant", "va", "executive", "executive support", "board", "minutes", "documentation", "records", "sop", "sops", "secretary", "clerical", "data privacy", "dfa", "passport", "foreign affairs", "paperwork", "inbox", "inboxes", "email management", "linkedin recruiting", "recruiting support", "recruitment support", "indeed", "confidential", "confidentiality", "privacy", "sensitive"],
    answer:
      "Yes. He works as a Technical Virtual Assistant and Executive Assistant, managing inboxes, calendars, meetings, documentation, and workflows, and he has supported a U.S.-based organization's executives and board while working independently during Eastern Time hours.\n\nAs Board Administrative Assistant at Boundless Freedom Project he maintained technical and administrative records, secure digital communication, and board documentation, and supported leadership with software access and workspace coordination.\n\nHe also supports LinkedIn and Indeed recruitment, handles confidential information with care, and earned Rekruuto virtual assistant and attention-to-detail certificates, and earlier processed authentication applications at the Department of Foreign Affairs under strict data privacy protocols.",
    links: [{ label: "See experience", href: "#experience" }],
    next: ["certs", "experience", "availability"],
  },
  {
    id: "resume",
    label: "Is there a résumé I can download?",
    keywords: ["resume", "cv", "curriculum vitae", "download", "pdf", "résumé"],
    answer:
      "This site does not offer a résumé download. His experience, education, and certifications are summarized in the Experience and Education sections, and he can send a copy if you email him.",
    links: [{ label: "See experience", href: "#experience" }, ...contactLinks.slice(0, 1)],
    next: ["experience", "education", "contact"],
  },
  {
    id: "assistant",
    label: "Are you a real person?",
    keywords: ["are you a bot", "are you real", "are you human", "are you an ai", "who are you", "what are you", "chatbot", "robot", "bot", "human", "real person", "your name"],
    answer:
      "I'm a simple assistant built into this portfolio. I answer from the content on this page: there is no live person or AI model behind me, so for anything beyond the site, email Meljhon directly.",
    links: contactLinks.slice(0, 1),
    next: ["about", "services", "contact"],
  },
  {
    id: "hello",
    label: "Hello",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "yo", "hola", "howdy"],
    answer: "Hello! Ask me about Meljhon's experience, tools, projects, or how to get in touch.",
    next: ["about", "experience", "projects", "contact"],
  },
  {
    id: "thanks",
    label: "Thanks",
    keywords: ["thanks", "thank you", "thank", "thx", "appreciate", "cheers", "bye", "goodbye", "see you"],
    answer: "You're welcome! If you'd like to talk with Meljhon directly, email is the quickest way.",
    links: contactLinks.slice(0, 1),
    next: ["availability", "reviews"],
  },
  {
    id: "help",
    label: "What can I ask?",
    keywords: ["help", "what can i ask", "what can you do", "commands", "options", "menu", "topics", "how does this work", "suggestions"],
    answer:
      "I can answer questions about Meljhon's background, work experience, services, tools, projects, education and certifications, client reviews, availability, and contact details. Tap a suggestion below or type your own question.",
    next: ["about", "experience", "tools", "projects", "reviews", "contact"],
  },
];

export const starterIds = ["about", "experience", "tools", "projects", "reviews", "contact"];

export const welcomeMessage =
  "Hi! I'm the portfolio assistant for Meljhon Deaño. Ask me about his experience, tools, projects, or how to reach him.";

export const fallbackAnswer =
  "I can only answer questions about Meljhon's work as shown on this site, and I'm not sure about that one. Try one of these topics, or email him directly.";

export const fallbackIds = ["services", "tools", "availability", "contact"];

export const byId = (id: string) => knowledge.find((entry) => entry.id === id);

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "do", "does", "did", "can", "could", "he", "his", "him", "you", "your", "i", "me", "my", "we",
  "what", "which", "how", "to", "of", "for", "in", "on", "and", "or", "with", "at", "by", "it", "its", "this", "that", "there", "please",
  "tell", "know", "any", "has", "have", "had", "be", "been", "about", "s", "like", "would", "should", "will", "get", "give", "show",
]);

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const stem = (word: string) => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word);

/** True when two words are within one edit of each other (insert, delete, or substitute). */
const withinOneEdit = (a: string, b: string) => {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
};

const prepared = knowledge.map((entry) => {
  const phrases: string[] = [];
  const words = new Set<string>();
  entry.keywords.forEach((keyword) => {
    const norm = normalize(keyword);
    if (!norm) return;
    if (norm.includes(" ")) phrases.push(norm);
    else words.add(stem(norm));
  });
  return { entry, phrases, words };
});

export type Match = { entry: KnowledgeEntry; score: number };

/** Ranks entries for a question. An empty result means nothing on the site matches. */
export const rank = (question: string): Match[] => {
  const normalized = normalize(question);
  if (!normalized) return [];
  const padded = ` ${normalized} `;
  const tokens = normalized
    .split(" ")
    .filter((token) => token && !STOPWORDS.has(token))
    .map(stem);

  return prepared
    .map(({ entry, phrases, words }) => {
      let score = 0;
      phrases.forEach((phrase) => {
        if (padded.includes(` ${phrase} `)) score += 3;
      });
      tokens.forEach((token) => {
        if (words.has(token)) score += 2;
        else if (token.length >= 4 && [...words].some((word) => word.length >= 4 && word[0] === token[0] && withinOneEdit(token, word))) score += 2;
      });
      return { entry, score };
    })
    .filter((match) => match.score >= 2)
    .sort((a, b) => b.score - a.score);
};
