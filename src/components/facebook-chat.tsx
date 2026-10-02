import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { useChatStore } from "@/lib/chat-store";
import { VISIT } from "@/lib/catalog";
import { useCopy, type Messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.24 10.44 22v-7.01H7.9v-2.92h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.92h-2.34V22C18.34 21.24 22 17.1 22 12.07z"
      />
    </svg>
  );
}

function pickReply(text: string, copy: Messages): string {
  const t = text.trim().toLowerCase();
  const chip = copy.chat.chips.find((c) => c.label.toLowerCase() === t);
  if (chip && copy.chat.replies[chip.id]) return copy.chat.replies[chip.id];
  if (/hour|open|time|营业|时间|几点|开门|closed|monday/.test(t)) {
    return copy.chat.replies.hours;
  }
  if (/order|commission|book a cake|订|蛋糕|价格|price/.test(t)) {
    return copy.chat.replies.order;
  }
  if (/visit|address|pickup|heaphy|fairfield|hamilton|到店|地址|来访|取/.test(t)) {
    return copy.chat.replies.visit;
  }
  if (/flavour|flavor|taste|口味|风味|山茶|yuzu|柚/.test(t)) {
    return copy.chat.replies.flavors;
  }
  return copy.chat.fallback;
}

export function FacebookChat() {
  const copy = useCopy();
  const open = useChatStore((s) => s.open);
  const setOpen = useChatStore((s) => s.setOpen);
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const greeted = useChatStore((s) => s.greeted);
  const markGreeted = useChatStore((s) => s.markGreeted);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    if (!greeted) {
      addMessage("agent", copy.chat.greeting);
      markGreeted();
    }
    inputRef.current?.focus();
  }, [open, greeted, addMessage, markGreeted, copy.chat.greeting]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function replySoon(text: string) {
    setTyping(true);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timerRef.current = window.setTimeout(
      () => {
        addMessage("agent", pickReply(text, copy));
        setTyping(false);
      },
      reduce ? 0 : 450,
    );
  }

  function send(text: string) {
    const next = text.trim();
    if (!next || typing) return;
    addMessage("user", next);
    setDraft("");
    replySoon(next);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-24 z-50 flex flex-col items-end gap-3 md:right-6">
      {open && (
        <section
          role="dialog"
          aria-label={copy.chat.title}
          className="pointer-events-auto flex w-[min(calc(100vw-2rem),22rem)] flex-col overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]"
        >
          <header className="flex items-center gap-3 bg-facebook px-4 py-3 text-facebook-foreground">
            <span className="flex size-10 items-center justify-center rounded-full bg-facebook-foreground/15">
              <FacebookMark className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{copy.chat.agent}</span>
              <span className="block text-xs text-facebook-foreground/80">
                {copy.chat.status}
              </span>
            </span>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-facebook-foreground"
              aria-label={copy.chat.close}
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </header>

          <a
            href={VISIT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center bg-facebook/90 px-4 text-sm font-medium text-facebook-foreground transition-colors duration-150 hover:bg-facebook"
          >
            {copy.chat.facebookCta}
          </a>

          <div
            ref={listRef}
            className="flex max-h-[min(24rem,46svh)] min-h-52 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m) => (
              <p
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-facebook text-facebook-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {m.text}
              </p>
            ))}
            {typing && (
              <p
                className="w-fit rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground"
                aria-live="polite"
              >
                {copy.chat.typing}
              </p>
            )}
            {messages.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2">
                {copy.chat.chips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => send(chip.label)}
                    className="inline-flex h-11 items-center rounded-full border border-border px-3 text-xs text-foreground transition-colors duration-150 hover:border-foreground/40"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={copy.chat.placeholder}
              aria-label={copy.chat.placeholder}
              className="h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-facebook text-facebook-foreground transition-opacity duration-150 disabled:opacity-40"
              aria-label={copy.chat.send}
              disabled={!draft.trim() || typing}
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="pointer-events-auto inline-flex h-14 items-center gap-2 rounded-full bg-facebook px-4 text-sm font-medium text-facebook-foreground shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:scale-[0.96]"
        aria-expanded={open}
        aria-label={open ? copy.chat.close : copy.chat.open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="size-5" /> : <FacebookMark className="size-6" />}
        <span className="pr-1">{open ? copy.chat.close : copy.chat.open}</span>
      </button>
    </div>
  );
}
