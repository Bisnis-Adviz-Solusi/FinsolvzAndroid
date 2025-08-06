import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Modal, Alert, Pressable, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../src/i18n";
import { useTranslation } from "react-i18next";
import { Menu, ChevronDown, X } from "lucide-react-native";

interface HomeHeaderProps {
  navigation: any;
  userName: string | null;
  formatUserName: (name: string) => string;
  showLanguageToggle: boolean;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ navigation, userName, formatUserName, showLanguageToggle }) => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState(i18n.language || "en");
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const handleChangePassword = async () => {
    setPasswordError("");
    setSuccessMessage("");
    if (!newPassword || !confirmPassword) return setPasswordError("Please fill all fields");
    if (newPassword !== confirmPassword) return setPasswordError("Passwords do not match");
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No token");
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/change-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });
      if (response.ok) {
        setSuccessMessage("Password changed successfully!");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setChangePasswordVisible(false);
          setSuccessMessage("");
        }, 2000);
      } else setPasswordError("Failed to change password");
    } catch (err) {
      setPasswordError("Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Cannot log out. Please try again later.");
    }
  };

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("selectedLanguage");
      if (storedLang && storedLang !== i18n.language) {
        await i18n.changeLanguage(storedLang);
        setLanguage(storedLang);
      }
    };
    loadLanguage();
  }, []);

  return (
    <View style={{ flexShrink: 1 }}>
      {isMobile ? (
        <View style={styles.headerWrapperMobile}>
          <Image source={require("../assets/image/LargeFinsolvz.png")} style={styles.logo} resizeMode="contain" />
          <View style={styles.rightSection}>
            <Pressable style={styles.languageBtn} onPress={() => setLanguageModalVisible(true)}>
              <Text style={styles.languageText}>{language === "zh" ? "中" : "EN"}</Text>
              <ChevronDown size={16} color="#E2E4D7" />
            </Pressable>
            <Pressable onPress={() => setMenuModalVisible(true)}>
              <Menu size={24} color="#E2E4D7" />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.headerWrapperDesktop}>
          <Image source={require("../assets/image/LargeFinsolvz.png")} style={styles.logo} resizeMode="contain" />
          <View style={styles.rightSectionDesktop}>
            <Pressable style={styles.languageBtn} onPress={() => setLanguageModalVisible(true)}>
              <Text style={styles.languageText}>{language === "zh" ? "中" : "EN"}</Text>
              <ChevronDown size={16} color="#E2E4D7" />
            </Pressable>
            <Text style={styles.welcomeDesktopText}>
              {t("welcome")}
              <Text style={styles.usernameDesktopText}>{userName ? formatUserName(userName) : "USER"}</Text>
            </Text>
            <Pressable onPress={() => setMenuModalVisible(true)}>
              <Menu size={24} color="#E2E4D7" />
            </Pressable>
          </View>
        </View>
      )}

      {isMobile && (
        <View style={styles.welcomeMobileContainer}>
          <Text style={styles.welcomeMobileText}>{t("welcome")}</Text>
          <Text style={styles.usernameTextMobile}>{userName ? formatUserName(userName) : "USER"}</Text>
        </View>
      )}

      {/* MODAL DI SINI SEMUA */}
      {/* MODAL DI SINI SEMUA */}
      {/* MODAL DI SINI SEMUA */}

      {/* Language Modal */}
      <Modal visible={languageModalVisible} transparent animationType="fade" onRequestClose={() => setLanguageModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { width: 240 }]}>
            <Text style={{ fontSize: 16, fontFamily: "UbuntuBold", marginBottom: 16, color: "white" }}>{t("chooseLanguage")}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={async () => {
                await i18n.changeLanguage("en");
                await AsyncStorage.setItem("selectedLanguage", "en");
                setLanguage("en");
                setLanguageModalVisible(false);
              }}>
              <Text style={styles.modalButtonText}>EN - English</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={async () => {
                await i18n.changeLanguage("zh");
                await AsyncStorage.setItem("selectedLanguage", "zh");
                setLanguage("zh");
                setLanguageModalVisible(false);
              }}>
              <Text style={styles.modalButtonText}>中 - 中文</Text>
            </Pressable>
            <Pressable style={styles.logoutButton} onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.logoutButtonText}>{t("cancel")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Menu Modal */}
      <Modal visible={menuModalVisible} transparent animationType="fade" onRequestClose={() => setMenuModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={() => setMenuModalVisible(false)}>
              <X size={20} color="#A0A0A0" />
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setMenuModalVisible(false);
                setChangePasswordVisible(true);
              }}>
              <Text style={styles.modalButtonText}>{t("changePassword")}</Text>
            </Pressable>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>{t("signOut")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal visible={changePasswordVisible} transparent animationType="fade" onRequestClose={() => setChangePasswordVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, fontFamily: "UbuntuMedium", marginBottom: 16, color: "white" }}>{t("changePassword")}</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              right={<TextInput.Icon icon={showNewPassword ? "eye-off" : "eye"} onPress={() => setShowNewPassword(!showNewPassword)} />}
              placeholder={t("newPassword")}
              autoCapitalize="none"
              underlineColor="#E2E4D7"
              activeUnderlineColor="#2BA787"
              placeholderTextColor="#E2E4D7"
              style={{ width: "100%", marginBottom: 12, backgroundColor: "transparent" }}
              contentStyle={{ fontFamily: "UbuntuRegular", fontSize: 16, color: "#E2E4D7", paddingLeft: 0 }}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              right={<TextInput.Icon icon={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
              placeholder={t("confirmPassword")}
              autoCapitalize="none"
              underlineColor="#E2E4D7"
              activeUnderlineColor="#2BA787"
              placeholderTextColor="#E2E4D7"
              style={{ width: "100%", marginBottom: 12, backgroundColor: "transparent" }}
              contentStyle={{ fontFamily: "UbuntuRegular", fontSize: 16, color: "#E2E4D7", paddingLeft: 0 }}
            />
            {passwordError !== "" && <Text style={{ color: "#FF6B6B", fontSize: 14 }}>{passwordError}</Text>}
            {successMessage !== "" && <Text style={{ color: "#2BA787", fontSize: 14 }}>{successMessage}</Text>}
            <View style={{ marginTop: 16, width: "100%" }}>
              <Pressable style={styles.modalButton} onPress={handleChangePassword}>
                <Text style={styles.modalButtonText}>{t("submit")}</Text>
              </Pressable>
              <Pressable style={styles.logoutButton} onPress={() => setChangePasswordVisible(false)}>
                <Text style={styles.logoutButtonText}>{t("cancel")}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapperDesktop: {
    width: "100%",
    paddingTop: 52,
    paddingHorizontal: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerWrapperMobile: {
    width: "100%",
    paddingTop: 52,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  rightSectionDesktop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 52,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 24,
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
  },
  languageBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  languageText: {
    fontFamily: "UbuntuBold",
    color: "#E2E4D7",
    fontSize: 20,
  },
  welcomeDesktopText: {
    fontFamily: "UbuntuLight",
    fontSize: 20,
    color: "#FFFFFF",
  },
  usernameDesktopText: {
    color: "#2BA787",
    fontFamily: "UbuntuBold",
  },
  welcomeMobileContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 32,
    paddingTop: 96,
    flexDirection: "column",
    gap: 4,
  },
  welcomeMobileText: {
    color: "#FFFFFF",
    fontFamily: "UbuntuLight",
    fontSize: 24,
    flexDirection: "column",
    gap: 4,
  },
  usernameTextMobile: {
    color: "#2BA787",
    fontFamily: "UbuntuBold",
    fontSize: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#314E4A",
    padding: 24,
    paddingBottom: 40,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    position: "relative",
  },
  modalButton: {
    backgroundColor: "#E2E4D7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#0D241F",
    fontFamily: "UbuntuBold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontFamily: "UbuntuBold",
    fontSize: 16,
  },
  closeButton: {
    position: "relative",
    alignSelf: "flex-end",
    paddingBottom: 8,
  },
  closeButtonText: {
    color: "#A0A0A0",
    fontFamily: "UbuntuLightItalic",
  },
});

export default HomeHeader;
