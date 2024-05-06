import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Quick Transitt",
  slug: "quick-transitt",
  scheme: "quick-transitt",
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
    enabled: true,
    fallbackToCacheTimeout: 0,
    checkAutomatically:"ON_LOAD"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.jbportalsblr.quicktransitt",
    supportsTablet: true,
    buildNumber:"1"
  },
  android: {
    package: "com.jbportalsblr.quicktransitt",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    versionCode:1
  },
  extra: {
    eas: {
      projectId: "2ed4fed3-b4e8-49b9-91ea-b0a8b9ec6a2f",
    },
  },
  owner: "jb_portals",
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        recordAudioAndroid: false,
      },
    ],
  ],
});
