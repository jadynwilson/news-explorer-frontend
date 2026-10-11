import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews({
  savedArticles = [],
  userName = "",
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
