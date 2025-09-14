import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../constants/Colors";

type Props = {
  name: string;
  status: string;
  onPress: () => void;
};

export default function AnimalCard({ name, status, onPress }: Props) {
  return (
    <View className="bg-yellow-200 rounded-xl p-3 mb-3 flex-row items-center">
      <View className="flex-1">
        <Text className="font-bold text-base text-yellow-900 mb-1">{name}</Text>
        <Text className="text-sm text-gray-500">{status}</Text>
      </View>
      <TouchableOpacity className="bg-yellow-900 py-1 px-3 rounded-lg" onPress={onPress}>
        <Text className="text-white font-semibold text-sm">Lihat Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );
}
