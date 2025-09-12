import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "@/constants/Colors";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileMenuItem from "@/components/ProfileMenuItem";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Profil Saya</Text>
      </View>

      <ProfileAvatar />
      <ProfileDetails />

      <View style={styles.menuWrapper}>
        <ProfileMenuItem icon="notifications" label="Notifikasi" />
        <ProfileMenuItem icon="lock" label="Privasi dan Keamanan" />
        <ProfileMenuItem icon="language" label="Bahasa" />
        <ProfileMenuItem icon="report" label="Laporan" />
        <ProfileMenuItem icon="logout" label="Keluar" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 24
  },
  content: {
    paddingBottom: 100,
  },
  titleWrapper: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.yellow.darker,
  },
  menuWrapper: {
    paddingHorizontal: 18,
    marginTop: 12,
  },
});