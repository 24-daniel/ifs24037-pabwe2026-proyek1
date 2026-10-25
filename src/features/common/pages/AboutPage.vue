<template>
  <article class="max-w-2xl">
    <h1 class="font-display text-3xl font-bold">Tentang JadwalIbadah</h1>
    <p class="mt-4 leading-relaxed text-slate-800">
      JadwalIbadah dibuat agar pengurus gereja dan komunitas tidak lagi mengatur jadwal lewat catatan yang
      tercecer di grup percakapan. Semua kegiatan tersimpan di satu tempat dan bisa dibuka jemaat kapan saja.
    </p>
    <h2 class="mt-8 font-display text-xl font-semibold">Yang bisa dilakukan</h2>
    <ul class="mt-3 list-disc space-y-2 pl-6 text-slate-800">
      <li>Melihat kegiatan terdekat di halaman beranda.</li>
      <li>Mencari kegiatan berdasarkan judul, lokasi, atau penanggung jawab.</li>
      <li>Menyaring jadwal menurut kategori: ibadah, doa, pelayanan, paduan suara, dan rapat.</li>
      <li>Menambah, mengubah, dan menghapus kegiatan.</li>
    </ul>
    <RouterLink :to="{ name: 'schedule' }" class="mt-8 inline-block rounded-lg bg-indigo-800 px-4 py-2 font-medium text-white hover:bg-indigo-900">
      Buka jadwal
    </RouterLink>
  </article>
</template>
