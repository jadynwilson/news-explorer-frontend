import { useState } from "react";
import bookmarkNormal from "../../images/bookmark-normal.svg";
import bookmarkHover from "../../images/bookmark-hover.svg";
import bookmarkMarked from "../../images/bookmark-marked.svg";
import "./NewsCard.css";

function NewsCard({
  article,
  loggedIn,
  isSaved,
  isSavedNewsPage,
  onSaveClick,
  onRemoveClick,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  function handleBookmarkClick() {
    if (!loggedIn) return;
    if (isSavedNewsPage) {
      onRemoveClick(article);
    } else {
      onSaveClick(article);
    }
  }

  function getBookmarkIcon() {
    if (isSaved) return bookmarkMarked;
    if (showTooltip) return bookmarkHover;
    return bookmarkNormal;
  }

  return (
    <li className="news-card">
      <div className="news-card__image-wrap">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card__image"
        />

        {isSavedNewsPage && (
          <span className="news-card__keyword-tag">{article.keyword}</span>
        )}

        <button
          type="button"
          className="news-card__bookmark"
          onClick={handleBookmarkClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isSavedNewsPage ? "Remove from saved" : "Save article"}
        >
          <img
            src={getBookmarkIcon()}
            alt=""
            className="news-card__bookmark-icon"
          />
        </button>

        {showTooltip && !loggedIn && !isSavedNewsPage && (
          <span className="news-card__tooltip">Sign in to save articles</span>
        )}
        {showTooltip && isSavedNewsPage && (
          <span className="news-card__tooltip">Remove from saved</span>
        )}
      </div>

      <div className="news-card__info">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
