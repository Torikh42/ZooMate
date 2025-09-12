import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../constants/Colors";

type Props = {
  name: string;
  status: string;
  onPress: () => void;
};

export default function AnimalCard({ name, status, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Lihat Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.yellow.darker,
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    color: colors.grayText,
  },
  button: {
    backgroundColor: colors.yellow.darker,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});