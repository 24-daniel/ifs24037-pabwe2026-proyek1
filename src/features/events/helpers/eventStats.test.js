import { describe, expect, it } from "vitest";
import { countByCategory, countByMonth, filterUpcoming } from "./eventStats.js";

const events = [
  { category: "ibadah", eventDate: "2026-10-28" },
  { category: "ibadah", eventDate: "2026-11-02" },
  { category: "rapat", eventDate: "2026-11-04" },
];

describe("eventStats", () => {
  it("menghitung kegiatan per kategori termasuk yang kosong", () => {
    const result = countByCategory(events);
    expect(result.find((item) => item.value === "ibadah").total).toBe(2);
    expect(result.find((item) => item.value === "doa").total).toBe(0);
  });

  it("menghitung kegiatan per bulan secara berurutan", () => {
    expect(countByMonth(events)).toEqual([
      { month: "2026-10", total: 1 },
      { month: "2026-11", total: 2 },
    ]);
  });

  it("menyaring kegiatan yang belum lewat", () => {
    expect(filterUpcoming(events, "2026-11-01")).toHaveLength(2);
  });
});
