import { beforeEach, describe, expect, it } from "vitest";
import { clearSession, getStoredUser, getToken, saveSession } from "./authStorage.js";

describe("authStorage", () => {
  beforeEach(() => clearSession());

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
});
