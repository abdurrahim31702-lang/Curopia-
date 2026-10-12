import { createServerFn } from "@tanstack/react-start";
import { validateEnquiry } from "@/lib/enquiry";

const buckets = new Map<string, number[]>();

function limited(key: string) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < 10 * 60 * 1000);
  if (recent.length >= 8) {
    buckets.set(key, recent);
    return true;
  }
  recent.push(now);
  buckets.set(key, recent);
  return false;
}

/**
 * Demo only. Validates an enquiry on the server, then discards it.
 * Nothing is stored, emailed, or forwarded to the hospital.
 */
export const submitAppointmentEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }) => {
    const parsed = validateEnquiry(data);
    if (!parsed.ok) {
      return { ok: false as const, reason: "validation" as const, fields: parsed.fields };
    }

    if (parsed.value.hp.trim() !== "") {
      return {
        ok: false as const,
        reason: "rejected" as const,
        message: "This submission could not be accepted.",
      };
    }

    const elapsed = Date.now() - parsed.value.openedAt;
    if (elapsed < 500 || elapsed > 18 * 60 * 60 * 1000) {
      return {
        ok: false as const,
        reason: "rejected" as const,
        message: "Please wait a moment, then try again.",
      };
    }

    try {
      const { getRequestIP } = await import("@tanstack/react-start/server");
      const ip = getRequestIP({ xForwardedFor: true });
      if (ip && limited(ip)) {
        return {
          ok: false as const,
          reason: "rejected" as const,
          message: "Too many attempts. Please wait a few minutes and try again.",
        };
      }
    } catch {
      /* Rate limiting is best-effort. A missed limit must not pretend the enquiry was delivered. */
    }

    return {
      ok: true as const,
      delivered: false as const,
      mode: "demo" as const,
      reference: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    };
  });
