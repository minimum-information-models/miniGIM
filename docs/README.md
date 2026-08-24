# MiniGIM Documentation website

This directory contains the website hosted on [minigim.nl](https://minigim.nl). This website provides documentation and resources for the MiniGIM project. 

This website is built using the static site generator [Astro](https://astro.build). GitHub Actions are used to automatically build the website when changes are made to the `main` branch, and these changes are then automatically published to GitHub Pages shortly after.

## Structure

- Static files (images, photos, downloads, etc.) should be placed in the `public` directory. These files will be served under the root URL of the website. No minimization/compression will happen during the build. These files will be served as-is.
- Content should be placed in the `src/pages` directory. You can either use Markdown files or Astro files to write content. Both files get converted to HTML during the build process. Markdown is great for simple content (text and images). Astro is more powerful but also more complex. Astro files are great for more complex layouts, and designs.
- Layouts should be placed in the `src/layouts` directory. Layouts are reusable components that can be used to wrap pages and provide a consistent look and feel across the website. For Markdown files you can specify the layout using a frontmatter property.
- Components should be placed in the `src/components` directory. Components are reusable pieces of UI that can be used across multiple pages. These can only be used in Astro files.

## Example of a Markdown page

```markdown
---
layout: ../layouts/MarkdownPageLayout.astro
title: This is the title of the page
description: This is a description of the page
---

# This page is written in Markdown

Hello world!
```

## Building the website locally

1. Run `nvm use` to use the correct version of Node.js. If you don't use nvm, you can manually install the correct version of Node.js (see .nvmrc for the version number).
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the development server.
4. Open [http://localhost:4321](http://localhost:4321) in your browser to view the website.
5. Make changes to the content and layout files in the `src` directory.
6. Review your changes in the browser. The content should automatically update when you save changes.

When you're done, share your changes with the team by creating a pull request.
