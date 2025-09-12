import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import HeaderTop from "@/components/ui/HeaderTop";

export default function AnimalDetail() {
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <HeaderTop title="Detail Satwa" />
      <Image
        source={require("@/assets/images/hewan.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Lengkap Satwa</Text>
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
          <View key={item.label} style={styles.dataBox}>
            <View style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catatan Makanan Harian</Text>
        {[
          { label: "Jenis Makanan", value: "Daging sapi, ayam" },
          { label: "Porsi Harian", value: "8 Kg" },
          { label: "Pola Makan Hari Ini", value: "Baik Sekali" },
        ].map((item) => (
          <View key={item.label} style={styles.dataBox}>
            <View style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Riwayat Medis</Text>
        {[
          { label: "2020-03-11", value: "Vaksinasi Rabies" },
          { label: "2021-08-24", value: "Operasi kecil" },
        ].map((item) => (
          <View key={item.label} style={styles.dataBox}>
            <View style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/editAnimalDetail");
        }}
      >
        <Text style={styles.buttonText}>Edit Catatan Baru</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop:20
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, 
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
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
    maxWidth: "50%",
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