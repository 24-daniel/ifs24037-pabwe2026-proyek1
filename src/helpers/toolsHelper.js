const toDate = (isoDate) => new Date(`${isoDate}T00:00:00`);

export const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(toDate(isoDate));

export const formatDay = (isoDate) => toDate(isoDate).getDate();

export const formatMonthShort = (isoDate) =>
  new Intl.DateTimeFormat("id-ID", { month: "short" }).format(toDate(isoDate));

export const formatTime = (time) => `${time.replace(":", ".")} WIB`;

/** Tanggal hari ini (zona waktu lokal) dalam format YYYY-MM-DD. */
export const todayIso = () => new Date().toLocaleDateString("sv-SE");

export function debounce(callback, delay = 300) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}

// SweetAlert2 dimuat saat dibutuhkan agar bundle awal tetap kecil.
async function loadSwal() {
  const { default: Swal } = await import("sweetalert2");
  return Swal;
}

export async function showSuccessDialog(title) {
  const Swal = await loadSwal();
  return Swal.fire({ icon: "success", title, timer: 1600, showConfirmButton: false });
}

export async function showErrorDialog(message) {
  const Swal = await loadSwal();
  return Swal.fire({ icon: "error", title: "Terjadi kesalahan", text: message });
}

export async function showConfirmDialog(title, text) {
  const Swal = await loadSwal();
  const result = await Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#b91c1c",
  });
  return result.isConfirmed;
}
