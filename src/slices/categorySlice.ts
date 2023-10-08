import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CategoryState {
  category: string
}

const initialState: CategoryState = {
  category: 'All',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }
  }
})

export const {set} = categorySlice.actions;
export default categorySlice.reducer;
