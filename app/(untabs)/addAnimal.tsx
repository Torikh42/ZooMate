import HeaderTop from "@/components/ui/HeaderTop";
import colors from "@/constants/Colors";
import { useLocalSearchParams, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { Satwa } from "../../types/satwa";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddAnimal() {
  const { kandangId, kandangName } = useLocalSearchParams();

  const [namaSatwa, setNamaSatwa] = useState("");
  const [spesies, setSpesies] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [jenisKelamin, setJenisKelamin] = useState<"Jantan" | "Betina" | null>(null);
  const [beratBadan, setBeratBadan] = useState("");
  const [tinggiBadan, setTinggiBadan] = useState("");
  const [jenisMakanan, setJenisMakanan] = useState("");
  const [porsiHarian, setPorsiHarian] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddAnimal = async () => {
    if (!kandangId || !namaSatwa || !spesies || !tanggalLahir || !jenisKelamin) {
      Alert.alert("Error", "Harap isi semua kolom wajib.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("satwa").insert({
        kandang_id: kandangId as string,
        nama_satwa: namaSatwa,
        spesies: spesies,
        tanggal_lahir: tanggalLahir.toISOString().split('T')[0],
        jenis_kelamin: jenisKelamin,
        berat_badan: beratBadan ? parseFloat(beratBadan) : null,
        tinggi_badan: tinggiBadan ? parseFloat(tinggiBadan) : null,
        jenis_makanan: jenisMakanan || null,
        porsi_harian: porsiHarian || null,
      } as Omit<Satwa, "id" | "created_at">);

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Sukses", "Satwa berhasil ditambahkan!");
        router.back(); // Navigate back to animalList.tsx
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || tanggalLahir;
    setShowDatePicker(Platform.OS === 'ios');
    setTanggalLahir(currentDate);
  };

  return (
    <ScrollView
      className="flex-1 bg-white mt-5"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <HeaderTop title={`Tambah Satwa di ${kandangName || "Kandang"}`} />

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
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
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
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
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
          Tanggal Lahir
        </Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            className="h-14 rounded-full px-5 text-base mb-4 border-2"
            style={{
              backgroundColor: colors.yellow.normal,
              borderColor: colors.yellow.dark,
              color: colors.yellow.darker
            }}
            placeholder="YYYY-MM-DD"
            value={tanggalLahir.toISOString().split('T')[0]}
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
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
          Jenis Kelamin
        </Text>
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity
            className={`py-3 px-5 rounded-full border`}
            style={{
              borderColor: colors.yellow.darker,
              backgroundColor: jenisKelamin === "Jantan" ? colors.yellow.normal : "transparent",
            }}
            onPress={() => setJenisKelamin("Jantan")}
          >
            <Text style={{ color: colors.yellow.darker }}>Jantan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-3 px-5 rounded-full border`}
            style={{
              borderColor: colors.yellow.darker,
              backgroundColor: jenisKelamin === "Betina" ? colors.yellow.normal : "transparent",
            }}
            onPress={() => setJenisKelamin("Betina")}
          >
            <Text style={{ color: colors.yellow.darker }}>Betina</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
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
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
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
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
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
        <Text className="text-lg font-semibold mb-2" style={{ color: colors.yellow.darker }}>
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
    </ScrollView>
  );
}
