import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/content/hospital";

export function GalleryView({ images, layout = "editorial" }: { images: GalleryImage[]; layout?: "editorial" | "strip" }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : images[index];

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => (value === null ? value : (value + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => (value === null ? value : (value - 1 + images.length) % images.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index]);

  const grid =
    layout === "strip"
      ? "grid gap-4 md:grid-cols-12"
      : "grid gap-4 md:grid-cols-12";

  return (
    <>
      <ul className={grid}>
        {images.map((image, imageIndex) => (
          <li key={image.src} className={tileClass(layout, imageIndex)}>
            <button type="button" onClick={() => setIndex(imageIndex)} className="group block h-full w-full text-left">
              <span className="block overflow-hidden bg-stone">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </span>
              <span className="mt-3 block text-sm text-ink-soft">{image.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog.Root open={current !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/90" />
          <Dialog.Content className="lightbox fixed inset-0 z-50 flex flex-col outline-none">
            <div className="flex items-center justify-between px-4 py-3 text-chalk sm:px-6">
              <Dialog.Title className="text-sm">{current ? `${(index ?? 0) + 1} of ${images.length}` : "Gallery"}</Dialog.Title>
              <Dialog.Close className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label="Close gallery">
                <X className="size-5" aria-hidden="true" />
              </Dialog.Close>
            </div>
            {current ? (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 sm:px-16">
                <img
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
                <Dialog.Description className="mt-4 max-w-xl text-center text-sm text-chalk">
                  {current.caption}. Left and right arrows move between images.
                </Dialog.Description>
                <div className="mt-4 flex gap-3">
                  <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-chalk/40 text-chalk" aria-label="Previous image" onClick={() => setIndex((value) => (value === null ? value : (value - 1 + images.length) % images.length))}>
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-chalk/40 text-chalk" aria-label="Next image" onClick={() => setIndex((value) => (value === null ? value : (value + 1) % images.length))}>
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function tileClass(layout: "editorial" | "strip", index: number) {
  if (layout === "strip") {
    if (index === 0) return "md:col-span-7";
    return "md:col-span-5";
  }
  if (index === 0) return "md:col-span-7";
  if (index === 1) return "md:col-span-5";
  if (index === 2) return "md:col-span-4";
  if (index === 3) return "md:col-span-8";
  if (index === 4) return "md:col-span-6";
  return "md:col-span-6";
}
