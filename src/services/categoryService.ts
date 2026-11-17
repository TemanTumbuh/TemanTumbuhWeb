import { http, unwrapData } from "@/lib/http";
import type { Category } from "@/types/post.types";

/**
 * `GET /api/v1/categories` — publik. Tanpa token, backend hanya mengirim
 * kategori yang aktif.
 */
export async function listCategories(signal?: AbortSignal): Promise<Category[]> {
  const body = await http.get("/api/v1/categories", { signal });
  return unwrapData<Category[]>(body) ?? [];
}
