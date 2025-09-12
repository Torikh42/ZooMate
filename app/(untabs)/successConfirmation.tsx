import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function SuccessConfirmation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Ikon centang */}
      <View style={styles.iconWrapper}>
        <AntDesign name="checkcircle" size={64} color="#22c55e" />
      </View>

      {/* Teks konfirmasi */}
      <Text style={styles.title}>Berhasil!</Text>
      <Text style={styles.subtitle}>
        Data Satwa Hari Ini Sudah di Update!
      </Text>

      {/* Tombol kembali */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("../(tabs)")}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconWrapper: {
    backgroundColor: "#bbf7d0",
    padding: 24,
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#22c55e",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayText,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.yellow.normal,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: colors.yellow.darker,
    fontWeight: "700",
    fontSize: 16,
  },
});