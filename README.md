# JadwalIbadah — Frontend

Antarmuka web JadwalIbadah (Vue 3, Pinia, Vue Router, Tailwind). Data diambil dari repo backend: **ifs24037-pabwe2026-p1-api**.

## Menjalankan di komputer lokal
```bash
git clone https://github.com/<username>/ifs24037-pabwe2026-p1.git
cd ifs24037-pabwe2026-p1
cp .env.example .env     # isi VITE_API_BASEURL dengan URL API
bun install
bun run dev              # http://localhost:3000
```
Jalankan backend lebih dulu (lihat README backend).

## Deploy
- Build: `bun run build`, hasilnya di `dist/`.
- Set `VITE_API_BASEURL` ke URL API publik (HTTPS), mis. `https://<api-kamu>/api/v1`, **sebelum** build.
- Server harus mengarahkan semua path ke `index.html` (SPA fallback) agar `/jadwal` dan `/tentang` tidak 404.

## Struktur
`src/features/{events,common}/{api,states,components,modals,pages,layouts}`, `src/helpers`, `src/hooks`.

## Menghubungkan dengan backend (wajib)
1. Backend sudah online dan `https://<api-kamu>/api/v1/health` mengembalikan `{"success":true}`.
2. `VITE_API_BASEURL=https://<api-kamu>/api/v1` (tanpa garis miring di akhir) diisi sebelum build. Build production akan gagal jika kosong.
3. Di backend, `CORS_ORIGIN` berisi URL frontend ini.
4. Buka halaman Jadwal: daftar kegiatan muncul dan tombol Tambah berhasil menyimpan.
