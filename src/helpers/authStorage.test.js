import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearSession, getStoredUser, getToken, saveSession } from "./authStorage.js";

describe("authStorage", () => {
  beforeEach(() => clearSession());
  afterEach(() => vi.restoreAllMocks());

  it("menyimpan dan membaca sesi login", () => {
    saveSession("token-abc", { username: "admin" });
    expect(getToken()).toBe("token-abc");
    expect(getStoredUser()).toEqual({ username: "admin" });
  });

  it("menghapus sesi saat logout", () => {
    saveSession("token-abc", { username: "admin" });
    clearSession();
    expect(getToken()).toBeNull();
    expect(getStoredUser()).toBeNull();
  });

  it("tidak menganggap pengguna login bila token tidak ada", () => {
    localStorage.setItem("jadwalibadah.user", JSON.stringify({ username: "admin" }));
    expect(getStoredUser()).toBeNull();
  });

  it("tidak error saat penyimpanan browser tidak tersedia", () => {
    const blocked = () => {
      throw new Error("Penyimpanan diblokir");
    };
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(blocked);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(blocked);
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(blocked);

    expect(getToken()).toBeNull();
    expect(getStoredUser()).toBeNull();
    expect(() => saveSession("token-abc", { username: "admin" })).not.toThrow();
    expect(() => clearSession()).not.toThrow();
  });
});