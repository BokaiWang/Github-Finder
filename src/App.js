import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, Fragment } from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./App.css";

import GithubState from "./context/github/GithubState";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await github.get(`/search/users?q=${text}`);
    // The data we need is stored in res.data.items
    console.log("users", res);
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await github.get(`/users/${username}`);

    setUser(res.data);
    setLoading(false);
  };

  // Get user's repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await github.get(
      `/users/${username}/repos?per_page=5&sort=created:asc?`
    );
    console.log("repos", res);
    setRepos(res.data);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <NavBar icon="fab fa-github" title="Hello" />
          <div className="container">
            <Alert alert={alert}></Alert>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    ></Search>
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
