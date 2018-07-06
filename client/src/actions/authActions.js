import { types } from "./types";

// Register User
export const registerUser = userData => {
  return {
    type: types,
    payload: userData
  };
};
