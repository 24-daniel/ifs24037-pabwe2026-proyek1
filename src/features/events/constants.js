// Seluruh kelas Tailwind ditulis utuh agar terdeteksi saat build.
export const CATEGORY_STYLES = {
  ibadah: { label: "Ibadah", badge: "bg-violet-100 text-violet-900", block: "bg-violet-700" },
  doa: { label: "Doa & Persekutuan", badge: "bg-teal-100 text-teal-900", block: "bg-teal-700" },
  pelayanan: { label: "Pelayanan", badge: "bg-amber-100 text-amber-900", block: "bg-amber-700" },
  "paduan-suara": { label: "Paduan Suara", badge: "bg-rose-100 text-rose-900", block: "bg-rose-700" },
  rapat: { label: "Rapat", badge: "bg-slate-200 text-slate-900", block: "bg-slate-700" },
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_STYLES).map(([value, { label }]) => ({ value, label }));

export const EMPTY_EVENT_FORM = {
  title: "",
  category: "ibadah",
  eventDate: "",
  startTime: "",
  location: "",
  leader: "",
  description: "",
};
