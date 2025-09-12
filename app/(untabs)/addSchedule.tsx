import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { router } from "expo-router";
import HeaderTop from "@/components/ui/HeaderTop";

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
    <ScrollView style={{ flex: 1, backgroundColor: colors.white, padding: 18, marginTop: 20 }}>
      {/* Header */}
      <HeaderTop title="Tambah Tugas" />

      {/* Nama Tugas */}
      <Text style={styles.label}>Nama Tugas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Bersihkan Kandang Gajah"
        placeholderTextColor={colors.grayText}
        value={taskName}
        onChangeText={setTaskName}
      />

      {/* Jenis Tugas Dropdown */}
      <Text style={styles.label}>Jenis Tugas</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowTypeDropdown(!showTypeDropdown)}>
        <Text style={styles.dropdownText}>{taskType || "Pilih jenis tugas"}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.grayText} />
      </TouchableOpacity>
      {showTypeDropdown && (
        <View style={styles.dropdownList}>
          {dummyTaskTypes.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setTaskType(item);
                setShowTypeDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Kandang/Satwa Dropdown */}
      <Text style={styles.label}>Pilih Kandang/Satwa</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowCageDropdown(!showCageDropdown)}>
        <Text style={styles.dropdownText}>{cage || "Pilih kandang/satwa"}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.grayText} />
      </TouchableOpacity>
      {showCageDropdown && (
        <View style={styles.dropdownList}>
          {dummyCages.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setCage(item);
                setShowCageDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Jam Tugas Dropdown */}
      <Text style={styles.label}>Jam Tugas</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowTimeDropdown(!showTimeDropdown)}>
        <Text style={styles.dropdownText}>{taskTime || "Pilih rentang waktu"}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.grayText} />
      </TouchableOpacity>
      {showTimeDropdown && (
        <View style={styles.dropdownList}>
          {dummyTimeRanges.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setTaskTime(item);
                setShowTimeDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tombol Simpan */}
      <TouchableOpacity style={styles.saveButton} onPress={() => router.push("../../(tabs)")}>
        <Text style={styles.saveButtonText}>Simpan Jadwal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  backButton: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    padding: 8,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.yellow.darker,
  },
  label: {
    fontWeight: "700",
    color: colors.yellow.darker,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: colors.grayText,
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.grayText,
  },
  dropdownList: {
    marginBottom: 8,
  },
  dropdownItem: {
    backgroundColor: "#fef9c3",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 6,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.yellow.darker,
  },
  saveButton: {
    backgroundColor: colors.yellow.darker,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});