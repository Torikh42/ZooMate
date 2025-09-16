import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react"; // 1. Impor useState & useCallback
import { RefreshControl, ScrollView, Text, View } from "react-native";
import FeatureCard from "../../components/FeatureCard";
import Header from "../../components/Header";
import TodaySchedule from "../../components/TodaySchedule";
import colors from "../../constants/Colors";
import { useTasks } from "../../context/TaskContext"; // 3. Impor hook useTasks

export default function HomeScreen() {
  const router = useRouter();
  // 4. Ambil fungsi refetch dari context
  const { refetchTasks } = useTasks();
  const [refreshing, setRefreshing] = useState(false);

  // 5. Buat fungsi onRefresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Tampilkan ikon loading
    try {
      await refetchTasks(); // Panggil fungsi untuk ambil data lagi
    } catch (e) {
      console.error("Gagal me-refresh tugas:", e);
    }
    setRefreshing(false); // Sembunyikan ikon loading setelah selesai
  }, [refetchTasks]);

  return (
    <View className="flex-1 bg-white">
      <Header />
      <ScrollView
        contentContainerStyle={{ padding: 0 }}
        // 6. Pasang RefreshControl ke ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.yellow.darker} // Warna ikon loading (opsional)
          />
        }
      >
        <View
          className="bg-white rounded-t-3xl p-4 -mt-6"
          style={{ minHeight: "100%" }} // Tambahan style agar area refresh lebih luas
        >
          <TodaySchedule />

          <View
            className="mt-6 pt-4 border-t"
            style={{ borderTopColor: colors.yellow.dark }}
          >
            <Text
              className="mb-3 font-semibold text-2xl"
              style={{ color: colors.yellow.darkHover }}
            >
              Lihat Fitur Lainnya
            </Text>

            <FeatureCard
              title="ZooMap"
              description="Cek Kawasan Kebun Binatang Sekarang!"
              bgColor={colors.greenSoft}
              icon={<MaterialIcons name="map" size={22} />}
              onPress={() => router.push("/(untabs)/zooMap")}
            />
            <FeatureCard
              title="Lihat Semua Jadwal"
              description="Lihat Jadwal Kamu Hari Ini"
              bgColor={colors.paleYellow}
              icon={<MaterialIcons name="schedule" size={22} />}
              onPress={() => router.push("/(untabs)/schedule")}
            />
            <FeatureCard
              title="Data Satwa"
              description="Cek Data Satwa di Kebun Binatang Kamu"
              bgColor={colors.blueSoft}
              icon={<MaterialIcons name="pets" size={22} />}
              onPress={() => router.push("/(untabs)/satwaData")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
