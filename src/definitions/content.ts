export enum PageType {
    Content = 'content',
    Chapters = 'chapters'
}

export interface BookDetail {
    // 书
    bookId: number,
    bookTitle: string,
    // 章节
    chapterId?: number,
    chapterTitle?: string,
    // 正文
    content?: string,
    // 前一章，后一章
    preChapterId?: number,
    nextChapterId?: number,
}