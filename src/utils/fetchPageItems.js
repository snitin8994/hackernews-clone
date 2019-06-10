export const fetchPageItems = (page = "top") => {
  if (page === "jobs") page = "job";
  return fetch(
    `https://hacker-news.firebaseio.com/v0/${page}stories.json`
  ).then(resp => resp.json());
};
