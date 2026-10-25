export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const hasValue = ([, value]) => value !== undefined && value !== null && value !== "";

function buildQuery(params = {}) {
  const query = new URLSearchParams(Object.entries(params).filter(hasValue)).toString();
  return query ? `?${query}` : "";
}

const NETWORK_ERROR_MESSAGE = "Tidak dapat terhubung ke server. Periksa koneksi internetmu atau coba lagi nanti.";

async function sendRequest(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0);
  }
}

export async function apiRequest(path, { method = "GET", body, params } = {}) {
  const response = await sendRequest(`${API_BASEURL}${path}${buildQuery(params)}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(payload?.message ?? "Terjadi kesalahan pada server.", response.status, payload?.errors);
  }
  return payload.data;
}
