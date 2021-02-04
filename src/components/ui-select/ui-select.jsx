import React, { Component } from "react";
import PropTypes from "prop-types";

import "./ui-select.css";

export default class UISelect extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { id, name, value, onChange, labelText, children } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>

        <select
          className="form-control cursor"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}
