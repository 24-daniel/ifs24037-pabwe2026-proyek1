import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, apiRequest, onUnauthorized } from "./apiHelper.js";
import { clearSession, saveSession } from "./authStorage.js";

const mockFetch = (ok, payload, status = 200) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok, status, json: async () => payload }));

describe("apiRequest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    clearSession();
  });

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

  it("memakai pesan bawaan bila respons error tidak berisi JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error("bukan JSON");
        },
      }),
    );
    await expect(apiRequest("/events")).rejects.toMatchObject({
      status: 500,
      message: "Terjadi kesalahan pada server.",
      errors: {},
    });
  });

  it("menyertakan token pada header Authorization", async () => {
    saveSession("token-abc", { username: "admin" });
    mockFetch(true, { data: [] });
    await apiRequest("/events");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe("Bearer token-abc");
  });

  it("tetap melempar error saat token ditolak walau belum ada handler khusus", async () => {
    saveSession("token-abc", { username: "admin" });
    mockFetch(false, { message: "Token tidak valid" }, 401);
    await expect(apiRequest("/events")).rejects.toMatchObject({ status: 401 });
  });
});

describe("onUnauthorized", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    clearSession();
  });

  it("memanggil handler saat token ditolak server", async () => {
    const handler = vi.fn();
    onUnauthorized(handler);
    saveSession("token-abc", { username: "admin" });
    mockFetch(false, { message: "Token tidak valid" }, 401);

    await expect(apiRequest("/events")).rejects.toMatchObject({ status: 401 });
    expect(handler).toHaveBeenCalledOnce();
  });

  it("tidak memanggil handler bila belum login", async () => {
    const handler = vi.fn();
    onUnauthorized(handler);
    mockFetch(false, { message: "Email atau password salah" }, 401);

    await expect(apiRequest("/auth/login", { method: "POST", body: {} })).rejects.toMatchObject({ status: 401 });
    expect(handler).not.toHaveBeenCalled();
  });
});