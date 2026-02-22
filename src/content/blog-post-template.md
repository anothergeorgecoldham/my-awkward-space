# Blog Post Template

<!-- 
  USAGE: Copy this template when creating a new blog post.
  Save as: src/content/blog/your-slug-here.md
  
  CONVENTIONS:
  - date: unquoted YAML date (YYYY-MM-DD)
  - tags: YAML list format, Title Case
  - readTime: format as "X min read"
  - canonicalURL: always use full URL with https://my.awkward.space/blog/ prefix
  - image paths: relative to public/, e.g. /images/blog/your-banner.png
  - ogTitle/twitterTitle: can differ from title for social optimisation
  - ogDescription/twitterDescription: shorter, punchier than description
  - keywords: lowercase, SEO-focused search terms
  - slug: must match the filename (without .md extension)
  - updated: only include when the post has been revised after initial publish
-->

```markdown
---
title: ""
description: ""
date: YYYY-MM-DD
author: "George Coldham"
category: ""
readTime: "X min read"
slug: "your-slug-here"
tags:
  - Tag One
  - Tag Two
image: "/assets/images/blog/your-slug-banner.png"
imageAlt: "Descriptive alt text for the banner image"
canonicalURL: "https://my.awkward.space/blog/your-slug-here"
draft: false

ogTitle: ""
ogDescription: ""
ogImage: "/assets/images/blog/your-slug-banner.png"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: ""
twitterDescription: ""
twitterImage: "/assets/images/blog/your-slug-banner.png"

keywords:
  - keyword one
  - keyword two
---

![Banner alt text](/assets/images/blog/your-slug-banner.png)

# Article Title

Opening paragraph.

---

## Section Heading

Content.

---

## References

[^1]: Source name. *Title*. URL
```

## Field Reference

| Field | Required | Format | Notes |
|---|---|---|---|
| `title` | ✅ | String | Displayed as page title and `<title>` tag |
| `description` | ✅ | String | Used for `<meta name="description">` and blog listing |
| `date` | ✅ | `YYYY-MM-DD` | Unquoted YAML date |
| `updated` | ❌ | `YYYY-MM-DD` | Only add when post is revised |
| `author` | ✅ | String | Always `"George Coldham"` |
| `category` | ✅ | String | e.g. `Authentication`, `Zero Trust`, `AI Security` |
| `readTime` | ✅ | String | Format: `"X min read"` |
| `slug` | ✅ | String | Must match filename. Kebab-case, lowercase |
| `tags` | ✅ | YAML list | Title Case. Used for categorisation |
| `image` | ✅ | Path | Banner image, relative to public/ |
| `imageAlt` | ✅ | String | Accessible alt text for banner |
| `canonicalURL` | ✅ | URL | Full `https://my.awkward.space/blog/{slug}` |
| `draft` | ✅ | Boolean | Set `true` to hide from production |
| `ogTitle` | ✅ | String | Can differ from title for social platforms |
| `ogDescription` | ✅ | String | Shorter/punchier than description |
| `ogImage` | ✅ | Path | Usually same as `image` |
| `ogType` | ✅ | String | Always `"article"` for blog posts |
| `twitterCard` | ✅ | String | Always `"summary_large_image"` |
| `twitterTitle` | ✅ | String | Can differ from ogTitle |
| `twitterDescription` | ✅ | String | Short, punchy summary |
| `twitterImage` | ✅ | Path | Usually same as `image` |
| `keywords` | ✅ | YAML list | Lowercase SEO search terms |

## Existing Categories

- `Authentication` — Passkeys, WebAuthn, FIDO2, identity
- `Zero Trust` — Browser security, SaaS controls, session management
- `AI Security` — LLM security, prompt injection, agent controls
