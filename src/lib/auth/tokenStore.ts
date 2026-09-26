/**
 * Penyimpanan token sesi.
 *
 * - **Access token**: hanya di memori (variabel modul). Hilang saat reload —
 *   aman dari skrip pihak ketiga yang membaca storage; dipulihkan lewat refresh
 *   token pada bootstrap `AuthContext`.
 * - **Refresh token**: `localStorage` (harus selamat dari reload). Backend
 *   memakai rotation → setiap `login` / `register` / `refresh` mengembalikan
 *   refresh token BARU yang wajib menggantikan yang lama.
 * - **Cookie penanda `tt.auth=1`**: non-sensitif, tanpa nilai token. Dibaca
 *   `src/middleware.ts` untuk soft-guard route. Bukan kredensial.
 */

const REFRESH_KEY = "tt.refreshToken";
const AUTH_COOKIE = "tt.auth";

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}

export function setRefreshToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(REFRESH_KEY, token);
    else window.localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* storage tidak tersedia (mode privat) — abaikan */
  }
}

function setAuthCookie(present: boolean): void {
  if (typeof document === "undefined") return;
  document.cookie = present
    ? `${AUTH_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`
    : `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/** Simpan pasangan token hasil login / register / refresh (rotation). */
export function setSession(tokens: {
  accessToken: string;
  refreshToken: string;
}): void {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
  setAuthCookie(true);
}

/** Hapus semua jejak sesi (logout / refresh gagal). */
export function clearSession(): void {
  setAccessToken(null);
  setRefreshToken(null);
  setAuthCookie(false);
}
