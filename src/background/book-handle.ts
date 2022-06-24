import { BookDetail, BookInfo } from '@/definitions/book';
import {getBookDetail, getBookContent} from '@/common/js/api';


class BookHandle {
    public port: any;

    constructor(port: any) {
        this.port = port;
    }

    async openBook(id: number, book: BookDetail | BookInfo) {
        if (!book.hasOwnProperty('chapterList')) {
            book = await getBookDetail(id);
        }
        // TODO: 获取当前阅读进度
        const chapter = await getBookContent(id, (book as BookDetail).chapterList[0].id);
        this.port.postMessage({type: 'open', value: chapter});
    }
   
}


export default BookHandle;