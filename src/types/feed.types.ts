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

// Feed state
export interface FeedState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  activeCategory: string;
}

// Auth context type
export interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;

  login: (email: string, password: string) => Promise<User | null>;

  logout: () => void;
}
