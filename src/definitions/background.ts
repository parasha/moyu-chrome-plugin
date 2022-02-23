import {BookInfo, ChapterInfo, BookInfoMap} from './book';

export interface Api {
  searchBook: (keyword: string) => Promise<BookInfo[]>,
  getBookChapter: (bookId: number) => Promise<{ chapterList: ChapterInfo[] }>,
  getBookContent: (bookId: number, chapterId: number) => Promise<string>,
}

export interface Storage {
  getStorageBooks: () => Promise<BookInfoMap>,
  setBookInStorage: (bookInfo: BookInfo) => Promise<BookInfoMap>,
  setBooksSchedule: (bookId: number, chapterInfo: ChapterInfo) => Promise<BookInfoMap>,
} 

export interface Bridge {
  openContainer: (bookInfo: BookInfo) => void;
}

// background
export interface Background {
  api: Api,
  storage: Storage,
  bridge: Bridge
}