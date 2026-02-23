import "dotenv/config";

export default {
  expo: {
    name: "finsolvz",
    slug: "finsolvz",
    version: "1.0.3",
    plugins: ["expo-router", "expo-secure-store"],
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      eas: {
        projectId: "dd21536f-fe9f-4bba-bfc3-714bf287f848",
      },
    },
    android: {
      package: "com.adviz.finsolvz",
    },

    web: {
      bundler: "metro",
    },
  },
};
