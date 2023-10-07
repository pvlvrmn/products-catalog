import {configureStore} from "@reduxjs/toolkit";
import menuReducer from '../slices/menuSlice.ts';

export default configureStore({
  reducer: {
    menu: menuReducer,
  },
});
