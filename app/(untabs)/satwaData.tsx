import HeaderTop from "@/components/ui/HeaderTop";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import AnimalCard from "../../components/AnimalCard";
import SearchBar from "../../components/ui/SearchBar";

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
    <ScrollView className="flex-1 bg-white p-4 pt-6 mt-5">
      <HeaderTop title="Data Satwa" />
      <SearchBar value={search} onChange={setSearch} />
      {filteredAnimals.map((name) => (
        <AnimalCard
          key={name}
          name={name}
          status="Kandang belum di cek"
          onPress={() => {
            router.push("/(untabs)/animalDetail");
          }}
        />
      ))}
    </ScrollView>
  );
}
