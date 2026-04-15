/**
 * Konfigurasi API untuk Teman Tumbuh
 * 
 * File ini berisi alamat dan konfigurasi yang diperlukan untuk 
 * menyambungkan frontend (Next.js) dengan backend (Laravel 11).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  USER_PROFILE: `${API_BASE_URL}/auth/me`,

  // Komunitas endpoints
  COMMUNITIES: `${API_BASE_URL}/communities`,
  
  // Jadwal Aktivitas
  ACTIVITIES: `${API_BASE_URL}/activities`,
};

/**
 * Contoh utility function untuk melakukan fetch request dengan token
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = null;
  
  // Ambil token dari local storage jika ada (dijalankan di sisi client)
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}
