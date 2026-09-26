/**
 * Base URL untuk semua panggilan API.
 *
 * Backend tidak punya prefix tunggal (route tersebar di `/auth/*`, `/api/v1/*`,
 * `/api/users`, `/api/realtime`), jadi base ini adalah HOST TELANJANG — bukan
 * ".../api/v1". Tiap service menuliskan path lengkapnya sendiri.
 *
 * - Dev: default `/bff` — di-proxy oleh `next.config.ts` `rewrites()` ke API dev
 *   supaya same-origin (backend belum mengaktifkan CORS).
 * - Prod: set `NEXT_PUBLIC_API_URL` ke origin API sebenarnya begitu CORS aktif.
 */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "/bff").replace(
  /\/+$/,
  "",
);
