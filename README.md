# Love Island Storyboarding Tool

This project provides a basic storyboarding application for a dating-show style series. It now uses a React frontend powered by TanStack Router and Vite. The Express backend serves API endpoints and static assets. Jest tests ensure deterministic behavior.

## Requirements

- Node.js 16 or newer

## Install

```sh
npm install
```

## Run the server

```sh
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

Run the React dev server with Vite in another terminal:

```sh
npm run dev
```

This will start Vite on [http://localhost:5173](http://localhost:5173). Build the frontend with:

```sh
npm run build
```

The compiled assets will be output to `public/dist` and served by Express.

## Deploying to Vercel

This project includes a `vercel.json` configuration and a serverless
function under `api/` so it can be deployed on [Vercel](https://vercel.com).
Run the following after installing the [Vercel CLI](https://vercel.com/cli):

```sh
vercel deploy --prod
```

## Run tests

```sh
npm test
```
