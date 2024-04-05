import { createSlice } from "@reduxjs/toolkit";
export const initialSelectedFilters = {
    sector: [],
    range: {
        value: [1, 2],
        hasChanged: false
    },
    ebitda: '',
    ageOfCompany: '',
    sortBy: {
      direction: 'DESC',
      fieldName: 'id',
    },
    status: [],
    owner: ''
}

const initialState = {
  selectedFilters: {},
  showFilters: false,
  applyFilters: false,
  totalElements: 0,
  sortBy: {
    direction: 'DESC',
    fieldName: 'id',
  },
  filterChange: false,
}

export const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateSelectedFilter: (state, action) => {
      state.selectedFilters = action.payload;
    },
    showHeaderFilter: (state, action) => {
      state.showFilters = action.payload;
    },
    applyFilters: (state, action) => {
      state.applyFilters = action.payload;
    },
    updateTotalElements: (state, action) => {
        state.totalElements = action.payload;
    },
    updateSortFilter: (state, action) => {
      state.sortBy = action.payload;
    },
    filterChangeDetect: (state, action) => {
      state.filterChange = action.payload;
    }
  }
})

export const {
  updateSelectedFilter,
  showHeaderFilter,
  applyFilters,
  updateTotalElements,
  updateSortFilter,
  filterChangeDetect
} = FilterSlice.actions;

export default FilterSlice.reducer;