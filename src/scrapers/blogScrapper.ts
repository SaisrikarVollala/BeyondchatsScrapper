import axios from "axios";
import * as  cheerio from "cheerio";
import { ENV } from "../config/env.js";






async function getLastPageNumber($) {
  let lastPage = 1;

  $(".page-numbers").each((i, e) => {
    const page = parseInt($(e).text());
    if (!isNaN(page)) {
      lastPage = Math.max(lastPage, page);
    }
  });

  return lastPage;
}



export async function scrapePage(pageNo) {
  const url =
    pageNo === 1
      ? ENV.BeyondChats_URL
      : `${ENV.BeyondChats_URL}/page/${pageNo}/`;

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const blogs:any = [];

  $("article").each((i, e) => {
    blogs.push({
      title: $(e).find("h2.entry-title").text().trim(),
      image: $(e).find("img").first().attr("src"),
      link: $(e).find("a").first().attr("href"),
      excerpt: $(e).find("p").text().trim(),
      meta: $(e)
        .find("ul.entry-meta")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim(),
    });
  });
  return blogs;
  
}

export async function getBlogs() {
  const { data } = await axios.get(ENV.BeyondChats_URL);
  const $ = cheerio.load(data);
  const lastPage = await getLastPageNumber($);
 const blogs1= await scrapePage(lastPage);
 const blogs2= await scrapePage(lastPage - 1);
const allBlogs = [...blogs1, ...blogs2];
return allBlogs.slice(-5);
}


