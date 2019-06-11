import React from "react";
import style from "./HackernewsItem.module.css";
import { timeFromUnix } from "../../utils/timeFromUnix";

function HackernewsItem(props) {
  const { story } = props;
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
        <div>
          <span className={`${style.author} ${style.user_detail}`}>
            {story.by}
          </span>
          <span>|</span>
          <span className={`${style.time}  ${style.user_detail}`}>
            {timeFromUnix(story.time)} ago
          </span>
          <span>|</span>
          <a
            href={`https://news.ycombinator.com/item?id=${story.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${style.comments} ${style.secondary_link}  ${
              style.user_detail
            }`}
          >
            {story.descendants} comments
          </a>
        </div>
      </div>
    </div>
  );
}

export default HackernewsItem;
