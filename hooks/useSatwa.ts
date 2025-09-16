import { useCallback, useEffect, useState } from "react";
import { Satwa } from "../types/satwa";
import { supabase } from "../utils/supabase";

export const useSatwa = (kandangId?: string, satwaId?: string) => {
  const [satwaList, setSatwaList] = useState<Satwa[] | null>(null);
  const [singleSatwa, setSingleSatwa] = useState<Satwa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSatwa = useCallback(async () => {
    let isMounted = true; // Re-initialize isMounted for each refetch

    setLoading(true);
    setError(null);

    if (satwaId) {
      const { data, error } = await supabase
        .from("satwa")
        .select("*")
        .eq("id", satwaId)
        .single();

      if (isMounted) {
        if (error) {
          setError(error.message);
          setSingleSatwa(null);
        } else {
          setSingleSatwa(data as Satwa);
        }
        setSatwaList(null); // Ensure list is null when fetching single
      }
    } else if (kandangId) {
      const { data, error } = await supabase
        .from("satwa")
        .select("*")
        .eq("kandang_id", kandangId);

      if (isMounted) {
        if (error) {
          setError(error.message);
          setSatwaList(null);
        } else {
          setSatwaList(data as Satwa[]);
        }
        setSingleSatwa(null); // Ensure single is null when fetching list
      }
    } else {
      setSatwaList(null);
      setSingleSatwa(null);
    }

    if (isMounted) {
      setLoading(false);
    }
  }, [kandangId, satwaId]); // Dependencies for useCallback

  useEffect(() => {
    fetchSatwa();
  }, [fetchSatwa]); // Dependency on fetchSatwa

  return { satwaList, singleSatwa, loading, error, refetch: fetchSatwa };
};
