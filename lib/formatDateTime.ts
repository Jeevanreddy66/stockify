/**
 * Converts a DateTime string into a formatted string.
 * @param dateTime - The DateTime string to convert.
 * @returns The formatted date string.
 */

export function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}
