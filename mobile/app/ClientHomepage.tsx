import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, FlatList, ActivityIndicator, RefreshControl, Image } from "react-native";
import ReportFilter from "../components/ReportFilter";
import ResultsPage from "../components/Results";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import HomeHeader from "../components/HeaderHome";
import i18n from "../src/i18n";
import { useTranslation } from "react-i18next";
import { ScrollWrapper } from "../helpers/ScrollWrapper";
import ClientReportFilter from "../components/ReportFilter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#314E4A",
  },
  bgOrb: {
    position: "absolute",
    zIndex: -1,
    resizeMode: "contain",
    opacity: 0.5,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  grid: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  profile: {
    width: 60,
    height: 70,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 23,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  picker: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },
  noCompanyText: {
    fontSize: 16,
    color: "#bbb",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#15616D",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const HomePage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);
  const { t } = useTranslation();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [user, setUser] = useState<any | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  function formatUserName(name: string) {
    if (name.length <= 15) {
      return name;
    }
    let spaceIndexes = [];
    for (let i = 0; i < name.length; i++) {
      if (name[i] === " ") {
        spaceIndexes.push(i);
      }
    }
    if (spaceIndexes.length < 2) {
      return name;
    }
    const secondSpaceIndex = spaceIndexes[1];
    return name.substring(0, secondSpaceIndex) + "\n" + name.substring(secondSpaceIndex + 1);
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const lang = await AsyncStorage.getItem("selectedLanguage");
        if (lang) i18n.changeLanguage(lang);
        if (!token) return;

        const response = await axios.get(`${API_URL}/api/loginUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setUserName(response.data.name);
      } catch (err) {
        Alert.alert("Oops", "Something went wrong, try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleFilterChange = (company: string | null, type: string[] | null) => {
    setSelectedCompany(company);
    setReportType(type ? type.join(", ") : null);
  };
  const handleReportNavigation = () => {
    if (!selectedCompany || !reportType) return;

    navigation.navigate("BSPL", {
      companyId: selectedCompany,
      reportType,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
   
      const token = await AsyncStorage.getItem("authToken");
      const lang = await AsyncStorage.getItem("selectedLanguage");
      if (lang) i18n.changeLanguage(lang);
      if (!token) return;

      const response = await axios.get(`${API_URL}/api/loginUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setUserName(response.data.name);

      setSelectedCompany(null);
      setReportType(null);
      setRefreshKey(Date.now());
    } catch (err) {
      console.log("THIS IS ERROR >>>", err);
      Alert.alert("Oops", "Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };
  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#2BA787" />
    </View>
  ) : (
    <LinearGradient colors={["#011414", "#314E4A"]} style={{ flex: 1 }}>
      <Image
        source={require("../assets/image/GreenRoundBG.png")}
        style={[
          styles.bgOrb,
          screenWidth >= 700
            ? {
                top: -150,
                right: -430,
                width: screenWidth * 6,
                transform: [{ translateX: screenWidth * 2.5 }],
              }
            : {
                top: -160,
                right: -screenWidth * 2.5,
                width: screenWidth * 7,
              },
        ]}
      />

      <HomeHeader navigation={navigation} userName={userName} formatUserName={formatUserName} showLanguageToggle={user?.role === "CLIENT"} />

      <FlatList
        data={[]} 
        keyExtractor={() => "static"} 
        renderItem={null}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={{ alignItems: "center" }}>
              <ClientReportFilter key={`${i18n.language}-${refreshKey}`} onFilterChange={handleFilterChange} />
            </View>

            {selectedCompany && reportType && <ResultsPage selectedCompany={selectedCompany} reportType={reportType} onPressResult={handleReportNavigation} />}
          </>
        }
      />
    </LinearGradient>
  );
};

export default HomePage;
