export interface RiwayatMedis {
  id: string; // uuid
  created_at: string; // timestamptz
  satwa_id: string; // uuid (foreign key)
  tanggal_tindakan: string; // date
  jenis_tindakan: "Vaksinasi" | "Operasi" | "Pemeriksaan" | "Lainnya";
  deskripsi: string;
  dokter_id?: string | null; // uuid (foreign key, opsional)
}
