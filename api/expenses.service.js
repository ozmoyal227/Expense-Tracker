import axios from "axios";
import { ApiConstants } from "./constants";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    `${ApiConstants.BASE_URL}/expenses.json`,
    expenseData
  );
  return response.data.name;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${ApiConstants.BASE_URL}/expenses.json`);
  const expenses = [];
  for (let id in response.data) {
    expenses.push({
      id: id,
      amount: response.data[id].amount,
      date: new Date(response.data[id].date),
      description: response.data[id].description,
    });
  }
  return expenses;
};

export const updateExpense = (id, expenseData) => {
  const response = axios.put(
    `${ApiConstants.BASE_URL}/expenses/${id}.json`,
    expenseData
  );
  return response;
};

export const deleteExpense = (id) => {
  const response = axios.delete(`${ApiConstants.BASE_URL}/expenses/${id}.json`);
  return response;
};
