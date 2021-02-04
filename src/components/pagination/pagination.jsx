import React, { Component } from "react";
import classNames from "classnames";

import "./pagination.css";

export default class Pagination extends Component {
  nextPage = () => {
    this.props.onChangePage({
      page: this.props.page + 1,
      total_pages: this.props.total_pages,
    });
  };

  prevPage = (page) => (event) => {
    this.props.onChangePage({
      page: this.props.page - 1,
      total_pages: this.props.total_pages,
    });
  };

  render() {
    const { page, total_pages } = this.props;

    return (
      <nav className="d-flex mt-3 align-items-center">
        <ul className="pagination mb-0 d-flex align-items-center">
          <li
            className={classNames("page-item mr-3 cursor", {
              disabled: page === 1,
            })}
          >
            <span className="page-link" onClick={this.prevPage(page)}>
               Назад
            </span>
          </li>

          <span>
            {page} of {total_pages}
          </span>

          <li className="page-item ml-3 cursor">
            <span className="page-link" onClick={this.nextPage}>
              Вперед
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}
