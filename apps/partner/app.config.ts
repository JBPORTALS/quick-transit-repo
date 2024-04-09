import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Quick Transitt",
  slug: "quick-transitt",
  version: "0.1.0",
  sdkVersion: "50.0.0",
  platforms: ["ios", "android"],
  scheme: "quicktransitt",
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
    bundleIdentifier: "com.jbportalsblr.quicktransitt",
    supportsTablet: true,
  },
  android: {
    package: "com.jbportalsblr.quicktransitt",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    permissions: [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO",
    ],
  },
  extra: {
    eas: {
      projectId: "2ed4fed3-b4e8-49b9-91ea-b0a8b9ec6a2f",
    },
    router: {
      origin: false,
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
