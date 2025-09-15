import { useState, useEffect, useCallback } from "react";
import { supabase } from "../utils/supabase";
import { CatatanHarian } from "../types/catatanHarian"; // Pastikan path ini benar

export const useCatatanHarian = (satwaId?: string) => {
  // 1. Ubah tipe state menjadi array: CatatanHarian[]
  const [catatanHarianData, setCatatanHarianData] = useState<CatatanHarian[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCatatanHarian = useCallback(async () => {
    if (!satwaId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // 2. Dapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // 3. Tambahkan filter tanggal dan hapus .single()
    const { data, error } = await supabase
      .from("catatan_harian")
      .select("*")
      .eq("satwa_id", satwaId)
      .eq("tanggal_catatan", today); // <-- Filter tambahan

    if (error) {
      setError(error.message);
      setCatatanHarianData(null);
    } else {
      // Data di sini akan selalu berupa array (bisa berisi 0 atau 1 item)
      setCatatanHarianData(data);
      setError(null);
    }
    setLoading(false);
  }, [satwaId]); // Dependency on satwaId for useCallback

  useEffect(() => {
    fetchCatatanHarian();
  }, [fetchCatatanHarian]); // Dependency on fetchCatatanHarian

  return { catatanHarianData, loading, error, refetch: fetchCatatanHarian };
};
