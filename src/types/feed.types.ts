// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  username?: string;

  role: "user" | "admin";
  /** Id role dari backend. Belum dipakai FE sampai backend mengirim nama role (gap N2). */
  roleId?: number | null;
  /** ISO 8601 — kapan akun dibuat. */
  createdAt?: string;
}

// Post interface
export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  category: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

// Auth context type
export interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;

  /**
   * `false` selama sesi masih dipulihkan (SSR, lalu refresh token → `/auth/me`
   * di client). Selama itu `currentUser` null walaupun sebenarnya ada sesi —
   * tunggu `true` sebelum me-redirect berdasarkan status login.
   */
  isReady: boolean;

  /** Lempar `ApiError` bila gagal (mis. email/kata sandi salah). */
  login: (email: string, password: string) => Promise<User>;

  /** Daftar lalu langsung login. Lempar `ApiError` bila gagal. */
  register: (input: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<User>;

  /** Cabut refresh token di server (best-effort) lalu hapus sesi lokal. */
  logout: () => Promise<void>;

  /**
   * Perbarui sebagian data user di memori (dipakai Edit Profil). Belum
   * tersimpan ke server — integrasi profil (PR5) yang memanggil
   * `PATCH /api/users/:id`.
   */
  updateUser: (patch: Partial<User>) => void;
}
