import { useRouter } from "vue-router";
import { useAuthStore } from "../features/auth/states/authStore.js";

/** Keluar dari akun lalu kembali ke beranda. Dipakai bersama oleh Navbar dan halaman Profil. */
export function useLogout() {
  const router = useRouter();
  const auth = useAuthStore();

  return async function logout() {
    auth.logout();
    await router.push({ name: "home" });
  };
}
