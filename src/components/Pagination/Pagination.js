import React from "react";
import style from "./Pagination.module.css";
import { Link } from "react-router-dom";

function Pagination(props) {
  const { currentPage, pages } = props;

  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <div className={style.text}>
          {currentPage === 1 ? (
            <Link
              to="/"
              className={style.disabled}
              onClick={e => e.preventDefault()}
            >
              &lt;prev
            </Link>
          ) : (
            <Link className={style.link}>&lt;prev</Link>
          )}
        </div>
        <div className={style.text}>{currentPage}</div>
        <div className={style.text}>/</div>
        <div className={style.text}>{pages}</div>
        <div className={style.text}>
          {currentPage === pages ? (
            <Link
              to="/"
              className={style.disabled}
              onClick={e => e.preventDefault()}
            >
              next&gt;
            </Link>
          ) : (
            <Link className={style.link}>next&gt;</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
