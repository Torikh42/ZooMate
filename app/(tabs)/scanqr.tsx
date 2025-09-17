import colors from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

type TargetPath = "/(untabs)/animalList" | "/(untabs)/animalDetail";

export default function ScanQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

    // Aktifkan kamera saat komponen mount
    setIsActive(true);

    return () => {
      // Nonaktifkan kamera saat komponen unmount
      setIsActive(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Reset state saat screen mendapatkan fokus
      setScanned(false);
      setIsActive(true);

      return () => {
        // Nonaktifkan kamera saat screen kehilangan fokus
        setIsActive(false);
      };
    }, [])
  );

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned || !isActive) return;
    setScanned(true);
    Vibration.vibrate();

    if (data.startsWith("zoomate://")) {
      try {
        const parts = data.split("/");
        const type = parts[2];
        const id = parts[3];

        if (!id) throw new Error("ID tidak ditemukan.");

        let targetPath: TargetPath;
        let params: any = {};

        if (type === "kandang") {
          targetPath = "/(untabs)/animalList";
          params = { kandangId: id };
        } else if (type === "satwa") {
          targetPath = "/(untabs)/animalDetail";
          params = { satwaId: id };
        } else {
          throw new Error("Tipe QR tidak dikenal.");
        }

        Alert.alert("Kode QR Ditemukan!", `Membuka halaman ${type}...`, [
          {
            text: "OK",
            onPress: () => {
              router.push({ pathname: targetPath, params });
            },
          },
        ]);
      } catch (e) {
        Alert.alert("Error", "Format QR code tidak valid.", [
          { text: "Pindai Lagi", onPress: () => setScanned(false) },
        ]);
      }
    } else {
      Alert.alert(
        "QR Code Tidak Sesuai",
        "Ini bukan QR code untuk aplikasi ZooMate.",
        [{ text: "Pindai Lagi", onPress: () => setScanned(false) }]
      );
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Kami butuh izin Anda untuk menggunakan kamera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Beri Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isActive && (
        <CameraView
          ref={cameraRef}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <View style={styles.overlay}>
        <View style={styles.scanBox} />
        <Text style={styles.overlayText}>Arahkan kamera ke Kode QR</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  permissionText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "white",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.yellow.normal,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: colors.yellow.darker,
    fontWeight: "bold",
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 24,
  },
  overlayText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
