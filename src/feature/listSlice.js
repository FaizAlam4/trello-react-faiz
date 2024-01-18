import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  res: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    displayList: (state, action) => {
      return {
        ...state,
        res: [...action.payload],
      };
    },
    createMyList: (state, action) => {
      return {
        ...state,
        res: [...state.res, action.payload],
      };
    },
    updateList: (state, action)=>{

        return {
            ...state,
            res:[action.payload]
        }
    }
  },
});

export const { displayList, createMyList, updateList } = listSlice.actions;

export default listSlice.reducer;
