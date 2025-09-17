// useKandang.ts
import { useCallback, useEffect, useState } from "react";
import { Kandang } from "../types/kandang";
import { supabase } from "../utils/supabase";

export const useKandang = () => {
  const [kandangData, setKandangData] = useState<Kandang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKandang = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("kandang")
      .select("id, created_at, nama_kandang, lokasi, latitude, longitude, status_pakan");

    if (error) {
      setError(error.message);
      setKandangData([]);
    } else {
      setKandangData(data as Kandang[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchKandang();
  }, [fetchKandang]);

  return { kandangData, loading, error, refetch: fetchKandang };
};