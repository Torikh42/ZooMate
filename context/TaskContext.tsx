import { CatatanHarian } from "@/types/catatanHarian";
import { supabase } from "@/utils/supabase";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";

export interface TaskWithKandang extends CatatanHarian {
  kandang: {
    nama_kandang: string;
  } | null;
}

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

    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId ? { ...task, status_tugas: newStatus } : task
      )
    );

    const { error } = await supabase
      .from("catatan_harian")
      .update({ status_tugas: newStatus })
      .eq("id", taskId);

    if (error) {
      Alert.alert("Error", "Gagal memperbarui status. Perubahan dibatalkan.");
      fetchTasks(); 
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