import { BookDetail, BookInfo } from '@/definitions/book';
import { getBookDetail, getBookContent } from '@/common/js/api';
import { setReadHistory, getReadHistoryById } from '@/common/js/book-storage';
import { ChannelType, BaseMessage } from '@/common/js/chrome-message';

class BookHandle {
    public port: BaseMessage;

    constructor(port: BaseMessage) {
        this.port = port;
        this.initMessageEvent();
    }

    initMessageEvent() {
        // 添加事件监听
        this.port.addListener(async ({ request, sendResponse }) => {
            console.log('background book handler:', request);
            const { type, value } = request;
            switch (type) {
                case 'select-book': {
                    const chapter = await this.openBook(value.id, value);
                    this.port.sendMessage(ChannelType.Content, { type: 'open-book', value: chapter })
                    break;
                }
                case 'get-chapter': {
                    const chapter = await getBookContent(value.bookId, value.chapterId);
                    // 保存一个阅读进度
                    setReadHistory(value.bookId, chapter);
                    console.log('before response:', chapter);
                    sendResponse(chapter);
                    break;
                }
                case 'get-menu': {
                    const bookInfo = await getBookDetail(value.bookId);
                    sendResponse(bookInfo);
                    break;
                }
            }
        });
    }

    // 这个是给 popup 调用的
    async openBook(id: number, book: BookDetail | BookInfo) {
        if (!book.hasOwnProperty('chapterList')) {
            book = await getBookDetail(id);
        }
        // 获取历史阅读进度
        const history = await getReadHistoryById(id);
        const historyChapterId = history?.id
        const chapter = await getBookContent(id, historyChapterId || (book as BookDetail).chapterList[0].id);
        return chapter;
    }
}


export default BookHandle;