import * as cheerio from "cheerio";
import { createRequest } from "./request";
import { BookDetail, ChapterInfo } from "@/definitions/book";

// 这里主要处理请求
const request = createRequest(import.meta.env.VITE_API_DOMAIN, {
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const bookIdReg = /\/txt\/([0-9]+)\/index\.html/;
/**
 * 搜书
 * @param {string} bookname
 */
export const searchBook = async (bookname: string) => {
  const res: string = await request.post(
    `/search.php?searchkey=${encodeURIComponent(bookname)}`
  );
  const $ = cheerio.load(res);
  const result: BookDetail[] = [];
  $(".bookbox .bookinfo").each((index, bookDom) => {
    const tagA = $(bookDom).find(".bookname a");
    const bookTitle = tagA.text();
    const url = tagA.attr().href;
    const updateDom = $(bookDom).find(".update a");
    const newChapter = updateDom.text();
    // 从 url 中获取数据
    const bookId = url.match(bookIdReg);
    if (bookId) {
      result.push({
        title: bookTitle,
        id: Number(bookId[1]),
        newChapter,
      });
    }
  });
  return result;
};

const chapterIdReg = /([0-9]+)\.html/;

/**
 * 章节列表
 * @param {string} bookurl
 */
export const getBookChapter = async (bookId: number) => {
  const res: string = await request.get(`/txt/${bookId}/index.html`);
  const $ = cheerio.load(res);
  let chapterList: ChapterInfo[] = [];
  $(".listmain dd").each((index, chapterDom) => {
    const dom = $(chapterDom).find("a");
    const title = dom.text();
    const url = dom.attr().href;
    // 从 url 中获取数据
    const chapterId = url.match(bookIdReg);
    if (chapterId) {
      chapterList.push({
        title,
        id: Number(chapterId[1]),
      });
    }
  });
  // 要把 最新章节 删掉
  const firstChapterIndex = chapterList.findIndex((item, index) => {
    const { id } = item;
    const nextChapter = chapterList[++index];
    if (nextChapter) {
      return id < nextChapter.id;
    } else {
      return index;
    }
  });
  // 最新章节
  const newChapterList = chapterList.slice(0, firstChapterIndex);
  chapterList = chapterList.splice(firstChapterIndex);
  return { chapterList, newChapterList };
};

export const getBookContent = async (bookId: number, chapterId: number) => {
  const res: string = await request.get(`/txt/${bookId}/${chapterId}.html`);
  const $ = cheerio.load(res);
  let content = $("#content").html() || '';
  // 文案处理
  content = content.replaceAll(" ", "");
  content = content.replaceAll("&nbsp;", "");
  content = content.replaceAll("\n", "");

  let sectionList = content.split("<br>");
  sectionList = sectionList.filter((section) => !!section);
  let result = "";
  sectionList.forEach((section) => {
    result += `<div>${section}</div>`;
  });
  return result;
};