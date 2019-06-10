export const  fetchItem=(id) => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

}