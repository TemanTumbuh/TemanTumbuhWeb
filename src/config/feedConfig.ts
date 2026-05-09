import { Category, User, Post } from "@/types/feed.types";

// Dummy users
export const DUMMY_USERS: User[] = [
  {
    id: "admin-1",
    name: "Nekocha",
    email: "admin@gmail.com",
    avatar:
      "https://instagram.fcgk33-1.fna.fbcdn.net/v/t51.82787-19/620241838_18069025826400628_5704087553553793955_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fcgk33-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gFICBaf8_WFdQXOy81RguZE0fSy8C54XrzySTsk_r2emNgttLYqlRXVYGo0db9NNbTh8g5o1M45GIYbQ-oQALLR&_nc_ohc=zPmrTmZ7vtsQ7kNvwHCzlHb&_nc_gid=QjuwPrQDprN-7WsSFPqJUA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af70KGM6HPhZyff6wDXfhHesn8-e4jrEZFNOj_NnCqDtNA&oe=6A04BBD0&_nc_sid=7a9f4b",
    username: "admin_temantumbuh",
    bio: "Administrator",
    role: "admin",
  },
  {
    id: "user-1",
    name: "Arif Budiman",
    email: "user1@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    username: "arif_budiman",
    bio: "Growth enthusiast & nature lover",
    role: "user",
  },
  {
    id: "user-2",
    name: "Sari Anstari",
    email: "user2@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    username: "sari_anstari",
    bio: "Self-care advocate",
    role: "user",
  },
  {
    id: "user-3",
    name: "Maya Putri",
    email: "user3@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    username: "maya_putri",
    bio: "Creative storyteller",
    role: "user",
  },
  {
    id: "user-4",
    name: "Budi Santoso",
    email: "user4@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    username: "budi_santoso",
    bio: "Career coach",
    role: "user",
  },
];

// Dummy categories
export const DUMMY_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Semua Tumbuhan", icon: "Leaf", slug: "semua" },
  { id: "cat-2", name: "Growth", icon: "TrendingUp", slug: "growth" },
  { id: "cat-3", name: "Karir", icon: "Briefcase", slug: "karir" },
  { id: "cat-4", name: "Self-Care", icon: "Heart", slug: "self-care" },
  {
    id: "cat-5",
    name: "Self-Development",
    icon: "Lightbulb",
    slug: "self-development",
  },
  { id: "cat-6", name: "Creative", icon: "Palette", slug: "creative" },
];

