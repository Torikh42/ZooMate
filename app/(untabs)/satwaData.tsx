import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl, // Added RefreshControl
} from "react-native";
import AnimalCard from "../../components/AnimalCard";
import SearchBar from "../../components/ui/SearchBar";
import { useKandang } from "../../hooks/useKandang";
import { useAuth } from "../../context/AuthContext";
import colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderTop from "@/components/ui/HeaderTop";
import { router } from "expo-router";

export default function SatwaData() {
  const [search, setSearch] = useState("");
  const { kandangData, loading, error, refetch } = useKandang(); // Get refetch
  const { profile } = useAuth();
  const [refreshing, setRefreshing] = useState(false); // State for RefreshControl

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading && !refreshing) { // Only show full loading if not refreshing
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading data kandang...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const canAddKandang = profile?.profesi === "zookeeper" || profile?.profesi === "supervisor";

  const filteredKandang = kandangData.filter((kandang) =>
    (kandang.nama_kandang || "").toLowerCase().includes(search.toLowerCase()) ||
    (kandang.lokasi && kandang.lokasi.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 p-4 pt-6 mt-5"
        refreshControl={ // Added RefreshControl
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderTop title="Data Kandang" />
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cari nama kandang..."
        />

        {filteredKandang.map((kandang) => (
          <AnimalCard
            key={kandang.id}
            name={kandang.nama_kandang}
            status={kandang.lokasi ?? "Lokasi tidak diketahui"}
            onPress={() => {
              router.push({
                pathname: "/(untabs)/animalList",
                params: {
                  kandangId: kandang.id,
                  kandangName: kandang.nama_kandang,
                },
              });
            }}
          />
        ))}
      </ScrollView>
      {canAddKandang && (
      <TouchableOpacity
        className="absolute right-6 bottom-6 bg-yellow-200 rounded-full p-4 shadow-md"
        onPress={() => router.push("../(untabs)/addKandang")}
      >
        <MaterialIcons name="add" size={32} color={colors.yellow.darker} />
      </TouchableOpacity>
      )}
    </View>
  );
}
