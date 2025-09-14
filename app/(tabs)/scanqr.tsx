import { Text, View } from "react-native";
import colors from "../../constants/Colors";

export default function ScanQR() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.yellow.darker,
        }}
      >
        Pindai Kode QR
      </Text>
      <Text style={{ fontSize: 16, color: colors.grayText, marginTop: 8 }}>
        Posisikan kode QR di dalam bingkai untuk memindai.
      </Text>
    </View>
  );
}
