<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../auth/states/authStore.js";

const PUBLIC_LINKS = [
  { name: "home", label: "Beranda" },
  { name: "schedule", label: "Jadwal" },
  { name: "about", label: "Tentang" },
];
const MEMBER_LINKS = [
  { name: "dashboard", label: "Dashboard" },
  { name: "manage", label: "Kelola" },
  { name: "report", label: "Laporan" },
  { name: "profile", label: "Profil" },
];

const router = useRouter();
const auth = useAuthStore();
const links = computed(() => (auth.isAuthenticated ? [...PUBLIC_LINKS, ...MEMBER_LINKS] : PUBLIC_LINKS));

async function logout() {
  auth.logout();
  await router.push({ name: "home" });
}
</script>

<template>
  <header class="bg-indigo-950 text-white">
    <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-2 font-display text-xl font-bold">
        <img src="/logo.svg" alt="" width="32" height="32" />
        JadwalIbadah
      </RouterLink>
      <nav aria-label="Menu utama">
        <ul class="flex flex-wrap items-center gap-1">
          <li v-for="link in links" :key="link.name">
            <RouterLink
              :to="{ name: link.name }"
              class="rounded-lg px-3 py-2 hover:bg-indigo-900"
              active-class="bg-indigo-800"
              exact-active-class="bg-indigo-800"
            >
              {{ link.label }}
            </RouterLink>
          </li>
          <li>
            <button v-if="auth.isAuthenticated" type="button" class="rounded-lg px-3 py-2 hover:bg-indigo-900" @click="logout">
              Keluar
            </button>
            <RouterLink v-else :to="{ name: 'login' }" class="rounded-lg px-3 py-2 hover:bg-indigo-900">Masuk</RouterLink>
          </li>
          <li v-if="!auth.isAuthenticated">
            <RouterLink :to="{ name: 'register' }" class="rounded-lg bg-amber-400 px-3 py-2 font-semibold text-indigo-950 hover:bg-amber-300">
              Daftar
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
