import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  byId,
  fallbackAnswer,
  fallbackIds,
  rank,
  starterIds,
  welcomeMessage,
  type AssistantLink,
} from "@/lib/assistant";
import { CONTACT } from "@/lib/contact";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  links?: AssistantLink[];
  chips?: string[];
};

const labelFor = (id: string) => byId(id)?.label ?? id;

/**
 * Floating Q&A assistant. It answers from the portfolio's own content (see lib/assistant.ts):
 * no server, API key, or AI model is involved.
 */
const ChatAssistant = ({ onNavigate, profileImage }: { onNavigate: (href: string) => void; profileImage: string }) => {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: welcomeMessage, chips: starterIds }]);
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    // The panel only becomes focusable once its visibility transition has started.
    const focusTimer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || document.querySelector('[role="dialog"][data-state="open"]')) return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const push = (message: Omit<Message, "id">) => setMessages((all) => [...all.map((m) => ({ ...m, chips: undefined })), { ...message, id: nextId.current++ }]);

  const reply = (question: string, entryId?: string) => {
    push({ from: "user", text: question });
    setTyping(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => {
      const ranked = entryId ? [] : rank(question);
      const entry = entryId ? byId(entryId) : ranked[0]?.entry;
      setTyping(false);
      if (!entry) {
        push({ from: "bot", text: fallbackAnswer, links: [{ label: "Email Meljhon", href: `mailto:${CONTACT.email}` }], chips: fallbackIds });
        return;
      }
      const runnerUp = ranked[1] && ranked[1].score >= ranked[0].score * 0.75 ? ranked[1].entry.id : null;
      const chips = [...new Set([...(runnerUp ? [runnerUp] : []), ...(entry.next ?? [])])].filter((id) => id !== entry.id).slice(0, 4);
      push({ from: "bot", text: entry.answer, links: entry.links, chips });
    }, reduceMotion ? 0 : 550);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question || typing) return;
    setDraft("");
    reply(question);
  };

  const follow = (href: string) => {
    if (href.startsWith("#")) {
      onNavigate(href);
      if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
    }
  };

  const lastBot = messages[messages.length - 1];

  return (
    <>
      <section
        id="portfolio-assistant"
        role="dialog"
        aria-label="Portfolio assistant"
        aria-modal="false"
        className={`fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-profile transition-[transform,opacity,visibility] duration-300 ease-out sm:right-6 ${open ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-3 scale-95 opacity-0"}`}
      >
        <header className="flex items-center gap-3 border-b border-border bg-secondary-foreground px-4 py-3 text-background">
          <img src={profileImage} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full border-2 border-background/30 object-cover object-center" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold leading-tight">Ask about Meljhon</p>
            <p className="mt-0.5 truncate text-xs opacity-80">Answers come from this portfolio</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
            aria-label="Close assistant"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-background transition-colors hover:bg-background/15"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={logRef} role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === "user" ? "justify-end" : "justify-start gap-2"}`}>
              {message.from === "bot" && (
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                  <Bot className="h-4 w-4" />
                </span>
              )}
              <div className={`max-w-[85%] ${message.from === "user" ? "" : "min-w-0"}`}>
                <p
                  className={`whitespace-pre-line break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.from === "user" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border bg-card text-foreground"
                  }`}
                >
                  {message.text}
                </p>
                {message.links && message.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {message.links.map((link) =>
                      link.href.startsWith("#") ? (
                        <button key={link.href + link.label} type="button" onClick={() => follow(link.href)} className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
                          {link.label}
                        </button>
                      ) : (
                        <a key={link.href + link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
                          {link.label} <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2" role="status" aria-label="Assistant is typing">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-3" aria-hidden="true">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="chat-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${dot * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {!typing && lastBot?.from === "bot" && lastBot.chips && lastBot.chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pl-9" aria-label="Suggested questions">
              {lastBot.chips.map((id) => (
                <button key={id} type="button" onClick={() => reply(labelFor(id), id)} className="rounded-full border border-border bg-card px-3 py-1.5 text-left text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                  {labelFor(id)}
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={submit} className="flex items-center gap-2 border-t border-border bg-card p-3">
          <label htmlFor="assistant-input" className="sr-only">Ask a question about Meljhon</label>
          <input
            id="assistant-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={200}
            autoComplete="off"
            placeholder="Ask about experience, tools, projects…"
            className="h-10 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="icon" disabled={!draft.trim() || typing} aria-label="Send question" className="h-10 w-10 shrink-0 rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </section>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        aria-label={open ? "Close assistant" : "Ask about Meljhon"}
        className="fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2.5 rounded-full bg-primary pl-4 pr-4 text-sm font-bold text-primary-foreground shadow-profile transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-6 sm:pr-5"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask about Meljhon"}</span>
      </button>
    </>
  );
};

export default ChatAssistant;
