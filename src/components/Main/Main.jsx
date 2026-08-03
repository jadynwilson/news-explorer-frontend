import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

function Main() {
  const testArticle = {
    title: 'Everyone Needs a Special "Sit Spot" in Nature',
    description:
      'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me.',
    urlToImage:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600",
    publishedAt: "2020-11-04",
    source: "Treehugger",
  };

  return (
    <main>
      <ul
        style={{
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <NewsCard
          article={testArticle}
          loggedIn={false}
          isSaved={false}
          isSavedNewsPage={false}
          onSaveClick={() => {}}
          onRemoveClick={() => {}}
        />
      </ul>
    </main>
  );
}

export default Main;
