import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditAnimalDetail() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState(
    require("@/assets/images/hewan.png")
  );
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    "ID Satwa": "SAT - 001",
    "Nama Satwa": "Bimo",
    Spesies: "Harimau Sumatera",
    "Jenis Kelamin": "Jantan",
    "Tanggal Lahir": "12 Mei 2018",
    Umur: "6 Tahun",
    "Berat Badan": "120 kg",
    "Tinggi Badan": "95 cm",
    "Jenis Makanan": "Daging sapi, ayam",
    "Porsi Harian": "8 Kg",
    "Pola Makan Hari Ini": "Baik Sekali",
    "2020-03-11": "Vaksinasi Rabies",
    "2021-08-24": "Operasi kecil",
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri({ uri: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    setEditingField(null);
    router.push("/successConfirmation");
  };

  const renderEditableRow = (label: string) => (
    <View key={label} className="bg-yellow-200 rounded-lg py-2 px-3 mb-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-sm font-semibold text-gray-800 shrink">{label}</Text>
        {editingField === label ? (
          <TextInput
            className="border-b border-gray-400 text-sm py-1 px-2 min-w-32 text-right flex-1 ml-3"
            value={formData[label]}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, [label]: text }))
            }
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <View className="flex-row items-center flex-1 justify-end gap-2 flex-wrap">
            <Text className="text-sm text-gray-900 text-right flex-1 ml-3">{formData[label]}</Text>
            <TouchableOpacity onPress={() => setEditingField(label)}>
              <MaterialIcons name="edit" size={20} color={colors.darkBrown} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-white mt-5"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <HeaderTop title="Edit Satwa" />
      <View className="relative mb-5">
        <Image source={imageUri} className="w-full h-56 rounded-xl" resizeMode="cover" />
        <TouchableOpacity
          className="absolute bottom-3 right-3 bg-yellow-800 p-1 rounded-full"
          onPress={handleImagePick}
        >
          <MaterialIcons name="edit" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-yellow-900 mb-3">Data Lengkap Satwa</Text>
        {[
          "ID Satwa",
          "Nama Satwa",
          "Spesies",
          "Jenis Kelamin",
          "Tanggal Lahir",
          "Umur",
          "Berat Badan",
          "Tinggi Badan",
        ].map(renderEditableRow)}
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-yellow-900 mb-3">Catatan Makanan Harian</Text>
        {["Jenis Makanan", "Porsi Harian", "Pola Makan Hari Ini"].map(
          renderEditableRow
        )}
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-yellow-900 mb-3">Riwayat Medis</Text>
        {["2020-03-11", "2021-08-24"].map(renderEditableRow)}
      </View>

      <TouchableOpacity className="bg-yellow-800 py-3 rounded-lg items-center mt-3" onPress={handleSave}>
        <Text className="text-white font-bold text-base">Simpan Perubahan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
