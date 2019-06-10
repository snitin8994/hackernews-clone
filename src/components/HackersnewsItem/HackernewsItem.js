import React from "react";
import style from "./HackernewsItem.module.css"

function HackernewsItem(props) {
    const{story} = props
    return (
      <div className={style.item}>
        <div>{story.title}</div>
      </div>
    );
}

export default HackernewsItem;