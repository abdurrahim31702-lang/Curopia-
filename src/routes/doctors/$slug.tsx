import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { DraftNote, Shell, primaryClass } from "@/components/site/ui";
import { getDepartment, getDoctor } from "@/content/hospital";

export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => {
    const doctor = getDoctor(params.slug);
    if (!doctor) throw notFound();
    return { doctor, department: getDepartment(doctor.departmentSlug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.doctor.name ?? "Doctor"} · DEMO Hospital` },
      {
        name: "description",
        content: "Demonstration profile. This is not a doctor at DEMO Hospital and the qualifications are not real.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: DoctorPage,
});

function DoctorPage() {
  const { doctor, department } = Route.useLoaderData();
  const facts = [
    ["Specialty", doctor.specialty],
    ["Department template", department?.name ?? "Not linked"],
    ["Qualifications", doctor.qualification],
    ["Experience", doctor.experience],
    ["Consultation", doctor.consultation],
    ["Photograph", "No authorised photograph. The number is a sample index, not a portrait."],
  ];
  return (
    <main id="main">
      <Shell className="pt-10">
        <Link to="/doctors" className="text-sm text-ink-soft underline">
          Doctor directory
        </Link>
      </Shell>
      <Shell className="grid gap-10 py-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex aspect-square items-center justify-center bg-stone" aria-hidden="true">
            <span className="font-display text-7xl text-ink">{doctor.index}</span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">No authorised photograph</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-xs font-medium uppercase tracking-brand text-sage-deep">Demonstration record</p>
          <h1 className="mt-3 font-display text-5xl leading-display text-ink">{doctor.name}</h1>
          <div className="mt-6">
            <DraftNote>This person is not a member of staff. Do not request care from this name as if it were real.</DraftNote>
          </div>
          <dl className="mt-8">
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-t border-line py-4 sm:grid-cols-3">
                <dt className="text-sm text-ink-soft">{label}</dt>
                <dd className="text-ink sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
          <Link
            to="/appointments"
            search={{ department: doctor.departmentSlug, doctor: doctor.slug }}
            className={`${primaryClass} mt-8`}
          >
            Enquire with this sample selected
          </Link>
        </div>
      </Shell>
    </main>
  );
}
