/**
 * Appends the current date and time to the given filename.
 * @param filename - The original filename.
 * @returns The filename with the current date and time appended.
 */

export function formatFilename(filename: string): string {
  const now = new Date();
  const formattedDateTime = now
    .toISOString()
    .replace(/[-:.]/g, "") // Remove unwanted characters
    .replace("T", "_")
    .substring(0, 15); // Keep up to YYYYMMDD_HHMMSS

  const fileExtension = filename.includes(".")
    ? filename.substring(filename.lastIndexOf("."))
    : "";
  const fileNameWithoutExtension = filename.includes(".")
    ? filename.substring(0, filename.lastIndexOf(".")).toLowerCase()
    : filename.toLowerCase();

  return `${fileNameWithoutExtension}_${formattedDateTime}${fileExtension}`;
}
