import React, { Component, createContext } from "react";
import Cookies from "universal-cookie";

import Filters from "../filters";
import MoviesList from "../movies-list";
import Header from "../header";

import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import "./app.css";

const cookies = new Cookies();

export const AppContext = createContext();

export default class App extends Component {
  state = {
    user: null,
    session_id: null,
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: "2020",
      with_genres: [],
    },
    page: 1,
    total_pages: "",
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then((user) => {
        this.updateUser(user);
        this.updateSessionId(session_id);
      });
    }
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });

    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");

    this.setState({
      session_id: null,
      user: null,
    });
  };

  onChangeFilters = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  onChangePage = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages,
    });
  };

  render() {
    const { filters, page, total_pages, user, session_id } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
        }}
      >
        <div>
          <Header user={user} />

          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      page={page}
                      total_pages={total_pages}
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
                    />
                  </div>
                </div>
              </div>

              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
