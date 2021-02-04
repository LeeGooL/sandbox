import React from "react";
import _ from "lodash";

import CallApi from "../../api/api";

export default (Component) =>
  class MoviesListHOC extends React.Component {
    state = {
      movies: [],
    };

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;

      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
      };

      if (with_genres.length > 0)
        queryStringParams.with_genres = with_genres.join(",");

      CallApi.get("/discover/movie", {
        params: queryStringParams,
      }).then((data) => {
        this.props.onChangePage({
          page: data.page,
          total_pages: data.total_pages,
        });
        this.setState({
          movies: data.results,
        });
      });
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.props.onChangePage({ page: 1 });
        this.getMovies(this.props.filters, 1);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
      }
    }

    render() {
      const { movies } = this.state;

      return <Component movies={movies} />;
    }
  };
