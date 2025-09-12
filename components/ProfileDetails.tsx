import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/constants/Colors";

export default function ProfileDetails() {
  const data = [
    { label: "Nama Pengguna: ", value: "Indy Agustin" },
    { label: "Email: ", value: "indyeye@gmail.com" },
    { label: "No. Telepon: ", value: "08878876554" },
    {
      label: "Alamat: ",
      value:
        "Jalan Gang Haji Ipin No. 1, Pangkalan Jati, Cinere, Kota Depok, Jawa Barat 16514",
    },
  ];

  return (
    <View style={styles.wrapper}>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
    marginBottom: 20,
    marginTop: 12,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  label: {
    fontSize: 14,
    color: colors.grayText,
    fontWeight: "500",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#222",
    textAlign: "right",
    flex: 1,
    paddingLeft: 12,
  },
});