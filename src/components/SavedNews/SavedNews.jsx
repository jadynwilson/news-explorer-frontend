import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

const PLACEHOLDER_SAVED = [
  {
    title: 'Everyone Needs a Special "Sit Spot" in Nature',
    description:
      'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me.',
    urlToImage:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600",
    publishedAt: "2020-11-04",
    source: "Treehugger",
    keyword: "Nature",
    url: "placeholder-1",
  },
  {
    title: "Nature makes you better",
    description:
      "We all know how good nature can make us feel. We have known it for millennia.",
    urlToImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    publishedAt: "2019-02-19",
    source: "National Geographic",
    keyword: "Nature",
    url: "placeholder-2",
  },
  {
    title: "Nostalgic Photos of Tourists in U.S. National Parks",
    description:
      "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers.",
    urlToImage:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600",
    publishedAt: "2020-10-19",
    source: "National Geographic",
    keyword: "Yellowstone",
    url: "placeholder-3",
  },
];

function SavedNews({
  savedArticles = PLACEHOLDER_SAVED,
  userName = "Elise",
  onRemoveClick = () => {},
}) {
  const keywords = [...new Set(savedArticles.map((a) => a.keyword))];

  function formatKeywords() {
    if (keywords.length === 0) return "";
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} and ${keywords[1]}`;
    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`;
  }

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__label">Saved articles</p>
        <h1 className="saved-news__heading">
          {userName}, you have {savedArticles.length} saved article
          {savedArticles.length !== 1 ? "s" : ""}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: <strong>{formatKeywords()}</strong>
          </p>
        )}
      </section>

      {savedArticles.length > 0 && (
        <section className="saved-news__results">
          <ul className="saved-news__grid">
            {savedArticles.map((article) => (
              <NewsCard
                key={article.url}
                article={article}
                loggedIn={true}
                isSaved={true}
                isSavedNewsPage={true}
                onSaveClick={() => {}}
                onRemoveClick={onRemoveClick}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default SavedNews;
