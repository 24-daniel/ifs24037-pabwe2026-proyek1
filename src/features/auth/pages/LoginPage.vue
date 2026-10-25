<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInput } from "../../../hooks/useInput.js";
import FormField from "../../common/components/FormField.vue";
import { useAuthStore } from "../states/authStore.js";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const { values } = useInput({ email: "", password: "" });
const errorMessage = ref("");
const isSubmitting = ref(false);

/** Hanya menerima alamat di dalam aplikasi ini agar tidak dipakai untuk mengarahkan ke situs lain. */
function getRedirectTarget() {
  const target = route.query.redirect;
  const isInternal = typeof target === "string" && target.startsWith("/") && !target.startsWith("//");
  return isInternal ? target : { name: "dashboard" };
}

async function submit() {
  isSubmitting.value = true;
  errorMessage.value = "";
  try {
    await auth.login({ ...values });
    await router.push(getRedirectTarget());
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
    <h1 class="font-display text-3xl font-bold">Masuk</h1>
    <p class="mt-2 text-slate-700">Khusus pengurus untuk mengelola jadwal kegiatan.</p>

    <form class="mt-6 grid gap-4" @submit.prevent="submit">
      <FormField id="username" v-model="values.email" name="email" type="email" autocomplete="email" label="Email" required />
      <FormField
        id="password"
        v-model="values.password"
        name="password"
        type="password"
        autocomplete="current-password"
        label="Password"
        required
      />
      <p v-if="errorMessage" role="alert" class="rounded-lg bg-red-50 p-3 text-red-800">{{ errorMessage }}</p>
      <button
        id="btn-submit"
        type="submit"
        :disabled="isSubmitting"
        class="rounded-lg bg-indigo-800 px-4 py-2 font-medium text-white hover:bg-indigo-900 disabled:opacity-60"
      >
        {{ isSubmitting ? "Memproses…" : "Masuk" }}
      </button>
    </form>
    <p class="mt-6 text-center text-slate-700">
      Belum punya akun?
      <RouterLink :to="{ name: 'register' }" class="font-medium text-indigo-800 underline">Daftar</RouterLink>
    </p>
  </section>
</template>