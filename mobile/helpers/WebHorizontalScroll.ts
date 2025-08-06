import { useEffect } from "react";
import { Platform } from "react-native";

export const useHorizontalScroll = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      const style = document.createElement("style");
      style.innerHTML = `
        .horizontal-scroll-web {
          overflow-x: auto !important;
          overflow-y: hidden !important;
          white-space: nowrap !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
};
