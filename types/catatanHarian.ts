export interface CatatanHarian {
  id: string;
  created_at: string; 
  kandang_id: string;
  keeper_id?: string | null; 
  jam_tugas: string;
  jenis_tugas: "Pakan" | "Kebersihan" | "Observasi" | "Lainnya";
  status_tugas: "Belum" | "Selesai"
  catatan_tugas?: string | null;
}
