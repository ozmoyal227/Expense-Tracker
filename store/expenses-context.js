import { createContext, useState } from "react";
import { View, Text } from "react-native";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ id, description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expensesState, setExpensesState] = useState([]);

  const addExpense = (expenseData) => {
    setExpensesState((prev) => [expenseData, ...prev]);
  };
  const setExpenses = (expenses) => {
    const invertedExpenses = expenses.reverse();
    setExpensesState(expenses);
  };

  const updateExpense = (id, expenseData) => {
    setExpensesState((prev) =>
      prev.map((expense) => {
        return expense.id === id ? { id: expense.id, ...expenseData } : expense;
      })
    );
  };

  const deleteExpense = (id) => {
    setExpensesState((prev) => prev.filter((expense) => expense.id !== id));
  };
  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
