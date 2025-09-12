import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <MaterialIcons name="arrow-back-ios-new" size={22} color={colors.yellow.darker} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 4,
    paddingTop: 16,
  },
  backButton: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    padding:6,
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.yellow.darker,
  },
});