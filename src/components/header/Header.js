import React from "react";
import style from "./Header.module.css";
import Search from "../Search/SearchInput";

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
        <div className={style.pageitem_container}>
          {props.tags.map((tag, index) => {
            let navLinkStyle = `${style.tags}`;
            if (tag === props.pageHeader)
              navLinkStyle = `${style.tags} ${style.selected}`;
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
        </div>
        <Search search={props.search} />
      </nav>
    </header>
  );
}

export default Header;
