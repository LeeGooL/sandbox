import React, { Component } from "react";
import classNames from "classnames";

import AppContextHOC from "../HOC/app-context-HOC";

import CallApi from "../../api/api";
import "./login-form.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    repeat_password: "",
    errors: {},
    submitting: false,
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null,
      },
    }));
  };

  handleBlur = () => {
    const errors = this.validateFields();

    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Not empty";
    } else if (this.state.password === "") {
      errors.password = "Not empty";
    } else if (this.state.repeat_password === "") {
      errors.repeat_password = "Not empty";
    }

    return errors;
  };

  onSubmit = () => {
    this.setState({
      submitting: true,
    });
    CallApi.get("/authentication/token/new")
      .then((data) => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          },
        });

        // return fetchApi(
        //   `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        //   {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       username: this.state.username,
        //       password: this.state.password,
        //       request_token: data.request_token,
        //     }),
        //   }
        // );
      })
      .then((data) => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token,
          },
        });

        // return fetchApi(
        //   `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        //   {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       request_token: data.request_token,
        //     }),
        //   }
        // );
      })
      .then((data) => {
        this.props.updateSessionId(data.session_id);

        return CallApi.get("/account", {
          params: {
            session_id: data.session_id,
          },
        });

        // return fetchApi(
        //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        // );
      })
      .then((user) => {
        this.setState(
          {
            submitting: false,
          },
          () => {
            this.props.updateUser(user);
          }
        );
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
      });
  };

  onLogin = (e) => {
    e.preventDefault();

    const errors = this.validateFields();

    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  getClassForInput = (key) =>
    classNames("form-control", {
      invalid: this.state.errors[key],
    });

  render() {
    const {
      username,
      password,
      repeat_password,
      errors,
      submitting,
    } = this.state;

    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>

          <div className="form-group">
            <label htmlFor="username">Пользователь</label>

            <input
              type="text"
              className={this.getClassForInput("username")}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />

            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>

            <input
              type="password"
              className={this.getClassForInput("password")}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
            />

            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="repeat_password">Повторите пароль</label>

            <input
              type="password"
              className={this.getClassForInput("repeat_password")}
              id="repeat_password"
              placeholder="Повторите пароль"
              name="repeat_password"
              value={repeat_password}
              onChange={this.onChange}
            />

            {errors.repeat_password && (
              <div className="invalid-feedback">{errors.repeat_password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>

          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);
