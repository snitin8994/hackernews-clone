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
            <a
              href="/"
              className={style.disabled}
              onClick={e => e.preventDefault()}
            >
              &lt;prev
            </a>
          ) : (
            <a
              href="/"
              className={style.link}
              onClick={e => {
                e.preventDefault();
                props.changePage("decrement");
              }}
            >
              &lt;prev
            </a>
          )}
        </div>
        <div className={style.text}>{currentPage}</div>
        <div className={style.text}>/</div>
        <div className={style.text}>{pages}</div>
        <div className={style.text}>
          {currentPage === pages ? (
            <a
              href="/"
              className={style.disabled}
              onClick={e => e.preventDefault()}
            >
              next&gt;
            </a>
          ) : (
            <a
              href="/"
              className={style.link}
              onClick={e => {
                e.preventDefault();
                props.changePage("increment");
              }}
            >
              next&gt;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
