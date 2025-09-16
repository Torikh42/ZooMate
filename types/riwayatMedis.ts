export interface RiwayatMedis {
  id: string; 
  created_at: string; 
  satwa_id: string; 
  tanggal_tindakan: string; 
  jenis_tindakan: "Vaksinasi" | "Operasi" | "Pemeriksaan" | "Lainnya";
  deskripsi: string;
  dokter_id?: string | null; 
}
