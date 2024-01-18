import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../feature/boardSlice";
import listReducer from "../feature/listSlice";
// import cardReducer from "../feature/cardSlice";
// import checklistReducer from "../feature/checklistSlice";
// import checklistItemReducer from "../feature/checklistItemSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    list: listReducer,
    // card: cardReducer,
    // checklist: checklistReducer,
    // checklistItem: checklistItemReducer,
  },
});