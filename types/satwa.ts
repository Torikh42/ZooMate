export interface Satwa {
  id: string; // uuid
  created_at: string; // timestamptz
  kandang_id: string; // uuid (foreign key)
  nama_satwa: string;
  spesies: string;
  tanggal_lahir: string; // date (format: 'YYYY-MM-DD')
  jenis_kelamin: "Jantan" | "Betina"; // Union type untuk pilihan terbatas
  berat_badan?: number | null;
  tinggi_badan?: number | null;
  jenis_makanan?: string | null;
  porsi_harian?: string | null;
}
