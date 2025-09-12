import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../../constants/Colors";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari Satwa Di Kebun Binatang Ini"
        placeholderTextColor={colors.grayText}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: colors.grayText,
  },
});