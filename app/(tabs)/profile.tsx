import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileMenuItem from "@/components/ProfileMenuItem";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white mt-6"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="px-4 pt-6 pb-3 items-center">
        <Text className="text-2xl font-bold text-yellow-900">Profil Saya</Text>
      </View>

      <ProfileAvatar profile={profile} />
      <ProfileDetails profile={profile} />

      <View className="px-4 mt-3">
        <ProfileMenuItem icon="notifications" label="Notifikasi" />
        <ProfileMenuItem icon="lock" label="Privasi dan Keamanan" />
        <ProfileMenuItem icon="language" label="Bahasa" />
        <ProfileMenuItem icon="report" label="Laporan" />
        <ProfileMenuItem icon="logout" label="Keluar" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}
