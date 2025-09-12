import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [profesi, setProfesi] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isFormValid =
    name.trim() !== "" &&
    profesi.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

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

      {/* Input Password */}
      <View style={{ width: "100%", marginBottom: 18 }}>
        <Text style={{ fontWeight: "700", color: colors.yellow.darker, marginBottom: 8 }}>Kata Sandi</Text>
        <View style={{ position: "relative" }}>
          <TextInput
            style={{
              backgroundColor: colors.yellow.normal,
              borderRadius: 999,
              paddingVertical: 12,
              paddingHorizontal: 18,
              fontSize: 16,
              color: colors.grayText,
              marginBottom: 4,
              paddingRight: 40,
            }}
            placeholder="Kata sandi"
            placeholderTextColor={colors.grayText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 12, top: 10 }}
            onPress={() => setShowPassword((v) => !v)}
          >
            <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={22} color={colors.grayText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Konfirmasi Password */}
      <View style={{ width: "100%", marginBottom: 18 }}>
        <Text style={{ fontWeight: "700", color: colors.yellow.darker, marginBottom: 8 }}>Konfirmasi Kata Sandi</Text>
        <View style={{ position: "relative" }}>
          <TextInput
            style={{
              backgroundColor: colors.yellow.normal,
              borderRadius: 999,
              paddingVertical: 12,
              paddingHorizontal: 18,
              fontSize: 16,
              color: colors.grayText,
              marginBottom: 4,
              paddingRight: 40,
              borderWidth: password !== confirmPassword && confirmPassword ? 1 : 0,
              borderColor: password !== confirmPassword && confirmPassword ? "red" : "transparent",
            }}
            placeholder="Ulangi kata sandi"
            placeholderTextColor={colors.grayText}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 12, top: 10 }}
            onPress={() => setShowConfirmPassword((v) => !v)}
          >
            <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={22} color={colors.grayText} />
          </TouchableOpacity>
        </View>
        {password !== confirmPassword && confirmPassword ? (
          <Text style={{ color: "red", fontSize: 13, marginTop: 2 }}>Kata sandi tidak sama</Text>
        ) : null}
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
        <Text style={{ color: colors.yellow.dark, fontWeight: "700", fontSize: 16 }}>Daftar</Text>
      </TouchableOpacity>

      {/* Navigasi ke Masuk */}
      <Text style={{ color: colors.grayText, fontWeight: "600", fontSize: 15 }}>
        Sudah Punya Akun?{" "}
        <Text
          style={{ color: colors.yellow.dark, fontWeight: "700" }}
          onPress={() => router.push("/login")}
        >
          Masuk
        </Text>
      </Text>
    </ScrollView>
  );
}
