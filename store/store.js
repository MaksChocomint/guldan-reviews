// store.js
import { configureStore } from "@reduxjs/toolkit";
import stylesReducer from "@/reducers/stylesReducer"; // Импортируйте ваш редуктор стилей

const store = configureStore({
  reducer: {
    styles: stylesReducer, // Здесь styles - имя вашего "slice" состояния
    // Другие редукторы, если они у вас есть, могут быть добавлены здесь
  },
  // Другие настройки магазина могут быть добавлены здесь
});

export default store;
