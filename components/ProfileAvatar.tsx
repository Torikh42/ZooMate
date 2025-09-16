import colors from "@/constants/Colors";
import { Profile } from "@/types/user";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  profile: Profile | null;
};

export default function ProfileAvatar({ profile }: Props) {
  return (
    <View className="flex-row items-center p-6 mx-3 mb-3 bg-yellow-200 rounded-xl">
      {/* Kiri: Gambar */}
      <Image
        source={
          profile?.profile_image_url
            ? { uri: profile.profile_image_url }
            : require("../assets/images/hewan.png")
        }
        className="w-20 h-20 rounded-full mr-3"
      />

      {/* Tengah: Data */}
      <View className="flex-1 justify-center">
        <Text className="text-base font-bold text-yellow-900 mb-1">
          {profile?.full_name || "Nama Pengguna"}
        </Text>
        <Text className="text-sm text-gray-500">
          {profile?.email || "email@example.com"}
        </Text>
      </View>

      {/* Kanan: Tombol Edit */}
      <TouchableOpacity className="p-2 rounded-full bg-white shadow ml-2">
        <MaterialIcons name="edit" size={24} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}
