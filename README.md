# My Awkward Space

A simple blog website built with Astro, featuring blog posts, an about page, and social links.

## 🚀 Project Structure

```
/
├── public/
├── src/
│   ├── content/
│   │   └── blog/          # Blog post markdown files
│   ├── layouts/
│   │   └── Layout.astro   # Main layout component
│   └── pages/
│       ├── blog/
│       │   └── [slug].astro  # Dynamic blog post pages
│       ├── index.astro       # Home page (blog listing)
│       ├── about.astro       # About Me page
│       ├── links.astro       # Social Links page
│       └── 404.astro         # 404 page
├── astro.config.mjs       # Astro configuration
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 📝 Adding New Blog Posts

To add a new blog post:

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with title, date, and description:

```markdown
---
title: "Your Post Title"
date: "2024-01-30"
description: "A short description"
---

# Your Post Title

Your content here...
```

3. The post will automatically appear on the home page

## 🌐 Deploying to Netlify

### Option 1: Via Netlify Dashboard

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select this repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

### Option 2: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## ✏️ Customization

- **Update social links:** Edit `src/pages/links.astro`
- **Edit about page:** Edit `src/pages/about.astro`
- **Change styling:** Modify the `<style>` section in `src/layouts/Layout.astro`
- **Update site URL:** Edit `astro.config.mjs` after deployment

## 📦 What's Included

- ✅ Home page with blog post listing
- ✅ Individual blog post pages
- ✅ About Me page
- ✅ Links page for social platforms
- ✅ Responsive design
- ✅ Simple, clean styling
- ✅ Netlify deployment ready
