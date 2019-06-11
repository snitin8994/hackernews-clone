import React from "react";
import style from "./Header.module.css";

function Header(props) {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <span
            onClick={() => props.changePageheader("Top")}
            className={style.logo_text}
          >
            R
          </span>
        </div>
        {props.tags.map((tag, index) => {
          return (
            <span
              key={index}
              onClick={() => props.changePageheader(tag)}
              className={style.tags}
            >
              {tag}
            </span>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
