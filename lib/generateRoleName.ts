export function generateRoleName(displayName: string): string {
  return displayName
    .trim() // Remove any leading/trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .replace(/\s+/g, "_"); // Replace spaces with underscores
}
