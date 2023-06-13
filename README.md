# Expense-Tracker

A simple React-Native project to manage and track Expenses.
Using Expo, RN, Axios, Firebase realtime DB Api.

The app builded while learning React Native - The Practical Guide [2023] course in Udemy by Maximilian Schwarzmüller.

To Run App, After downloading Expense-Tracker folder, Run in the folder directory :

```
npm install
```
And then:

```
npm start
```
Note, There is a need to have Firebase realtime DB url to run app properly.
Please add constants.js file in api/ folder and add this code:

```
export const ApiConstants = {
  BASE_URL:
    "Your Firebase realtime DB url",
};
```

If everything is ok You suppose to see Expo Starting Metro Bundler etc...

