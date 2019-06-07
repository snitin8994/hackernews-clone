export const page = page => {
  if (page === "jobs") page = "job";
  return fetch(`https://hacker-news.firebaseio.com/v0/${page}stories`);
};
