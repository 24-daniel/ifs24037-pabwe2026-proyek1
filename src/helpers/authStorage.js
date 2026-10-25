const TOKEN_KEY = "jadwalibadah.token";
const USER_KEY = "jadwalibadah.user";

// Penyimpanan browser bisa saja tidak tersedia, jadi semua akses dibungkus try/catch.
function safely(action, fallback = null) {
  try {
    return action();
  } catch {
    return fallback;
  }
}

export const getToken = () => safely(() => localStorage.getItem(TOKEN_KEY));

export function getStoredUser() {
  return safely(() => {
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser && getToken() ? JSON.parse(rawUser) : null;
  });
}

export function saveSession(token, user) {
  safely(() => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  });
}

export function clearSession() {
  safely(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  });
}
