import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../constants/Colors"; // Pastikan file Colors.js sudah sesuai

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [profesi, setProfesi] = useState("");

  const isFormValid = name.trim() !== "" && profesi.trim() !== "";

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: colors.white }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.yellow.darker, marginBottom: 32, textAlign: "center" }}>
        Selamat Datang
      </Text>

      {/* Input Nama */}
      <View style={{ width: "100%", marginBottom: 18 }}>
        <Text style={{ fontWeight: "700", color: colors.yellow.darker, marginBottom: 8 }}>Masukkan Nama Kamu</Text>
        <TextInput
          style={{
            backgroundColor: colors.yellow.normal,
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 18,
            fontSize: 16,
            color: colors.grayText,
            marginBottom: 4,
          }}
          placeholder="Ex: Indyeye"
          placeholderTextColor={colors.grayText}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Input Profesi */}
      <View style={{ width: "100%", marginBottom: 18 }}>
        <Text style={{ fontWeight: "700", color: colors.yellow.darker, marginBottom: 8 }}>Masukkan Profesi Kamu</Text>
        <TextInput
          style={{
            backgroundColor: colors.yellow.normal,
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 18,
            fontSize: 16,
            color: colors.grayText,
            marginBottom: 4,
          }}
          placeholder="Ex: Zookeeper"
          placeholderTextColor={colors.grayText}
          value={profesi}
          onChangeText={setProfesi}
        />
      </View>

      {/* Tombol Masuk */}
      <TouchableOpacity
        disabled={!isFormValid}
        style={{
          backgroundColor: isFormValid ? colors.yellow.normal : colors.grayText,
          borderRadius: 999,
          paddingVertical: 12,
          alignItems: "center",
          marginBottom: 18,
          width: "100%",
        }}
        onPress={() => router.push("/(tabs)")}
      >
        <Text style={{ color: colors.yellow.dark, fontWeight: "700", fontSize: 16 }}>Masuk</Text>
      </TouchableOpacity>

      {/* Navigasi ke Daftar */}
      <Text style={{ color: colors.grayText, fontWeight: "600", fontSize: 15 }}>
        Belum Punya Akun?{" "}
        <Text
          style={{ color: colors.yellow.dark, fontWeight: "700" }}
          onPress={() => router.push("/signUp")}
        >
          Daftar
        </Text>
      </Text>
    </ScrollView>
  );
}
