const BASE_URL = "https://newsapi.org/v2/everything";
const PROXY_URL = "https://api.allorigins.win/raw?url=";

export function searchArticles(keyword) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const fromDate = oneMonthAgo.toISOString().split("T")[0];

  const newsApiUrl = `${BASE_URL}?q=${encodeURIComponent(keyword)}&from=${fromDate}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
  const url = `${PROXY_URL}${encodeURIComponent(newsApiUrl)}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.status !== "ok") {
        return Promise.reject(data.message || "Something went wrong");
      }
      return data.articles;
    });
}
