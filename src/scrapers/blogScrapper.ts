import axios from "axios";
import * as cheerio from "cheerio";
import { ContentBlock } from "../models/article.js";

function scrapeMeta($: cheerio.CheerioAPI) {
  const title = $("h1").first().text().trim();
  const author = $('a[href*="/author/"]').first().text().trim();
  const publishedDate = $("time").first().text().trim();
  const category = $('a[href*="/blogs/category/"]').first().text().trim();
  const likes = parseInt(
    $("span.wp-applause-count").first().text().trim() || "0"
  );

  return { title, author, publishedDate, category, likes };
}

function scrapeContentBlocks($: cheerio.CheerioAPI): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  const container = $(".elementor-widget-theme-post-content").first().length
    ? $(".elementor-widget-theme-post-content").first()
    : $("article").first().length
    ? $("article").first()
    : $("main");

  container.children().each((_, el) => {
    if (el.type !== "tag") return;

    const tag = el.tagName.toLowerCase();
    const $el = $(el);

    $el.find("strong").each((_, s) => {
      const txt = $(s).text();
      $(s).replaceWith(`**${txt}**`);
    });

    const text = $el
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    if (!text && tag !== "figure") return;

    if (/^h[1-6]$/.test(tag)) {
      blocks.push({
        type: "heading",
        level: Number(tag[1]),
        text,
      });
      return;
    }

    if (tag === "p") {
      blocks.push({
        type: "paragraph",
        text,
      });
      return;
    }

    if (tag === "ul" || tag === "ol") {
      const items: string[] = [];
      $el.find("li").each((_, li) => {
        const itemText = $(li).text().trim();
        if (itemText) items.push(itemText);
      });

      if (items.length) {
        blocks.push({
          type: "list",
          items: items.join(";"),
        });
      }
      return;
    }

    if (tag === "blockquote") {
      blocks.push({
        type: "quote",
        text,
      });
      return;
    }

    if (tag === "figure") {
      const img = $el.find("img");
      const src = img.attr("src") || img.attr("data-src");
      if (src) {
        blocks.push({
          type: "image",
          src,
        });
      }
    }
  });

  return dedupe(blocks);
}

function dedupe(blocks: ContentBlock[]) {
  const seen = new Set<string>();
  return blocks.filter((b) => {
    const key = `${b.type}-${JSON.stringify(b)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function scrapeArticle(url: string) {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    timeout: 30000,
  });

  const $ = cheerio.load(data);

  const meta = scrapeMeta($);
  const contentBlocks = scrapeContentBlocks($);

  return {
    ...meta,
    contentBlocks,
    sourceUrl: url,
  };
}
