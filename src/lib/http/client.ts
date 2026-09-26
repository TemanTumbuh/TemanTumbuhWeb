import { API_BASE_URL } from "./config";
import { ApiError } from "./ApiError";
import { getAccessToken } from "../auth/tokenStore";
import { refreshAccessToken } from "../auth/refresh";

type QueryValue = string | number | boolean | null | undefined;

export interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  /**
   * Objek biasa → dikirim sebagai JSON.
   * `FormData` → dikirim apa adanya (browser yang menetapkan `Content-Type`
   * multipart + boundary).
   */
  body?: Record<string, unknown> | FormData | null;
  /** Sertakan header `Authorization: Bearer <accessToken>`. */
  auth?: boolean;
  /** Query string; entri bernilai `null` / `undefined` dilewati. */
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (!query) return url;

  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== null && value !== undefined) qs.append(key, String(value));
  }
  const serialized = qs.toString();
  return serialized ? `${url}?${serialized}` : url;
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204) return undefined;
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function doRequest<T>(
  path: string,
  opts: RequestOptions,
  isRetry: boolean,
): Promise<T> {
  const {
    method = "GET",
    body,
    auth = false,
    query,
    signal,
    headers = {},
  } = opts;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body;
  } else if (body != null) {
    finalHeaders["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  if (auth) {
    const token = getAccessToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      headers: finalHeaders,
      body: payload,
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw ApiError.network();
  }

  // Access token kedaluwarsa → refresh sekali (single-flight), lalu ulangi.
  if (res.status === 401 && auth && !isRetry) {
    try {
      await refreshAccessToken();
    } catch {
      throw new ApiError({
        message: "Sesi Anda telah berakhir. Silakan masuk kembali.",
        status: 401,
        code: "SESSION_EXPIRED",
      });
    }
    return doRequest<T>(path, opts, true);
  }

  const parsed = await parseBody(res);
  if (!res.ok) throw ApiError.fromResponse(res.status, parsed);
  return parsed as T;
}

function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  return doRequest<T>(path, opts, false);
}

type BodylessOptions = Omit<RequestOptions, "method" | "body">;

/**
 * Semua metode mengembalikan **body JSON mentah** (belum di-unwrap). Panggil
 * `unwrapData` / `unwrapOffsetList` dari `./envelope` di lapisan service.
 */
export const http = {
  get: <T>(path: string, opts?: BodylessOptions) =>
    request<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: RequestOptions["body"], opts?: BodylessOptions) =>
    request<T>(path, { ...opts, method: "POST", body }),
  patch: <T>(path: string, body?: RequestOptions["body"], opts?: BodylessOptions) =>
    request<T>(path, { ...opts, method: "PATCH", body }),
  del: <T>(path: string, opts?: BodylessOptions) =>
    request<T>(path, { ...opts, method: "DELETE" }),
};
