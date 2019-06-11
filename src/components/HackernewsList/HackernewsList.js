import React from "react";
import HackernewsItem from "../HackersnewsItem/HackernewsItem";

import Spinner from "react-spinkit";
import style from "./HackernewsList.module.css";

function HackernewsList(props) {
  return (
    <div className={style.container}>
      {props.isLoading ? (
        <Spinner name="line-scale" color="steelblue" />
      ) : (
        props.items.map((story, index) => (
          <HackernewsItem key={index} story={story} />
        ))
      )}
    </div>
  );
}

export default HackernewsList;
