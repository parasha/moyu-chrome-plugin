import {ChapterInfo} from './book';

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
    // 章节
    chapterId?: number,
    chapterTitle?: string,
    // 正文
    content?: string,
    // 前一章，后一章
    preChapterId?: number,
    nextChapterId?: number,
}