/**
 * Converts bytes to a human-readable string in KB or MB.
 * @param bytes - The number of bytes to convert.
 * @returns The formatted string in KB or MB.
 */

export function formatSize(bytes: number): string {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;

  if (bytes < kilobyte) {
    return `${bytes} Bytes`;
  } else if (bytes < megabyte) {
    return `${(bytes / kilobyte).toFixed(2)} KB`;
  } else {
    return `${(bytes / megabyte).toFixed(2)} MB`;
  }
}
