<script setup>
import { CATEGORY_OPTIONS } from "../constants.js";

const search = defineModel("search", { type: String, default: "" });
const category = defineModel("category", { type: String, default: "" });
</script>

<template>
  <form class="grid gap-3 sm:grid-cols-[1fr_14rem]" role="search" @submit.prevent>
    <div>
      <label for="filter-search" class="mb-1 block text-sm font-medium">Cari kegiatan</label>
      <input
        id="filter-search"
        v-model="search"
        type="search"
        placeholder="Judul, lokasi, atau penanggung jawab"
        class="w-full rounded-lg border border-slate-400 bg-white px-3 py-2"
      />
    </div>
    <div>
      <label for="filter-category" class="mb-1 block text-sm font-medium">Kategori</label>
      <select id="filter-category" v-model="category" class="w-full rounded-lg border border-slate-400 bg-white px-3 py-2">
        <option value="">Semua kategori</option>
        <option v-for="option in CATEGORY_OPTIONS" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </form>
</template>
