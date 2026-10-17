import { HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

// Sections of the site. `type` in a post's front matter decides which one it lands in.
const TYPES = {
  article: { label: "Article", page: "/articles/" },
  newsletter: { label: "Newsletter", page: "/newsletter/" },
  life: { label: "Life & Lessons", page: "/life/" },
  video: { label: "Video", page: "/videos/" },
};

const slug = (s) =>
  String(s).toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: "GrilledMba",
      subtitle: "Global markets and MBA ideas, served hot.",
      base: "https://ritam45-debug.github.io/GrilledMba/",
      author: { name: "Ritam Dhara" },
    },
  });

  const isLive = (p) => !p.data.draft;
  const byDate = (a, b) => b.date - a.date;

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").filter(isLive).sort(byDate)
  );
  for (const t of Object.keys(TYPES)) {
    eleventyConfig.addCollection(t, (api) =>
      api.getFilteredByGlob("src/posts/*.md").filter(isLive).filter((p) => p.data.type === t).sort(byDate)
    );
  }
  // One entry per topic, used to build /topics/<topic>/ pages.
  eleventyConfig.addCollection("topicList", (api) => {
    const map = new Map();
    for (const p of api.getFilteredByGlob("src/posts/*.md").filter(isLive).sort(byDate)) {
      const t = p.data.topic || "General";
      if (!map.has(t)) map.set(t, { name: t, slug: slug(t), posts: [] });
      map.get(t).posts.push(p);
    }
    return [...map.values()].sort((a, b) => b.posts.length - a.posts.length);
  });

  eleventyConfig.addFilter("slug2", slug);
  eleventyConfig.addFilter("typeLabel", (t) => (TYPES[t] ? TYPES[t].label : "Post"));
  eleventyConfig.addFilter("typePage", (t) => (TYPES[t] ? TYPES[t].page : "/articles/"));
  eleventyConfig.addFilter("readable", (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220)) + " min read";
  });
  eleventyConfig.addFilter("typeDir", (t) => (TYPES[t] ? TYPES[t].page : "/articles/").replace(/\//g, ""));
  eleventyConfig.addFilter("findTopic", (list, name) => (list || []).find((t) => t.name === name) || null);
  eleventyConfig.addFilter("take", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/GrilledMba/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
