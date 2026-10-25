import { describe, expect, it, vi } from "vitest";
import { debounce, formatDay, formatTime, todayIso } from "./toolsHelper.js";

describe("toolsHelper", () => {
  it("memformat jam menjadi WIB", () => {
    expect(formatTime("09:30")).toBe("09.30 WIB");
  });

  it("mengambil tanggal dari format ISO", () => {
    expect(formatDay("2026-11-05")).toBe(5);
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
});
