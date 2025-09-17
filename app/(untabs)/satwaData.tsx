import HeaderTop from "@/components/ui/HeaderTop";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/ui/SearchBar";
import colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";
import { useKandang } from "../../hooks/useKandang";
import { supabase } from "../../utils/supabase";

const StatusPakanBadge = ({
  status,
}: {
  status: "Belum Diberi" | "Sudah Diberi";
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Sudah Diberi":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: "check-circle" as const,
        };
      default:
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: "error" as const,
        };
    }
  };

  const style = getStatusStyle();

  return (
    <View
      className={`flex-row items-center px-2 py-1 rounded-full ${style.bg} mt-1`}
    >
      <MaterialIcons name={style.icon} size={12} color="#666" />
      <Text className={`text-xs font-medium ml-1 ${style.text}`}>{status}</Text>
    </View>
  );
};

const KandangStatusToggle = ({
  kandangId,
  kandangName,
  currentStatus,
  onStatusUpdate,
}: {
  kandangId: string;
  kandangName: string;
  currentStatus: "Belum Diberi" | "Sudah Diberi";
  onStatusUpdate: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const updateKandangStatus = async (
    newStatus: "Belum Diberi" | "Sudah Diberi"
  ) => {
    setUpdating(true);
    try {
      // Update all animals in this kandang
      const { error: satwaError } = await supabase
        .from("satwa")
        .update({ status_pakan: newStatus })
        .eq("kandang_id", kandangId);

      if (satwaError) throw satwaError;

      // Update kandang status
      const { error: kandangError } = await supabase
        .from("kandang")
        .update({ status_pakan: newStatus })
        .eq("id", kandangId);

      if (kandangError) throw kandangError;

      onStatusUpdate();
      Alert.alert(
        "Berhasil",
        `Status pakan kandang "${kandangName}" berhasil diubah menjadi "${newStatus}"`
      );
    } catch (err) {
      console.error("Error updating kandang status:", err);
      Alert.alert("Error", "Gagal mengubah status pakan kandang");
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusToggle = () => {
    Alert.alert(
      "Update Status Pakan Kandang",
      `Pilih status pakan untuk seluruh satwa di kandang "${kandangName}"`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Belum Diberi",
          onPress: () => updateKandangStatus("Belum Diberi"),
          style: "destructive",
        },
        {
          text: "Sudah Diberi",
          onPress: () => updateKandangStatus("Sudah Diberi"),
        },
      ]
    );
  };

  if (updating) {
    return (
      <View className="p-2">
        <ActivityIndicator size="small" color={colors.yellow.darker} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleStatusToggle}
      className="p-2 rounded-full bg-blue-100"
      disabled={updating}
    >
      <MaterialIcons name="edit" size={20} color={colors.yellow.darker} />
    </TouchableOpacity>
  );
};

export default function SatwaData() {
  const [search, setSearch] = useState("");
  const { kandangData, loading, error, refetch } = useKandang();
  const { profile } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
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

  const canAddKandang =
    profile?.profesi === "zookeeper" || profile?.profesi === "supervisor";

  const filteredKandang = kandangData.filter(
    (kandang) =>
      (kandang.nama_kandang || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (kandang.lokasi &&
        kandang.lokasi.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 p-4 pt-6 mt-5"
        refreshControl={
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
          <View
            key={kandang.id}
            className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Kandang Card Content */}
            <TouchableOpacity
              className="p-4"
              onPress={() => {
                router.push({
                  pathname: "/(untabs)/animalList",
                  params: {
                    kandangId: kandang.id,
                    kandangName: kandang.nama_kandang,
                  },
                });
              }}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800 mb-1">
                    {kandang.nama_kandang}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    {kandang.lokasi ?? "Lokasi tidak diketahui"}
                  </Text>
                  <StatusPakanBadge
                    status={kandang.status_pakan || "Belum Diberi"}
                  />
                </View>

                {/* Status Toggle Button */}
                {canAddKandang && (
                  <KandangStatusToggle
                    kandangId={kandang.id}
                    kandangName={kandang.nama_kandang}
                    currentStatus={kandang.status_pakan || "Belum Diberi"}
                    onStatusUpdate={refetch}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
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
