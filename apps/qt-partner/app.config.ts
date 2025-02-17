import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "QT Parnter",
  slug: "qt-partner",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "com.jbportals.qtpartner",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#592D8F",
    },
    package: "com.jbportals.qtpartner",
  },
  extra: {
    eas: {
      projectId: "edea622a-6fcf-4f1a-a8e4-cfb033597919",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-font",
      {
        fonts: ["./assets/fonts/Geist-Black.otf"],
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#FFFFFF",
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        dark: {
          image: "./assets/images/splash.png",
          backgroundColor: "#000000",
          resizeMode: "contain",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
