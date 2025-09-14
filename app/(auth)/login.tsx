
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import colors from "../../constants/Colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Harap isi email dan kata sandi.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn({ email, password });

      if (error) {
        Alert.alert("Login Error", error.message);
      } else {
      }
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
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
          Selamat Datang
        </Text>

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

        <TouchableOpacity
          className="px-16 py-3 rounded-full items-center border-2 self-center"
          style={{
            backgroundColor: colors.yellow.normal,
            borderColor: colors.yellow.dark,
          }}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text
            className="text-lg font-bold"
            style={{ color: colors.yellow.darker }}
          >
            {loading ? "Masuk..." : "Masuk"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.grayText }}>Belum punya akun? </Text>
          <Link href="/signUp">
            <Text style={{ color: colors.yellow.darker, fontWeight: "bold" }}>
              Daftar
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
