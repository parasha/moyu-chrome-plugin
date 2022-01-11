import cheerio from "cheerio";
import { createRequest } from "@/common/js/request";
import { BookInfo, ChapterInfo } from "@/definitions/book";

// 这里主要处理请求
const request = createRequest(BIQUGE_DOMAIN, {
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
    const dom = $(bookDom).find(".bookname a");
    const title = dom.text();
    const url = dom.attr().href;
    result.push({
      title,
      id: Number(url.match(bookIdReg)[1]),
    });
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
    chapterList.push({
      title,
      id: Number(url.match(chapterIdReg)[1]),
    });
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
  chapterList = chapterList.splice(firstChapterIndex);
  return chapterList;
};

export const getBookContent = async (bookId: number, chapterId: number) => {
  const res: string = await request.get(`/txt/${bookId}/${chapterId}.html`);
  const $ = cheerio.load(res);
  let content = $("#content").html();
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
