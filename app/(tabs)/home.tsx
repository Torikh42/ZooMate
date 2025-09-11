import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // The root layout will handle the redirect automatically.
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Text className="text-2xl font-bold mb-4">
        Selamat Datang, {profile?.full_name || 'Pengguna'}!
      </Text>
      <Text className="text-lg text-gray-600 mb-8">
        Anda login sebagai {profile?.profesi || '-'}
      </Text>
      
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 py-3 px-8 rounded-lg"
      >
        <Text className="text-white font-bold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;