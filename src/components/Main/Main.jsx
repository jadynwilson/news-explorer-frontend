import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import "./Main.css";

const CARDS_PER_PAGE = 3;

function Main({ articles, isLoading, error, hasSearched, searchKeyword }) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(CARDS_PER_PAGE);
  }, [articles]);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  function handleShowMore() {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  }

  return (
    <main>
      {hasSearched && (
        <section className="results">
          {isLoading && <Preloader />}

          {!isLoading && error && (
            <div className="results__message">
              <h2 className="results__message-title">
                Sorry, something went wrong
              </h2>
              <p className="results__message-text">{error}</p>
            </div>
          )}

          {!isLoading && !error && articles.length === 0 && (
            <div className="results__message">
              <h2 className="results__message-title">Nothing found</h2>
              <p className="results__message-text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          )}

          {!isLoading && !error && articles.length > 0 && (
            <>
              <h2 className="results__heading">Search results</h2>
              <ul className="results__grid">
                {visibleArticles.map((article) => (
                  <NewsCard
                    key={article.url}
                    article={{
                      title: article.title,
                      description: article.description,
                      urlToImage: article.urlToImage,
                      publishedAt: article.publishedAt,
                      source: article.source?.name,
                    }}
                    loggedIn={false}
                    isSaved={false}
                    isSavedNewsPage={false}
                    onSaveClick={() => {}}
                    onRemoveClick={() => {}}
                  />
                ))}
              </ul>
              {hasMore && (
                <button
                  type="button"
                  className="results__show-more"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
