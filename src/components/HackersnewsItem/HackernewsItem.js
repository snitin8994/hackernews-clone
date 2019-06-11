import React from "react";
import style from "./HackernewsItem.module.css"

function HackernewsItem(props) {
    const{story} = props
    return (
      <div className={style.item}>
        <div className={style.score}>{story.score}</div>
        <div className={style.container}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            href={story.url}
          >
            {story.title}
          </a>
        </div>
      </div>
    );
}

export default HackernewsItem;