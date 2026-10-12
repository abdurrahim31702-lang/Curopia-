import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { DraftNote, Kicker, Shell, primaryClass } from "@/components/site/ui";
import { doctorsIn, getDepartment } from "@/content/hospital";

export const Route = createFileRoute("/departments/$slug")({
  loader: ({ params }) => {
    const department = getDepartment(params.slug);
    if (!department) throw notFound();
    return { department, doctors: doctorsIn(department.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.department.name ?? "Department"} · DEMO Hospital` },
      {
        name: "description",
        content: "Draft department page. The description and services are templates, not confirmed care.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: DepartmentPage,
});

function DepartmentPage() {
  const { department, doctors } = Route.useLoaderData();
  return (
    <main id="main">
      <Shell className="pt-10">
        <Link to="/departments" className="text-sm text-ink-soft underline">
          All departments
        </Link>
      </Shell>
      <header className="mx-auto grid max-w-7xl gap-6 px-5 pt-8 pb-10 sm:px-8 md:grid-cols-12">
        <Kicker>Draft department</Kicker>
        <div className="md:col-span-9 md:col-start-4">
          <h1 className="font-display text-5xl leading-display text-ink sm:text-6xl">{department.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{department.summary}</p>
        </div>
      </header>
      <Shell className="grid gap-12 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl text-ink">Template services</h2>
          <DraftNote>Each line is a placeholder. It is not a treatment the hospital has confirmed, and it is not a promise of outcome.</DraftNote>
          <ul className="mt-6">
            {department.services.map((service) => (
              <li key={service} className="border-b border-line py-4 text-ink">
                {service}
              </li>
            ))}
          </ul>
          <h2 className="mt-12 font-display text-3xl text-ink">Before a visit</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Preparation and visitor notes have not been approved. Please do not follow instructions from this page.
          </p>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="font-display text-3xl text-ink">People</h2>
          {doctors.length === 0 ? (
            <p className="mt-4 leading-relaxed text-ink-soft">
              No demonstration record is attached, and no verified doctor is published for this template.
            </p>
          ) : (
            <ul className="mt-4">
              {doctors.map((doctor) => (
                <li key={doctor.slug} className="border-b border-line py-4">
                  <Link to="/doctors/$slug" params={{ slug: doctor.slug }} className="text-ink underline">
                    {doctor.name}
                  </Link>
                  <p className="mt-1 text-sm text-ink-soft">Demonstration record, not staff.</p>
                </li>
              ))}
            </ul>
          )}
          <Link to="/appointments" search={{ department: department.slug, doctor: "" }} className={`${primaryClass} mt-8`}>
            Enquire about this draft
          </Link>
        </aside>
      </Shell>
    </main>
  );
}
