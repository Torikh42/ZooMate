import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { Satwa } from "@/types/satwa";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSatwa } from "../../hooks/useSatwa";
import { supabase } from "../../utils/supabase";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from"../../utils/cloudinary"; 

export default function EditAnimalDetail() {
  const router = useRouter();
  const { satwaId } = useLocalSearchParams<{ satwaId: string }>();

  const { singleSatwa, loading, error } = useSatwa(undefined, satwaId);

  const [formData, setFormData] = useState<Partial<Satwa>>({});
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (singleSatwa) {
      setFormData(singleSatwa);
      if (singleSatwa.image_url) {
        setImageUri(singleSatwa.image_url);
      }
    }
  }, [singleSatwa]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!satwaId) return;
    setIsSaving(true);
    setEditingField(null);

    try {
      let imageUrl = formData.image_url;
      if (imageUri && imageUri !== formData.image_url) {
        imageUrl =  imageUrl = await uploadImage(imageUri); 
      }

      const { created_at, id, ...updateData } = formData;

      const numericData = {
        ...updateData,
        berat_badan: updateData.berat_badan
          ? parseFloat(String(updateData.berat_badan))
          : null,
        tinggi_badan: updateData.tinggi_badan
          ? parseFloat(String(updateData.tinggi_badan))
          : null,
        image_url: imageUrl,
      };

      const { error: updateError } = await supabase
        .from("satwa")
        .update(numericData)
        .eq("id", satwaId);

      if (updateError) {
        Alert.alert(
          "Error",
          "Gagal menyimpan perubahan: " + updateError.message
        );
      } else {
        Alert.alert("Sukses", "Data satwa berhasil diperbarui.");
        router.back();
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const renderEditableRow = (label: string, field: keyof Satwa) => (
    <View key={field} className="bg-yellow-100 rounded-lg py-3 px-4 mb-2">
      <View className="flex-row justify-between items-center min-h-[24px]">
        <Text className="text-sm font-semibold text-gray-800">{label}</Text>
        
        {editingField === field ? (
          <TextInput
            className="border-b border-gray-400 text-sm py-0 px-2 text-right flex-1 ml-3"
            value={String(formData[field] ?? '')}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, [field]: text }))
            }
            onBlur={() => setEditingField(null)}
            autoFocus
            // Gunakan keyboard numerik untuk field angka
            keyboardType={(field === 'berat_badan' || field === 'tinggi_badan') ? 'numeric' : 'default'}
          />
        ) : (
          <View className="flex-row items-center justify-end ml-3">
            <Text className="text-sm text-gray-900 text-right">
              {String(formData[field] ?? 'N/A')}
            </Text>
            <TouchableOpacity className="ml-2" onPress={() => setEditingField(field)}>
              <MaterialIcons name="edit" size={18} color={colors.darkBrown} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.yellow.darker}/>
      </View>
    );
  }

  if (error || !formData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error atau data tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <View className="mt-5">
        <HeaderTop title={`Edit - ${formData.nama_satwa || "Satwa"}`} />

        <View className="items-center mb-4">
          <TouchableOpacity onPress={pickImage}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <View
                className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center"
                style={{ borderColor: colors.yellow.dark, borderWidth: 2 }}
              >
                <Text style={{ color: colors.yellow.darker }}>Pilih Gambar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-yellow-900 mb-3">Data Lengkap Satwa</Text>
          {renderEditableRow("Nama Satwa", "nama_satwa")}
          {renderEditableRow("Spesies", "spesies")}
          {renderEditableRow("Jenis Kelamin", "jenis_kelamin")}
          {renderEditableRow("Tanggal Lahir", "tanggal_lahir")}
          {renderEditableRow("Berat Badan (kg)", "berat_badan")}
          {renderEditableRow("Tinggi Badan (cm)", "tinggi_badan")}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-yellow-900 mb-3">Catatan Makanan</Text>
          {renderEditableRow("Jenis Makanan", "jenis_makanan")}
          {renderEditableRow("Porsi Harian", "porsi_harian")}
        </View>

        {/* --- Bagian Catatan Harian & Medis --- */}
        {/* Catatan: Mengedit status pakan & riwayat medis biasanya punya halaman/logika sendiri */}
        <View className="mb-6">
            <Text className="text-lg font-bold text-yellow-900 mb-3">Status & Riwayat (Read-only)</Text>
            {/* Tampilkan data ini sebagai info, bukan untuk diedit di sini */}
            <DataRow label="Status Pakan Hari Ini" value={"Belum Ada Catatan"} />
            <DataRow label="Riwayat Medis Terakhir" value={"Vaksinasi Rabies (2020-03-11)"} />
        </View>
        
        <TouchableOpacity
          className="py-4 rounded-full items-center mt-3"
          onPress={handleSave}
          style={{ backgroundColor: isSaving ? colors.grayText : colors.yellow.darker }}
          disabled={isSaving}
        >
          <Text className="text-white font-bold text-base">
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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