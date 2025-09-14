import React from "react";
import { View } from "react-native";
import colors from "../../constants/Colors";

export default function TabBarBackground() {
  return (
    <View
      className="absolute left-0 right-0 -top-5 h-30 rounded-t-2xl"
      style={{ backgroundColor: colors.yellow.normal }}
    />
  );
}
