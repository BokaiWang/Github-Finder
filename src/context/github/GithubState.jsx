import React, { useReducer } from "react";
import { axios } from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SERACH_USERS,
  GET_USERS,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search Users

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
