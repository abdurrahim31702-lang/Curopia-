import { createFileRoute } from "@tanstack/react-router";
import { ArchitecturalStudy } from "@/components/site/pavilion";
import { DraftNote, PageIntro, Shell } from "@/components/site/ui";
import { images } from "@/content/hospital";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · DEMO Hospital" },
      {
        name: "description",
        content: "A draft introduction to DEMO Hospital in West Bengal. History, registration, and leadership are not published until the hospital confirms them.",
      },
    ],
  }),
  component: AboutPage,
});

const withheld = ["Year founded", "Bed count", "Registration number", "Accreditations", "Leadership names", "Opening hours"];

function AboutPage() {
  return (
    <main id="main">
      <PageIntro
        kicker="About"
        title="The hospital’s story is not filled in yet."
        lede="This page introduces a private hospital in West Bengal without inventing its past. When DEMO Hospital shares its history, it can replace the draft below."
      />
      <Shell className="grid gap-12 pb-20 lg:grid-cols-12">
        <figure className="lg:col-span-7">
          <img src={images.corridor.src} alt={images.corridor.alt} width={images.corridor.width} height={images.corridor.height} className="aspect-[3/2] w-full object-cover" />
          <figcaption className="mt-3 text-sm text-ink-soft">{images.corridor.caption}</figcaption>
        </figure>
        <div className="lg:col-span-4 lg:col-start-9">
          <DraftNote>The photograph is a concept image for the layout. It is not the hospital.</DraftNote>
          <p className="mt-6 leading-relaxed text-ink-soft">
            Patients should be able to understand who runs the hospital, how to reach it, and what kind of place it is. None of those facts have been supplied, so they are not guessed.
          </p>
          <div className="mt-10">
            <ArchitecturalStudy />
          </div>
        </div>
      </Shell>
      <section className="border-t border-line py-16" aria-labelledby="withheld-heading">
        <Shell className="grid gap-8 md:grid-cols-12">
          <h2 id="withheld-heading" className="font-display text-3xl text-ink md:col-span-4">
            Held back on purpose
          </h2>
          <ul className="md:col-span-7 md:col-start-6">
            {withheld.map((item) => (
              <li key={item} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <span className="text-ink">{item}</span>
                <span className="text-sm text-ink-soft">Not provided</span>
              </li>
            ))}
          </ul>
        </Shell>
      </section>
    </main>
  );
}
