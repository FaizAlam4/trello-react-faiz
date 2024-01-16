
import * as actionTypes from './actionType.js';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_OPEN:
        return { ...state, open: action.payload };
    case actionTypes.SET_CHECKLIST_DATA:
      return { ...state, checklistData: action.payload };
    case actionTypes.SET_INPUT_VALUE:
      return { ...state, inputval: action.payload };
    case actionTypes.SET_ANCHOR_EL:
      return { ...state, anchorEl: action.payload };
    case actionTypes.SET_PLACEMENT:
      return { ...state, placement: action.payload };
    case actionTypes.SET_LOAD:
      return { ...state, load: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, err: action.payload };
    case actionTypes.SET_CHECKITEM:
      return { ...state, checkItem: action.payload };
    default:
      return state;
  }
};

export default reducer;
