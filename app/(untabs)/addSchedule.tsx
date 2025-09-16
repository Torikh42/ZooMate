import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { Kandang } from "@/types/kandang";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../utils/supabase";

// Opsi jenis tugas
const taskTypes = ["Pakan", "Kebersihan", "Observasi", "Medis", "Lainnya"];

// Daftar rentang waktu yang bisa dipilih
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
];

// Tipe data untuk item di dalam dropdown
interface DropdownItem {
  id: string;
  name: string;
}

// Tipe data untuk props komponen DropdownSelector
interface DropdownSelectorProps {
  label: string;
  items: DropdownItem[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder: string;
}

// Komponen dropdown yang dibuat reusable
const DropdownSelector = ({
  label,
  items,
  selectedValue,
  onSelect,
  placeholder,
}: DropdownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = items.find((item) => item.id === selectedValue);

  return (
    <View className="mb-4">
      <Text className="font-bold text-yellow-900 mb-2">{label}</Text>
      <TouchableOpacity
        className="bg-yellow-100 rounded-full py-4 px-5 flex-row justify-between items-center"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className="text-base text-gray-600">
          {selectedItem ? selectedItem.name : placeholder}
        </Text>
        <MaterialIcons
          name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
          size={24}
          color={colors.grayText}
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="mt-2">
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-yellow-50 py-3 px-4 rounded-lg mb-1"
              onPress={() => {
                onSelect(item.id);
                setIsOpen(false);
              }}
            >
              <Text className="text-base text-yellow-900">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function AddSchedule() {
  const { user } = useAuth();
  const [kandangList, setKandangList] = useState<Kandang[]>([]);
  const [selectedKandangId, setSelectedKandangId] = useState<string | null>(
    null
  );
  const [taskType, setTaskType] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [taskNotes, setTaskNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchKandang = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("kandang").select("*");
      if (data) setKandangList(data);
      if (error) Alert.alert("Error", "Gagal memuat daftar kandang.");
      setLoading(false);
    };
    fetchKandang();
  }, []);

  const handleSaveSchedule = async () => {
    if (!taskType || !selectedKandangId || !selectedTime) {
      Alert.alert("Error", "Harap pilih jenis tugas, kandang, dan jam tugas.");
      return;
    }
    setIsSaving(true);

    const startTime = selectedTime.split(" ")[0];
    const [hours, minutes] = startTime.split(":");

    const taskDate = new Date();
    taskDate.setHours(parseInt(hours, 10));
    taskDate.setMinutes(parseInt(minutes, 10));
    taskDate.setSeconds(0);
    taskDate.setMilliseconds(0);

    const newTask = {
      kandang_id: selectedKandangId,
      keeper_id: user?.id,
      jam_tugas: taskDate.toISOString(),
      jenis_tugas: taskType,
      status_tugas: "Belum",
      catatan_tugas: taskNotes || null,
    };

    const { error: insertError } = await supabase
      .from("catatan_harian")
      .insert(newTask);

    setIsSaving(false);
    if (insertError) {
      Alert.alert("Error", "Gagal menyimpan tugas: " + insertError.message);
    } else {
      Alert.alert(
        "Sukses",
        `Tugas "${taskType}" berhasil dibuat untuk kandang terpilih.`
      );
      router.back();
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        className="flex-1"
        size="large"
        color={colors.yellow.darker}
      />
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4 pt-6 mt-5">
      <HeaderTop title="Tambah Tugas" />

      <DropdownSelector
        label="Jenis Tugas"
        placeholder="Pilih jenis tugas"
        selectedValue={taskType}
        onSelect={setTaskType}
        items={taskTypes.map((t) => ({ id: t, name: t }))}
      />

      <DropdownSelector
        label="Pilih Kandang"
        placeholder="Pilih kandang"
        selectedValue={selectedKandangId}
        onSelect={setSelectedKandangId}
        items={kandangList.map((k) => ({ id: k.id, name: k.nama_kandang }))}
      />

      <DropdownSelector
        label="Jam Tugas"
        placeholder="Pilih rentang waktu"
        selectedValue={selectedTime}
        onSelect={setSelectedTime}
        items={timeSlots.map((t) => ({ id: t, name: t }))}
      />

      <Text className="font-bold text-yellow-900 mb-2 mt-4">
        Catatan Tugas (Opsional)
      </Text>
      <TextInput
        className="bg-yellow-100 rounded-2xl p-4 text-base text-gray-700 min-h-[100px]"
        placeholder="Tulis instruksi khusus di sini..."
        placeholderTextColor={colors.grayText}
        value={taskNotes}
        onChangeText={setTaskNotes}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={{
          backgroundColor: isSaving ? colors.grayText : colors.yellow.darker,
        }}
        className="rounded-lg py-4 items-center mt-6"
        onPress={handleSaveSchedule}
        disabled={isSaving}
      >
        <Text className="text-white font-bold text-base">
          {isSaving ? "Menyimpan..." : "Simpan Tugas"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
