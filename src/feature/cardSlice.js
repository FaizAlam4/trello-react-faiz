import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cardData: {},
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    showCard: (state, action) => {
      const { listId, cards } = action.payload;
      return {
        ...state,
        cardData: { ...state.cardData, [listId]: cards },
      };
    },
    createMyCard: (state, action) => {
      const { listId, card } = action.payload;
      return {
        ...state,
        cardData: {
          ...state.cardData,
          [listId]: [...state.cardData[listId], card],
        },
      };
    },
    deleteCard: (state, action) => {
      const { listId, card } = action.payload;
      let updatedCardData = state.cardData[listId].filter(
        (ele) => ele.id != card.id
      );
      return {
        ...state,
        cardData: { ...state.cardData, [listId]: [...updatedCardData] },
      };
    },
  },
});

export const { showCard, createMyCard, deleteCard } = cardSlice.actions;

export default cardSlice.reducer;
