import {BookInfo, ChapterInfo, BookInfoMap} from './book';

// background
export interface Background {
  api: {
    searchBook: (keyword: string) => Promise<BookInfo[]>,
    getBookChapter: (bookId: number) => Promise<ChapterInfo[]>,
    getBookContent: (bookId: number, chapterId: number) => Promise<string>,
  },
  storage: {
    getStorageBooks: () => Promise<BookInfoMap>,
    setBookInStorage: (bookInfo: BookInfo) => Promise<BookInfoMap>,
    setBooksSchedule: (bookId: number, chapterInfo: ChapterInfo) => Promise<BookInfoMap>,
  },
  bridge: {
    openContainer: (book: BookInfo) => void;
  }
}