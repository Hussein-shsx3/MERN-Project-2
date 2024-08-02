import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") === "dark" ? "dark" : "light",
};

const counterSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = localStorage.getItem("mode") === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
  },
});

export const { setMode } = counterSlice.actions;

export default counterSlice.reducer;
