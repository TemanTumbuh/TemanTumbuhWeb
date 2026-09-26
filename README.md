# Teman Tumbuh — Web (Frontend)

Next.js 16 (App Router) + React 19 + Tailwind v4. Frontend untuk komunitas Teman Tumbuh.

## Menjalankan secara lokal

```bash
git clone https://github.com/TemanTumbuh/TemanTumbuhWeb.git
cd TemanTumbuhWeb/client
git checkout dev
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Skrip

| Skrip | Kegunaan |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build production |
| `npm run lint` | ESLint (`eslint .`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Format seluruh repo dengan Prettier |
| `npm run format:check` | Cek format tanpa menulis ulang file |

CI (`.github/workflows/ci.yml`) menjalankan lint → typecheck → build pada tiap push/PR.

## Variabel environment

Salin `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

| Variabel | Kegunaan |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL API yang dipanggil browser. Default `/bff` — lewat proxy same-origin (lihat di bawah). |
| `API_PROXY_TARGET` | Origin API sebenarnya yang dituju proxy `/bff/*` (dibaca `next.config.ts`, sisi server saja). |

**Kenapa ada proxy `/bff`?** Backend (`https://dev.api.temantumbuh.czn.my.id`) belum mengaktifkan
CORS. `next.config.ts` men-`rewrites()` semua panggilan `/bff/*` ke API tersebut sehingga dari sudut
pandang browser semuanya same-origin. Base URL API bisa diarahkan langsung (tanpa proxy) begitu
backend mengaktifkan CORS — cukup ubah `NEXT_PUBLIC_API_URL` ke origin API penuh.

## Struktur folder

```
src/
├─ app/                    Route Next.js (App Router)
│  ├─ (auth)/              Halaman auth — layout tanpa Navbar
│  ├─ (main)/              Halaman publik — layout dengan Navbar + Footer
│  └─ admin/               Panel admin (dilindungi client-side, lihat AdminLayout)
├─ components/             Komponen React, dikelompokkan per domain
├─ config/                 Salinan/label statis (bukan environment config)
├─ context/                AuthContext (sesi user) & AdminContext
├─ hooks/                  Custom hooks (data feed, kategori, auth)
├─ lib/
│  ├─ http/                HTTP client — envelope normalizer, ApiError, retry
│  ├─ auth/                Token store + refresh-token flow
│  ├─ api/admin/mocks/     Data mock untuk panel admin (belum ada backend-nya)
│  ├─ constants/           Konstanta bersama (menu admin, dll.)
│  └─ feedHelpers.ts       Helper format tanggal, dll.
└─ types/                  Definisi TypeScript
```

## Status integrasi backend

Backend: Express + Supabase, dev di `https://dev.api.temantumbuh.czn.my.id` (Swagger di `/api-docs`).

**Sudah tersambung ke API nyata:** *(diisi seiring PR integrasi berjalan)*

**Masih mock/dummy:**
- Seluruh panel admin (`src/app/admin/**`) — backend belum punya endpoint terkait, dan
  otorisasi role di backend belum berfungsi.
- Halaman `forgot-password` / `reset-password/[token]` — backend belum punya endpoint ini.
- Filter kategori di feed — menunggu backend menyediakan `GET /categories`.
- `komunitas`, `tentang-kami`, `jadwal-aktivitas` — halaman placeholder, konten aslinya
  masih di landing page (`app/(main)/page.tsx`) via anchor.

Detail lengkap gap backend & rencana integrasi ada di dokumen internal tim.
