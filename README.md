# PocketPostPlace

PocketPostPlace is a minimal Astro blog that stores published posts as markdown files and deploys to GitHub Pages.

## Features

- Homepage listing every published post
- Individual post pages with rendered markdown
- A `/new` page that routes authors to a GitHub issue form
- Approval-based publishing: when the repository owner comments `/approve` on a post issue, a workflow turns that issue into a markdown post

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publishing workflow

1. Open the **New post** issue form from the site or directly from GitHub.
2. Fill in the summary and markdown body for the post.
3. Submit the issue.
4. A repository owner reviews it and comments `/approve`.
5. GitHub Actions creates a markdown file in `src/content/posts/`, commits it, comments on the issue, and closes the issue.

## Content format

Published posts live in `src/content/posts/` and use this frontmatter:

```md
---
title: "Post title"
description: "Short summary"
pubDate: "2026-05-26T00:00:00.000Z"
---

Markdown body content goes here.
```
