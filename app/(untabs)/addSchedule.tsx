import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const dummyTaskTypes = ["Pakan", "Pengecekan", "Medis", "Kebersihan"];
const dummyCages = ["Harimau", "Gajah", "Rusa", "Burung", "Ular"];
const dummyTimeRanges = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
];

export default function AddSchedule() {
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [cage, setCage] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCageDropdown, setShowCageDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-white p-4 mt-5"
    >
      {/* Header */}
      <HeaderTop title="Tambah Tugas" />

      {/* Nama Tugas */}
      <Text className="font-bold text-yellow-900 mb-2 mt-3">Nama Tugas</Text>
      <TextInput
        className="bg-yellow-200 rounded-full py-3 px-4 text-base text-gray-500 mb-4"
        placeholder="Ex: Bersihkan Kandang Gajah"
        placeholderTextColor={colors.grayText}
        value={taskName}
        onChangeText={setTaskName}
      />

      {/* Jenis Tugas Dropdown */}
      <Text className="font-bold text-yellow-900 mb-2 mt-3">Jenis Tugas</Text>
      <TouchableOpacity
        className="bg-yellow-200 rounded-full py-3 px-4 flex-row justify-between items-center mb-2"
        onPress={() => setShowTypeDropdown(!showTypeDropdown)}
      >
        <Text className="text-base text-gray-500">
          {taskType || "Pilih jenis tugas"}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={colors.grayText}
        />
      </TouchableOpacity>
      {showTypeDropdown && (
        <View className="mb-2">
          {dummyTaskTypes.map((item) => (
            <TouchableOpacity
              key={item}
              className="bg-yellow-100 py-2 px-4 rounded-lg mb-1"
              onPress={() => {
                setTaskType(item);
                setShowTypeDropdown(false);
              }}
            >
              <Text className="text-base text-yellow-900">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Kandang/Satwa Dropdown */}
      <Text className="font-bold text-yellow-900 mb-2 mt-3">Pilih Kandang/Satwa</Text>
      <TouchableOpacity
        className="bg-yellow-200 rounded-full py-3 px-4 flex-row justify-between items-center mb-2"
        onPress={() => setShowCageDropdown(!showCageDropdown)}
      >
        <Text className="text-base text-gray-500">{cage || "Pilih kandang/satwa"}</Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={colors.grayText}
        />
      </TouchableOpacity>
      {showCageDropdown && (
        <View className="mb-2">
          {dummyCages.map((item) => (
            <TouchableOpacity
              key={item}
              className="bg-yellow-100 py-2 px-4 rounded-lg mb-1"
              onPress={() => {
                setCage(item);
                setShowCageDropdown(false);
              }}
            >
              <Text className="text-base text-yellow-900">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Jam Tugas Dropdown */}
      <Text className="font-bold text-yellow-900 mb-2 mt-3">Jam Tugas</Text>
      <TouchableOpacity
        className="bg-yellow-200 rounded-full py-3 px-4 flex-row justify-between items-center mb-2"
        onPress={() => setShowTimeDropdown(!showTimeDropdown)}
      >
        <Text className="text-base text-gray-500">
          {taskTime || "Pilih rentang waktu"}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={colors.grayText}
        />
      </TouchableOpacity>
      {showTimeDropdown && (
        <View className="mb-2">
          {dummyTimeRanges.map((item) => (
            <TouchableOpacity
              key={item}
              className="bg-yellow-100 py-2 px-4 rounded-lg mb-1"
              onPress={() => {
                setTaskTime(item);
                setShowTimeDropdown(false);
              }}
            >
              <Text className="text-base text-yellow-900">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tombol Simpan */}
      <TouchableOpacity
        className="bg-yellow-900 rounded-lg py-3 items-center mt-6"
        onPress={() => router.push("../../(tabs)")}
      >
        <Text className="text-white font-bold text-base">Simpan Jadwal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
