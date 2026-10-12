import { Link } from "@tanstack/react-router";
import { site } from "@/content/hospital";
import { Wordmark } from "@/components/site/wordmark";

const columns = [
  {
    title: "The hospital",
    links: [
      { to: "/about", label: "About" },
      { to: "/departments", label: "Departments" },
      { to: "/doctors", label: "Doctors" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Patients",
    links: [
      { to: "/services", label: "Patient services" },
      { to: "/appointments", label: "Request an appointment" },
      { to: "/portal", label: "Patient portal" },
      { to: "/payments", label: "Payments" },
    ],
  },
  {
    title: "Notes",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/patient-information", label: "Patient information" },
      { to: "/privacy", label: "Privacy draft" },
      { to: "/terms", label: "Terms draft" },
      { to: "/readiness", label: "Launch notes" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-chalk">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Temporary wordmark. {site.name} is a placeholder identity for a private hospital in {site.region}.
          </p>
          <dl className="mt-8 space-y-3 text-sm text-ink">
            <div>
              <dt className="text-ink-soft">Region</dt>
              <dd>{site.region}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Street address</dt>
              <dd>Not yet provided</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Telephone</dt>
              <dd>Not yet provided</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Emergency</dt>
              <dd>Not yet provided</dd>
            </div>
          </dl>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="md:col-span-2 lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-brand text-sage-deep">{column.title}</p>
            <ul className="mt-4 space-y-3">
              {column.links.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-ink hover:text-sage-deep">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-4 text-xs leading-relaxed text-ink-soft sm:px-8">
          This website does not give medical advice. An enquiry is not an appointment. Demonstration doctors are not members of staff.
        </p>
      </div>
    </footer>
  );
}
