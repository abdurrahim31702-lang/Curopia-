import type { ReactNode } from "react";

export const tap =
  "transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]";

export const primaryClass = `inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm font-medium text-chalk hover:bg-sage-deep ${tap}`;

export const secondaryClass = `inline-flex min-h-11 items-center justify-center border border-ink px-5 text-sm font-medium text-ink hover:bg-ink hover:text-chalk ${tap}`;

export const fieldClass =
  "mt-2 w-full min-h-11 border border-line bg-chalk px-3 text-base text-ink placeholder:text-ink-soft";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium uppercase tracking-brand text-sage-deep">{children}</p>;
}

export function DraftNote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-sage bg-chalk px-4 py-3 text-sm leading-relaxed text-ink-soft">
      {children}
    </p>
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto grid max-w-7xl gap-6 px-5 pt-14 pb-10 sm:px-8 md:grid-cols-12 md:pt-20 md:pb-14">
      <div className="md:col-span-3">
        <Kicker>{kicker}</Kicker>
      </div>
      <div className="md:col-span-8">
        <h1 className="font-display text-4xl font-medium leading-display text-ink sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>
      </div>
    </header>
  );
}
