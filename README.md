# Tiny Planetarium — A pocket atlas of the stars

Thirty animated celestial companions, a calm interactive atlas, and a little room to explore.

Tiny Planetarium is a static website built with browser-native JavaScript, CSS, HTML, and SVG. It includes an illustrated collection of thirty original celestial characters, live search, family filters, favorites stored locally, a details dialog, random discovery, and JSON export.

## Highlights

- 30 independent animated SVG assets with distinct names, silhouettes, palettes, and motion.
- Search by name, family, or description.
- Filter by celestial family and combine filters with a favorites-only view.
- Save favorites in localStorage; storage failures do not break the atlas.
- Open field notes for each resident and export saved records as JSON.
- Pause and resume embedded SVG animation where the browser supports the SVG animation API.
- Respect reduced-motion preferences and keyboard shortcuts.
- No framework, remote font, tracking script, server, or runtime dependency.

## Run locally

Requirements: Node.js 20 or newer.

    git clone https://github.com/developer04onserver/tiny-planetarium-atlas.git
    cd tiny-planetarium-atlas
    npm test
    npm run build
    npm run dev

The development command uses Node's built-in static server helper script and prints the local URL.

## Commands

| Command | Description |
| --- | --- |
| npm test | Run the native Node.js test suite |
| npm run check | Check JavaScript syntax |
| npm run build | Create the dist folder |
| npm run dev | Serve the current directory locally |
| npm run preview | Serve the production dist folder |

## Layout

    public/celestials/       30 standalone animated SVG characters
    src/catalog.js           Immutable character catalogue
    src/logic.js             Pure filtering and random-selection helpers
    src/app.js               Rendering, favorites, dialog, and export behavior
    src/style.css            Responsive visual system and reduced-motion rules
    scripts/                 Build and local preview utilities
    tests/                   Node.js built-in tests
    docs/                    Architecture, accessibility, and deployment notes

## Add a celestial character

1. Create a standalone SVG file in public/celestials.
2. Give it an accessible title and description, a square viewBox, and a complete static pose.
3. Use gentle declarative animation. Avoid flashes, strobing, or external references.
4. Add a record to src/catalog.js with a unique ID, family, colors, description, and matching relative asset path.
5. Add a test if the new family changes filtering behavior.

See docs/SVG_GUIDE.md for the full checklist.

## Privacy

Favorites are stored in this browser only. The Export favorites action creates a local JSON download. The project does not send favorites, searches, or other browsing data to a server.

## Deployment

Run npm run build and publish dist to any static host. No environment variables are required. See docs/DEPLOYMENT.md.

## License

MIT. See LICENSE.
