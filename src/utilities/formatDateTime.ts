const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats a given timestamp into a human-readable date string.
 * If no timestamp is provided, the current date is used.
 *
 * @param {string | null} [timestamp] - The optional timestamp to format. If not provided, the current date is used.
 * @returns {string} The formatted date string in the format "MMM DD, YYYY".
 */
export const formatDateTime = (timestamp?: string | null): string => {
  const now = new Date();
  let date = now;
  if (timestamp) date = new Date(timestamp);
  const month = date.getMonth();
  const days = date.getDate();

  const MMM = shortMonths[month];
  const DD = days < 10 ? `0${days}` : days;
  const YYYY = date.getFullYear();

  return `${MMM} ${DD}, ${YYYY}`;
};
