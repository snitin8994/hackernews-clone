import React from "react";
import HackernewsItem from "../HackersnewsItem/HackernewsItem";

import Spinner from "react-spinkit";
import style from "./HackernewsList.module.css";

function HackernewsList(props) {
  return (
    <div className={style.container}>
      {props.isLoading ? (
        <div className={style.spinner_container}>
          <Spinner name="line-scale" color="steelblue" />
        </div>
      ) : (
        props.items.map((story, index) => (
          <HackernewsItem key={index} story={story} />
        ))
      )}
    </div>
  );
}

export default HackernewsList;
