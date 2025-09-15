export interface CatatanHarian {
  id: string; // uuid
  created_at: string; // timestamptz
  satwa_id: string; // uuid (foreign key)
  keeper_id?: string | null; // uuid (foreign key, opsional)
  tanggal_catatan: string; // date
  status_pakan: "Belum Diberi" | "Sudah Diberi";
}
