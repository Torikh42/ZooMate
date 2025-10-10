import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/Colors";
import { useTasks } from "../context/TaskContext"; 

export default function TodaySchedule() {
  const router = useRouter();
  const { tasks, loading, updateTaskStatus } = useTasks();

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const topThreeTasks = tasks?.slice(0, 3) || [];

  return (
    <View className="mt-5">
      <Text
        className="font-bold mb-2 text-2xl"
        style={{ color: colors.yellow.darkHover }}
      >
        Cek Jadwal Hari Ini
      </Text>

      <View
        className="rounded-xl p-3 border-2"
        style={{
          backgroundColor: colors.yellow.normal,
          borderColor: "rgba(183, 142, 33, 0.15)",
        }}
      >
        {topThreeTasks.length > 0 ? (
          topThreeTasks.map((task) => {
            const isDone = task.status_tugas === "Selesai";
            return (
              <View key={task.id} className="flex-row items-center mb-2">
                <TouchableOpacity
                  onPress={() => updateTaskStatus(task.id, task.status_tugas)} // Panggil fungsi dari context
                  className="w-6 h-6 rounded-md border-2 justify-center items-center mr-2"
                  style={{
                    borderColor: colors.yellow.darkActive,
                    backgroundColor: isDone ? colors.yellow.darkActive : "#fff",
                  }}
                >
                  {isDone && (
                    <MaterialIcons name="check" size={18} color="white" />
                  )}
                </TouchableOpacity>
                <View
                  style={{ backgroundColor: colors.yellow.lightActive }}
                  className="flex-1 h-8 rounded-md justify-center px-2"
                >
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {task.jenis_tugas} - {task.kandang?.nama_kandang || "N/A"}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text className="text-center text-gray-500 py-5">
            Tidak ada tugas untuk hari ini.
          </Text>
        )}

        <TouchableOpacity
          style={{ backgroundColor: colors.yellow.darker }}
          activeOpacity={0.9}
          className="mt-1 py-2 rounded-lg items-center"
          onPress={() => router.push("/(untabs)/schedule")} 
        >
          <Text className="text-white font-bold">Cek Jadwal Saya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
