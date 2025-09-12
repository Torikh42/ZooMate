import React, { useState } from "react";
import { ScrollView, StyleSheet, } from "react-native";
import colors from "../../constants/Colors";
import SearchBar from "../../components/ui/SearchBar";
import AnimalCard from "../../components/AnimalCard";
import { router } from "expo-router";
import HeaderTop from "@/components/ui/HeaderTop";

const animalData = [
  "Anoa",
  "Buaya Muara",
  "Domba Garut",
  "Elang Jawa",
  "Flamingo",
  "Gajah Asia",
  "Harimau Sumatera",
];

export default function SatwaData() {
  const [search, setSearch] = useState("");

  const filteredAnimals = animalData.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderTop title="Data Satwa" />
      <SearchBar value={search} onChange={setSearch} />
      {filteredAnimals.map((name) => (
        <AnimalCard
          key={name}
          name={name}
          status="Kandang belum di cek"
          onPress={() => {
            router.push("/(untabs)/animalDetail")
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 18,
    paddingTop: 24,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  backButton: {
    backgroundColor: colors.yellow.normal,
    borderRadius: 999,
    padding: 8,
    marginRight: 10,
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