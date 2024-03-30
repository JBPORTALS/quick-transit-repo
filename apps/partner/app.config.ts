import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Quick Transitt",
  slug: "quick-transit",
  scheme: "quick-tranist",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash-screen.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
    dark: {
      backgroundColor: "#000000",
      image: "./assets/splash-screen.png",
      resizeMode: "contain",
    },
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: true,
  },
  android: {
    package: "your.bundle.identifier",
    adaptiveIcon: {
      foregroundImage: "./assets/splash-screen.png",
      backgroundColor: "#FFFFFF",
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    [
      "expo-font",
      {
        fonts: ["node_modules/@expo-google-fonts/poppins/Poppins_100Thin.ttf"],
      },
    ],
  ],
});
