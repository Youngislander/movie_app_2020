import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params:{
        api_key:"50a614043e65e6db34779d35ae45d1a3",
        language: "en-US",
        page: "1"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail:id => 
      api.get(`movie/${id}`, {
          params:{
              append_to_response: "videos"
          }
      }),
      search : term => 
      api.get("search/movie", {
          params:{
              //어떤 값을 넣으도 문자열로 인코딩
              query: encodeURIComponent(term)
          }
      })
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    tvDetail:id => 
    api.get(`tv/${id}`, {
        params:{
            append_to_response: "videos"
        }
    }),
    search : term => 
    api.get("search/tv", {
        params:{
            //어떤 값을 넣으도 문자열로 인코딩
            query: encodeURIComponent(term)
        }
    })
};