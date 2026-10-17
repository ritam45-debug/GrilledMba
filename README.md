# GrilledMba

Global markets and MBA ideas, served hot. Articles, newsletter issues, personal stories and short videos by Ritam Dhara.

Live at **https://ritam45-debug.github.io/GrilledMba/** (built with [Eleventy](https://www.11ty.dev/) and deployed by GitHub Actions on every push to `main`).

## Publishing a new post (no coding needed)

1. On GitHub, open `src/posts/` → **Add file → Create new file**.
2. Name it `YYYY-MM-DD-short-title.md`, e.g. `2026-10-24-why-gold-keeps-rising.md`.
3. Copy the matching template from `templates/` and paste it in:
   - `article-template.md` → Articles
   - `newsletter-template.md` → Newsletter issues
   - `life-template.md` → Life & Lessons
   - `video-template.md` → Videos (YouTube link or a small mp4)
4. Fill in the top block (title, type, topic, excerpt, date) and write below it in Markdown.
5. **Commit changes.** The site rebuilds automatically in about a minute.

Add `draft: true` to the top block to keep a post off the live site.

## Front-matter fields

| Field | What it does |
|---|---|
| `type` | `article`, `newsletter`, `life` or `video` — decides the section |
| `topic` | One of: Global Markets, Finance, Marketing, Strategy, Operations, HR & Leadership, Economics, Careers |
| `excerpt` | Short summary shown on cards and link previews |
| `issue` | Newsletter issue number |
| `youtube` | YouTube video ID (works for Shorts) |
| `video` / `poster` | Path to a small mp4 in `src/assets/videos/` and its thumbnail |
| `cover` | Cover image in `src/assets/img/` |
| `sources` | List of `title` + `url`, shown at the end of the post |

Videos: prefer YouTube (unlisted is fine). GitHub rejects files over 100 MB and the repo slows down with large media.

## Site settings

Edit `src/_data/site.json` — tagline, bio, LinkedIn, portfolio link, the topic list, and `newsletterSignupUrl` (paste a Substack/Buttondown/Beehiiv signup link to show a "Subscribe by email" button).

## Run locally

```bash
npm install
npm start      # http://localhost:8080/GrilledMba/
```
