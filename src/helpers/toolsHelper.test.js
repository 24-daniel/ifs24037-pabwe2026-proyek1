import { describe, expect, it, vi } from "vitest";
import {
  debounce,
  formatDate,
  formatDay,
  formatMonthShort,
  formatMonthYear,
  formatTime,
  showConfirmDialog,
  showErrorDialog,
  showSuccessDialog,
  todayIso,
} from "./toolsHelper.js";

const { fire } = vi.hoisted(() => ({ fire: vi.fn().mockResolvedValue({ isConfirmed: true }) }));
vi.mock("sweetalert2", () => ({ default: { fire } }));

describe("toolsHelper", () => {
  it("memformat jam menjadi WIB", () => {
    expect(formatTime("09:30")).toBe("09.30 WIB");
  });

  it("mengambil tanggal dari format ISO", () => {
    expect(formatDay("2026-11-05")).toBe(5);
  });

  it("memformat tanggal dalam bahasa Indonesia", () => {
    expect(formatDate("2026-11-05")).toContain("2026");
    expect(formatMonthYear("2026-11")).toContain("2026");
    expect(formatMonthShort("2026-11-05").length).toBeGreaterThan(0);
  });

  it("menghasilkan tanggal hari ini berformat YYYY-MM-DD", () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("debounce hanya menjalankan panggilan terakhir", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const run = debounce(callback, 100);
    run("a");
    run("b");
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith("b");
    vi.useRealTimers();
  });

  it("menampilkan dialog sukses, galat, dan konfirmasi lewat SweetAlert2", async () => {
    await showSuccessDialog("Berhasil");
    await showErrorDialog("Gagal");
    await expect(showConfirmDialog("Hapus?", "Tidak bisa dikembalikan")).resolves.toBe(true);
    expect(fire).toHaveBeenCalledTimes(3);
  });
});