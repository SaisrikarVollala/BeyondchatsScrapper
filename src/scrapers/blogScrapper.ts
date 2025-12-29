import * as cheerio from "cheerio";
import axios from "axios";
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

  $(".elementor-widget-theme-post-content")
    .find("h1, h2, h3, p, ul, blockquote, figure")
    .each((i, e) => {
      if (e.type !== "tag") return;

      const tag = e.tagName.toLowerCase();

      if (["h1", "h2", "h3"].includes(tag)) {
        blocks.push({
          type: "heading",
          level: Number(tag[1]),
          text: $(e).text().trim(),
        });
      } else if (tag === "p") {
        const text = $(e).text().trim();
        if (text) {
          blocks.push({ type: "paragraph", text });
        }
      } else if (tag === "ul") {
        const items: string[] = [];
        $(e)
          .find("li")
          .each((_, li) => {
            items.push($(li).text().trim());
          });

        if (items.length) {
          blocks.push({ type: "list", items: items.join(";") });
        }
      } else if (tag === "blockquote") {
        blocks.push({
          type: "quote",
          text: $(e).text().trim(),
        });
      } else if (tag === "figure") {
        const img = $(e).find("img");
        const src = img.attr("src");

        if (src) {
          blocks.push({
            type: "image",
            src,
          });
        }
      }
    });

  return blocks;
}

export async function scrapeArticle(url: string) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
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
