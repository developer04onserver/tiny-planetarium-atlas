# SVG character guide

## Asset requirements

- Store files in public/celestials.
- Use a square viewBox, preferably 0 0 160 160.
- Include title and desc elements, and connect them with aria-labelledby.
- Keep all gradients, filters, and shapes inside the file.
- Do not use remote image URLs, script tags, or inline event handlers.

## Motion

Use declarative animate or animateTransform for gentle floating, rotation, twinkling, or pulsing. Keep loops slow. Never use flashing or strobing. The static pose must remain complete for renderers without SMIL support.

## Quality checklist

- [ ] Distinct silhouette and readable face
- [ ] Unique palette and name
- [ ] No network dependencies
- [ ] Accessible title and description
- [ ] Motion is gentle and can be paused in the app
- [ ] Added to the catalogue and covered by tests where applicable
