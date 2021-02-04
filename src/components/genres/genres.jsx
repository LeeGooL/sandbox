import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./genres.css";

const Genres = ({ genresList, with_genres, resetGenres, onChange }) => {
  return (
    <Fragment>
      <div>
        <button
          type="button"
          className="btn btn-outline-dark mb-2"
          onClick={resetGenres}
        >
          Показать все жанры
        </button>
      </div>

      {genresList.map(({ id, name }) => (
        <div key={id} className="form-check">
          <input
            className="form-check-input cursor"
            type="checkbox"
            value={id}
            id={id}
            onChange={onChange}
            checked={with_genres.includes(String(id))}
          />

          <label className="form-check-label cursor" htmlFor={id}>
            {name}
          </label>
        </div>
      ))}
    </Fragment>
  );
};

Genres.defaultProps = {
  genresList: [],
  with_genres: [],
};

Genres.propTypes = {
  genresList: PropTypes.array.isRequired,
  resetGenres: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Genres;
