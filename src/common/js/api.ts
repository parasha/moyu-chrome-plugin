import * as cheerio from "cheerio";
import { createRequest } from "./request";
import { BookInfo, BookDetail, Chapter } from "@/definitions/book";
import {API_DOMAIN} from './constant';

// 这里主要处理请求
const request = createRequest(API_DOMAIN, {
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
  const result: BookInfo[] = [];
  $(".bookbox .bookinfo").each((index, bookDom) => {
    const tagA = $(bookDom).find(".bookname a");
    const bookTitle = tagA.text();
    const url = tagA.attr().href;
    const updateDom = $(bookDom).find(".update a");
    const newChapterText = updateDom.text();
    // 从 url 中获取数据
    const bookId = url.match(bookIdReg);
    if (bookId) {
      result.push({
        title: bookTitle,
        id: Number(bookId[1]),
        newChapterText,
      });
    }
  });
  return result;
};

const chapterIdReg = /([0-9]+)\.html/;

/**
 * 书籍详情
 */
export const getBookDetail = async (bookId: number): Promise<BookDetail> => {
  const res: string = await request.get(`/txt/${bookId}/index.html`);
  const $ = cheerio.load(res);
  const title = $('.info').find('h2').text();
  let chapterList: Chapter[] = [];
  $(".listmain dd").each((index, chapterDom) => {
    const dom = $(chapterDom).find("a");
    const title = dom.text();
    const url = dom.attr().href;
    // 从 url 中获取数据
    const chapterId = url.match(chapterIdReg);
    if (chapterId) {
      chapterList.push({
        title,
        id: Number(chapterId[1]),
        bookId,
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
  return { id: bookId, title, chapterList, newChapterList, newChapterText: newChapterList[0].title };
};

export const getBookContent = async (bookId: number, chapterId: number): Promise<Chapter> => {
  const res: string = await request.get(`/txt/${bookId}/${chapterId}.html`);
  const $ = cheerio.load(res);
  const title = $('.content').find('h1').text();
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
  // 上下章节
  const chapters = $('.page_chapter ul').find('li');
  const preChapter = chapters.first().find('a').attr().href.match(chapterIdReg),
    nextChapter = chapters.last().find('a').attr().href.match(chapterIdReg);
  return {
    bookId: bookId,
    title, // 章节名
    id: chapterId,
    // 正文
    content: result,
    // 前一章，后一章
    preId: preChapter ? Number(preChapter[1]) : undefined,
    nextId: nextChapter ? Number(nextChapter[1]) : undefined,
  }
};
