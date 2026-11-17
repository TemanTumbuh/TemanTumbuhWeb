import { http, unwrapData } from "@/lib/http";
import type { UserDto } from "@/lib/normalize/user";

export interface AuthResult {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/** `POST /auth/register` — langsung login (backend mengembalikan token). */
export async function register(input: RegisterInput): Promise<AuthResult> {
  const body = await http.post("/auth/register", { ...input });
  return unwrapData<AuthResult>(body);
}

/** `POST /auth/login` */
export async function login(email: string, password: string): Promise<AuthResult> {
  const body = await http.post("/auth/login", { email, password });
  return unwrapData<AuthResult>(body);
}

/** `POST /auth/logout` — mencabut refresh token di server. */
export async function logout(refreshToken: string): Promise<void> {
  await http.post("/auth/logout", { refreshToken });
}

/** `GET /auth/me` — user yang sedang login. */
export async function me(signal?: AbortSignal): Promise<UserDto> {
  const body = await http.get("/auth/me", { auth: true, signal });
  return unwrapData<UserDto>(body);
}
