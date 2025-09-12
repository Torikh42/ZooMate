import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import colors from "@/constants/Colors";
import CenterTabButton from "@/components/ui/CenterTabButton";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.yellow.darker,
        tabBarInactiveTintColor: "#9b9b9b",
        tabBarStyle: {
          backgroundColor: colors.yellow.normal,
          borderTopWidth: 0,
          height: 78,
          paddingTop: 6,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanqr"
        options={{
          title: "Scan QR",
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code" size={22} color={color} />,
          tabBarButton: (props) => <CenterTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}