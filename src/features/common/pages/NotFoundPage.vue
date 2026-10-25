<template>
  <section class="py-12 text-center">
    <h1 class="font-display text-3xl font-bold">Halaman tidak ditemukan</h1>
    <p class="mt-3 text-slate-800">Alamat yang kamu buka tidak ada atau sudah dipindahkan.</p>
    <RouterLink :to="{ name: 'home' }" class="mt-6 inline-block rounded-lg bg-indigo-800 px-4 py-2 font-medium text-white hover:bg-indigo-900">
      Kembali ke beranda
    </RouterLink>
  </section>
</template>
