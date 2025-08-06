import React from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

interface ChartData {
  name: string;
  values: number[];
}

interface BarChartFlatListProps {
  data: ChartData[];
  months: string[];
  categories: string[];
}

const colors = ["#FF6384", "#61a5c2", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0", "#3F51B5"];
const screenWidth = Dimensions.get("window").width;

const BarChartFlatList: React.FC<BarChartFlatListProps> = ({ data, months, categories }) => {
  const barWidth = 20;
  const maxValue = Math.max(...data.flatMap((d) => d.values));

  const categoryColors: Record<string, string> = {};
  categories.forEach((c, i) => {
    categoryColors[c] = colors[i % colors.length];
  });

  return (
    <FlatList
      horizontal
      data={months}
      keyExtractor={(item) => item}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: month, index: monthIndex }) => (
        <View style={styles.monthColumn}>
          <Text style={styles.monthLabel}>{month}</Text>
          <View style={styles.barGroup}>
            {data.map((company, companyIndex) => {
              const val = company.values[monthIndex] || 0;
              const height = (val / maxValue) * 150;
              return (
                <TouchableOpacity
                  key={`${month}-${company.name}`}
                  style={{
                    width: barWidth,
                    height,
                    backgroundColor: categoryColors[company.name],
                    marginHorizontal: 4,
                    justifyContent: "flex-end",
                  }}
                  onPress={() => console.log("CLICKED", company.name, month)}
                >
                  <Text style={styles.barValue}>{val}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  monthColumn: {
    alignItems: "center",
    marginRight: 24,
  },
  monthLabel: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 8,
  },
  barGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    backgroundColor: "#071C25",
    padding: 4,
    borderRadius: 6,
  },
  barValue: {
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
    marginTop: 2,
  },
});

export default BarChartFlatList;
