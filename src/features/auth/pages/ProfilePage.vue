<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../states/authStore.js";

const router = useRouter();
const auth = useAuthStore();

async function logout() {
  auth.logout();
  await router.push({ name: "home" });
}
</script>

<template>
  <h1 class="font-display text-3xl font-bold">Profil</h1>

  <section class="mt-6 max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
    <dl class="grid gap-4">
      <div>
        <dt class="text-sm text-slate-700">Username</dt>
        <dd class="font-medium">{{ auth.user?.username }}</dd>
      </div>
      <div>
        <dt class="text-sm text-slate-700">Email</dt>
        <dd class="font-medium">{{ auth.user?.email }}</dd>
      </div>
    </dl>
    <button type="button" class="mt-6 rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800" @click="logout">
      Keluar
    </button>
  </section>
</template>
