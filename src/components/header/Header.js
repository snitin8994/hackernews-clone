import React from "react";
import { Link, Route } from "react-router-dom";
import App from "../../App"
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
        {props.tags.map((tag, index) => (
          <Link to={`/${tag}`} key={index} className={style.anchor}>
            <span className={style.tags}>{tag}</span>
          </Link>
        ))}
        {/* <Link className={style.anchor}>
          <span className={style.tags}>Top</span>
        </Link>
        <Link className={style.anchor}>
          <span className={style.tags}>New</span>
        </Link>
        <Link className={style.anchor}>
          {" "}
          <span className={style.tags}>Show</span>
        </Link>
        <Link className={style.anchor}>
          {" "}
          <span className={style.tags}>Ask</span>
        </Link>
        <Link className={style.anchor}>
          {" "}
          <span className={style.tags}>Jobs</span>
        </Link> */}
      </nav>
      <Route path="/:tag" component={App} />
    </header>
  );
}

export default Header;
