import HeaderTop from "@/components/ui/HeaderTop";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useCatatanHarian } from "../../hooks/useCatatanHarian";
import { useSatwa } from "../../hooks/useSatwa";
import colors from "@/constants/Colors";

export default function AnimalDetail() {
  const router = useRouter();
  // Memberi tipe yang jelas pada params untuk type safety
  const { satwaId, satwaName } = useLocalSearchParams<{
    satwaId: string;
    satwaName?: string;
  }>();

  // Ambil data satwa tunggal dan catatan harian berdasarkan satwaId
  const {
    singleSatwa: animal,
    loading: satwaLoading,
    error: satwaError,
  } = useSatwa(undefined, satwaId);
  const {
    catatanHarianData,
    loading: catatanLoading,
    error: catatanError,
  } = useCatatanHarian(satwaId);

  // Gabungkan status loading dan error dari kedua hooks
  const isLoading = satwaLoading || catatanLoading;
  const error = satwaError || catatanError;

  // Tampilkan loading indicator jika salah satu data sedang dimuat
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#73642D" />
        <Text className="mt-2 text-gray-600">Loading data...</Text>
      </View>
    );
  }

  // Tampilkan error jika salah satu hook gagal
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <Text className="text-red-500 text-center">
          Gagal memuat data: {error}
        </Text>
      </View>
    );
  }

  // Tampilkan pesan jika data hewan tidak ditemukan setelah selesai loading
  if (!animal) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Data satwa tidak ditemukan.</Text>
      </View>
    );
  }

  // Ambil catatan hari ini dari array (bisa jadi null jika belum ada)
  const catatanHariIni =
    catatanHarianData && catatanHarianData.length > 0
      ? catatanHarianData[0]
      : null;

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
          // Gunakan gambar profil satwa jika ada, jika tidak, gunakan gambar placeholder
          source={
            animal.image_url
              ? { uri: animal.image_url }
              : require("../../assets/images/hewan.png") // Pastikan path placeholder ini benar
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

        {/* --- Bagian Catatan Makanan Harian --- */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-yellow-900 mb-3">
            Catatan Makanan Harian
          </Text>
          <DataRow
            label="Jenis Makanan"
            value={animal.jenis_makanan || "N/A"}
          />
          <DataRow label="Porsi Harian" value={animal.porsi_harian || "N/A"} />
          <DataRow
            label="Status Pakan Hari Ini"
            value={catatanHariIni?.status_pakan || "Belum Ada Catatan"}
          />
        </View>

        {/* --- Bagian Riwayat Medis --- */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-yellow-900 mb-3">
            Riwayat Medis
          </Text>
          {/* TODO: Ganti data placeholder ini dengan data dari hook riwayat medis */}
          <DataRow label="2020-03-11" value="Vaksinasi Rabies" />
          <DataRow label="2021-08-24" value="Operasi kecil" />
        </View>

        <TouchableOpacity
          style={{ backgroundColor: colors.yellow.darker }}
          className="py-4 rounded-full items-center mt-3"
          onPress={() => {
            // Mengirim satwaId ke halaman edit
            router.push({
              pathname: "/(untabs)/editAnimalDetail", // Pastikan path ini benar
              params: { satwaId: animal.id },
            });
          }}
        >
          <Text className="text-white font-bold text-base">
            Edit Catatan Baru
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Komponen helper untuk menampilkan baris data agar kode tidak berulang
const DataRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="bg-yellow-100 rounded-lg py-3 px-4 mb-2 flex-row justify-between items-center">
    <Text className="text-sm font-semibold text-gray-800">{label}</Text>
    <Text className="text-sm text-gray-900 text-right">{value}</Text>
  </View>
);
