import HeaderTop from "@/components/ui/HeaderTop";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../constants/Colors";

type IconName = "arrow-drop-down" | "check";

type ScheduleItem = {
  title: string;
  time: string;
  status: string;
  statusColor: string;
  statusBg: string;
  icon: IconName;
};

const schedules: ScheduleItem[] = [
  {
    title: "Bersihkan Kandang Gajah",
    time: "08:00",
    status: "Belum",
    statusColor: colors.yellow.darker,
    statusBg: "#ef4444",
    icon: "arrow-drop-down",
  },
  {
    title: "Pakan Harimau - Pagi",
    time: "09:00",
    status: "Selesai",
    statusColor:  colors.yellow.darker,
    statusBg: colors.greenSoft,
    icon: "check",
  },
  {
    title: "Pakan Harimau - Siang",
    time: "13:00",
    status: "Selesai",
    statusColor:  colors.yellow.darker,
    statusBg: colors.greenSoft,
    icon: "check",
  },
];

export default function Schedule() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white mt-5">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 100 }}>
        <HeaderTop title="Jadwal Saya" backTo="/(tabs)" />
        {schedules.map((item, idx) => (
          <View key={idx} className="bg-yellow-200 rounded-2xl p-3 mb-3 flex-row items-center shadow-sm">
            <View className="flex-1">
              <Text className="font-bold text-yellow-900 text-base mb-1">{item.title}</Text>
              <Text className="text-gray-500 text-sm">{item.time}</Text>
            </View>
            <View
              className="flex-row items-center rounded-lg px-3 py-1 ml-2"
              style={{ backgroundColor: item.statusBg }}
            >
              <Text className="font-bold mr-1" style={{ color: item.statusColor }}>
                {item.status}
              </Text>
              <MaterialIcons
                name={item.icon}
                size={18}
                color={item.statusColor}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        className="absolute right-6 bottom-6 bg-yellow-200 rounded-full p-4 shadow-md"
        onPress={() => router.push("../(untabs)/addSchedule")}
      >
        <MaterialIcons name="add" size={32} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}
