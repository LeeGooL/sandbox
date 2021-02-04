import React, { Component } from "react";
import PropTypes from "prop-types";

import "./sort-by.css";

export default class SortBy extends Component {
  staticPropTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    sort_by: PropTypes.string.isRequired,
  };

  static defaultProps = {
    options: [
      { label: "Популярные по убыванию", value: "popularity.desc" },
      { label: "Популярные по возрастанию", value: "popularity.asc" },
      { label: "Рейтинг по убыванию", value: "vote_average.desc" },
      { label: "Рейтинг по возрастанию", value: "vote_average.asc" },
    ],
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>

        <select
          className="form-control cursor"
          id="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
          name="sort_by"
        >
          {options.map(({ label, value }, index) => {
            return (
              <option value={value} key={index}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
