export function Wordmark() {
  return (
    <span className="flex items-center gap-3 text-ink">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-sage-deep">
        <path d="M4 9 V4 H9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M15 4 H20 V9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 15 V20 H9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M15 20 H20 V15" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span>
        <span className="block font-display text-xl leading-none">DEMO</span>
        <span className="mt-1 block text-xs font-medium uppercase tracking-brand">Hospital</span>
      </span>
    </span>
  );
}
