// store.js
import { configureStore } from "@reduxjs/toolkit";
import stylesReducer from "@/reducers/stylesReducer";

const store = configureStore({
  reducer: {
    styles: stylesReducer,
  },
});

export default store;
