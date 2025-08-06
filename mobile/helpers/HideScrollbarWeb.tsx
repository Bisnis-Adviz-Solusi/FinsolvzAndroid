import { useEffect } from "react";
import { Platform } from "react-native";

export const useHideScrollbar = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      const style = document.createElement("style");
      style.innerHTML = `
        div::-webkit-scrollbar {
          display: none !important;
        }
        div {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };
    }
  }, []);
};
