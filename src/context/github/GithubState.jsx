import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SERACH_USERS,
  GET_USERS,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from "../types";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
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

  // Get Repos

  // Clear Users

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
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
