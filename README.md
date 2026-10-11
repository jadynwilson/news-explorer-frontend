# NewsExplorer

NewsExplorer is a React application for searching news articles by keyword and saving the ones you want to keep. This repository contains the frontend (Stage 1).

**Live site:** https://jadynwilson.github.io/news-explorer-frontend/

## Features

- Search articles by keyword using the News API (articles from the last 7 days)
- Loading, "Nothing found", and error states for every search
- Results shown three at a time with a "Show more" button
- Sign up and sign in popups with client-side form validation
- Save and remove articles when signed in
- Protected `/saved-news` page showing your saved articles and their keywords
- Responsive layout from 320px up

## Technologies

- React 18 and Vite
- React Router v5
- CSS with BEM naming
- News API (via `https://nomoreparties.co/news/v2/everything` in production)

## Running locally

```bash
npm install
npm run dev
```

## Author

Jadyn Marx - Currently going to school for Software engenieering through the Tripletem program.

News API key: fcd1846b14614fa2a2f82e3a037c1afe
