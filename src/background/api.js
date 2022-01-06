import { Request } from "@/common/js/request";
import cheerio from "cheerio";

// 这里主要处理请求
const request = new Request(BIQUGE_DOMAIN, {
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const bookIdReg = /\/txt\/([0-9]+)\/index\.html/;

/**
 * 搜书
 * @param {string} bookname
 */
export const search = async (bookname) => {
  const res = await request.post(
    `/search.php?searchkey=${encodeURIComponent(bookname)}`
  );
  const $ = cheerio.load(res);
  const result = [];
  $(".bookbox .bookinfo").each((index, bookDom) => {
    const dom = $(bookDom).find(".bookname a");
    const title = dom.text();
    const url = dom.attr().href;
    result.push({
      title,
      url,
      id: url.match(bookIdReg)[1]
    });
  });
  console.log(result);
  return result;
};

const chapterIdReg = /([0-9]+)\.html/;

/**
 * 章节列表
 * @param {string} bookurl
 */
export const getChapter = async (bookurl) => {
  const res = await request.get(bookurl);
  const $ = cheerio.load(res);
  let chapterList = [];
  $(".listmain dd").each((index, chapterDom) => {
    const dom = $(chapterDom).find("a");
    const title = dom.text();
    const url = dom.attr().href;
    chapterList.push({
      title,
      url: url,
      id: url.match(chapterIdReg)[1],
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
  console.log(chapterList);
  return chapterList;
};

export const getContent = async (bookId, chapterurl) => {
  const res = await request.get(`/txt/${bookId}/${chapterurl}`);
  const $ = cheerio.load(res);
  let content = $('#content').html();
  // 文案处理
  content = content.replaceAll(' ', '');
  content = content.replaceAll('&nbsp;', '');
  content = content.replaceAll('\n', '');

  let sectionList = content.split('<br>');
  sectionList = sectionList.filter(section => !!section);
  let result = '';
  sectionList.forEach(section=>{
    result += `<div>${section}</div>`
  });
  return result;
}