import {configureStore} from "@reduxjs/toolkit";
import menuReducer from '../slices/menuSlice.ts';
import categoryReducer from '../slices/categorySlice.ts';

export default configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer
  },
});
