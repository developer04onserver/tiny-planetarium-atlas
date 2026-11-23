# Deployment

Tiny Planetarium is a static site. Run npm run build and publish the generated dist directory.

## GitHub Pages

The application uses relative paths. Publish the contents of dist using the Pages publishing option or an Actions-based deployment.

## Cloudflare Pages

Connect the repository, use npm run build as the build command, and dist as the output directory. No environment variables are required.

## Any static server

Upload index.html, src/, and celestials/ from dist. The host must serve SVG with an image/svg+xml content type and JavaScript modules with a JavaScript content type.
