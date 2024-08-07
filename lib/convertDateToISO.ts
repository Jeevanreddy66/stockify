export function convertDateToISO(dateStr: string): string {
  // Ensure the input is in the correct format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid Date Format. Expected - `YYYY-MM-DD`");
  }

  // Append the time and timezone information to the date string
  const IsoDateStr = `${dateStr}T00:00:00.000Z`;
  return IsoDateStr;
}
