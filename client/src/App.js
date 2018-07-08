import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

// Check for Token
if (localStorage.jwtToken) {
  // Set Auth Token Header Auth
  setAuthToken(localStorage.jwtToken);

  // Decoded Token and Get User Info & Expernice
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check Expire Token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());

    // TODO: Clear Current Profile
    // Redirect to Login

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
