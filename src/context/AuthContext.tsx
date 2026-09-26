"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

import { User, AuthContextType } from "@/types/feed.types";
import { DUMMY_USERS } from "@/config/feedConfig";
import { isAllowedImageSrc } from "@/lib/imageHosts";
import { useMounted } from "@/hooks/useMounted";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// Store sesi (mock) di atas localStorage
// ============================================
//
// Sebelumnya sesi dibaca dari localStorage di initializer useState. Di server
// localStorage tidak ada (→ null), sedangkan di render client pertama sudah ada
// (→ user) — HTML-nya berbeda sehingga React melempar hydration error.
//
// useSyncExternalStore menyelesaikannya: selama hydration React memakai
// getServerSnapshot (null, sama persis dengan HTML server), lalu langsung
// render ulang dengan nilai client. Bonus: sesi ikut sinkron antar-tab lewat
// event "storage".

const STORAGE_KEY = "currentUser";

const listeners = new Set<() => void>();

// Cadangan in-memory bila localStorage tidak bisa dipakai (mode privat /
// storage diblokir) — supaya login tetap jalan selama tab terbuka.
let memoryRaw: string | null = null;

// getSnapshot wajib mengembalikan referensi yang sama selama datanya tidak
// berubah, kalau tidak React akan render tanpa henti. Hasil parse di-cache per
// string mentah.
let cachedRaw: string | null | undefined;
let cachedUser: User | null = null;

function parseUser(raw: string | null): User | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as User;

    // Sesi lama bisa membawa URL avatar dari host yang sudah tidak diizinkan
    // lagi (mis. link CDN bertanda tangan yang kedaluwarsa), atau kosong karena
    // objek user disimpan sebelum avatar dummy ditambahkan. Coba pulihkan dari
    // DUMMY_USERS (cocokkan by id, fallback email) supaya sesi yang sudah
    // berjalan otomatis mendapat foto terbaru tanpa perlu logout — baru jatuh
    // ke inisial (UserAvatar) bila memang tak ada padanan.
    if (!isAllowedImageSrc(parsed.avatar)) {
      const known = DUMMY_USERS.find(
        (u) => u.id === parsed.id || u.email === parsed.email,
      );

      parsed.avatar = isAllowedImageSrc(known?.avatar) ? known!.avatar : "";
    }

    return parsed;
  } catch (error) {
    console.error("Failed to parse user", error);
    return null;
  }
}

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return memoryRaw;
  }
}

function getSnapshot(): User | null {
  const raw = readRaw();

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedUser = parseUser(raw);
  }

  return cachedUser;
}

const getServerSnapshot = (): User | null => null;

function writeUser(user: User | null) {
  memoryRaw = user ? JSON.stringify(user) : null;

  try {
    if (memoryRaw) localStorage.setItem(STORAGE_KEY, memoryRaw);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage tidak tersedia — memoryRaw yang dipakai */
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // false selama SSR + render hydration (saat currentUser pasti null), true
  // setelahnya. Komponen yang me-redirect berdasarkan status login wajib
  // menunggu ini — kalau tidak, user yang sebenarnya sudah login akan
  // terlempar ke /login pada render pertama.
  const isReady = useMounted();

  const isLoggedIn = !!currentUser;

  const login = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      // simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      const validUsers = [
        {
          email: "user1@gmail.com",
          password: "user1",
          user: DUMMY_USERS[1],
        },
        {
          email: "user2@gmail.com",
          password: "user2",
          user: DUMMY_USERS[2],
        },
        {
          email: "user3@gmail.com",
          password: "user3",
          user: DUMMY_USERS[3],
        },
        {
          email: "user4@gmail.com",
          password: "user4",
          user: DUMMY_USERS[4],
        },
        {
          email: "admin@gmail.com",
          password: "admin123",
          user: DUMMY_USERS[0],
        },
      ];

      const matchedUser = validUsers.find(
        (item) => item.email === email && item.password === password,
      );

      if (!matchedUser) {
        return null;
      }

      writeUser(matchedUser.user);

      return matchedUser.user;
    },
    [],
  );

  const logout = useCallback(() => {
    writeUser(null);
  }, []);

  // Dipakai halaman profil (Edit Profil). Masih lokal: localStorage.
  // Saat integrasi profil dikerjakan, ini yang memanggil PATCH /api/users/:id
  // lalu menyimpan hasil dari server, bukan menyimpan input mentah.
  const updateUser = useCallback((patch: Partial<User>) => {
    const prev = getSnapshot();
    if (!prev) return;

    writeUser({ ...prev, ...patch });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isReady,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
