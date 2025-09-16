import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FeatureCard({
  title,
  description,
  icon,
  bgColor,
  onPress,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  bgColor?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="p-5 rounded-xl mb-3 flex-row items-center shadow-sm"
      style={{ backgroundColor: bgColor || "#fff" }}
      onPress={onPress}
    >
      <View className="flex-1">
        <Text className="font-bold text-gray-800 text-xl">{title}</Text>
        <Text className="text-gray-500 mt-1 text">{description}</Text>
      </View>
      <View
        className="w-11 h-11 rounded-lg justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
      >
        {icon}
      </View>
    </TouchableOpacity>
  );
}
