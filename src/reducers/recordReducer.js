import * as actionTypes from "../actions/actionTypes";
// import update from "react-addons-update";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_RECORD:
      return [...state, Object.assign({}, action.record)];
    case actionTypes.REMOVE_RECORD:
      return state.filter((data, i) => i !== action.id);
    case actionTypes.EDIT_RECORD:
      return state.map((item, index) => {
        if (index === action.id.index) {
          item.name = action.record.name;
        }
        return item;
      });

    default:
      return state;
  }
};
