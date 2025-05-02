import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, scheme, adaptiveIcon } = getConfig();

  return {
    ...config,
    name: name,
    slug: "qt-partner",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme,
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash-icon-light.png",
      resizeMode: "contain",
      backgroundColor: "#030711",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#FFFFFF",
      },
      package: scheme,
    },
    updates: {
      url: "https://u.expo.dev/edea622a-6fcf-4f1a-a8e4-cfb033597919",
    },
    runtimeVersion: {
      policy: "appVersion",
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
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to let you share.",
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FFFFFF",
          image: "./assets/images/splash-icon-light.png",
          resizeMode: "contain",

          dark: {
            image: "./assets/images/splash-icon-dark.png",
            backgroundColor: "#030711",
            resizeMode: "contain",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};

function getConfig() {
  switch (process.env.APP_ENV) {
    case "development":
      return {
        name: "QT Partner (Dev)",
        scheme: "com.jbportals.qtpartner.dev",
        adaptiveIcon: "./assets/images/adaptive-dev-icon.png",
      };
    case "preview":
      return {
        name: "QT Partner (Preview)",
        scheme: "com.jbportals.qtpartner.preview",
        adaptiveIcon: "./assets/images/adaptive-preview-icon.png",
      };
    case "production":
      return {
        name: "QT Partner",
        scheme: "com.jbportals.qtpartner",
        adaptiveIcon: "./assets/images/adaptive-icon.png",
      };
    default:
      return {
        name: "QT Partner",
        scheme: "com.jbportals.qtpartner",
        adaptiveIcon: "./assets/images/adaptive-icon.png",
      };
  }
}
