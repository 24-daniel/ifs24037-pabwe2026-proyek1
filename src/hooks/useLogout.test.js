import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearSession, getToken, saveSession } from "../helpers/authStorage.js";
import { useLogout } from "./useLogout.js";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("vue-router", () => ({ useRouter: () => ({ push }) }));

describe("useLogout", () => {
  beforeEach(() => {
    clearSession();
    setActivePinia(createPinia());
    push.mockClear();
  });

  it("menghapus sesi lalu kembali ke beranda", async () => {
    saveSession("token-abc", { username: "admin" });
    const logout = useLogout();

    await logout();

    expect(getToken()).toBeNull();
    expect(push).toHaveBeenCalledWith({ name: "home" });
  });
});