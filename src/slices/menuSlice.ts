import {createSlice} from "@reduxjs/toolkit";

interface MenuState {
  isMenuShow: boolean
}

const initialState: MenuState = {
  isMenuShow: true,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isMenuShow = !state.isMenuShow;
    },
    show: (state) => {
      state.isMenuShow = true;
    },
    hide: (state) => {
      state.isMenuShow = false;
    }
  }
})

export const {toggle, show, hide} = menuSlice.actions;
export default menuSlice.reducer;
