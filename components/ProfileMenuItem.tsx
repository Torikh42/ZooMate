import colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function ProfileMenuItem({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-yellow-200 p-3 rounded-lg mb-2"
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={20} color={colors.yellow.darker} />
      <Text className="ml-3 text-base font-semibold text-yellow-900">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
