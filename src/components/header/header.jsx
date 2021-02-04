import React, { Component } from "react";

import Login from "../login";
import UserMenu from "../user-menu";

import "./header.css";

export default class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="li nav-item active">
              <a className="nav-link" href="#!">
                Home
              </a>
            </li>
          </ul>

          {user ? <UserMenu /> : <Login />}
        </div>
      </nav>
    );
  }
}
