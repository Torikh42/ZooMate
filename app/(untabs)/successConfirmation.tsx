import colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function SuccessConfirmation() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      {/* Ikon centang */}
      <View className="bg-green-200 p-6 rounded-full mb-6">
        <AntDesign name="checkcircle" size={64} color={colors.greenSoft} />
      </View>

      {/* Teks konfirmasi */}
      <Text className="text-2xl font-bold text-green-500 mb-2">Berhasil!</Text>
      <Text className="text-base text-gray-500 text-center mb-8">Data Satwa Hari Ini Sudah di Update!</Text>

      {/* Tombol kembali */}
      <TouchableOpacity
        className="bg-yellow-200 py-3 px-8 rounded-lg shadow"
        onPress={() => router.replace("../(tabs)")}
      >
        <Text className="text-yellow-900 font-bold text-base">Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}
