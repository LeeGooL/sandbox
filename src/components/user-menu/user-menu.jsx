import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { AppContext } from "../app";
import { fetchApi, API_URL, API_KEY_3 } from "../../api/api";

class UserMenu extends Component {
  state = {
    dropdownOpen: false,
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        session_id: this.props.session_id,
      }),
    }).then(() => this.props.onLogOut());
  };

  render() {
    const { user } = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            className="rounded-circle cursor"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
            alt=""
            width="40"
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const UserMenuContainer = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        return <UserMenu {...context} />;
      }}
    </AppContext.Consumer>
  );
};

UserMenuContainer.displayName = "UserContainer";

export default UserMenuContainer;
