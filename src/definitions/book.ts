
export enum PageType {
  Content = 'content',
  Chapters = 'chapters'
}

export interface BookDetail {
  // 书
  bookId: number,
  bookTitle: string,
  // 章节列表
  chapterList?: Array<ChapterInfo>,
  newChapterList?: Array<ChapterInfo>,
  // 最新章节名
  newChapter?: string, 
  // 章节
  chapterId?: number,
  chapterTitle?: string,
  // 正文
  content?: string,
  // 前一章，后一章
  preChapterId?: number,
  nextChapterId?: number,
  // 阅读进度
  schedule?: ChapterInfo,
}

export interface BookInfoMap {
  [id: string | number]: BookDetail;
}

export interface ChapterInfo {
  title: string; // 章节名
  id: number;
}
