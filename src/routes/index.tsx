import { Link, createFileRoute } from "@tanstack/react-router";
import { AppointmentForm } from "@/components/site/appointment-form";
import { GalleryView } from "@/components/site/gallery-view";
import { ArchitecturalStudy } from "@/components/site/pavilion";
import { DraftNote, Kicker, Shell, primaryClass, secondaryClass } from "@/components/site/ui";
import { departments, doctors, galleryImages, images, site } from "@/content/hospital";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEMO Hospital · West Bengal" },
      {
        name: "description",
        content:
          "A draft website for DEMO Hospital, a private hospital in West Bengal. Request an appointment enquiry, and see what still needs the hospital’s own details.",
      },
    ],
  }),
  component: Home,
});

const quick = [
  { index: "01", label: "Request an appointment", to: "/appointments" },
  { index: "02", label: "Departments", to: "/departments" },
  { index: "03", label: "Contact", to: "/contact" },
  { index: "04", label: "Directions", to: "/contact" },
] as const;

function Home() {
  return (
    <main id="main">
      <Shell className="grid items-end gap-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <Kicker>West Bengal · Private hospital · Draft</Kicker>
          <h1 className="mt-5 font-display text-5xl font-medium leading-display text-ink sm:text-6xl lg:text-7xl">
            {site.conceptLine}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            A calm place to ask for care, find a department, and know what to expect. This line is concept copy, not an official slogan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/appointments" className={primaryClass}>
              Request an appointment
            </Link>
            <Link to="/departments" className={secondaryClass}>
              Explore departments
            </Link>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
            Nothing here promises a result, a bed, or a doctor. Those facts wait for the hospital.
          </p>
        </div>
        <figure className="lg:col-span-7">
          <div className="overflow-hidden bg-stone">
            <picture>
              <source media="(min-width: 768px)" srcSet={images.hero.src} />
              <img
                src={images.portrait.src}
                alt={images.hero.alt}
                width={images.portrait.width}
                height={images.portrait.height}
                fetchPriority="high"
                decoding="async"
                className="aspect-[3/4] w-full object-cover md:aspect-[16/10]"
              />
            </picture>
          </div>
          <figcaption className="mt-3 text-sm text-ink-soft">{images.hero.caption}</figcaption>
        </figure>
      </Shell>

      <nav aria-label="Quick access" className="border-y border-line">
        <ol className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {quick.map((item) => (
            <li key={item.index} className="border-b border-line sm:border-r">
              <Link to={item.to} hash={item.index === "04" ? "directions" : undefined} className="flex min-h-28 flex-col justify-between px-5 py-5 hover:bg-chalk sm:px-8">
                <span className="text-xs tracking-brand text-sage-deep">{item.index}</span>
                <span className="font-display text-2xl text-ink">{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className="py-20 md:py-28" aria-labelledby="about-heading">
        <Shell className="grid items-center gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-6">
            <img
              src={images.portrait.src}
              alt={images.portrait.alt}
              width={images.portrait.width}
              height={images.portrait.height}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover"
            />
            <figcaption className="mt-3 text-sm text-ink-soft">{images.portrait.caption}</figcaption>
          </figure>
          <div className="lg:col-span-5 lg:col-start-8">
            <Kicker>About</Kicker>
            <h2 id="about-heading" className="mt-4 font-display text-4xl leading-display text-ink sm:text-5xl">
              A quiet introduction, still waiting for the hospital’s own story.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              DEMO Hospital is presented here as a private hospital in West Bengal. Leadership, registration, and history are not invented to fill the page.
            </p>
            <Link to="/about" className="mt-6 inline-flex min-h-11 items-center text-sm text-ink underline">
              Read the about page
            </Link>
            <div className="mt-10 max-w-sm">
              <ArchitecturalStudy />
            </div>
          </div>
        </Shell>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="departments-heading">
        <Shell className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>Departments</Kicker>
            <h2 id="departments-heading" className="mt-4 font-display text-4xl leading-display text-ink">
              Templates, not a service list.
            </h2>
            <div className="mt-6">
              <DraftNote>These names are drafts. They are not confirmation that DEMO Hospital offers the service.</DraftNote>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {departments.map((department, index) => (
              <li key={department.slug} className="border-t border-line">
                <Link to="/departments/$slug" params={{ slug: department.slug }} className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline">
                  <span className="text-xs tracking-brand text-sage-deep sm:col-span-2">0{index + 1}</span>
                  <span className="font-display text-3xl text-ink sm:col-span-5">{department.name}</span>
                  <span className="text-sm leading-relaxed text-ink-soft sm:col-span-5">Draft description. Open the page to see the template, clearly marked.</span>
                </Link>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      <section className="bg-chalk py-20 md:py-28" aria-labelledby="doctors-heading">
        <Shell>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Kicker>Doctors</Kicker>
              <h2 id="doctors-heading" className="mt-4 font-display text-4xl leading-display text-ink">
                No verified doctors are published.
              </h2>
            </div>
            <Link to="/doctors" className="text-sm text-ink underline">
              Open the directory
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-ink-soft">
            The three records below are samples so the directory can be tried. They are not members of staff, and they have no real qualifications.
          </p>
          <ul className="mt-10 border-t border-line">
            {doctors.map((doctor) => (
              <li key={doctor.slug} className="border-b border-line">
                <Link to="/doctors/$slug" params={{ slug: doctor.slug }} className="grid gap-3 py-6 sm:grid-cols-12 sm:items-center">
                  <span className="font-display text-3xl text-sage-deep sm:col-span-2">{doctor.index}</span>
                  <span className="sm:col-span-6">
                    <span className="block font-display text-2xl text-ink">{doctor.name}</span>
                    <span className="mt-1 block text-sm text-ink-soft">Demonstration record</span>
                  </span>
                  <span className="text-sm text-ink-soft sm:col-span-4">{doctor.specialty}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Shell>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="gallery-heading">
        <Shell>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Kicker>Gallery</Kicker>
              <h2 id="gallery-heading" className="mt-4 font-display text-4xl leading-display text-ink">
                Studies in light and stone.
              </h2>
              <p className="mt-4 text-ink-soft">Concept photographs for the layout. They are not rooms, equipment, or grounds of DEMO Hospital.</p>
            </div>
            <Link to="/gallery" className="text-sm text-ink underline">
              View the gallery
            </Link>
          </div>
          <GalleryView images={galleryImages.slice(0, 3)} layout="strip" />
        </Shell>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="journey-heading">
        <Shell className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>A visit</Kicker>
            <h2 id="journey-heading" className="mt-4 font-display text-4xl leading-display text-ink">
              What a patient can do here today.
            </h2>
          </div>
          <ol className="space-y-8 lg:col-span-7 lg:col-start-6">
            {[
              ["Enquire", "Send a name, a phone number, and the kind of care you are looking for. The form checks the details. It does not book a time."],
              ["Wait for the hospital", "A real appointment exists only after the hospital contacts you. This draft cannot do that yet."],
              ["Arrive", "Visiting rules, parking, and what to bring will be listed when the hospital writes them."],
              ["Afterwards", "Reports and bills stay in the hospital’s own system until a patient portal is connected."],
            ].map(([title, body], index) => (
              <li key={title} className="grid grid-cols-12 gap-4">
                <span className="col-span-2 font-display text-2xl text-sage-deep">0{index + 1}</span>
                <div className="col-span-10">
                  <h3 className="font-display text-2xl text-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      <section className="bg-stone/60 py-20 md:py-24" aria-labelledby="stories-heading">
        <Shell className="max-w-3xl">
          <Kicker>Stories</Kicker>
          <h2 id="stories-heading" className="mt-4 font-display text-4xl leading-display text-ink">
            No patient stories are published.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Testimonials will appear only when DEMO Hospital supplies them and the person has agreed to be shown. This space stays empty until then.
          </p>
        </Shell>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="enquiry-heading">
        <Shell className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>Appointment enquiry</Kicker>
            <h2 id="enquiry-heading" className="mt-4 font-display text-4xl leading-display text-ink">
              Ask. Don’t assume the time is held.
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Use a phone number the hospital can call back. Leave out reports and detailed symptoms. This demo checks the form and then throws the details away.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <AppointmentForm idPrefix="home" />
          </div>
        </Shell>
      </section>

      <section className="border-t border-line py-20" aria-labelledby="place-heading">
        <Shell className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Kicker>Place</Kicker>
            <h2 id="place-heading" className="mt-4 font-display text-5xl leading-display text-ink sm:text-6xl">
              West Bengal
            </h2>
            <p className="mt-4 text-lg text-ink-soft">India. The street address has not been provided, so there is no map pin.</p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Link to="/contact" hash="directions" className={secondaryClass}>
              Contact and directions
            </Link>
          </div>
        </Shell>
      </section>
    </main>
  );
}
