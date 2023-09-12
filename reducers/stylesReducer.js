import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foreground: "bg-zinc-200",
  background: "bg-zinc-300",
  text: "text-black",
  input: "bg-zinc-100",
  btnHover: "hover:bg-zinc-400",
  optionHover: "hover:bg-zinc-300",
  icon: "text-zinc-300",
};

const stylesSlice = createSlice({
  name: "styles",
  initialState,
  reducers: {
    updateStyle: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateStyle } = stylesSlice.actions;
export default stylesSlice.reducer;
