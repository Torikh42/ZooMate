import "dotenv/config";

export default {
  expo: {
    name: "ZooMate",
    slug: "ZooMate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "zoomate",
    userInterfaceStyle: "automatic",

    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    updates: {
      url: "https://u.expo.dev/2dcb359e-9ddc-4147-896e-16eee6aa7ea2",
    },

    runtimeVersion: {
      policy: "appVersion",
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.zoomate",
      infoPlist: {
        NSCameraUsageDescription:
          "Aplikasi ini memerlukan akses kamera untuk memindai QR code.",
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.torikh42.zoomate",
      permissions: ["CAMERA"], 
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router", // Plugin 1
      [ // Plugin 2
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [ // Plugin 3 (yang kita tambahkan)
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: "34.0.0",
            kotlinVersion: "1.9.20",
          },
          ios: {
            deploymentTarget: "15.1",
          },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      // Pastikan semua variabel dari .env terdaftar di sini
      mapsApiKey: process.env.MAPS_API_KEY,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_KEY,
      
      eas: {
        projectId: "2dcb359e-9ddc-4147-896e-16eee6aa7ea2",
      },
    },
  },
};