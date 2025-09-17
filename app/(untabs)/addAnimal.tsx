import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { uploadImage } from "../../utils/cloudinary";
import { supabase } from "../../utils/supabase";
import QRCodePopup from "@/components/ui/QRCodePopup";

export default function AddAnimal() {
  const { kandangId, kandangName } = useLocalSearchParams();

  const [namaSatwa, setNamaSatwa] = useState("");
  const [spesies, setSpesies] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [jenisKelamin, setJenisKelamin] = useState<"Jantan" | "Betina" | null>(
    null
  );
  const [beratBadan, setBeratBadan] = useState("");
  const [tinggiBadan, setTinggiBadan] = useState("");
  const [jenisMakanan, setJenisMakanan] = useState("");
  const [porsiHarian, setPorsiHarian] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newQrValue, setNewQrValue] = useState("");

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

  const handleAddAnimal = async () => {
    if (
      !kandangId ||
      !namaSatwa ||
      !spesies ||
      !tanggalLahir ||
      !jenisKelamin
    ) {
      Alert.alert("Error", "Harap isi semua kolom wajib.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;
      if (imageUri) {
        imageUrl = await uploadImage(imageUri);
      }

      const { data, error } = await supabase
        .from("satwa")
        .insert({
          kandang_id: kandangId as string,
          nama_satwa: namaSatwa,
          spesies: spesies,
          tanggal_lahir: tanggalLahir.toISOString().split("T")[0],
          jenis_kelamin: jenisKelamin,
          berat_badan: beratBadan ? parseFloat(beratBadan) : null,
          tinggi_badan: tinggiBadan ? parseFloat(tinggiBadan) : null,
          jenis_makanan: jenisMakanan || null,
          porsi_harian: porsiHarian || null,
          image_url: imageUrl,
          status_pakan: "Belum Diberi", // default status awal
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Set QR value dan tampilkan pop-up
        setNewQrValue(`zoomate://satwa/${data.id}`);
        setPopupVisible(true);
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || tanggalLahir;
    setShowDatePicker(Platform.OS === "ios");
    setTanggalLahir(currentDate);
  };

  return (
    <ScrollView
      className="flex-1 bg-white mt-5"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <HeaderTop title={`Tambah Satwa di ${kandangName || "Kandang"}`} />

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

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Nama Satwa
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Bimo"
          placeholderTextColor={colors.yellow.dark}
          value={namaSatwa}
          onChangeText={setNamaSatwa}
        />
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Spesies
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Harimau Sumatera"
          placeholderTextColor={colors.yellow.dark}
          value={spesies}
          onChangeText={setSpesies}
        />
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Tanggal Lahir
        </Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            className="h-14 rounded-full px-5 text-base mb-4 border-2"
            style={{
              backgroundColor: colors.yellow.normal,
              borderColor: colors.yellow.dark,
              color: colors.yellow.darker,
            }}
            placeholder="YYYY-MM-DD"
            value={tanggalLahir.toISOString().split("T")[0]}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={tanggalLahir}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Jenis Kelamin
        </Text>
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity
            className={`py-3 px-5 rounded-full border`}
            style={{
              borderColor: colors.yellow.darker,
              backgroundColor:
                jenisKelamin === "Jantan"
                  ? colors.yellow.normal
                  : "transparent",
            }}
            onPress={() => setJenisKelamin("Jantan")}
          >
            <Text style={{ color: colors.yellow.darker }}>Jantan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-3 px-5 rounded-full border`}
            style={{
              borderColor: colors.yellow.darker,
              backgroundColor:
                jenisKelamin === "Betina"
                  ? colors.yellow.normal
                  : "transparent",
            }}
            onPress={() => setJenisKelamin("Betina")}
          >
            <Text style={{ color: colors.yellow.darker }}>Betina</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Berat Badan (kg)
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: 120"
          placeholderTextColor={colors.yellow.dark}
          keyboardType="numeric"
          value={beratBadan}
          onChangeText={setBeratBadan}
        />
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Tinggi Badan (cm)
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: 95"
          placeholderTextColor={colors.yellow.dark}
          keyboardType="numeric"
          value={tinggiBadan}
          onChangeText={setTinggiBadan}
        />
      </View>

      <View className="mb-4">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Jenis Makanan
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Daging sapi, ayam"
          placeholderTextColor={colors.yellow.dark}
          value={jenisMakanan}
          onChangeText={setJenisMakanan}
        />
      </View>

      <View className="mb-6">
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Porsi Harian
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: 8 Kg"
          placeholderTextColor={colors.yellow.dark}
          value={porsiHarian}
          onChangeText={setPorsiHarian}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colors.yellow.darker }}
        className="bg-yellow-800 py-3 rounded-lg items-center mt-3"
        onPress={handleAddAnimal}
        disabled={loading}
      >
        <Text className="text-white font-bold text-base">
          {loading ? "Menambahkan..." : "Tambah Satwa"}
        </Text>
      </TouchableOpacity>

      <QRCodePopup
        visible={isPopupVisible}
        onClose={() => {
          setPopupVisible(false);
          router.back(); // Arahkan kembali setelah pop-up ditutup
        }}
        qrValue={newQrValue}
        title="Satwa Berhasil Ditambahkan"
      />
    </ScrollView>
  );
}
