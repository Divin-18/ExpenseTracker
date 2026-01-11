import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalVisible: false,
  modalType: null, // 'add', 'edit', 'delete'
  selectedExpense: null,
  filterCategory: 'all',
  filterDateRange: 'all', // 'today', 'week', 'month', 'year', 'all'
  sortBy: 'date', // 'date', 'amount', 'category'
  sortOrder: 'desc', // 'asc', 'desc'
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalVisible = true;
      state.modalType = action.payload.type;
      state.selectedExpense = action.payload.expense || null;
    },

    closeModal: (state) => {
      state.isModalVisible = false;
      state.modalType = null;
      state.selectedExpense = null;
    },

    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },

    setFilterDateRange: (state, action) => {
      state.filterDateRange = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    resetFilters: (state) => {
      state.filterCategory = 'all';
      state.filterDateRange = 'all';
      state.sortBy = 'date';
      state.sortOrder = 'desc';
      state.searchQuery = '';
    },
  },
});

export const {
  openModal,
  closeModal,
  setFilterCategory,
  setFilterDateRange,
  setSortBy,
  setSortOrder,
  setSearchQuery,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
