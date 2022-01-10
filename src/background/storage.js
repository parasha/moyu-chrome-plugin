import { set, get, remove, clear } from "@/common/js/storage";

export const getStorageBooks = async () => {
  return get('books-in-storage');
};


export const setBookInStorage = async (bookInfo) => {
  const booksMap = await getStorageBooks();
  const {id} = {bookInfo};
  set('books-in-storage', {...booksMap, [id]: bookInfo});
};


// 保存当前书籍的阅读进度
export const setBooksSchedule = async (bookId, chapterInfo) => {
  const booksMap = await getStorageBooks();
  const book = booksMap[id];
  book.schedule = chapterInfo;
  saveBookInStorage('books-in-storage', booksMap);
}