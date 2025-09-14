import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";

type Props = {
  title: string;
  backTo?: string; // opsional: fallback jika router.back() gagal
};

export default function HeaderTop({ title }: Props) {
  const router = useRouter();


  return (
    <View className="flex-row items-center mb-4 px-1 pt-4">
      <TouchableOpacity className="bg-yellow-200 rounded-full p-1 mr-5 shadow" onPress={router.back}>
        <MaterialIcons name="arrow-back-ios-new" size={22} color={colors.yellow.darker} />
      </TouchableOpacity>
      <Text className="font-bold text-xl text-yellow-900">{title}</Text>
    </View>
  );
}
