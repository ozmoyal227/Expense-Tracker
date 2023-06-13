import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

export default function ExpenseInput({
  label,
  textInputConfig,
  style,
  isValid,
}) {
  const inputStyles = [styles.textInput];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (!isValid) inputStyles.push(styles.invalidInput);
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    fontSize: 12,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 8,
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 14,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
