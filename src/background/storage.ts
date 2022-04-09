import { set, get, remove, clear } from "@/common/js/storage";
import { BookDetail, ChapterInfo, BookInfoMap, BookScheduleMap } from "@/definitions/book";


export const getStorageBooks = async () => {
  return await get<BookInfoMap>("books-in-storage") || {};
};

export const setBookInStorage = async (bookInfo: BookDetail) => {
  const booksMap = await getStorageBooks() || {};
  const { bookId } = bookInfo;
  const newMap = { ...booksMap, [bookId]: bookInfo };
  await set("books-in-storage", newMap);
  return newMap;
};


export const getBooksSchedule = async () => {
  return await get<BookScheduleMap>("books-read-schedule") || {};
}

// 保存当前书籍的阅读进度
export const setBooksSchedule = async (bookId: number, chapterInfo: ChapterInfo) => {
  const bookScheduleMap = await getBooksSchedule() || {};
  const newbookScheduleMap = {...bookScheduleMap, [bookId]: chapterInfo}
  await set("books-read-schedule", newbookScheduleMap);
  return newbookScheduleMap;
};
