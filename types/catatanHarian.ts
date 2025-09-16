export interface CatatanHarian {
  id: string; // uuid
  created_at: string; // timestamptz
  kandang_id: string; // uuid (foreign key)
  keeper_id?: string | null; // uuid (foreign key, opsional)
  jam_tugas: string; // timestamptz (akan diterima sebagai string ISO)
  jenis_tugas: "Pakan" | "Kebersihan" | "Observasi" | "Lainnya";
  status_tugas: "Belum" | "Selesai"
  catatan_tugas?: string | null;
}
