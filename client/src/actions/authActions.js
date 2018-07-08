import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import swal from "sweetalert";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res =>
      swal({
        title: "Your Account Successfully Created!",
        text: "You clicked the button! Go The Login Page",
        icon: "success",
        button: "Login Page "
      }).then(willDelete => {
        if (willDelete) {
          history.push("/login");
        } else {
          history.push("/login");
        }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save To LocalStorage
      const { token } = res.data;

      // Set Token To LocalStorage
      localStorage.setItem("jwtToken", token);

      // Set Token To Auth Header
      setAuthToken(token);

      // Decode Token To Get User Data
      const decoded = jwt_decode(token);

      // Set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove Token from LocalStorage
  localStorage.removeItem("jwtToken");

  // Remove Auth Header for Future Requests
  setAuthToken(false);

  // Set Current User to {} Which Will Set isAuthenticated to False
  dispatch(setCurrentUser({}));
};
