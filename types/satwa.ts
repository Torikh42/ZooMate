export interface Satwa {
  id: string; 
  created_at: string; 
  kandang_id: string; 
  nama_satwa: string;
  spesies: string;
  tanggal_lahir: string; 
  jenis_kelamin: "Jantan" | "Betina"; 
  berat_badan?: number | null;
  tinggi_badan?: number | null;
  jenis_makanan?: string | null;
  porsi_harian?: string | null;
  image_url?: string | null;
}
