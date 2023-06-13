import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from "../api/expenses.service";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ navigation, route }) {
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(null);

  const expenseId = route.params?.expenseId;
  const expensesContext = useContext(ExpensesContext);
  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, []);

  const handleConfirm = async (expenseData) => {
    setIsWaiting(true);
    try {
      if (expenseId) {
        expensesContext.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const newId = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id: newId });
      }
      navigation.goBack();
    } catch (error) {
      setError("Cannot update expense in DB, Please try again.");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDeleteExpense = async () => {
    setIsWaiting(true);
    try {
      await deleteExpense(expenseId);
      expensesContext.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Cannot delete expense in DB, Please try again.");
    }
  };
  if (isWaiting && !error) return <LoadingOverlay />;
  if (error) return <ErrorOverlay message={error} />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        selectedExpense={selectedExpense}
      />

      {expenseId && (
        <View style={styles.deleteContainer}>
          <Ionicons
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
  deleteContainer: {
    alignItems: "center",
    marginVertical: 24,
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary100,
  },
});
