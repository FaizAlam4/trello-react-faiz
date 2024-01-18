import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    showBoard: (state, action) => {
      return {
        ...state,
        data: [...action.payload],
      };
    },
    createBoard: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
  },
});

export const { showBoard, createBoard } = boardSlice.actions;

export default boardSlice.reducer;
