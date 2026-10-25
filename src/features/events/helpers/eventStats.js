import { CATEGORY_STYLES } from "../constants.js";

export function countByCategory(events) {
  return Object.entries(CATEGORY_STYLES).map(([value, { label }]) => ({
    value,
    label,
    total: events.filter((event) => event.category === value).length,
  }));
}

/** Jumlah kegiatan per bulan, diurutkan dari bulan terlama. Kunci bulan berformat YYYY-MM. */
export function countByMonth(events) {
  const totals = {};
  events.forEach((event) => {
    const month = event.eventDate.slice(0, 7);
    totals[month] = (totals[month] ?? 0) + 1;
  });
  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));
}

export const filterUpcoming = (events, today) => events.filter((event) => event.eventDate >= today);
