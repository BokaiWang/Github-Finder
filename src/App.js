import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./App.css";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await github.get(`/search/users?q=${text}`);
    // The data we need is stored in res.data.items
    this.setState({ users: res.data.items, loading: false });
  };

  // Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar icon="fab fa-github" title="Hello" />
          <div className="container">
            <Alert alert={this.state.alert}></Alert>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    ></Search>
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>

            <Users loading={loading} users={users} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
