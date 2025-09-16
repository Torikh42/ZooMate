import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Kandang } from "../../types/kandang";
import { supabase } from "../../utils/supabase";

export default function AddKandang() {
  const [namaKandang, setNamaKandang] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddKandang = async () => {
    if (!namaKandang || !lokasi || !latitude || !longitude) {
      Alert.alert("Error", "Harap isi semua kolom.");
      return;
    }

    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lonNum)) {
      Alert.alert("Error", "Latitude dan Longitude harus berupa angka.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("kandang").insert({
        nama_kandang: namaKandang,
        lokasi: lokasi,
        latitude: latNum,
        longitude: lonNum,
      } as Omit<Kandang, "id" | "created_at">);

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Sukses", "Kandang berhasil ditambahkan!");
        router.back(); // Navigate back to satwaData.tsx
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white mt-5"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <HeaderTop title="Tambah Kandang Baru" />

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Nama Kandang
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Kandang Harimau"
          placeholderTextColor={colors.yellow.dark}
          value={namaKandang}
          onChangeText={setNamaKandang}
        />
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Lokasi Deskripsi
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Area Utara, Dekat Pintu Masuk"
          placeholderTextColor={colors.yellow.dark}
          value={lokasi}
          onChangeText={setLokasi}
        />
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Latitude
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: -6.2088"
          placeholderTextColor={colors.yellow.dark}
          keyboardType="numeric"
          value={latitude}
          onChangeText={setLatitude}
        />
      </View>

      <View className="mb-6">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Longitude
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: 106.8456"
          placeholderTextColor={colors.yellow.dark}
          keyboardType="numeric"
          value={longitude}
          onChangeText={setLongitude}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colors.yellow.darker }}
        className="bg-yellow-800 py-3 rounded-lg items-center mt-3"
        onPress={handleAddKandang}
        disabled={loading}
      >
        <Text className="text-white font-bold text-base">
          {loading ? "Menambahkan..." : "Tambah Kandang"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
