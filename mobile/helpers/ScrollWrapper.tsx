import React, { use, useCallback, useState } from "react";
import { ScrollView, Platform, StyleSheet, ViewStyle, ScrollViewProps, RefreshControl } from "react-native";
import { useHorizontalScroll } from "./WebHorizontalScroll";
interface Props extends ScrollViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
  onRefresh?: () => Promise<void> | void;
}

export const ScrollWrapper: React.FC<Props> = ({ children, style, onRefresh, horizontal = false, ...rest }) => {
  const [refreshing, setRefreshing] = useState(false);
  useHorizontalScroll();
  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    try {
      setRefreshing(true);
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  const webOnlyStyles =
    Platform.OS === "web"
      ? {
          overflowX: horizontal ? "auto" : ("hidden" as any),
          overflowY: horizontal ? "hidden" : ("auto" as any),
          maxHeight: "100vh" as any,
        }
      : {};

  return (
    <ScrollView
      {...rest}
      horizontal={horizontal}
      style={[styles.scroll, style, webOnlyStyles]}
      contentContainerStyle={[{ flexGrow: 1 }, rest.contentContainerStyle]}
      refreshControl={onRefresh && Platform.OS !== "web" ? <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> : undefined}
      {...(Platform.OS === "web" ? { className: "horizontal-scroll-web" } : {})}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
});
