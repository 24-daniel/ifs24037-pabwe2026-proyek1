<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInput } from "../../../hooks/useInput.js";
import FormField from "../../common/components/FormField.vue";
import { useAuthStore } from "../states/authStore.js";

const router = useRouter();
const auth = useAuthStore();

const { values } = useInput({ username: "", email: "", password: "" });
const fieldErrors = ref({});
const errorMessage = ref("");
const isSubmitting = ref(false);

async function submit() {
  isSubmitting.value = true;
  fieldErrors.value = {};
  errorMessage.value = "";
  try {
    await auth.register({ ...values });
    await router.push({ name: "dashboard" });
  } catch (error) {
    fieldErrors.value = error.errors ?? {};
    errorMessage.value = Object.keys(fieldErrors.value).length ? "" : error.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
    <h1 class="font-display text-3xl font-bold">Daftar</h1>
    <p class="mt-2 text-slate-700">Buat akun untuk mengelola jadwal kegiatan.</p>

    <form class="mt-6 grid gap-4" @submit.prevent="submit">
      <FormField
        v-model="values.username"
        name="username"
        autocomplete="username"
        label="Username"
        :error="fieldErrors.username"
        required
      />
      <FormField
        v-model="values.email"
        name="email"
        type="email"
        autocomplete="email"
        label="Email"
        :error="fieldErrors.email"
        required
      />
      <FormField
        v-model="values.password"
        name="password"
        type="password"
        autocomplete="new-password"
        label="Password (minimal 8 karakter)"
        :error="fieldErrors.password"
        required
      />
      <p v-if="errorMessage" role="alert" class="rounded-lg bg-red-50 p-3 text-red-800">{{ errorMessage }}</p>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="rounded-lg bg-indigo-800 px-4 py-2 font-medium text-white hover:bg-indigo-900 disabled:opacity-60"
      >
        {{ isSubmitting ? "Memproses…" : "Daftar" }}
      </button>
    </form>
    <p class="mt-6 text-center text-slate-700">
      Sudah punya akun?
      <RouterLink :to="{ name: 'login' }" class="font-medium text-indigo-800 underline">Masuk</RouterLink>
    </p>
  </section>
</template>
