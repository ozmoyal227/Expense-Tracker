import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

export default function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.baseText, styles.errorHeader]}>Error ocurred!</Text>
      <Text style={styles.baseText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
    padding: 8,
  },
  errorHeader: {
    fontSize: 24,
  },
});
