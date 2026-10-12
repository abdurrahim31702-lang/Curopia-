import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";

const Scene = lazy(() => import("./pavilion-scene"));

class QuietBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useAllow3d(near: boolean) {
  const [allow, setAllow] = useState(false);
  useEffect(() => {
    if (!near) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow =
      connection?.saveData === true ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";
    const update = () => setAllow(!motion.matches && wide.matches && !slow);
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, [near]);
  return allow;
}

function CssModel() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-x-10 bottom-12 h-2 bg-stone" />
      <div className="absolute bottom-14 left-12 h-24 w-2 bg-chalk" />
      <div className="absolute bottom-14 left-16 h-36 w-14 border border-line bg-ivory" />
      <div className="pavilion-glass absolute right-12 bottom-16 h-24 w-16 border border-sage/50 bg-sage/20" />
    </div>
  );
}

export function ArchitecturalStudy() {
  const frame = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [live, setLive] = useState(false);
  const allow = useAllow3d(near);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: "160px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <figure>
      <div ref={frame} className="relative aspect-square w-full overflow-hidden bg-chalk">
        <div className={live ? "opacity-0" : "opacity-100"}>
          <CssModel />
        </div>
        {allow ? (
          <ClientOnly>
            <Suspense fallback={null}>
              <QuietBoundary>
                <div className="absolute inset-0">
                  <Scene onReady={() => setLive(true)} />
                </div>
              </QuietBoundary>
            </Suspense>
          </ClientOnly>
        ) : null}
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">
        Abstract architectural study. Not a model of the building.
      </figcaption>
    </figure>
  );
}
