export const fetchAlgoliaSearchResults=(query,page)=> {
    return fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}&tags=story&page=${page}`
    ).then(resp=>resp.json())

}