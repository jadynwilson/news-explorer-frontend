import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setKeyword(e.target.value);
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }
    onSearch(keyword.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="keyword"
        className="search-form__input"
        placeholder="Enter topic"
        value={keyword}
        onChange={handleChange}
        required
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;
