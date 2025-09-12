import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import HeaderTop from "@/components/ui/HeaderTop";

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
    statusColor: "#ef4444",
    statusBg: "#fee2e2",
    icon: "arrow-drop-down",
  },
  {
    title: "Pakan Harimau - Pagi",
    time: "09:00",
    status: "Selesai",
    statusColor: "#22c55e",
    statusBg: "#bbf7d0",
    icon: "check",
  },
  {
    title: "Pakan Harimau - Siang",
    time: "13:00",
    status: "Selesai",
    statusColor: "#22c55e",
    statusBg: "#bbf7d0",
    icon: "check",
  },
];

export default function Schedule() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <HeaderTop title="Jadwal Saya" backTo="/(tabs)" />
        {schedules.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.cardTextWrapper}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <View
              style={[styles.statusBadge, { backgroundColor: item.statusBg }]}
            >
              <Text
                style={[styles.statusText, { color: item.statusColor }]}
              >
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
        style={styles.addButton}
        onPress={() => router.push("../(untabs)/addSchedule")}
      >
        <MaterialIcons name="add" size={32} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "700",
    color: colors.yellow.darker,
    fontSize: 15,
    marginBottom: 2,
  },
  cardTime: {
    color: colors.grayText,
    fontSize: 13,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 10,
  },
  statusText: {
    fontWeight: "700",
    marginRight: 4,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
});