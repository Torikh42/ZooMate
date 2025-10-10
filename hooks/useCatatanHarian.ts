import { useCallback, useEffect, useState } from "react";
import { CatatanHarian } from "../types/catatanHarian"; 
import { supabase } from "../utils/supabase";

export interface CatatanHarianWithKandang extends CatatanHarian {
  kandang: {
    nama_kandang: string;
  } | null;
}

export const useCatatanHarian = () => {
  const [tasks, setTasks] = useState<CatatanHarianWithKandang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);

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
      setTasks([]); 
    } else {
      setTasks(data as CatatanHarianWithKandang[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};
