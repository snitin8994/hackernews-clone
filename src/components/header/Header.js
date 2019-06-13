import React from "react";
import SearchInput from "../Search/SearchInput";
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
          let navLinkStyle = `${style.tags}`;
          if (tag === props.pageHeader) navLinkStyle = `${style.tags} ${style.selected}`;
          return (
            <span
              key={index}
              onClick={() => props.changePageheader(tag)}
              className={navLinkStyle}
            >
              {tag}
            </span>
          );
        })}
        <SearchInput search={props.search} />
      </nav>
    </header>
  );
}

export default Header;
