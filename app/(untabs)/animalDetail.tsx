import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AnimalDetail() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white mt-5"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <HeaderTop title="Detail Satwa" />
      <Image
        source={require("@/assets/images/hewan.png")}
        className="w-full h-56 rounded-xl mb-5"
        resizeMode="cover"
      />

      <View className="mb-6">
        <Text className="text-lg font-bold text-yellow-900 mb-3">Data Lengkap Satwa</Text>
        {[
          { label: "ID Satwa", value: "SAT - 001" },
          { label: "Nama Satwa", value: "Bimo" },
          { label: "Spesies", value: "Harimau Sumatera" },
          { label: "Jenis Kelamin", value: "Jantan" },
          { label: "Tanggal Lahir", value: "12 Mei 2018" },
          { label: "Umur", value: "6 Tahun" },
          { label: "Berat Badan", value: "120 kg" },
          { label: "Tinggi Badan", value: "95 cm" },
        ].map((item) => (
          <View key={item.label} className="bg-yellow-200 rounded-lg py-2 px-3 mb-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-gray-800 shrink">{item.label}</Text>
              <Text className="text-sm text-gray-900 text-right max-w-1/2">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-yellow-900 mb-3">Catatan Makanan Harian</Text>
        {[
          { label: "Jenis Makanan", value: "Daging sapi, ayam" },
          { label: "Porsi Harian", value: "8 Kg" },
          { label: "Pola Makan Hari Ini", value: "Baik Sekali" },
        ].map((item) => (
          <View key={item.label} className="bg-yellow-200 rounded-lg py-2 px-3 mb-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-gray-800 shrink">{item.label}</Text>
              <Text className="text-sm text-gray-900 text-right max-w-1/2">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-yellow-900 mb-3">Riwayat Medis</Text>
        {[
          { label: "2020-03-11", value: "Vaksinasi Rabies" },
          { label: "2021-08-24", value: "Operasi kecil" },
        ].map((item) => (
          <View key={item.label} className="bg-yellow-200 rounded-lg py-2 px-3 mb-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-gray-800 shrink">{item.label}</Text>
              <Text className="text-sm text-gray-900 text-right max-w-1/2">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colors.yellow.darker }}
        className="bg-yellow-800 py-3 rounded-lg items-center mt-3"
        onPress={() => {
          router.push("/editAnimalDetail");
        }}
      >
        <Text className="text-white font-bold text-base">Edit Catatan Baru</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
