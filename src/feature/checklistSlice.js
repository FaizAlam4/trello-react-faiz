import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  checklistData: [],
};

export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    displayChecklist: (state, action) => {
      return {
        ...state,
        checklistData: action.payload,
      };
    },
    createMyChecklist: (state, action) => {
      return {
        ...state,
        checklistData: [...state.checklistData, action.payload],
      };
    },
    deleteMyChecklist: (state, action) => {
      let newchecklist = state.checklistData.filter(
        (ele) => ele.id != action.payload.id
      );
      return {
        ...state,
        checklistData: newchecklist,
      };
    },
  },
});

export const { displayChecklist, createMyChecklist, deleteMyChecklist } =
  checklistSlice.actions;

export default checklistSlice.reducer;
