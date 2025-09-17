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
          "Aplikasi ini memerlukan akses kamera untuk memindai QR code kandang dan satwa.",
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
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      eas: {
        projectId: "2dcb359e-9ddc-4147-896e-16eee6aa7ea2",
      },
    },
  },
};
