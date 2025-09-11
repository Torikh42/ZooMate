import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Profesi, useAuth } from "../../context/AuthContext";

const profesiOptions: Profesi[] = ["zookeeper", "supervisor", "dokter"];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [profesi, setProfesi] = useState<Profesi | null>(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !fullName || !tanggalLahir || !profesi) {
      Alert.alert("Error", "Harap isi semua kolom.");
      return;
    }
    if (!agree) {
      Alert.alert("Error", "Anda harus menyetujui syarat dan ketentuan.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signUp({
        email,
        password,
        full_name: fullName,
        tanggal_lahir: tanggalLahir,
        profesi: profesi,
      });

      if (error) {
        Alert.alert("Sign Up Error", error.message);
      } else {
        Alert.alert(
          "Success",
          "Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi sebelum login."
        );
        router.replace("/login");
      }
    } catch (error: any) {
      Alert.alert("Sign Up Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="p-8">
        <Text
          className="text-4xl font-bold text-center mb-10"
          style={{ color: "#73642D" }}
        >
          Ayo Daftar Sekarang
        </Text>

        {/* --- Form Inputs --- */}
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: "#73642D" }}
        >
          Email
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{ backgroundColor: "#FFF58A" }}
          placeholder="Ex: user@mail.com"
          placeholderTextColor="#B8AE49"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: "#73642D" }}
        >
          Nama Lengkap
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{ backgroundColor: "#FFF58A" }}
          placeholder="Ex: Budi Santoso"
          placeholderTextColor="#B8AE49"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: "#73642D" }}
        >
          Tanggal Lahir
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{ backgroundColor: "#FFF58A" }}
          placeholder="Ex: 2000-01-30"
          placeholderTextColor="#B8AE49"
          value={tanggalLahir}
          onChangeText={setTanggalLahir}
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: "#73642D" }}
        >
          Kata Sandi
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-6 border-2"
          style={{ backgroundColor: "#FFF58A" }}
          placeholder="******"
          placeholderTextColor="#B8AE49"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: "#73642D" }}
        >
          Profesi
        </Text>
        <View className="flex-row justify-around mb-6">
          {profesiOptions.map((option) => (
            <Pressable
              key={option}
              className={`py-3 px-5 rounded-full border`}
              style={{
                borderColor: "#73642D",
                backgroundColor: profesi === option ? "#FFF58A" : "transparent",
              }}
              onPress={() => setProfesi(option)}
            >
              <Text style={{ color: "#73642D" }}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* --- Syarat & Ketentuan (Custom Checkbox) --- */}
        <TouchableOpacity 
          className="flex-row items-start mb-8"
          onPress={() => setAgree(!agree)}
          activeOpacity={0.7}
        >
          <View 
            className="w-6 h-6 border-2 rounded mr-3 items-center justify-center"
            style={{ 
              borderColor: "#73642D",
              backgroundColor: agree ? "#FFF58A" : "transparent"
            }}
          >
            {agree && (
              <Text style={{ color: "#73642D", fontSize: 16, fontWeight: "bold" }}>
                ✓
              </Text>
            )}
          </View>
          <View className="flex-1">
            <Text style={{ color: "#73642D", fontSize: 14, lineHeight: 20 }}>
              Dengan ini saya menyatakan setuju terhadap seluruh syarat,
              ketentuan, dan kebijakan yang ditetapkan oleh aplikasi.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 rounded-full items-center border-2"
          style={{ backgroundColor: "#FFF58A" }}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-lg font-bold" style={{ color: "#73642D" }}>
            {loading ? "Mendaftar..." : "Daftar"}
          </Text>
        </TouchableOpacity>

        {/* --- Link ke Login --- */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: "#8A7F4D" }}>Sudah punya akun? </Text>
          <Link href="/login">
            <Text style={{ color: "#73642D", fontWeight: "bold" }}>Masuk</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}