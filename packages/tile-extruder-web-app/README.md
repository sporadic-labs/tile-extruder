# Tile Extruder Web App

A web app for extruding tilesets, https://tile-extruder.vercel.app/.

## Running

Install pnpm and then run the following commands from the root of the repo:
- `pnpm install`
- `pnpm --filter tile-extruder-app dev`

## Testing

The repo is setup with a few tests/checks:
- `pnpm --filter tile-extruder-app cypress:open` will open cypress for the end to end tests 
- `pnpm --filter tile-extruder-app jest` will run a front-end suite
- `pnpm --filter tile-extruder-app typecheck` will typecheck the repo

## Deploying

Merging to `main` will trigger a deploy via Vercel.