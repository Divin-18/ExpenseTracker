import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  totalExpenses: 0,
  totalIncome: 0,
  balance: 0,
  monthlyBudget: 0,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Add a new expense
    addExpense: (state, action) => {
      const expense = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.expenses.unshift(expense);
      if (expense.type === 'expense') {
        state.totalExpenses += expense.amount;
        state.balance -= expense.amount;
      } else {
        state.totalIncome += expense.amount;
        state.balance += expense.amount;
      }
    },

    // Remove an expense
    removeExpense: (state, action) => {
      const expense = state.expenses.find((e) => e.id === action.payload);
      if (expense) {
        if (expense.type === 'expense') {
          state.totalExpenses -= expense.amount;
          state.balance += expense.amount;
        } else {
          state.totalIncome -= expense.amount;
          state.balance -= expense.amount;
        }
        state.expenses = state.expenses.filter((e) => e.id !== action.payload);
      }
    },

    // Update an expense
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        const oldExpense = state.expenses[index];
        const newExpense = action.payload;

        // Recalculate totals
        if (oldExpense.type === 'expense') {
          state.totalExpenses -= oldExpense.amount;
          state.balance += oldExpense.amount;
        } else {
          state.totalIncome -= oldExpense.amount;
          state.balance -= oldExpense.amount;
        }

        if (newExpense.type === 'expense') {
          state.totalExpenses += newExpense.amount;
          state.balance -= newExpense.amount;
        } else {
          state.totalIncome += newExpense.amount;
          state.balance += newExpense.amount;
        }

        state.expenses[index] = {
          ...state.expenses[index],
          ...newExpense,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Set monthly budget
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },

    // Load expenses from storage
    loadExpenses: (state, action) => {
      state.expenses = action.payload.expenses || [];
      state.totalExpenses = action.payload.totalExpenses || 0;
      state.totalIncome = action.payload.totalIncome || 0;
      state.balance = action.payload.balance || 0;
      state.monthlyBudget = action.payload.monthlyBudget || 0;
    },

    // Clear all expenses
    clearAllExpenses: (state) => {
      state.expenses = [];
      state.totalExpenses = 0;
      state.totalIncome = 0;
      state.balance = 0;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addExpense,
  removeExpense,
  updateExpense,
  setMonthlyBudget,
  loadExpenses,
  clearAllExpenses,
  setLoading,
  setError,
} = expenseSlice.actions;

export default expenseSlice.reducer;
