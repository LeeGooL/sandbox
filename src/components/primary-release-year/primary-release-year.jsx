import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import UISelect from "../ui-select";

import "./primary-release-year.css";

export default class PrimaryReleaseYear extends PureComponent {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      { label: "2020", value: "2020" },
      { label: "2019", value: "2019" },
      { label: "2018", value: "2018" },
      { label: "2017", value: "2017" },
      { label: "2016", value: "2016" },
      { label: "2015", value: "2015" },
    ],
  };

  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;

    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        labelText="Год релиза:"
      >
        {options.map(({ value, label }, index) => {
          return (
            <option value={value} key={index}>
              {label}
            </option>
          );
        })}
      </UISelect>
    );
  }
}
