import { configureStore } from '@reduxjs/toolkit';
import { expenseReducer, uiReducer } from './slices';

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
