import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function ProfileMenuItem({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <MaterialIcons name={icon} size={20} color={colors.yellow.darker} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.yellow.normal,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: colors.yellow.darker,
  },
});