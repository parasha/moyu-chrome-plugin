import { set, get, remove, clear } from "@/common/js/storage";
import { BookInfo, ChapterInfo, BookInfoMap } from "@/definitions/book";


export const getStorageBooks = async () => {
  return await get<BookInfoMap>("books-in-storage") || {};
};

export const setBookInStorage = async (bookInfo: BookInfo) => {
  const booksMap = await getStorageBooks() || {};
  const { id } = bookInfo ;
  const newMap = { ...booksMap, [id]: bookInfo }
  await set("books-in-storage", newMap);
  return newMap;
};

// 保存当前书籍的阅读进度
export const setBooksSchedule = async (bookId: number, chapterInfo: ChapterInfo) => {
  const booksMap = await getStorageBooks() || {};
  const book = booksMap[bookId];
  book.schedule = chapterInfo;
  await set("books-in-storage", booksMap);
  return booksMap;
};
