import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import ExpenseInput from "./ExpenseInput";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/style";

export default function ExpenseForm({
  handleConfirm,
  handleCancel,
  selectedExpense,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense
        ? selectedExpense.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense.description : "",
      isValid: true,
    },
  });

  const handleInputChange = (inputIdentifier, enteredText) => {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredText, isValid: true },
      };
    });
  };

  const isInputsValid = (formInputs) => {
    const validAmount = !isNaN(formInputs.amount) && formInputs.amount > 0;
    const validDate = formInputs.date.toString() !== "Invalid Date";
    const validDescription = formInputs.description.trim() !== "";

    if (validAmount && validDate && validDescription) {
      return true;
    } else {
      setInputs((prev) => {
        return {
          amount: {
            value: prev.amount.value,
            isValid: validAmount,
          },
          date: {
            value: prev.date.value,
            isValid: validDate,
          },
          description: {
            value: prev.description.value,
            isValid: validDescription,
          },
        };
      });
      return false;
    }
  };
  const onSubmit = () => {
    const expenseData = {
      description: inputs.description.value,
      date: new Date(inputs.date.value),
      amount: parseInt(inputs.amount.value),
    };
    if (isInputsValid(expenseData)) {
      handleConfirm(expenseData);
    }
  };

  const invalidInput =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <View style={styles.rowInputsContainer}>
        <ExpenseInput
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleInputChange.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
          isValid={inputs.amount.isValid}
        />
        <ExpenseInput
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleInputChange.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
          isValid={inputs.date.isValid}
        />
      </View>
      <ExpenseInput
        label="Description"
        textInputConfig={{
          multiline: true,

          onChangeText: handleInputChange.bind(this, "description"),
          value: inputs.description.value,
        }}
        isValid={inputs.description.isValid}
      />
      {invalidInput && (
        <Text style={styles.errorText}>
          Invalid inputs - Check your inputs and try again
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button onPress={onSubmit} style={styles.button}>
          {selectedExpense ? "Update" : "Add"}
        </Button>
        <Button onPress={handleCancel} style={styles.button} mode="flat">
          Cancel
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginVertical: 24 },
  rowInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rowInput: { flex: 1 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 4,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginVertical: 8,
  },
});
