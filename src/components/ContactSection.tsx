import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Linkedin, Mail, Phone, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/lib/contact";

/** Quick answers, sourced from the résumé and the profile copy. Rates are not published, so the answer says so. */
const faqs = [
  {
    q: "Can one person cover IT and admin work?",
    a: "Yes, that is the point. The same person who sets up accounts and fixes devices can also run your inbox, calendar, meetings, and documentation, so you work with one reliable professional instead of two.",
  },
  {
    q: "What hours do you work?",
    a: "I'm based in Davao City (GMT+8) and work remotely with international clients across time zones. I have also covered Eastern Time hours independently for a U.S.-based organization.",
  },
  {
    q: "How do you handle confidential information?",
    a: "With care. I have maintained board records and secure digital communication, and processed applications under strict data privacy protocols.",
  },
  {
    q: "How much do you charge?",
    a: "Rates are not listed here because they depend on the scope. Send a message with your priorities and we can talk through it.",
  },
  {
    q: "What happens after I write?",
    a: `Your message opens in your email app, ready to send to ${CONTACT.email}. I read it and reply to discuss how I can support your technical, executive, and administrative operations.`,
  },
];

type Status = "idle" | "opened" | "copied" | "invalid";

const fieldClass = "mt-1.5 h-11 rounded-xl border-border bg-background text-sm focus-visible:ring-primary";
const labelClass = "text-[11px] font-bold uppercase tracking-wider text-muted-foreground";

/**
 * FAQ panel plus a message form. There is no server behind the form: sending opens the visitor's email
 * app with the message prefilled, and the page never claims the message was delivered.
 */
const ContactSection = () => {
  const [form, setForm] = useState({ first: "", last: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [emailCopied, setEmailCopied] = useState(false);

  const update = (key: keyof typeof form) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    if (status === "invalid") setStatus("idle");
  };

  const name = `${form.first} ${form.last}`.trim();
  const subject = `Portfolio inquiry${name ? ` from ${name}` : ""}`;
  const body = `${form.message.trim()}\n\n${name}\n${form.email.trim()}`;
  const valid = form.first.trim() && form.email.includes("@") && form.message.trim();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("opened");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyMessage = async () => {
    if (!valid) {
      setStatus("invalid");
      return;
    }
    if (await copy(`To: ${CONTACT.email}\nSubject: ${subject}\n\n${body}`)) setStatus("copied");
  };

  const copyEmail = async () => {
    if (await copy(CONTACT.email)) {
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div className="contact-faq relative isolate flex flex-col overflow-hidden rounded-3xl bg-secondary-foreground p-5 text-background shadow-card sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-300 dark:text-primary">FAQs</p>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight">
          Quick answers. <span className="opacity-60">Still have one? Write below.</span>
        </h3>

        <Accordion type="single" collapsible defaultValue="faq-0" className="mt-5 border-t border-background/15">
          {faqs.map(({ q, a }, index) => (
            <AccordionItem key={q} value={`faq-${index}`} className="border-background/15">
              <AccordionTrigger className="group/faq gap-3 py-3.5 text-left text-sm font-bold hover:no-underline [&>svg]:text-background/70">
                <span className="flex items-baseline gap-3">
                  <span className="text-xs font-extrabold tabular-nums text-sky-300 dark:text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="transition-transform duration-200 group-hover/faq:translate-x-0.5">{q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-[2.1rem] pr-2 text-sm leading-relaxed opacity-80">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy email address ${CONTACT.email}`}
            className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-background/20 bg-background/10 px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-background/20"
          >
            {emailCopied ? <Check className="h-4 w-4 shrink-0 text-sky-300 dark:text-primary" /> : <Mail className="h-4 w-4 shrink-0 text-sky-300 dark:text-primary" />}
            <span className="min-w-0 break-all text-left">{emailCopied ? "Copied" : CONTACT.email}</span>
            {!emailCopied && <Copy className="h-3.5 w-3.5 shrink-0 opacity-60" />}
          </button>
          <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`} title={CONTACT.phone} className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/10 transition hover:-translate-y-0.5 hover:bg-background/20">
            <Phone className="h-4 w-4" />
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="Meljhon on LinkedIn (opens in new tab)" className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/10 transition hover:-translate-y-0.5 hover:bg-background/20">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-3 text-xs opacity-70">{CONTACT.phone}</p>
      </div>

      <form onSubmit={submit} noValidate className="bento-card flex flex-col">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact-first" className={labelClass}>First name</Label>
            <Input id="contact-first" name="first" autoComplete="given-name" required value={form.first} onChange={update("first")} placeholder="Your first name" className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="contact-last" className={labelClass}>Last name</Label>
            <Input id="contact-last" name="last" autoComplete="family-name" value={form.last} onChange={update("last")} placeholder="Your last name" className={fieldClass} />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="contact-email" className={labelClass}>Email</Label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} placeholder="you@yourbusiness.com" className={fieldClass} />
        </div>
        <div className="mt-4 flex flex-1 flex-col">
          <Label htmlFor="contact-message" className={labelClass}>Tell me what you need support with</Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            value={form.message}
            onChange={update("message")}
            placeholder="Which technical, executive, or administrative tasks are taking up your time? What tools are you running on?"
            className="mt-1.5 min-h-[10rem] flex-1 resize-y rounded-xl border-border bg-background text-sm leading-relaxed focus-visible:ring-primary"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="submit" className="inline-flex h-12 items-center gap-2 rounded-full bg-secondary-foreground px-6 text-sm font-bold text-background shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-secondary-foreground/90">
            <Send className="h-4 w-4" /> Send message <ArrowUpRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={copyMessage} className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">
            {status === "copied" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />} {status === "copied" ? "Copied" : "Copy message"}
          </button>
        </div>

        <p role="status" aria-live="polite" className={`mt-3 text-xs leading-relaxed ${status === "invalid" ? "font-semibold text-destructive" : "text-muted-foreground"}`}>
          {status === "invalid" && "Add your first name, a valid email, and a short message first."}
          {status === "opened" && `Your email app should open with the message ready to send. If nothing opens, use Copy message and email ${CONTACT.email} directly.`}
          {status === "copied" && `Message copied. Paste it into an email to ${CONTACT.email}.`}
          {status === "idle" && "Sending opens your email app with this message ready to go. Nothing is stored on this site."}
        </p>
      </form>
    </div>
  );
};

export default ContactSection;
