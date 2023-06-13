import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";
import ExpensesList from "./ExpensesList";
import ExpensesSummery from "./ExpensesSummery";
export default function ExpensesOutput({ expenses, period, fallbackText }) {
  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={expenses} period={period} />
      {expenses?.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>{fallbackText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
  },
});
