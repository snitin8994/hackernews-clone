export const fetchPageItems = (page) => {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/${page}stories.json`
  ).then(resp => resp.json());
};
