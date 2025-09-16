import { useCallback, useEffect, useState } from "react";
import { CatatanHarian } from "../types/catatanHarian"; // Impor tipe dasar
import { supabase } from "../utils/supabase";

// Tipe data baru untuk menampung data gabungan dari catatan_harian dan kandang
export interface CatatanHarianWithKandang extends CatatanHarian {
  kandang: {
    nama_kandang: string;
  } | null;
}

// Hook sekarang tidak perlu parameter, karena akan mengambil semua tugas hari ini
export const useCatatanHarian = () => {
  const [tasks, setTasks] = useState<CatatanHarianWithKandang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);

    // Tentukan awal dan akhir hari ini untuk filter
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).toISOString();
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    ).toISOString();

    // Kueri baru dengan relasi ke tabel 'kandang'
    const { data, error } = await supabase
      .from("catatan_harian")
      .select(
        `
        *,
        kandang:kandang_id ( nama_kandang )
      `
      )
      .gte("jam_tugas", startOfDay)
      .lt("jam_tugas", endOfDay)
      .order("jam_tugas", { ascending: true });

    if (error) {
      setError(error.message);
      setTasks([]); // Kembalikan array kosong jika error
    } else {
      setTasks(data as CatatanHarianWithKandang[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Kembalikan fetchTasks sebagai 'refetch' untuk fitur pull-to-refresh
  return { tasks, loading, error, refetch: fetchTasks };
};
