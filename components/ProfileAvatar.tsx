import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";

export default function ProfileHeader() {
  return (
    <View style={styles.wrapper}>
      {/* Kiri: Gambar */}
      <Image source={require("@/assets/images/hewan.png")} style={styles.image} />

      {/* Tengah: Data */}
      <View style={styles.infoBox}>
        <Text style={styles.name}>Indy Agustin</Text>
        <Text style={styles.email}>indyagustin123@gmail.com</Text>
      </View>

      {/* Kanan: Tombol Edit */}
      <TouchableOpacity style={styles.editButton}>
        <MaterialIcons name="edit" size={24} color={colors.yellow.darker} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    padding: 24,
    marginHorizontal: 14,
    marginBottom: 12,
    backgroundColor: colors.yellow.normal,
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  infoBox: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.yellow.darker,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.grayText,
  },
  editButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginLeft: 8,
  },
});