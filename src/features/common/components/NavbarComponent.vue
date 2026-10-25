<script setup>
const links = [
  { name: "home", label: "Beranda" },
  { name: "schedule", label: "Jadwal" },
  { name: "about", label: "Tentang" },
];
</script>

<template>
  <header class="bg-indigo-950 text-white">
    <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-2 font-display text-xl font-bold">
        <img src="/logo.svg" alt="" width="32" height="32" />
        JadwalIbadah
      </RouterLink>
      <nav aria-label="Menu utama">
        <ul class="flex gap-1">
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
        </ul>
      </nav>
    </div>
  </header>
</template>
