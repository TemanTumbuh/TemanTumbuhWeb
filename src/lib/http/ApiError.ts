export interface ApiErrorDetail {
  field?: string;
  message: string;
}

/**
 * Error terstandardisasi untuk semua kegagalan panggilan API.
 *
 * - `status === 0` dan `isNetworkError === true` → `fetch` gagal (offline / DNS /
 *   CORS / server mati).
 * - `status >= 400` → server membalas non-2xx; `details` berisi error per-field
 *   dari `ValidationError` Zod bila ada.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details: ApiErrorDetail[];
  readonly isNetworkError: boolean;

  constructor(opts: {
    message: string;
    status: number;
    code?: string;
    details?: ApiErrorDetail[];
    isNetworkError?: boolean;
  }) {
    super(opts.message);
    this.name = "ApiError";
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details ?? [];
    this.isNetworkError = opts.isNetworkError ?? false;
  }

  static network(
    message = "Tidak dapat terhubung ke server. Periksa koneksi Anda.",
  ): ApiError {
    return new ApiError({ message, status: 0, isNetworkError: true });
  }

  /**
   * Bangun dari body JSON error backend. Menangani dua bentuk:
   *  - `{ success: false, message }`                         (error bisnis)
   *  - `{ error, message, details: [{ path, message }] }`    (ValidationError Zod)
   */
  static fromResponse(status: number, body: unknown): ApiError {
    const b = (body ?? {}) as Record<string, unknown>;

    const rawDetails = Array.isArray(b.details) ? b.details : [];
    const details: ApiErrorDetail[] = rawDetails.map((d) => {
      const dd = (d ?? {}) as Record<string, unknown>;
      return {
        field: typeof dd.path === "string" ? dd.path : undefined,
        message:
          typeof dd.message === "string" ? dd.message : JSON.stringify(dd),
      };
    });

    const message =
      (typeof b.message === "string" && b.message) ||
      (typeof b.error === "string" && b.error) ||
      `Permintaan gagal (HTTP ${status}).`;

    return new ApiError({
      message,
      status,
      code: typeof b.error === "string" ? b.error : undefined,
      details,
    });
  }
}
