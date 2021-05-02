import React, { Component } from "react";

class User extends Component {
  componentDidMount() {
    // the login variable is obtained from the route path="/user/:login"
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repo,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading } = this.props;

    return <div>{name}</div>;
  }
}

export default User;
