# Accessibility guide

## Keyboard

- Native buttons, inputs, and selects remain keyboard operable.
- Slash focuses the search field when focus is not already in an editable control.
- Escape clears and leaves the search field.
- The details panel uses the native dialog element and can be closed with Escape.
- Visible focus styling is provided for all interactive elements.

## Semantics

- The page uses header, main, section, and footer landmarks.
- Each celestial entry is an article with separate open and favorite buttons.
- Favorite buttons expose their state through aria-pressed and use a descriptive accessible name.
- Search result counts are announced through a polite live region.
- The hero scene is decorative and hidden from assistive technology.

## Motion

- The Pause button reports its state through aria-pressed.
- prefers-reduced-motion starts the site with animation paused.
- Same-origin SVG documents are paused using the SVG animation API where available.
- Motion is decorative and no essential information depends on animation.

## Storage

Favorites are optional convenience state. If browser storage is unavailable, the atlas remains usable for the current session and displays no blocking error.
