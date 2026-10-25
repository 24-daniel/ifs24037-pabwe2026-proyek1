import { getToken } from "./authStorage.js";

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const NETWORK_ERROR_MESSAGE = "Tidak dapat terhubung ke server. Periksa koneksi internetmu atau coba lagi nanti.";
const UNAUTHORIZED_STATUS = 401;

let unauthorizedHandler = () => {};

/** Dipanggil saat token ditolak server (kedaluwarsa atau tidak valid). */
export function onUnauthorized(handler) {
  unauthorizedHandler = handler;
}

const hasValue = ([, value]) => value !== undefined && value !== null && value !== "";

function buildQuery(params = {}) {
  const query = new URLSearchParams(Object.entries(params).filter(hasValue)).toString();
  return query ? `?${query}` : "";
}

function buildHeaders(token, hasBody) {
  const headers = {};
  if (hasBody) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function sendRequest(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0);
  }
}

export async function apiRequest(path, { method = "GET", body, params } = {}) {
  const token = getToken();
  const response = await sendRequest(`${API_BASEURL}${path}${buildQuery(params)}`, {
    method,
    headers: buildHeaders(token, Boolean(body)),
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === UNAUTHORIZED_STATUS && token) unauthorizedHandler();
    throw new ApiError(payload?.message ?? "Terjadi kesalahan pada server.", response.status, payload?.errors);
  }
  return payload.data;
}
