import { CatatanHarian } from "@/types/catatanHarian";
import { supabase } from "@/utils/supabase";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";

// Tipe data gabungan untuk tugas beserta data kandang terkait
export interface TaskWithKandang extends CatatanHarian {
  kandang: {
    nama_kandang: string;
  } | null;
}

// Tipe untuk nilai yang disediakan oleh context
interface TaskContextType {
  tasks: TaskWithKandang[];
  loading: boolean;
  error: string | null;
  refetchTasks: () => Promise<void>;
  updateTaskStatus: (taskId: string, currentStatus: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TaskWithKandang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    // Tidak set loading ke true di sini agar refresh lebih mulus
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

    const { data, error } = await supabase
      .from("catatan_harian")
      .select(`*, kandang:kandang_id ( nama_kandang )`)
      .gte("jam_tugas", startOfDay)
      .lt("jam_tugas", endOfDay)
      .order("jam_tugas", { ascending: true });

    if (error) {
      setError(error.message);
      setTasks([]);
    } else {
      setTasks(data as TaskWithKandang[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  const updateTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Selesai" ? "Belum" : "Selesai";
    
    // Optimistic Update: langsung ubah state di UI
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId ? { ...task, status_tugas: newStatus } : task
      )
    );

    // Kirim perubahan ke database di background
    const { error } = await supabase
      .from("catatan_harian")
      .update({ status_tugas: newStatus })
      .eq("id", taskId);
    
    // Jika gagal, kembalikan state ke semula dan tampilkan error
    if (error) {
      Alert.alert("Error", "Gagal memperbarui status. Perubahan dibatalkan.");
      fetchTasks(); // Ambil data lagi dari server untuk sinkronisasi
    }
  };

  const value = {
    tasks,
    loading,
    error,
    refetchTasks: fetchTasks,
    updateTaskStatus,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}