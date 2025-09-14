import React from "react";
import { View, TextInput } from "react-native";
import colors from "../../constants/Colors";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View className="mb-4">
      <TextInput
        className="bg-yellow-200 rounded-full py-3 px-4 text-base text-gray-500"
        placeholder="Cari Satwa Di Kebun Binatang Ini"
        placeholderTextColor={colors.grayText}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
