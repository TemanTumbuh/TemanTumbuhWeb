// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  username?: string;

  role: "user" | "admin";
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
   * `false` selama SSR dan render hydration pertama — saat itu `currentUser`
   * selalu null walaupun sebenarnya ada sesi. Tunggu `true` sebelum
   * me-redirect berdasarkan status login.
   */
  isReady: boolean;

  login: (email: string, password: string) => Promise<User | null>;

  logout: () => void;

  /**
   * Perbarui sebagian data user yang sedang login (dipakai Edit Profil).
   * Saat ini hanya menulis ke state + localStorage; nanti di PR integrasi
   * profil ini yang memanggil `PATCH /api/users/:id`.
   */
  updateUser: (patch: Partial<User>) => void;
}
