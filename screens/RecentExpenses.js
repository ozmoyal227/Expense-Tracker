import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../api/expenses.service";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";

export default function RecentExpenses() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(null);

  const expensesContext = useContext(ExpensesContext);
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    (async () => {
      setIsWaiting(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Cannot fetch expenses, Please try again.");
      }
      // console.log("Expenses fetched: ", expenses);
      setIsWaiting(false);
    })();
  }, []);

  const recentExpenses = expensesContext.expenses.filter(
    (expense) => expense.date >= oneWeekAgo
  );
  if (isWaiting) return <LoadingOverlay />;
  if (error) return <ErrorOverlay message={error} />;
  return (
    <ExpensesOutput
      period="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered in the last 7 days."
    />
  );
}
