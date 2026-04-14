import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./LoginPage";
import HomePage from "./Homepage";
import RevenuePage from "./RevenuePage";
import BSPLPage from "./BSPLPage";
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from "react-native-paper";
import SearchPage from "./Searchpage";
import CreateReportPage from "./CreateReport";
import ClientHomePage from "./ClientHomepage";
import { I18nextProvider } from "react-i18next"
import i18n from "../src/i18n/index"
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { RootStackParamList } from "../types";


const Stack = createStackNavigator<RootStackParamList>();
enableScreens();
void SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  console.log("PERFORMANCE_TRACE>>>", {
    scope: "SplashScreen.preventAutoHideAsync",
    status: "ignored",
    error,
  });
});

const App: React.FC = () => {
  const [fonts] = useFonts({
    UbuntuLight: require('../assets/fonts/Ubuntu-Light.ttf'),
    UbuntuRegular: require('../assets/fonts/Ubuntu-Regular.ttf'),
    UbuntuMedium: require('../assets/fonts/Ubuntu-Medium.ttf'),
    UbuntuBold: require('../assets/fonts/Ubuntu-Bold.ttf'),
    UbuntuLightItalic: require('../assets/fonts/Ubuntu-LightItalic.ttf'),
    UbuntuRegularItalic: require('../assets/fonts/Ubuntu-Italic.ttf'),
    UbuntuMediumItalic: require('../assets/fonts/Ubuntu-MediumItalic.ttf'),
    UbuntuBoldItalic: require('../assets/fonts/Ubuntu-BoldItalic.ttf'),
  })

  console.log("SCREEN_RENDER_CHECK>>>", {
    screenName: "AppRoot",
    fontsLoaded: fonts,
  });

  React.useEffect(() => {
    console.log("CONFIG_VALIDATION>>>", {
      bundleIdentifier: Constants.expoConfig?.ios?.bundleIdentifier ?? null,
      iosBuildProfileTarget: "internal-device-ipa",
      apiUrlConfigured: Boolean(Constants.expoConfig?.extra?.apiUrl),
    });

    console.log("IOS_INTERNAL_BUILD_CHECK>>>", {
      platform: Constants.platform?.ios ? "ios" : "native",
      supportsTablet: Constants.expoConfig?.ios?.supportsTablet ?? null,
      newArchEnabled: Constants.expoConfig?.newArchEnabled ?? null,
    });
  }, []);

  React.useEffect(() => {
    if (fonts) {
      console.log("PERFORMANCE_TRACE>>>", {
        scope: "AppRootFonts",
        status: "ready",
      });
      void SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="SearchPage" component={SearchPage} />
                <Stack.Screen name="CreateReport" component={CreateReportPage} />
                <Stack.Screen name="ClientHomePage" component={ClientHomePage} />
                <Stack.Screen name="Revenue" component={RevenuePage} />
                <Stack.Screen name="BSPLPage" component={BSPLPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );

};

export default App;
