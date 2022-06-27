import { BookDetail, BookInfo } from '@/definitions/book';
import { getBookDetail, getBookContent } from '@/common/js/api';


class BookHandle {
    public port: any;

    constructor(port: any) {
        this.port = port;
    }
    // 这个是给 popup 直接调用的
    async openBook(id: number, book: BookDetail | BookInfo) {
        if (!book.hasOwnProperty('chapterList')) {
            book = await getBookDetail(id);
        }
        // TODO: 获取当前阅读进度
        const chapter = await getBookContent(id, (book as BookDetail).chapterList[0].id);
        this.port.postMessage({ type: 'open-book', value: chapter });
    }

    async loadChapterInfo(boodId: number, chapterId: number) {
        // TODO: 保存当前阅读进度
        const chapter = await getBookContent(boodId, chapterId);
        return chapter;
    }

    async loadBookMenu(bookId: number){
        const book = await getBookDetail(bookId);
        return book;
    }

}


export default BookHandle;