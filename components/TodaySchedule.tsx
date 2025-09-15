import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/Colors";

export default function TodaySchedule() {
  const router = useRouter();
  const [checked, setChecked] = useState([false, false, false]);
  const schedules = [
    "Cek Kandang Singa",
    "Cek Kandang Singa",
    "Cek Kandang Singa",
  ];

  const toggleCheck = (idx: number) => {
    setChecked((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

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
        {schedules.map((t, i) => (
          <View key={i} className="flex-row items-center mb-2">
            <TouchableOpacity
              onPress={() => toggleCheck(i)}
              className="w-6 h-6 rounded-md border-2 justify-center items-center mr-2"
              style={{
                borderColor: colors.yellow.darkActive,
                backgroundColor: checked[i] ? colors.yellow.darkActive : "#fff",
              }}
            >
              {checked[i] && <View className="w-3 h-3 bg-white rounded-sm" />}
            </TouchableOpacity>
            <View
              style={{ backgroundColor: colors.yellow.lightActive }}
              className="flex-1 h-6 rounded-md justify-center px-2"
            >
              <Text className="text-xs text-gray-500">{t}</Text>
            </View>
          </View>
        ))}

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
