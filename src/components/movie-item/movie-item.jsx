import React, { Component } from "react";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import CallApi from "../../api/api";
import AppContextHOC from "../HOC/app-context-HOC";

import "./movie-item.css";

class MovieItem extends Component {
  state = {
    isAddedFavorite: false,
    isWillWatch: false,
  };

  onChangeFavorite = async (e, id) => {
    await this.setState((prevState) => ({
      isAddedFavorite: !prevState.isAddedFavorite,
    }));

    CallApi.post(`/account/${this.props.user.id}/favorite`, {
      params: {
        session_id: this.props.session_id,
      },
      body: {
        media_type: "movie",
        media_id: id,
        watchlist: false,
      },
    }).then((data) => console.log(data));
  };

  onChangeWillWatchList = (e) => {
    this.setState((prevState) => ({
      isWillWatch: !prevState.isWillWatch,
    }));
  };

  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;

    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ""}
          alt=""
        />

        <div className="ml-auto">
          {this.state.isAddedFavorite ? (
            <StarIcon
              className="cursor"
              onClick={(e) => this.onChangeFavorite(e, item.id)}
            />
          ) : (
            <StarBorderIcon
              className="cursor"
              onClick={(e) => this.onChangeFavorite(e, item.id)}
            />
          )}

          {this.state.isWillWatch ? (
            <BookmarkIcon
              className="cursor"
              onClick={this.onChangeWillWatchList}
              id={item.id}
            />
          ) : (
            <BookmarkBorderIcon
              className="cursor"
              onClick={this.onChangeWillWatchList}
            />
          )}
        </div>

        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieItem);
