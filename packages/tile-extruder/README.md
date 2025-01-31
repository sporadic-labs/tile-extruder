# Tile Extruder CLI & Library

This is the package that is published to npm as `tile-extruder`. 

## Running

Install pnpm and then run the following commands from the root of the repo:
- `pnpm install`
- `pnpm --filter tile-extruder build`

This is will generate a `bin` folder with transpiled JS for the library/CLI.

## Tests

The current test setup is a simple snapshot test that compares the output of the lib against known correct extrusions. Run it via `pnpm --filter tile-extruder test`.

## Publishing

It is useful to do a dry run of publishing to test that the build works as intended:
- `pnpm --filter tile-extruder publish --dry-run`
- use of the tilesets from this repo to attempt running tile-extrusion against the bin

For publishing:
- `pnpm --filter tile-extruder publish`

## Contributing

Contributions are welcome! TLDR of the process:

- Open an issue with an idea or suggestion.
- Open a pull request with your changes. Please fill out the PR template.
- Request a review.
