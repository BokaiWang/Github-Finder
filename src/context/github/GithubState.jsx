import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SERACH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from "../types";

let githubToken;

if (process.env.NODE_ENV !== "production") {
  githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubToken = process.env.GITHUB_TOKEN;
}

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: githubToken },
});

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const res = await github.get(`/search/users?q=${text}`);
    // The data we need is stored in res.data.items
    dispatch({
      type: SERACH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (username) => {
    setLoading();
    const res = await github.get(`/users/${username}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get User's repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await github.get(
      `/users/${username}/repos?per_page=5&sort=created:asc?`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
