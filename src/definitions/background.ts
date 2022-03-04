import {BookDetail, ChapterInfo, BookInfoMap, BookScheduleMap} from './book';

export interface Api {
  searchBook: (keyword: string) => Promise<BookDetail[]>,
  getBookChapter: (bookId: number) => Promise<{ chapterList: ChapterInfo[] }>,
  getBookContent: (bookId: number, chapterId: number) => Promise<string>,
}

export interface Storage {
  getStorageBooks: () => Promise<BookInfoMap>,
  setBookInStorage: (bookInfo: BookDetail) => Promise<BookInfoMap>,
  setBooksSchedule: (bookId: number, chapterInfo: ChapterInfo) => Promise<BookScheduleMap>,
  getBooksSchedule: () => Promise<BookScheduleMap>,
} 

export interface Bridge {
  openContainer: (bookInfo: BookDetail) => void;
}

// background
export interface Background {
  api: Api,
  storage: Storage,
  bridge: Bridge
}