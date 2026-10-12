import { doctors, enquiryDepartments } from "@/content/hospital";
import { isIndianPhone } from "@/lib/phone";

const departmentValues = new Set(enquiryDepartments.map((item) => item.value));
const doctorValues = new Set(doctors.map((doctor) => doctor.slug));

export type EnquiryValue = {
  name: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  message: string;
  consent: true;
  hp: string;
  openedAt: number;
};

export type EnquiryCheck =
  | { ok: true; value: EnquiryValue }
  | { ok: false; fields: Record<string, string> };

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function isTodayOrLater(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const today = new Date().toISOString().slice(0, 10);
  return value >= today;
}

export function validateEnquiry(input: unknown): EnquiryCheck {
  if (!input || typeof input !== "object") {
    return { ok: false, fields: { form: "Reload the page and try again." } };
  }
  const source = input as Record<string, unknown>;
  const name = text(source.name);
  const phone = text(source.phone);
  const department = text(source.department);
  const doctor = text(source.doctor);
  const date = text(source.date);
  const message = text(source.message);
  const fields: Record<string, string> = {};

  if (name.length < 2) {
    fields.name = "Enter the name of the patient or the person to contact.";
  } else if (name.length > 80) {
    fields.name = "Use 80 characters or fewer.";
  }
  if (!isIndianPhone(phone)) {
    fields.phone = "Enter an Indian mobile or landline number.";
  }
  if (!departmentValues.has(department)) {
    fields.department = "Choose a department, or select Not sure yet.";
  }
  if (doctor !== "" && doctor !== "none" && !doctorValues.has(doctor)) {
    fields.doctor = "Choose a listed sample, or leave this blank.";
  }
  if (date !== "" && !isTodayOrLater(date)) {
    fields.date = "Choose today or a later date, or leave this blank.";
  }
  if (message.length > 800) {
    fields.message = "Keep this note under 800 characters. Do not include detailed medical history.";
  }
  if (source.consent !== true) {
    fields.consent = "Consent is needed before this enquiry can be checked.";
  }
  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    value: {
      name,
      phone,
      department,
      doctor: doctor === "none" ? "" : doctor,
      date,
      message,
      consent: true,
      hp: typeof source.hp === "string" ? source.hp : "",
      openedAt: typeof source.openedAt === "number" && Number.isFinite(source.openedAt) ? source.openedAt : 0,
    },
  };
}
