import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useKandang } from "../../hooks/useKandang";

const ZooMapScreen = () => {
  const { kandangData, loading, error } = useKandang();
  const [mapRegion, setMapRegion] = useState({
    latitude: -6.2, // Default: Jakarta latitude
    longitude: 106.816666, // Default: Jakarta longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Adjust map region based on kandang locations
  useEffect(() => {
    if (kandangData && kandangData.length > 0) {
      const validKandang = kandangData.filter((k) => k.latitude && k.longitude);

      if (validKandang.length > 0) {
        const latitudes = validKandang.map((k) => Number(k.latitude));
        const longitudes = validKandang.map((k) => Number(k.longitude));

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;
        const latDelta = Math.max(maxLat - minLat, 0.01) * 1.5;
        const lngDelta = Math.max(maxLng - minLng, 0.01) * 1.5;

        setMapRegion({
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        });
      }
    }
  }, [kandangData]);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "Sudah Diberi":
        return "#22c55e"; // Green
      case "Belum Diberi":
      default:
        return "#ef4444"; // Red
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Sudah Diberi":
        return "check-circle";
      case "Belum Diberi":
      default:
        return "error";
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#eab308" />
        <Text style={styles.loadingText}>Loading peta kandang...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} showsUserLocation={true}>
        {kandangData?.map((kandang) => {
          if (!kandang.latitude || !kandang.longitude) return null;

          return (
            <Marker
              key={kandang.id}
              coordinate={{
                latitude: Number(kandang.latitude),
                longitude: Number(kandang.longitude),
              }}
              title={kandang.nama_kandang}
              description={`${kandang.lokasi} - Status: ${
                kandang.status_pakan || "Belum Diberi"
              }`}
            >
              <View
                style={[
                  styles.markerContainer,
                  {
                    backgroundColor: getMarkerColor(
                      kandang.status_pakan || "Belum Diberi"
                    ),
                  },
                ]}
              >
                <MaterialIcons
                  name={getStatusIcon(kandang.status_pakan || "Belum Diberi")}
                  size={20}
                  color="white"
                />
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Status Pakan Kandang</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#ef4444" }]} />
          <Text style={styles.legendText}>Belum Diberi</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#22c55e" }]} />
          <Text style={styles.legendText}>Sudah Diberi</Text>
        </View>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Peta Kandang Zoo</Text>
        <Text style={styles.overlaySubtext}>
          {kandangData?.length || 0} Kandang Terdaftar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  overlayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  overlaySubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  legend: {
    position: "absolute",
    bottom: 50,
    left: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: "#374151",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b7280",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    textAlign: "center",
    margin: 20,
  },
});

export default ZooMapScreen;