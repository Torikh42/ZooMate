import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { AuthProvider, useAuth } from "../context/AuthContext";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
    // Wait for the auth state to load
    if (loading) return;

    if (session) {
      // User is signed in, redirect to the main app
      router.replace("/(tabs)/home");
    } else {
      // User is not signed in, redirect to the sign up page
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
