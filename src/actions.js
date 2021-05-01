import { axios } from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
  header: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

export const searchUsers = async (text) => {
  const res = await github.get(`/search/users?q=${text}`);
  return res.data.items;
};

export const getUsersAndRepos = async (username) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}`),
    github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`),
  ]);
  return { user: user.data, repos: repos.data };
};

const REACT_APP_GITHUB_TOKEN = "token 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";

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;
