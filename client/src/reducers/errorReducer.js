import { types } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types:
      return action.payload;
    default:
      return state;
  }
}
