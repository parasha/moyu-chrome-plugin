
export enum PageType {
  Content = 'content',
  Chapters = 'chapters'
}

export interface BookInfo {
  // 书
  id: number,
  title: string,
  // 最新章节名
  newChapterText: string,
}

export interface BookDetail {
  // 书
  id: number,
  title: string,
  // 章节列表
  chapterList: Array<Chapter>,
  newChapterList: Array<Chapter>,
  // 最新章节名
  newChapterText: string,
  history?: Chapter
}


export interface Chapter {
  bookId: number;
  title: string; // 章节名
  id: number;
  // 正文
  content?: string,
  // 前一章，后一章
  preId?: number,
  nextId?: number,
}

export interface ReadHistory {
  [id: number]: Chapter
}
