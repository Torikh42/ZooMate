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
  Platform,
} from "react-native";
import { Profesi, useAuth } from "../../context/AuthContext";
import colors from "../../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const profesiOptions: Profesi[] = ["zookeeper", "supervisor", "dokter"];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profesi, setProfesi] = useState<Profesi | null>(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !fullName || !date || !profesi || !phoneNumber || !address) {
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
        tanggal_lahir: date.toISOString().split('T')[0],
        profesi: profesi,
        phone_number: phoneNumber,
        address: address,
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

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="p-8">
        <Text
          className="text-4xl font-bold text-center mb-10"
          style={{ color: colors.yellow.darker }}
        >
          Ayo Daftar Sekarang
        </Text>

        {/* --- Form Inputs --- */}
        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Email
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: user@mail.com"
          placeholderTextColor={colors.yellow.dark}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Nama Lengkap
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Budi Santoso"
          placeholderTextColor={colors.yellow.dark}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Nomor Telepon
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: 081234567890"
          placeholderTextColor={colors.yellow.dark}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Alamat
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-4 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="Ex: Jl. Raya No. 123"
          placeholderTextColor={colors.yellow.dark}
          value={address}
          onChangeText={setAddress}
        />

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
              color: colors.yellow.darker
            }}
            placeholder="YYYY-MM-DD"
            value={date.toISOString().split('T')[0]}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Kata Sandi
        </Text>
        <TextInput
          className="h-14 rounded-full px-5 text-base mb-6 border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          placeholder="******"
          placeholderTextColor={colors.yellow.dark}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text
          className="text-lg font-semibold mb-2"
          style={{ color: colors.yellow.darker }}
        >
          Profesi
        </Text>
        <View className="flex-row justify-around mb-6">
          {profesiOptions.map((option) => (
            <Pressable
              key={option}
              className={`py-3 px-5 rounded-full border`}
              style={{
                borderColor: colors.yellow.darker,
                backgroundColor: profesi === option ? colors.yellow.normal : "transparent",
              }}
              onPress={() => setProfesi(option)}
            >
              <Text style={{ color: colors.yellow.darker }}>
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
              borderColor: colors.yellow.darker,
              backgroundColor: agree ? colors.yellow.normal : "transparent",
            }}
          >
            {agree && (
              <Text style={{ color: colors.yellow.darker, fontSize: 16, fontWeight: "bold" }}>
                ✓
              </Text>
            )}
          </View>
          <View className="flex-1">
            <Text style={{ color: colors.yellow.darker, fontSize: 14, lineHeight: 20 }}>
              Dengan ini saya menyatakan setuju terhadap seluruh syarat,
              ketentuan, dan kebijakan yang ditetapkan oleh aplikasi.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 rounded-full items-center border-2"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-lg font-bold" style={{ color: colors.yellow.darker }}>
            {loading ? "Mendaftar..." : "Daftar"}
          </Text>
        </TouchableOpacity>

        {/* --- Link ke Login --- */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.grayText }}>Sudah punya akun? </Text>
          <Link href="/login">
            <Text style={{ color: colors.yellow.darker, fontWeight: "bold" }}>Masuk</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
