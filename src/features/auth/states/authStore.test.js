import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearSession, getToken } from "../../../helpers/authStorage.js";
import { loginApi, registerApi } from "../api/authApi.js";
import { useAuthStore } from "./authStore.js";

vi.mock("../api/authApi.js", () => ({ loginApi: vi.fn(), registerApi: vi.fn() }));

const profile = { username: "daniel", email: "daniel@example.com" };

describe("authStore", () => {
  beforeEach(() => {
    clearSession();
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("login menyimpan sesi dan menandai pengguna sudah masuk", async () => {
    loginApi.mockResolvedValue({ token: "token-abc", user: profile });
    const store = useAuthStore();
    expect(store.isAuthenticated).toBe(false);

    await store.login({ email: profile.email, password: "12345678" });

    expect(store.user).toEqual(profile);
    expect(store.isAuthenticated).toBe(true);
    expect(getToken()).toBe("token-abc");
  });

  it("login yang gagal tidak menyimpan sesi", async () => {
    loginApi.mockRejectedValue(new Error("Email atau password salah"));
    const store = useAuthStore();

    await expect(store.login({ email: profile.email, password: "salah" })).rejects.toThrow("Email atau password salah");
    expect(store.isAuthenticated).toBe(false);
    expect(getToken()).toBeNull();
  });

  it("register mendaftar lalu langsung login", async () => {
    registerApi.mockResolvedValue({});
    loginApi.mockResolvedValue({ token: "token-baru", user: profile });
    const store = useAuthStore();
    const payload = { username: "daniel", email: profile.email, password: "12345678" };

    await store.register(payload);

    expect(registerApi).toHaveBeenCalledWith(payload);
    expect(loginApi).toHaveBeenCalledWith({ email: payload.email, password: payload.password });
    expect(store.isAuthenticated).toBe(true);
  });

  it("logout menghapus sesi", async () => {
    loginApi.mockResolvedValue({ token: "token-abc", user: profile });
    const store = useAuthStore();
    await store.login({ email: profile.email, password: "12345678" });

    store.logout();

    expect(store.user).toBeNull();
    expect(getToken()).toBeNull();
  });
});