import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation();

  const handleExpenseItemPressed = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && { opacity: 0.75 }}
      onPress={handleExpenseItemPressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{date.toLocaleDateString("he")}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 3,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
    fontSize: 14,
  },
  description: {
    fontWeight: "bold",
  },
  amountContainer: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 8,
    borderRadius: 6,
    minWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
