import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Quick Transitt",
  slug: "qt-partner-app",
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
    url: "https://u.expo.dev/eb31288b-ff70-4587-bb68-75ef694528c1",
    enabled: true,
    fallbackToCacheTimeout: 0,
    checkAutomatically:"ON_LOAD"
  },
  runtimeVersion: {
    policy: "appVersion"
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
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  extra: {
    eas: {
      projectId: "eb31288b-ff70-4587-bb68-75ef694528c1",
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
