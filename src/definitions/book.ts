
export enum PageType {
  Content = 'content',
  Chapters = 'chapters'
}

export interface BookDetail {
  // 书
  id: number,
  title: string,
  // 章节列表
  chapterList?: Array<ChapterInfo>,
  newChapterList?: Array<ChapterInfo>,
  // 最新章节名
  newChapterText?: string,
  // 章节
  chapterId?: number,
  chapterTitle?: string,
  // 正文
  content?: string,
  // 前一章，后一章
  preChapterId?: number,
  nextChapterId?: number,
}


export interface ChapterInfo {
  title: string; // 章节名
  id: number;
}