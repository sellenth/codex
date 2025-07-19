# Codex

Codex is an example storyboard and production tool built with **React 19**, **TanStack Router** and **Convex**.  It lets you manage episodes, characters and scenes for the fictional show *Attraction Island* and includes a small playground for generating images using `fal.ai` models.

## Quick start

1. Install the dependencies:

   ```sh
   pnpm install
   ```

2. Initialise Convex and set up your environment:

   ```sh
   npx convex dev
   cp .env.example .env
   # Edit .env and set VITE_CONVEX_URL to the URL printed by the command above
   ```

3. Generate Convex TypeScript bindings:

   ```sh
   pnpm convex:codegen
   ```

4. Run the dev servers (separate terminals):

   ```sh
   pnpm convex      # starts the Convex dev server
   pnpm dev         # starts the Vite dev server
   ```

Open [http://localhost:5173](http://localhost:5173) and the app will reload on file changes.

## Building for production

To create a production build run:

```sh
pnpm build
```

The server output is written to `.output/` and can be started with:

```sh
pnpm start
```

## Useful links

- [TanStack Router documentation](https://tanstack.com/router)
- [Convex documentation](https://docs.convex.dev)
- [fal.ai client](https://www.fal.ai)
