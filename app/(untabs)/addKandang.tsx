import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Kandang } from "../../types/kandang";
import { supabase } from "../../utils/supabase";

export default function AddKandang() {
  const [namaKandang, setNamaKandang] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newQrValue, setNewQrValue] = useState("");

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
      const { data, error } = await supabase
        .from("kandang")
        .insert({
          nama_kandang: namaKandang,
          lokasi: lokasi,
          latitude: latNum,
          longitude: lonNum,
        } as Omit<Kandang, "id" | "created_at">)
        .select()
        .single();

      if (error) {
        Alert.alert("Error", error.message);
      } else if (data) {
        const qrValue = `zoomate://kandang/${data.id}`;
        setNewQrValue(qrValue);
        setIsPopupVisible(true);
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

      {/* Input Nama */}
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

      {/* Input Lokasi */}
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

      {/* Input Latitude */}
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

      {/* Input Longitude */}
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

      {/* Tombol Simpan */}
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

      {/* Popup QRCode */}
      <Modal
        visible={isPopupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsPopupVisible(false);
          router.back();
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl items-center">
            <Text className="text-lg font-semibold mb-4 text-center">
              QR Code Kandang Baru
            </Text>
            <QRCode value={newQrValue} size={200} />
            <TouchableOpacity
              onPress={() => {
                setIsPopupVisible(false);
                router.back();
              }}
              className="mt-6 bg-yellow-800 px-6 py-2 rounded-lg"
            >
              <Text className="text-white font-bold">Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
