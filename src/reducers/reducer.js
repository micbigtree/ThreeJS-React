import produce from "immer";

import { ADD_SHAPE } from "../actions/actions.js";
import { stateContext } from "react-three-fiber";

const initialState = {};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "SELECT_SHAPE":
      // using immer:
      draft.selectedShape = action.shape.id;
      return;
    case "ADD_SHAPE":
      draft.artboard.shapes.push(action.payload);
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
