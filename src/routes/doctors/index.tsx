import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { DraftNote, PageIntro, Shell, fieldClass } from "@/components/site/ui";
import { departments, doctors, getDepartment } from "@/content/hospital";

export const Route = createFileRoute("/doctors/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
    department: typeof search.department === "string" ? search.department : "all",
  }),
  head: () => ({
    meta: [
      { title: "Doctors · DEMO Hospital" },
      {
        name: "description",
        content: "A searchable demonstration directory. No verified doctors from DEMO Hospital are published.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const initial = Route.useSearch();
  const [q, setQ] = useState(initial.q);
  const [department, setDepartment] = useState(initial.department);

  useEffect(() => {
    setQ(initial.q);
    setDepartment(initial.department);
  }, [initial.q, initial.department]);

  const filtered = doctors.filter((doctor) => {
    const dept = getDepartment(doctor.departmentSlug);
    const haystack = `${doctor.name} ${doctor.specialty} ${dept?.name ?? ""}`.toLowerCase();
    const queryOk = q.trim() === "" || haystack.includes(q.trim().toLowerCase());
    const departmentOk = department === "all" || department === "" || doctor.departmentSlug === department;
    return queryOk && departmentOk;
  });

  return (
    <main id="main">
      <PageIntro
        kicker="Doctors"
        title="The directory is ready. The staff list is not."
        lede="Search and filters work on demonstration records only. A verified doctor will be added here only with an authorised name, qualifications, and photograph."
      />
      <Shell className="pb-6">
        <DraftNote>Sample Physician One, Two, and Three are not real people and do not work at DEMO Hospital.</DraftNote>
      </Shell>
      <Shell className="grid gap-4 pb-8 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <label htmlFor="doctor-search" className="text-sm font-medium text-ink">
            Search demonstration records
          </label>
          <input id="doctor-search" className={fieldClass} type="search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Name or specialty" />
        </div>
        <div className="sm:col-span-5">
          <label htmlFor="doctor-department" className="text-sm font-medium text-ink">
            Department template
          </label>
          <select id="doctor-department" className={fieldClass} value={department} onChange={(event) => setDepartment(event.target.value)}>
            <option value="all">All templates</option>
            {departments.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </Shell>
      <Shell className="pb-20">
        <p aria-live="polite" className="text-sm text-ink-soft">
          {filtered.length} demonstration {filtered.length === 1 ? "record" : "records"}
        </p>
        {filtered.length === 0 ? (
          <p className="mt-8 font-display text-3xl text-ink">No demonstration records match.</p>
        ) : (
          <ul className="mt-6 border-t border-line">
            {filtered.map((doctor) => {
              const dept = getDepartment(doctor.departmentSlug);
              return (
                <li key={doctor.slug} className="border-b border-line">
                  <Link to="/doctors/$slug" params={{ slug: doctor.slug }} className="grid gap-4 py-6 sm:grid-cols-12 sm:items-center">
                    <span className="flex h-16 w-16 items-center justify-center bg-stone font-display text-2xl text-ink" aria-hidden="true">
                      {doctor.index}
                    </span>
                    <span className="sm:col-span-6">
                      <span className="block font-display text-2xl text-ink">{doctor.name}</span>
                      <span className="mt-1 block text-sm text-sage-deep">Demonstration record — not staff</span>
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft sm:col-span-5">
                      {doctor.specialty}
                      {dept ? ` · ${dept.name}` : ""}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Shell>
    </main>
  );
}
