export interface Kandang {
  id: string;
  created_at?: string;
  nama_kandang: string;
  lokasi: string | null;
  latitude: number;
  longitude: number;
  status_pakan: "Belum Diberi" | "Sudah Diberi";
}
