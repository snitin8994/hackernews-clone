import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header(props) {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link to="/" className={style.anchor}>
          <div className={style.logo}>
            <span className={style.logo_text}>R</span>
          </div>
        </Link>
        {props.tags.map((tag, index) => {
          const urlTag = tag[0].toLowerCase() + tag.slice(1);
          return (
            <Link to={`/${urlTag}`} key={index} className={style.anchor}>
              <span className={style.tags}>{tag}</span>
            </Link>
          );
        })}
      </nav>

      
    </header>
  );
}

export default Header;
