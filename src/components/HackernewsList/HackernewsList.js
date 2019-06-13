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
      ) : props.totalSearchPages === 0 ? (
        <div className={style.noresult_box}>No search Results</div>
      ) : (
        props.items.map((story, index) => {
          //null value was provided by the api
          // for a success request
          if (story == null) return null;
          return <HackernewsItem key={index} story={story} />;
        })
      )}
    </div>
  );
}

export default HackernewsList;
