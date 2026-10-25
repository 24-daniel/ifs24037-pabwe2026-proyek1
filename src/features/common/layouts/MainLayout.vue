<script setup>
import NavbarComponent from "../components/NavbarComponent.vue";
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2"
  >
    Lompat ke konten
  </a>
  <NavbarComponent />
  <main id="main" class="mx-auto min-h-[70vh] max-w-5xl px-4 py-8">
    <RouterView />
  </main>
  <footer class="border-t border-slate-300 py-6 text-center text-sm text-slate-700">
    JadwalIbadah — Manajemen kegiatan gereja dan komunitas
  </footer>
</template>
