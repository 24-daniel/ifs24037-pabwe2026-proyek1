import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { clearSession, getStoredUser, saveSession } from "../../../helpers/authStorage.js";
import { loginApi, registerApi } from "../api/authApi.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(getStoredUser());
  const isAuthenticated = computed(() => user.value !== null);

  async function login(credentials) {
    const { token, user: profile } = await loginApi(credentials);
    saveSession(token, profile);
    user.value = profile;
  }

  /** Mendaftar lalu langsung masuk dengan akun yang baru dibuat. */
  async function register(payload) {
    await registerApi(payload);
    await login({ email: payload.email, password: payload.password });
  }

  function logout() {
    clearSession();
    user.value = null;
  }

  return { user, isAuthenticated, login, register, logout };
});
