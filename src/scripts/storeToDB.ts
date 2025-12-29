import { getBlogs } from "../scrapers/blogInfo.js";
import { scrapeArticle } from "../scrapers/blogScrapper.js";
import { Article } from "../models/article.js";


export default async function storeToDB() {
  try {
    const Articles = await getBlogs();
    const A = Articles.slice(-1);
    for (const article of A) {
      
      const {
        title,
        author,
        contentBlocks,
        publishedDate,
        sourceUrl,
        category,
        likes,
      } = await scrapeArticle(article.link);
      await Article.create({
        title,
        author,
        contentBlocks,
        publishedDate,
        sourceUrl,
        category,
        likes,
      });
    }
  } catch (error) {
    console.error("Error storing articles to DB:", error);
  }
}
