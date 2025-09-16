export type Profesi = "zookeeper" | "supervisor" | "dokter";

export interface Profile {
  id: string; 
  created_at: string; 
  full_name: string;
  email: string;
  profesi: Profesi; 
  phone_number?: string | null;
  address?: string | null;
  profile_image_url?: string | null;
  tanggal_lahir?: string; 
}
