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


type BlogInfo= {
    title: string;
    link: string;
}
export async function scrapePage(pageNo:number) {
  
  const url = pageNo === 1
    ? ENV.BeyondChats_URL
    : `${ENV.BeyondChats_URL}/page/${pageNo}/`;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const blogs:BlogInfo[]= [];

  $("article").each((i, e) => {
    blogs.push({
      title: $(e).find("h2.entry-title").text().trim(),
      link: $(e).find("a").first().attr("href")||"",
    });
  });
  return blogs;
}

export async function getBlogs(){
    const { data } = await axios.get(ENV.BeyondChats_URL);
    const $ = cheerio.load(data);
    const lastPage = await getLastPageNumber($);
    let allBlogs:BlogInfo[] = [];

    for(let page=2; page<=lastPage; page++){
        const blogs = await scrapePage(page);
        allBlogs = [...allBlogs, ...blogs];
    }
    return allBlogs;
}


