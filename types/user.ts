export type Profesi = "zookeeper" | "supervisor" | "dokter";

// Ganti nama dari User menjadi Profile
export interface Profile {
  id: string; // Wajib ada
  created_at: string; // Wajib ada
  full_name: string;
  email: string;
  profesi: Profesi; // Menggunakan union type yang lebih aman
  phone_number?: string | null;
  address?: string | null;
  profile_image_url?: string | null;
  tanggal_lahir?: string; // Add this line
  // Properti 'password' sudah dihapus
}
