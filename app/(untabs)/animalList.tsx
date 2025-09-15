import HeaderTop from "@/components/ui/HeaderTop";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AnimalCard from "../../components/AnimalCard";
import { useSatwa } from "../../hooks/useSatwa";

export default function AnimalList() {
  const { kandangId, kandangName } = useLocalSearchParams<{
    kandangId: string;
    kandangName?: string;
  }>();
  
  // FIX 1: Ambil 'satwaList' dari hook, bukan 'satwaData'
  const { satwaList, loading, error } = useSatwa(kandangId);
  const { profile } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#73642D" />
        <Text className="mt-2 text-gray-600">Memuat data satwa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Error: {error}</Text>
      </View>
    );
  }

  const canAddAnimal =
    profile?.profesi === "zookeeper" || profile?.profesi === "supervisor";

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4 pt-6 mt-5">
        <HeaderTop title={`Satwa di ${kandangName || "Kandang"}`} />
        {/* Anda bisa menambahkan SearchBar di sini nanti jika perlu */}
        
        {/* FIX 2: Cek jika satwaList ada dan panjangnya 0 */}
        {!satwaList || satwaList.length === 0 ? (
          <Text className="text-center mt-10 text-gray-500">
            Tidak ada satwa di kandang ini.
          </Text>
        ) : (
          satwaList.map((satwa) => (
            <AnimalCard
              key={satwa.id}
              name={satwa.nama_satwa}
              status={satwa.spesies}
              onPress={() => {
                router.push({
                  pathname: "/(untabs)/animalDetail", // Pastikan path ini benar
                  params: { satwaId: satwa.id, satwaName: satwa.nama_satwa },
                });
              }}
            />
          ))
        )}
      </ScrollView>

      {/* Tombol Tambah Satwa (Floating Action Button) */}
      {canAddAnimal && (
        <TouchableOpacity
          className="absolute right-6 bottom-6 bg-yellow-300 rounded-full p-4 shadow-lg"
          onPress={() =>
            router.push({
              pathname: "/(untabs)/addAnimal", // Pastikan path ini benar
              params: { kandangId: kandangId, kandangName: kandangName },
            })
          }
        >
          <MaterialIcons name="add" size={32} color="#73642D" />
        </TouchableOpacity>
      )}
    </View>
  );
}