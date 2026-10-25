<script setup>
defineProps({
  isLoading: Boolean,
  errorMessage: { type: String, default: "" },
  isEmpty: Boolean,
  emptyText: { type: String, default: "Belum ada data." },
});
</script>

<template>
  <p v-if="isLoading" role="status" class="py-8 text-center text-slate-700">Memuat data…</p>
  <p v-else-if="errorMessage" role="alert" class="rounded-lg bg-red-50 p-4 text-red-800">{{ errorMessage }}</p>
  <p v-else-if="isEmpty" class="rounded-lg bg-white p-6 text-center text-slate-700 ring-1 ring-slate-200">{{ emptyText }}</p>
  <slot v-else />
</template>
