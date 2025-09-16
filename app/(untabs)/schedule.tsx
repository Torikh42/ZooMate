import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { useTasks, TaskWithKandang } from "@/context/TaskContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Komponen untuk menampilkan satu item tugas
const TaskItem = ({
  task,
  onUpdateStatus,
}: {
  task: TaskWithKandang;
  onUpdateStatus: (taskId: string, currentStatus: string) => void;
}) => {
  const isDone = task.status_tugas === "Selesai";

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <View className="bg-yellow-100 rounded-2xl p-4 mb-3 flex-row items-center shadow-sm">
      <View className="flex-1">
        <Text
          className="font-bold text-yellow-900 text-base mb-1"
          numberOfLines={1}
        >
          {task.jenis_tugas} - {task.kandang?.nama_kandang || "Kandang Dihapus"}
        </Text>
        <Text className="text-gray-500 text-sm">
          {formatTime(task.jam_tugas)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onUpdateStatus(task.id, task.status_tugas)}>
        <View
          className="flex-row items-center rounded-lg px-3 py-1 ml-2"
          style={{
            backgroundColor: isDone ? colors.greenSoft : colors.redSoft,
          }}
        >
          <Text
            className="font-bold mr-1"
            style={{ color: isDone ? colors.greenDark : colors.redDark }}
          >
            {task.status_tugas}
          </Text>
          <MaterialIcons
            name={isDone ? "check-circle" : "pending"}
            size={18}
            color={isDone ? colors.greenDark : colors.redDark}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Komponen utama halaman Jadwal
export default function Schedule() {
  const router = useRouter();
  // Mengambil semua data dan fungsi dari TaskContext
  const { tasks, loading, error, refetchTasks, updateTaskStatus } = useTasks();
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi untuk fitur pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetchTasks();
    setRefreshing(false);
  }, [refetchTasks]);

  // Tampilan saat loading awal
  if (loading) {
    return (
      <ActivityIndicator
        className="flex-1"
        size="large"
        color={colors.yellow.darker}
      />
    );
  }

  // Tampilan jika ada error
  if (error) {
      return (
          <View className="flex-1 justify-center items-center p-4">
              <Text className="text-red-500 text-center">Gagal memuat jadwal: {error}</Text>
          </View>
      )
  }

  return (
    <View className="flex-1 bg-white pt-6 mt-5">
      <View className="px-4">
        <HeaderTop title="Jadwal Tugas Hari Ini" />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.yellow.darker}
          />
        }
      >
        {tasks.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            Tidak ada tugas untuk hari ini.
          </Text>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateStatus={updateTaskStatus}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        className="absolute right-6 bottom-6 bg-yellow-300 rounded-full p-4 shadow-lg"
        onPress={() => router.push("/(untabs)/addSchedule")} // Pastikan path ini benar
      >
        <MaterialIcons name="add" size={32} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}