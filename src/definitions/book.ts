export interface BookInfo {
  title: string; // 书名
  id: number;
  newChapter?: string; // 最新章节名
  chapters?: ChapterInfo[]; // 章节列表
  // 待开发
  schedule?: {
    // 阅读进度
    title: string; // 标题
    id: number;
  };
}

export interface BookInfoMap {
  [id: string | number]: BookInfo;
}

export interface ChapterInfo {
  title: string; // 章节名
  id: number;
}
