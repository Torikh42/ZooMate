import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { Satwa } from "@/types/satwa";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
import { uploadImage } from "../../utils/cloudinary";
import { supabase } from "../../utils/supabase";

const StatusPakanSelector = ({ 
  currentStatus, 
  onStatusChange 
}: { 
  currentStatus: 'Belum Diberi' | 'Sudah Diberi';
  onStatusChange: (status: 'Belum Diberi' | 'Sudah Diberi') => void;
}) => {
  const statusOptions = [
    { value: 'Belum Diberi', label: 'Belum Diberi', color: 'bg-red-100', textColor: 'text-red-800' },
    { value: 'Sudah Diberi', label: 'Sudah Diberi', color: 'bg-green-100', textColor: 'text-green-800' },
  ] as const;

  return (
    <View className="mb-4">
      <Text className="text-base font-semibold text-gray-800 mb-2">Status Pakan:</Text>
      <View className="flex-row flex-wrap gap-2">
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`px-4 py-2 rounded-full ${option.color} ${
              currentStatus === option.value ? 'border-2 border-gray-600' : ''
            }`}
            onPress={() => onStatusChange(option.value)}
          >
            <Text className={`${option.textColor} font-medium`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

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

  const handleStatusPakanChange = (newStatus: 'Belum Diberi' | 'Sudah Diberi') => {
    setFormData(prev => ({ ...prev, status_pakan: newStatus }));
  };

  const handleSave = async () => {
    if (!satwaId) return;
    setIsSaving(true);
    setEditingField(null);

    try {
      let imageUrl = formData.image_url;
      if (imageUri && imageUri !== formData.image_url) {
        imageUrl = await uploadImage(imageUri);
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
        return;
      }

      // If status_pakan was updated, also update kandang status
      if (formData.status_pakan !== singleSatwa?.status_pakan && singleSatwa?.kandang_id) {
        try {
          // Get all animals in the same kandang to determine kandang status
          const { data: allAnimalsInKandang, error: fetchError } = await supabase
            .from('satwa')
            .select('status_pakan')
            .eq('kandang_id', singleSatwa.kandang_id);

          if (!fetchError && allAnimalsInKandang) {
            // Determine kandang status: only "Sudah Diberi" if ALL animals are fed
            const allFed = allAnimalsInKandang.every(a => a.status_pakan === 'Sudah Diberi');
            const kandangStatus = allFed ? 'Sudah Diberi' : 'Belum Diberi';

            // Update kandang status
            await supabase
              .from('kandang')
              .update({ status_pakan: kandangStatus })
              .eq('id', singleSatwa.kandang_id);
          }
        } catch (kandangError) {
          console.log('Warning: Could not update kandang status:', kandangError);
        }
      }

      Alert.alert("Sukses", "Data satwa berhasil diperbarui.", [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]);
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
            value={String(formData[field] ?? "")}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, [field]: text }))
            }
            onBlur={() => setEditingField(null)}
            autoFocus
            // Gunakan keyboard numerik untuk field angka
            keyboardType={
              field === "berat_badan" || field === "tinggi_badan"
                ? "numeric"
                : "default"
            }
          />
        ) : (
          <View className="flex-row items-center justify-end ml-3">
            <Text className="text-sm text-gray-900 text-right">
              {String(formData[field] ?? "N/A")}
            </Text>
            <TouchableOpacity
              className="ml-2"
              onPress={() => setEditingField(field)}
            >
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
        <ActivityIndicator size="large" color={colors.yellow.darker} />
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
                <Text style={{ color: colors.yellow.darker }}>
                  Pilih Gambar
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* --- Status Pakan Selector --- */}
        <View className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-lg font-bold text-yellow-900 mb-3">
            Status Pakan
          </Text>
          <StatusPakanSelector 
            currentStatus={formData.status_pakan || 'Belum Diberi'}
            onStatusChange={handleStatusPakanChange}
          />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-yellow-900 mb-3">
            Data Lengkap Satwa
          </Text>
          {renderEditableRow("Nama Satwa", "nama_satwa")}
          {renderEditableRow("Spesies", "spesies")}
          {renderEditableRow("Jenis Kelamin", "jenis_kelamin")}
          {renderEditableRow("Tanggal Lahir", "tanggal_lahir")}
          {renderEditableRow("Berat Badan (kg)", "berat_badan")}
          {renderEditableRow("Tinggi Badan (cm)", "tinggi_badan")}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-yellow-900 mb-3">
            Catatan Makanan
          </Text>
          {renderEditableRow("Jenis Makanan", "jenis_makanan")}
          {renderEditableRow("Porsi Harian", "porsi_harian")}
        </View>

        {/* --- Bagian Catatan Harian & Medis --- */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-yellow-900 mb-3">
            Status & Riwayat (Read-only)
          </Text>
          <DataRow 
            label="Status Pakan Saat Ini" 
            value={
              <View className={`px-2 py-1 rounded-full ${
                formData.status_pakan === 'Sudah Diberi' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Text className={`text-xs font-medium ${
                  formData.status_pakan === 'Sudah Diberi' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {formData.status_pakan || 'Belum Diberi'}
                </Text>
              </View>
            }
          />
          <DataRow
            label="Riwayat Medis Terakhir"
            value={"Vaksinasi Rabies (2020-03-11)"}
          />
        </View>

        <TouchableOpacity
          className="py-4 rounded-full items-center mt-3"
          onPress={handleSave}
          style={{
            backgroundColor: isSaving ? colors.grayText : colors.yellow.darker,
          }}
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
  value: string | number | React.ReactNode;
}) => (
  <View className="bg-yellow-100 rounded-lg py-3 px-4 mb-2 flex-row justify-between items-center">
    <Text className="text-sm font-semibold text-gray-800">{label}</Text>
    <View className="text-sm text-gray-900 text-right">
      {typeof value === 'string' || typeof value === 'number' ? (
        <Text className="text-sm text-gray-900 text-right">{value}</Text>
      ) : (
        value
      )}
    </View>
  </View>
);