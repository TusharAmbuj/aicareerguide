export function getReadingTime(body: string | undefined, override?: number) {
  if (typeof override === "number" && Number.isFinite(override) && override > 0) return Math.round(override);
  const words = body?.split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatReadingTime(body: string | undefined, override?: number) {
  return `${getReadingTime(body, override)} min read`;
}
