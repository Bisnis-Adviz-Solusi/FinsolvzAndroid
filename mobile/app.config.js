import "dotenv/config";

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "";
const usesCleartextTraffic = apiUrl.startsWith("http://");

export default {
  expo: {
    name: "finsolvz",
    slug: "finsolvz",
    version: "1.0.9",
    orientation: "portrait",
    icon: "./assets/image/LogoHorizontal.png",
    splash: {
      image: "./assets/image/LogoHorizontal.png",
      resizeMode: "contain",
      backgroundColor: "#011414",
    },
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    plugins: ["expo-secure-store", "expo-font", "expo-web-browser"],
    extra: {
      apiUrl,
      eas: {
        projectId: "dd21536f-fe9f-4bba-bfc3-714bf287f848",
      },
    },
    ios: {
      buildNumber: "9",
      supportsTablet: false,
      bundleIdentifier: "finsolvz.beta",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      supportsTablet: false,
    },
    icon: "./assets/image/logoFinsolvz.png",

    android: {
      package: "finsolvz.beta",
      versionCode: 9,
      adaptiveIcon: {
        foregroundImage: "./assets/image/logoFinsolvz.png",
        backgroundColor: "#011414",
      },
      usesCleartextTraffic,
    },
    androidStatusBar: {
      backgroundColor: "#011414",
      barStyle: "light-content",
    },
    androidNavigationBar: {
      backgroundColor: "#011414",
      barStyle: "light-content",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/image/logoFinsolvz.png",
    },
    experiments: {
      typedRoutes: false,
    },
    cli: {
      appVersionSource: "project",
    },
  },
};
