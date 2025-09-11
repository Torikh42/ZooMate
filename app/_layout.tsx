import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { AuthProvider, useAuth } from "../context/AuthContext";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}

function InitialLayout() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (session) {

      router.replace("/(tabs)/home");
    } else {
      router.replace("/(auth)/signUp");
    }
  }, [session, loading]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
