import React, { Component } from "react";

import SortBy from "../sort-by";
import Pagination from "../pagination";
import PrimaryReleaseYear from "../primary-release-year";
import GenresContainer from "../genres-container";

import "./filters.css";

export default class Filters extends Component {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />

        <GenresContainer
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
        />

        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
        />
      </form>
    );
  }
}
