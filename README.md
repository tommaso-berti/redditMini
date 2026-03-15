# Reddit Mini Client

A small Reddit client built as a frontend exercise with React, Redux Toolkit, and React Router.  
The app loads posts from a subreddit (`pics` by default), lists unique authors in a sidebar, supports author-based filtering through routes, and fetches comments on demand for each post.

## Tech Stack

- React 19
- Redux Toolkit + React Redux
- React Router
- Vite (Rolldown) + ESLint

## Features

- Fetches subreddit posts from Reddit JSON API
- Shows post title, score, image preview, author, date, and comment count
- Lazy-loads comments per post when the user opens the comments section
- Builds an author list automatically from fetched posts
- Filters feed by author using route params (`/authors/:author`)
- Handles loading and error states for feed and comments

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routing

- `/` -> full feed
- `/authors/:author` -> feed filtered by the selected author

## API Access and Proxy

During development, Vite proxies API requests from:

- `/reddit-api/...` -> `https://www.reddit.com/...`

This avoids CORS issues and keeps fetch calls consistent in the app.

## Project Structure

```text
src/
  components/
    header/
    feedPost/
    accordionMenuItem/
  features/
    feed/
    accordionSidebar/
  store/
    feedSlice.js
    authorsSlice.js
    store.js
  utils/
    helpers.js
  App.jsx
  routes.js
  main.jsx
```

## Notes

- Current UI text is mostly in Italian, while code and architecture are language-agnostic.
- Comments are cached in Redux by `postId` after first fetch.

## One-Line Project Description

**"Reddit Mini Client is a React and Redux Toolkit exercise project that fetches and displays Reddit posts, supports author-based filtering with dynamic routing, and loads post comments on demand through asynchronous state management."**
