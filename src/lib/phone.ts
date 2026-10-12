/** Indian mobile numbers and common STD landlines. Formatting spaces, hyphens, and brackets are ignored. */
export function isIndianPhone(input: string): boolean {
  const compact = input.replace(/[\s().-]/g, "");
  if (compact.length < 10 || compact.length > 14) return false;
  if (/^(?:\+91|91|0)?[6-9]\d{9}$/.test(compact)) return true;
  if (/^0\d{10}$/.test(compact)) return true;
  if (/^\+91\d{10}$/.test(compact)) return true;
  return false;
}
