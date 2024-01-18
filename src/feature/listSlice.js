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
     let updatedRes= state.res.filter((ele)=>{
     return ele.id!=action.payload.id
      })

        return {
            ...state,
            res:updatedRes
        }
    }
  },
});

export const { displayList, createMyList, updateList } = listSlice.actions;

export default listSlice.reducer;