// Dummy posts with images from internet
export const DUMMY_POSTS: Post[] = [
  {
    id: "post-1",
    userId: "user-1",
    user: DUMMY_USERS[1],
    content:
      "Pagi ini saya belajar tentang pentingnya mindfulness dalam kehidupan sehari-hari. Ternyata dengan meluangkan waktu 10 menit setiap pagi untuk bermeditasi, produktivitas saya meningkat signifikan. Siapa di sini yang sudah mencoba mindfulness?",
    image:
      "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=1200&h=675&fit=crop",
    category: "self-care",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 145,
    comments: 28,
    shares: 12,
    isLiked: false,
  },
  {
    id: "post-2",
    userId: "user-2",
    user: DUMMY_USERS[2],
    content:
      "Hari ini saya mencoba resep smoothie baru yang sehat dan lezat! Kombinasi buah-buahan segar dengan yogurt membuat energi saya melonjak di sore hari. Berikut kombinasinya: pisang, blueberry, madu, dan greek yogurt.",
    image:
      "https://images.unsplash.com/photo-1662130187270-a4d52c700eb6?w=1200&h=675&fit=crop",
    category: "self-care",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 203,
    comments: 45,
    shares: 18,
    isLiked: false,
  },
  {
    id: "post-3",
    userId: "user-3",
    user: DUMMY_USERS[3],
    content:
      "Sudah baca buku 'Atomic Habits' dan benar-benar berubah cara saya melihat produktivitas. Ternyata hal-hal kecil yang dilakukan setiap hari jauh lebih penting daripada usaha besar sekali-sekali. Siapa yang sudah baca?",
    category: "self-development",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 312,
    comments: 67,
    shares: 42,
    isLiked: false,
  },
  {
    id: "post-4",
    userId: "user-4",
    user: DUMMY_USERS[4],
    content:
      "Tips karir yang saya pelajari dari mentor saya: Jangan menunggu momen yang sempurna untuk memulai perubahan. Ambil tindakan sekarang, bahkan jika hanya 1% lebih baik dari kemarin. Konsistensi adalah kunci kesuksesan jangka panjang.",
    category: "karir",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 267,
    comments: 38,
    shares: 29,
    isLiked: false,
  },
  {
    id: "post-5",
    userId: "user-1",
    user: DUMMY_USERS[1],
    content:
      "Perjalanan saya ke pegunungan minggu lalu mengajarkan banyak hal tentang kesederhanaan dan apresiasi terhadap alam. Foto ini diambil saat matahari terbit dengan pemandangan yang spektakuler.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop",
    category: "growth",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 456,
    comments: 92,
    shares: 67,
    isLiked: false,
  },
  {
    id: "post-6",
    userId: "user-2",
    user: DUMMY_USERS[2],
    content:
      "Memulai hari dengan jurnal pagi selama 3 bulan memberikan clarity yang luar biasa pada tujuan hidup saya. Saya merekomendasikan siapa pun untuk mencoba praktik ini. Hanya butuh 15 menit setiap pagi!",
    category: "self-development",
    timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
    likes: 189,
    comments: 34,
    shares: 15,
    isLiked: false,
  },
  {
    id: "post-7",
    userId: "user-3",
    user: DUMMY_USERS[3],
    content:
      "Saya baru saja menyelesaikan proyek desain yang menantang! Proses desain kali ini mengajarkan saya pentingnya iterasi dan feedback dari tim. Senang berbagi hasil akhirnya dengan komunitas Teman Tumbuh.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop",
    category: "creative",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 234,
    comments: 51,
    shares: 36,
    isLiked: false,
  },
  {
    id: "post-8",
    userId: "user-4",
    user: DUMMY_USERS[4],
    content:
      "Networking di event komunitas minggu lalu membuka peluang kolaborasi baru yang exciting! Belajar bahwa setiap orang yang kita temui memiliki cerita dan lesson yang berharga untuk dibagikan.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop",
    category: "karir",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likes: 198,
    comments: 43,
    shares: 22,
    isLiked: false,
  },
  {
    id: "post-9",
    userId: "user-1",
    user: DUMMY_USERS[0],
    content:
      "Menghabiskan sore ini dengan membaca di taman sambil menikmati udara segar. Buku yang sedang saya baca sekarang sangat menginspirasi dan membuat saya berpikir lebih dalam tentang kehidupan.",
    category: "self-care",
    timestamp: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000),
    likes: 167,
    comments: 29,
    shares: 11,
    isLiked: false,
  },
  {
    id: "post-10",
    userId: "user-2",
    user: DUMMY_USERS[1],
    content:
      "Yoga pagi hari menjadi ritual harian saya sekarang. Rasakan bedanya di level energi, mood, dan fokus saya sepanjang hari. Siapa yang juga melakukan yoga atau meditasi secara rutin?",
    image:
      "https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg?w=1200&h=675&fit=crop",
    category: "self-care",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    likes: 289,
    comments: 56,
    shares: 31,
    isLiked: false,
  },
  {
    id: "post-11",
    userId: "user-3",
    user: DUMMY_USERS[2],
    content:
      "Tantangan baru di bulan ini: membuat 30 sketch dalam 30 hari untuk meningkatkan skill drawing saya. Hari ke-15 sudah selesai dan saya sudah lihat progress yang signifikan. Siapa yang ingin join challenge ini?",
    category: "creative",
    timestamp: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000),
    likes: 134,
    comments: 24,
    shares: 19,
    isLiked: false,
  },
  {
    id: "post-12",
    userId: "user-4",
    user: DUMMY_USERS[3],
    content:
      "Baru saja mendapat promosi di pekerjaan! Terima kasih kepada mentor dan tim saya yang selalu support. Ini adalah hasil dari konsistensi dan dedikasi. Semoga bisa terus berkembang dan memberi dampak positif.",
    category: "karir",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    likes: 421,
    comments: 78,
    shares: 45,
    isLiked: false,
  },
];

// Trending hashtags
export const TRENDING_HASHTAGS = [
  "#SelfCare",
  "#Growth",
  "#Learning",
  "#Mindfulness",
  "#CreativeMind",
  "#CareerGrowth",
];

// API endpoints placeholder
export const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api",
  ENDPOINTS: {
    POSTS: "/posts",
    CATEGORIES: "/categories",
    USERS: "/users",
  },
};

// Feed config
export const FEED_CONFIG = {
  POSTS_PER_PAGE: 12,
  MAX_CONTENT_LENGTH: 280,
};
