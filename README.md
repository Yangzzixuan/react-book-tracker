# React Book Tracker

A small React + TypeScript project for tracking books, movies, games, and anime.

## Features

- Add new items with title, type, status, year, rating, note, and cover image URL
- Edit existing items
- Delete items
- Search by title
- Filter by type and status
- Sort by rating, year, or title
- Show cover images and fallback placeholders
- Save data in `localStorage`

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Git / GitHub

## Run Locally

```bash
npm install
npm run dev
```

The dev server is fixed to:

```txt
http://localhost:5173
```

## Notes

This is a pure frontend project. Data is saved in the browser with `localStorage`, so different browsers or different ports may not share the same data.

## Next Steps

- Improve mobile layout
- Add import and export for data
- Add a detail page for each item
- Connect to a backend database in a future full-stack version
