import colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRCodePopupProps {
  visible: boolean;
  onClose: () => void;
  qrValue: string;
  title: string;
}

export default function QRCodePopup({
  visible,
  onClose,
  qrValue,
  title,
}: QRCodePopupProps) {
  let qrCodeRef: any = null;

  const handleShareQRCode = () => {
    if (!qrCodeRef) {
      Alert.alert("Error", "Gagal membagikan QR Code.");
      return;
    }

    // Mengubah SVG menjadi data base64
    qrCodeRef.toDataURL(async (data: string) => {
      const path = FileSystem.cacheDirectory + "qrcode.png";
      try {
        // Menulis data base64 sebagai file PNG
        await FileSystem.writeAsStringAsync(path, data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // Membagikan file yang sudah dibuat
        await Sharing.shareAsync("file://" + path, {
          mimeType: "image/png",
          dialogTitle: "Bagikan atau Simpan Kode QR",
        });
      } catch (error) {
        console.error("Error sharing QR code:", error);
        Alert.alert("Error", "Gagal membagikan QR Code.");
      }
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>Berhasil dibuat!</Text>

          <View style={{ marginVertical: 20 }}>
            <QRCode
              value={qrValue}
              size={220}
              getRef={(c) => (qrCodeRef = c)}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonShare}
            onPress={handleShareQRCode}
          >
            <MaterialIcons name="share" size={20} color="white" />
            <Text style={styles.buttonShareText}>Download / Share QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonCloseText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.yellow.darker,
  },
  modalSubtitle: {
    fontSize: 16,
    color: colors.grayText,
    marginBottom: 15,
  },
  buttonShare: {
    backgroundColor: colors.yellow.darker,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonShareText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },
  buttonClose: {
    marginTop: 15,
  },
  buttonCloseText: {
    color: colors.grayText,
    fontWeight: "bold",
    textAlign: "center",
  },
});
