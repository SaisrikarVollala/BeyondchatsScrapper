import { getBlogs } from "../scrapers/blogInfo.js";
import { scrapeArticle } from "../scrapers/blogScrapper.js";
import { Article } from "../models/article.js";
import { getNextArticleId } from "../models/counter.js";

export default async function storeToDB() {
  try {
    const Articles = await getBlogs();
    const A = Articles.slice(-1);
    for (const article of A) {
      const articleId= await getNextArticleId();
      const {
        title,
        author,
        contentBlocks,
        publishedDate,
        category,
        likes,
        sourceUrl,
      } = await scrapeArticle(article.link);
      await Article.create({
        title,
        author,
        contentBlocks,
        publishedDate,
        category,
        likes,
        sourceUrl,
        articleId
      });
    }
  } catch (error) {
    console.error("Error storing articles to DB:", error);
  }
}
