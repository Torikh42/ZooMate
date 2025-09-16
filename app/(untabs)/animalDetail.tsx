import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSatwa } from "../../hooks/useSatwa";

// Komponen helper bisa tetap di sini atau dipindah ke file terpisah
const DataRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <View className="bg-yellow-100 rounded-lg py-3 px-4 mb-2 flex-row justify-between items-center">
    <Text className="text-sm font-semibold text-gray-800">{label}</Text>
    <Text className="text-sm text-gray-900 text-right">{value || "N/A"}</Text>
  </View>
);

export default function AnimalDetail() {
  const router = useRouter();
  const { satwaId, satwaName } = useLocalSearchParams<{
    satwaId: string;
    satwaName?: string;
  }>();

  // Hanya perlu mengambil data satwa, tidak perlu catatan harian
  const {
    singleSatwa: animal,
    loading,
    error,
  } = useSatwa(undefined, satwaId);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={colors.yellow.darker} />
        <Text className="mt-2 text-gray-600">Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <Text className="text-red-500 text-center">
          Gagal memuat data: {error}
        </Text>
      </View>
    );
  }

  if (!animal) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Data satwa tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="p-4 pt-6 mt-5">
        <HeaderTop
          title={satwaName ? `Detail Satwa - ${satwaName}` : "Detail Satwa"}
        />

        <Image
          source={
            animal.image_url
              ? { uri: animal.image_url }
              : require("../../assets/images/hewan.png")
          }
          className="w-full h-56 rounded-xl mb-5 bg-gray-200"
          resizeMode="cover"
        />

        {/* --- Bagian Data Lengkap Satwa --- */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-yellow-900 mb-3">
            Data Lengkap Satwa
          </Text>
          <DataRow label="ID Satwa" value={animal.id} />
          <DataRow label="Nama Satwa" value={animal.nama_satwa} />
          <DataRow label="Spesies" value={animal.spesies} />
          <DataRow label="Jenis Kelamin" value={animal.jenis_kelamin} />
          <DataRow label="Tanggal Lahir" value={animal.tanggal_lahir} />
          <DataRow
            label="Berat Badan"
            value={animal.berat_badan ? `${animal.berat_badan} kg` : "N/A"}
          />
          <DataRow
            label="Tinggi Badan"
            value={animal.tinggi_badan ? `${animal.tinggi_badan} cm` : "N/A"}
          />
        </View>

        {/* --- Bagian Catatan Makanan --- */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-yellow-900 mb-3">
            Informasi Pakan
          </Text>
          <DataRow label="Jenis Makanan" value={animal.jenis_makanan} />
          <DataRow label="Porsi Harian" value={animal.porsi_harian} />
          {/* Status pakan harian DIHAPUS dari sini */}
        </View>

        {/* --- Bagian Riwayat Medis (Tetap sebagai placeholder) --- */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-yellow-900 mb-3">
            Riwayat Medis
          </Text>
          <DataRow label="2020-03-11" value="Vaksinasi Rabies" />
          <DataRow label="2021-08-24" value="Operasi kecil" />
        </View>

        <TouchableOpacity
          style={{ backgroundColor: colors.yellow.darker }}
          className="py-4 rounded-full items-center mt-3"
          onPress={() => {
            router.push({
              pathname: "/(untabs)/editAnimalDetail",
              params: { satwaId: animal.id },
            });
          }}
        >
          <Text className="text-white font-bold text-base">
            Edit Data Satwa
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}