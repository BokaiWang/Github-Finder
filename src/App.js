import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar icon="fab fa-github" title="Hello" />
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
