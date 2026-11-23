# Architecture

## Overview

Tiny Planetarium is a static, dependency-free website. Its code is divided into an immutable catalogue, pure data helpers, a DOM-oriented application module, and a small build/preview toolchain using Node.js built-ins.

## Data flow

1. src/catalog.js provides the canonical list of thirty celestial records.
2. src/logic.js handles search, family filtering, favorites intersections, and random selection without reading from the DOM.
3. src/app.js owns browser state: search text, selected family, favorites, favorites-only mode, current detail record, and motion state.
4. render() computes visible records and replaces the collection grid with fresh semantic cards.
5. User actions update state, persist favorites where possible, and render the derived view.

## Persistence and export

Favorites are stored under the namespaced key tiny-planetarium:favorites. Reads and writes are guarded because localStorage may be disabled or unavailable in private browsing contexts. The export operation serializes the selected catalogue records into a JSON Blob and creates a local download.

## SVG embedding

Characters are embedded as same-origin object elements. The app can access their SVG documents and call pauseAnimations() or unpauseAnimations() where supported. Each asset remains independently reusable and still contains a complete static illustration.

## Build

scripts/build.mjs copies the HTML entry point, application source, and public SVG folder into dist/. There is no bundler and no compilation step. scripts/serve.mjs provides a local server with a small MIME map and path traversal protection.

## Extension points

- Add a character by adding an SVG and catalogue record.
- Add a family by extending the select options and tests.
- Add a filter by extending filterCelestials and its unit tests.
- Add persistence by explicitly documenting its storage scope and failure mode.
