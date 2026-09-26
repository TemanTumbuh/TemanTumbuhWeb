/**
 * Backend tidak konsisten soal bentuk envelope. Helper di sini memisahkan
 * pengetahuan itu dari `client.ts` — tiap service memilih unwrapper yang tepat
 * untuk endpoint-nya.
 */

/**
 * Bentuk sukses mayoritas endpoint: `{ success: true, data: ... }`.
 * Beberapa (mis. `DELETE /api/v1/posts/:id`, `POST /auth/logout`) hanya
 * mengirim `{ success, message }` tanpa `data` → kembalikan `undefined`.
 */
export function unwrapData<T>(body: unknown): T {
  const b = (body ?? {}) as Record<string, unknown>;
  if ("data" in b) return b.data as T;
  return undefined as T;
}

export interface OffsetMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Khusus `GET /api/users` yang membalas `{ data: [...], meta: {...} }`
 * TANPA kunci `success`.
 */
export function unwrapOffsetList<T>(body: unknown): {
  items: T[];
  meta: OffsetMeta;
} {
  const b = (body ?? {}) as Record<string, unknown>;
  return {
    items: Array.isArray(b.data) ? (b.data as T[]) : [],
    meta: (b.meta ?? {}) as OffsetMeta,
  };
}
