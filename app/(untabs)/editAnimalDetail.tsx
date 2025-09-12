import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderTop from "@/components/ui/HeaderTop";

export default function EditAnimalDetail() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState(require("@/assets/images/hewan.png"));
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    "ID Satwa": "SAT - 001",
    "Nama Satwa": "Bimo",
    "Spesies": "Harimau Sumatera",
    "Jenis Kelamin": "Jantan",
    "Tanggal Lahir": "12 Mei 2018",
    "Umur": "6 Tahun",
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
    <View key={label} style={styles.dataBox}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        {editingField === label ? (
          <TextInput
            style={styles.input}
            value={formData[label]}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, [label]: text }))
            }
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <View style={styles.valueRow}>
            <Text style={styles.value}>{formData[label]}</Text>
            <TouchableOpacity onPress={() => setEditingField(label)}>
              <MaterialIcons name="edit" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <HeaderTop title="Edit Satwa" />
      <View style={styles.imageWrapper}>
        <Image source={imageUri} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.editImageIcon} onPress={handleImagePick}>
          <MaterialIcons name="edit" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Lengkap Satwa</Text>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catatan Makanan Harian</Text>
        {["Jenis Makanan", "Porsi Harian", "Pola Makan Hari Ini"].map(
          renderEditableRow
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Riwayat Medis</Text>
        {["2020-03-11", "2021-08-24"].map(renderEditableRow)}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  editImageIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: colors.yellow.dark,
    padding: 6,
    borderRadius: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.yellow.darker,
    marginBottom: 12,
  },
  dataBox: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    gap: 8,
    flexWrap: "wrap",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flexShrink: 1,
  },
  value: {
    fontSize: 14,
    color: "#222",
    textAlign: "right",
    flex: 1,
    marginLeft: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#999",
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 4,
    minWidth: 120,
    textAlign: "right",
    flex: 1,
    marginLeft: 12,
  },
  button: {
    backgroundColor: colors.yellow.dark,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});