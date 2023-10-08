import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  category: 'All',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    set: (state, action) => {
      state.category = action.payload;
    }
  }
})

export const {set} = categorySlice.actions;
export default categorySlice.reducer;
