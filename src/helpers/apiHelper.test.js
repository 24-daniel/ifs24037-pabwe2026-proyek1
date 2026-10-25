import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, apiRequest } from "./apiHelper.js";

const mockFetch = (ok, payload, status = 200) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok, status, json: async () => payload }));

describe("apiRequest", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("mengembalikan data dan membuang parameter kosong", async () => {
    mockFetch(true, { data: [1, 2] });
    await expect(apiRequest("/events", { params: { search: "doa", category: "" } })).resolves.toEqual([1, 2]);
    expect(fetch.mock.calls[0][0]).toMatch(/\/events\?search=doa$/);
  });

  it("melempar ApiError berisi pesan dan detail validasi", async () => {
    mockFetch(false, { message: "Tidak valid", errors: { title: "Wajib" } }, 422);
    await expect(apiRequest("/events", { method: "POST", body: {} })).rejects.toMatchObject({
      status: 422,
      errors: { title: "Wajib" },
    });
    expect(new ApiError("x", 500)).toBeInstanceOf(Error);
  });

  it("memberi pesan jelas saat server tidak terjangkau", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(apiRequest("/events")).rejects.toMatchObject({ status: 0 });
  });
});
