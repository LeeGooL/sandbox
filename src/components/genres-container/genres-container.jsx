import React, { Component } from "react";

import Genres from "../genres";

import { API_KEY_3, API_URL } from "../../api/api";

export default class GenresContainer extends Component {
  state = {
    genresList: [],
  };

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;

    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          genresList: data.genres,
        });
      });
  }

  onChange = (event) => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter(
              (genre) => genre !== event.target.value
            ),
      },
    });
  };

  resetGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: [],
      },
    });
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props;

    return (
      <Genres
        genresList={genresList}
        with_genres={with_genres}
        resetGenres={this.resetGenres}
        onChange={this.onChange}
      />
    );
  }
}
