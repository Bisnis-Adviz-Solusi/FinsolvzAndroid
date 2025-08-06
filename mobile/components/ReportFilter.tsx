import React, { useState, useEffect, JSX } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, ActivityIndicator, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

interface ReportFilterProps {
  onFilterChange: (company: string | null, type: string[] | null) => void;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ClientReportFilter: React.FC<ReportFilterProps> = ({ onFilterChange }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [companyList, setCompanyList] = useState<{ _id: string; name: string }[]>([]);
  const [reportTypes, setReportTypes] = useState<{ _id: string; name: string }[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Oops", "Something went wrong, try again later.");
        return;
      }

      const response = await axios.get(`${API_URL}/api/user/companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompanyList(response.data);
    } catch (error) {
      Alert.alert("Oops", "Something went wrong, try again later.");
    } finally {
      setLoading(false);
    }
  };
  const fetchReportTypes = async (companyId: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(`${API_URL}/api/reports/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uniqueReportTypes = Array.from(new Set(response.data.map((report: any) => report.reportType.name))).map((name) => {
        return response.data.find((report: any) => report.reportType.name === name).reportType;
      });

      setReportTypes(uniqueReportTypes);
    } catch (error) {
      Alert.alert("Oops", "Something went wrong, try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId);
    setSelectedTypes([]);
    fetchReportTypes(companyId);
    setIsOpen(false);
    onFilterChange(companyId, []);
  };

  const toggleReportType = (typeId: string) => {
    let updatedSelectedTypes;
    if (selectedTypes.includes(typeId)) {
      updatedSelectedTypes = selectedTypes.filter((id) => id !== typeId);
    } else {
      updatedSelectedTypes = [...selectedTypes, typeId];
    }
    setSelectedTypes(updatedSelectedTypes);
    onFilterChange(selectedCompany, updatedSelectedTypes);
  };

  return (
    <View style={[styles.filterContainer, isOpen && styles.filterContainerOpen]}>
      <View style={styles.dropdownContainers}>
        <Text style={styles.chooseText}>{t("chooseCompany")}</Text>

        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          {loading ? (
            <ActivityIndicator size="small" color="#253d3d" />
          ) : (
            <Text style={styles.dropdownText}>{selectedCompany ? companyList.find((c) => c._id === selectedCompany)?.name : t("selectCompany")}</Text>
          )}
        </TouchableOpacity>

        {!isOpen && selectedCompany && <Text style={styles.chooseText}>{t("chooseReportType")}</Text>}

        {isOpen && !loading && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={companyList}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => {
                const isSelected = selectedCompany === item._id;
                const isFirst = index === 0;
                const isLast = index === companyList.length - 1;

                return (
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownItem,
                        isSelected && styles.dropdownItemSelected,
                        isSelected && isFirst && styles.dropdownItemSelectedTop,
                        isSelected && isLast && styles.dropdownItemSelectedBottom,
                      ]}
                      onPress={() => handleCompanySelect(item._id)}>
                      <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemTextSelected]}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
      {!isOpen && selectedCompany && (
        <View style={styles.reportTypeContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonScrollContent} style={styles.buttonContainer}>
            {loading ? (
              <Text
                style={{
                  color: "#A0A0A0",
                  fontStyle: "italic",
                  fontFamily: "UbuntuLightItalic",
                  paddingLeft: 16,
                  marginBottom: 16,
                }}>
                Fetching data...
              </Text>
            ) : (
              reportTypes.slice(0, 3).map((reportType) => (
                <TouchableOpacity
                  key={reportType._id}
                  style={[styles.button, selectedTypes.includes(reportType._id) && styles.buttonSelected]}
                  onPress={() => toggleReportType(reportType._id)}>
                  <Text style={[styles.buttonText, selectedTypes.includes(reportType._id) && styles.buttonTextSelected]}>
                    {t(`reportTypes.${reportType.name}`)}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1B3935",
    backgroundColor: "#011414",
    paddingVertical: 24,
    marginTop: 64,
    width: "88%",
    minWidth: 308,
  },
  chooseText: {
    fontFamily: "UbuntuBold",
    fontSize: 16,
    color: "#F4F4F4",
    marginBottom: 8,
  },
  filterContainerOpen: {
    flex: -1,
    zIndex: 10,
  },
  dropdownContainers: {
    marginBottom: 24,
    position: "relative",
    width: width * 0.75,
  },
  dropdown: {
    marginBottom: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "UbuntuRegular",
    color: "#253d3d",
  },
  dropdownContainer: {
    marginTop: -20,
    zIndex: 2,
    borderRadius: 14,
    backgroundColor: "rgba(240, 240, 240, 1)",
    width: "100%",
  },
  dropdownItem: {
    paddingVertical: 12,
    width: "100%",
    paddingHorizontal: 12,
  },
  dropdownItemSelected: {
    backgroundColor: "#253d3d",
    width: "100%",
  },
  dropdownItemText: {
    fontFamily: "UbuntuRegular",
    fontSize: 16,
    color: "#253d3d",
  },
  dropdownItemTextSelected: {
    color: "#ffffff",
  },
  dropdownItemSelectedTop: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  dropdownItemSelectedBottom: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },

  buttonContainer: {
    marginTop: -20,
    flexGrow: 0,
  },
  reportTypeContainer: {
    width: "100%",
    overflow: "hidden",
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#011414",
    marginTop: -24,
  },

  buttonScrollContent: {
    paddingVertical: 4,
    alignItems: "center",
  },

  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    marginHorizontal: 5,
    flexShrink: 0,
  },
  buttonSelected: {
    borderWidth: 0,
    backgroundColor: "#6c918b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "UbuntuRegular",
  },
  buttonTextSelected: {
    color: "#fff",
  },
});

export default ClientReportFilter;
