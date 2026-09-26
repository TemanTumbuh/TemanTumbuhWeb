import { API_BASE_URL } from "../http/config";
import { setSession, clearSession, getRefreshToken } from "./tokenStore";

/**
 * Tukar refresh token dengan pasangan access + refresh baru.
 *
 * Memakai `fetch` mentah (bukan `http` client) untuk memutus import cycle:
 * `http/client` memanggil fungsi ini ketika menangani `401`.
 *
 * **Single-flight**: banyak request yang `401` berbarengan hanya memicu SATU
 * panggilan `POST /auth/refresh`; semuanya menunggu promise yang sama.
 */
let inFlight: Promise<string> | null = null;

export function refreshAccessToken(): Promise<string> {
  if (inFlight) return inFlight;

  const pending = (async (): Promise<string> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("Tidak ada refresh token.");

    let res: Response;
    try {
      res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      throw new Error("Gagal menghubungi server saat menyegarkan sesi.");
    }

    if (!res.ok) {
      clearSession();
      throw new Error("Refresh token tidak valid atau telah kedaluwarsa.");
    }

    const json = (await res.json()) as {
      data?: { accessToken?: string; refreshToken?: string };
    };
    const accessToken = json.data?.accessToken;
    const newRefreshToken = json.data?.refreshToken;
    if (!accessToken || !newRefreshToken) {
      clearSession();
      throw new Error("Respons refresh tidak lengkap.");
    }

    setSession({ accessToken, refreshToken: newRefreshToken });
    return accessToken;
  })();

  inFlight = pending;
  void pending
    .catch(() => undefined)
    .finally(() => {
      if (inFlight === pending) inFlight = null;
    });

  return pending;
}
