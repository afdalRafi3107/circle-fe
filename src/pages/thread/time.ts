function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "y"], // year
    [2592000, "mo"], // month
    [86400, "d"], // day
    [3600, "h"], // hour
    [60, "m"], // minute
    [1, "s"], // second
  ];

  for (const [intervalsIsSecond, unit] of intervals) {
    const count = Math.floor(seconds / intervalsIsSecond);
    if (count >= 1) return `${count}${unit} ago`;
  }
  return "just now";
}
export default getTimeAgo;
