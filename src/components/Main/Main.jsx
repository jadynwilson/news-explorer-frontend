import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./Main.css";
import About from "../About/About";

const PLACEHOLDER_ARTICLES = [
  {
    title: 'Everyone Needs a Special "Sit Spot" in Nature',
    description:
      'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
    urlToImage:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600",
    publishedAt: "2020-11-04",
    source: "Treehugger",
  },
  {
    title: "Nature makes you better",
    description:
      "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
    urlToImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    publishedAt: "2019-02-19",
    source: "National Geographic",
  },
  {
    title: "Grand Teton Renews Historic Crest Trail",
    description:
      '"The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
    urlToImage:
      "https://images.unsplash.com/photo-1472791108553-c9405341e398?w=600",
    publishedAt: "2020-10-19",
    source: "National Parks Traveler",
  },
  {
    title: "Nostalgic Photos of Tourists in U.S. National Parks",
    description:
      "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...",
    urlToImage:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600",
    publishedAt: "2020-10-19",
    source: "National Geographic",
  },
  {
    title: "Scientists Don't Know Why Polaris Is So Weird",
    description:
      "Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.",
    urlToImage:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600",
    publishedAt: "2020-03-16",
    source: "Treehugger",
  },
];

const CARDS_PER_PAGE = 3;

function Main() {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const visibleArticles = PLACEHOLDER_ARTICLES.slice(0, visibleCount);
  const hasMore = visibleCount < PLACEHOLDER_ARTICLES.length;

  function handleShowMore() {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  }

  return (
    <main>
      <section className="results">
        <h2 className="results__heading">Search results</h2>
        <ul className="results__grid">
          {visibleArticles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
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
      </section>
      <About />
    </main>
  );
}

export default Main;
