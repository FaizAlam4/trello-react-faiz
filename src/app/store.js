import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../feature/boardSlice";
import listReducer from "../feature/listSlice";
import cardReducer from "../feature/cardSlice";
import checklistReducer from "../feature/checklistSlice";
import checkitemReducer from "../feature/checkitemSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    list: listReducer,
    card: cardReducer,
    checklist: checklistReducer,
    checkitem: checkitemReducer,
  },
});