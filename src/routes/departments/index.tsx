import { Link, createFileRoute } from "@tanstack/react-router";
import { DraftNote, PageIntro, Shell } from "@/components/site/ui";
import { departments } from "@/content/hospital";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Departments · DEMO Hospital" },
      {
        name: "description",
        content: "Draft department templates for DEMO Hospital. These are not confirmed clinical services.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <main id="main">
      <PageIntro
        kicker="Departments"
        title="A contents page, not a clinic list."
        lede="The names below show how a department page will read. DEMO Hospital has not confirmed that any of them are open."
      />
      <Shell className="pb-8">
        <DraftNote>Do not read this index as treatment the hospital offers.</DraftNote>
      </Shell>
      <Shell className="pb-20">
        <ul>
          {departments.map((department, index) => (
            <li key={department.slug} className="border-t border-line">
              <Link to="/departments/$slug" params={{ slug: department.slug }} className="grid gap-4 py-8 md:grid-cols-12 md:items-start">
                <span className="text-xs tracking-brand text-sage-deep md:col-span-2">0{index + 1}</span>
                <span className="font-display text-4xl text-ink md:col-span-5">{department.name}</span>
                <span className="leading-relaxed text-ink-soft md:col-span-5">{department.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </main>
  );
}
