import { VISIT } from "@/lib/catalog";
import { useCopy } from "@/lib/i18n";

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

/**
 * Floating button that opens a real Messenger chat with the Candy Cakes
 * Facebook Page (m.me deep link). Tapping it jumps straight into Messenger;
 * there is no in-site bot — every message reaches the Page inbox.
 */
export function FacebookChat() {
  const copy = useCopy();

  return (
    <div className="pointer-events-none fixed right-4 bottom-24 z-50 flex flex-col items-end gap-3 md:right-6">
      <a
        href={VISIT.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title={copy.chat.facebookHint}
        aria-label={copy.chat.open}
        className="pointer-events-auto inline-flex h-14 items-center gap-2 rounded-full bg-facebook px-4 text-sm font-medium text-facebook-foreground shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:scale-[0.96]"
      >
        <FacebookMark className="size-6" />
        <span className="pr-1">{copy.chat.open}</span>
      </a>
    </div>
  );
}
