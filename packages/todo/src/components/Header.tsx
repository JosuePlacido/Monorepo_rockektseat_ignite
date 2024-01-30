import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import logoImg from "../assets/images/logo/logo.png";

export function Header() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
