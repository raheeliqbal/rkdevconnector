import { types } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
