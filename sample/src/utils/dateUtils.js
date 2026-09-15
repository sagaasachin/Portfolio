/**
 * Date & Duration Utility functions for Experience & Timeline components.
 */

/**
 * Calculates human-readable duration between two dates or up to present.
 * @param {string} startDate - "YYYY-MM" or ISO date string
 * @param {string} endDate - "YYYY-MM" or ISO date string or "Present"
 * @param {boolean} current - Whether the role is current
 * @returns {string} e.g. "6 months" or "1 year 2 months"
 */
export function calculateDuration(startDate, endDate, current = false) {
  if (!startDate) return "";

  const start = new Date(startDate);
  if (isNaN(start.getTime())) return "";

  const end =
    current || !endDate || endDate.toLowerCase() === "present"
      ? new Date()
      : new Date(endDate);

  if (isNaN(end.getTime())) return "";

  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Add 1 month to include start/end month inclusive
  totalMonths = Math.max(1, totalMonths + 1);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearStr = years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : "";
  const monthStr =
    months > 0 ? `${months} ${months === 1 ? "month" : "months"}` : "";

  if (yearStr && monthStr) {
    return `${yearStr} ${monthStr}`;
  }
  return yearStr || monthStr || "1 month";
}

/**
 * Formats a date range into a clean string.
 * @param {string} startDate - e.g. "2024-01"
 * @param {string} endDate - e.g. "2024-06"
 * @param {boolean} current - whether current
 * @returns {string} e.g. "JAN 2024 — JUN 2024"
 */
export function formatDateRange(startDate, endDate, current = false) {
  if (!startDate && !endDate) return "";

  const formatMonthYear = (str) => {
    if (!str) return "";
    if (str.toLowerCase() === "present") return "PRESENT";
    const d = new Date(str.includes("-") ? str : `${str}-01`);
    if (isNaN(d.getTime())) return str.toUpperCase();
    const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
    return `${month} ${d.getFullYear()}`;
  };

  const startFormatted = formatMonthYear(startDate);
  const endFormatted = current ? "PRESENT" : formatMonthYear(endDate) || "PRESENT";

  if (startFormatted && endFormatted) {
    return `${startFormatted} — ${endFormatted}`;
  }
  return startFormatted || endFormatted;
}
