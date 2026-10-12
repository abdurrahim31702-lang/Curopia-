import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { doctors, enquiryDepartments } from "@/content/hospital";
import { submitAppointmentEnquiry } from "@/lib/appointments.functions";
import { validateEnquiry } from "@/lib/enquiry";
import { fieldClass, primaryClass } from "@/components/site/ui";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "not_delivered"; reference: string }
  | { kind: "invalid"; fields: Record<string, string> }
  | { kind: "rejected"; message: string }
  | { kind: "failed" };

const fieldOrder = ["name", "phone", "department", "doctor", "date", "message", "consent", "form"];

export function AppointmentForm({
  presetDepartment = "",
  presetDoctor = "",
  idPrefix = "enquiry",
}: {
  presetDepartment?: string;
  presetDoctor?: string;
  idPrefix?: string;
}) {
  const submit = useServerFn(submitAppointmentEnquiry);
  const openedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState(
    enquiryDepartments.some((item) => item.value === presetDepartment) ? presetDepartment : "",
  );
  const [doctor, setDoctor] = useState(doctors.some((item) => item.slug === presetDoctor) ? presetDoctor : "");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const errors = status.kind === "invalid" ? status.fields : {};

  function focusFirst(fields: Record<string, string>) {
    const key = fieldOrder.find((item) => fields[item]);
    if (!key) return;
    document.getElementById(`${idPrefix}-${key}`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;
    const payload = {
      name,
      phone,
      department,
      doctor,
      date,
      message,
      consent,
      hp,
      openedAt: openedAt.current,
    };
    const local = validateEnquiry(payload);
    if (!local.ok) {
      setStatus({ kind: "invalid", fields: local.fields });
      focusFirst(local.fields);
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const result = await submit({ data: payload });
      if (result.ok) {
        setStatus({ kind: "not_delivered", reference: result.reference });
        setName("");
        setPhone("");
        setMessage("");
        setDate("");
        setConsent(false);
        setHp("");
        return;
      }
      if (result.reason === "validation") {
        setStatus({ kind: "invalid", fields: result.fields });
        focusFirst(result.fields);
        return;
      }
      setStatus({ kind: "rejected", message: result.message });
    } catch {
      setStatus({ kind: "failed" });
    }
  }

  if (status.kind === "not_delivered") {
    return (
      <div role="status" className="border border-line bg-chalk p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-brand text-sage-deep">Demo mode</p>
        <h2 className="mt-3 font-display text-3xl leading-display text-ink">Checked on this server. Not delivered.</h2>
        <ul className="mt-5 space-y-2 text-base leading-relaxed text-ink-soft">
          <li>No appointment was requested.</li>
          <li>The hospital did not receive this enquiry.</li>
          <li>The details were not stored.</li>
          <li>
            Screen code <span className="text-ink">{status.reference}</span> exists only here. The hospital cannot look it up.
          </li>
        </ul>
        <button
          type="button"
          className={`${primaryClass} mt-8`}
          onClick={() => {
            openedAt.current = Date.now() - 2000;
            setStatus({ kind: "idle" });
          }}
        >
          Start another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-line bg-chalk p-6 sm:p-8" aria-busy={status.kind === "submitting"}>
      <div className="hp-field" aria-hidden="true">
        <label>
          Leave blank
          <input value={hp} onChange={(event) => setHp(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status.kind === "invalid" ? (
        <p id={`${idPrefix}-form`} role="alert" className="mb-6 text-sm font-medium text-ink">
          {Object.keys(errors).length === 1
            ? Object.values(errors)[0]
            : "Some details need another look. The notes under the fields explain what to change."}
        </p>
      ) : null}
      {status.kind === "rejected" ? (
        <p role="alert" className="mb-6 text-sm font-medium text-ink">
          {status.message} Nothing was sent.
        </p>
      ) : null}
      {status.kind === "failed" ? (
        <p role="alert" className="mb-6 text-sm font-medium text-ink">
          The check did not finish. Nothing was sent. You can try again.
        </p>
      ) : null}
      <Field id={`${idPrefix}-name`} label="Name" required error={errors.name}>
        <input id={`${idPrefix}-name`} className={fieldClass} autoComplete="name" maxLength={80} value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined} />
      </Field>
      <Field id={`${idPrefix}-phone`} label="Phone" required error={errors.phone} hint="Indian mobile or landline. Spaces and +91 are fine.">
        <input id={`${idPrefix}-phone`} className={fieldClass} inputMode="tel" autoComplete="tel" maxLength={20} value={phone} onChange={(event) => setPhone(event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${idPrefix}-phone-error` : `${idPrefix}-phone-hint`} placeholder="98765 43210" />
      </Field>
      <Field id={`${idPrefix}-department`} label="Department" required error={errors.department}>
        <select id={`${idPrefix}-department`} className={fieldClass} value={department} onChange={(event) => setDepartment(event.target.value)} aria-invalid={Boolean(errors.department)} aria-describedby={errors.department ? `${idPrefix}-department-error` : undefined}>
          <option value="">Select</option>
          {enquiryDepartments.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id={`${idPrefix}-doctor`} label="Preferred doctor" error={errors.doctor} hint="Optional. The names below are samples, not staff.">
        <select id={`${idPrefix}-doctor`} className={fieldClass} value={doctor} onChange={(event) => setDoctor(event.target.value)} aria-invalid={Boolean(errors.doctor)} aria-describedby={errors.doctor ? `${idPrefix}-doctor-error` : `${idPrefix}-doctor-hint`}>
          <option value="">No preference</option>
          {doctors.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name} — demonstration record
            </option>
          ))}
        </select>
      </Field>
      <Field id={`${idPrefix}-date`} label="Preferred date" error={errors.date} hint="Optional. A date here is a preference, not a booking.">
        <input id={`${idPrefix}-date`} className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? `${idPrefix}-date-error` : `${idPrefix}-date-hint`} />
      </Field>
      <Field id={`${idPrefix}-message`} label="Note" error={errors.message} hint="Optional. Please do not include detailed symptoms, reports, or identification numbers.">
        <textarea id={`${idPrefix}-message`} className={`${fieldClass} min-h-32 py-3`} maxLength={800} value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${idPrefix}-message-error` : `${idPrefix}-message-hint`} />
      </Field>
      <div className="mt-6">
        <div className="flex gap-3">
          <input
            id={`${idPrefix}-consent`}
            type="checkbox"
            className="mt-1 size-5 accent-sage-deep"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${idPrefix}-consent-error` : undefined}
          />
          <label htmlFor={`${idPrefix}-consent`} className="text-sm leading-relaxed text-ink">
            I understand this is only an enquiry, not a confirmed appointment. In this demo the details are checked and then discarded. They are not sent to the hospital.
          </label>
        </div>
        {errors.consent ? (
          <p id={`${idPrefix}-consent-error`} className="mt-2 text-sm font-medium text-ink">
            {errors.consent}
          </p>
        ) : null}
        <p className="mt-3 text-sm">
          <Link to="/privacy" className="text-ink underline">
            Read the draft privacy note
          </Link>
        </p>
      </div>
      <button type="submit" className={`${primaryClass} mt-8 w-full sm:w-auto`} disabled={status.kind === "submitting"}>
        {status.kind === "submitting" ? "Checking…" : "Check this enquiry"}
      </button>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Checking the form does not create an appointment. Emergencies do not belong in this form.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="font-normal text-ink-soft"> (required)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-sm leading-relaxed text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
