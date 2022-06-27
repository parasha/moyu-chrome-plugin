import { getStorageBooks, addBookIntoStorage, deleteBookFromStorage } from './storage';
import BookHandle from './book-handle';
import {initExtension, ExtensionType} from '@/common/js/chrome-extension';
import {initMessageChannel, ChannelType} from '@/common/js/chrome-message';

const storage = {
    getStorageBooks, addBookIntoStorage, deleteBookFromStorage
}

const port = await initMessageChannel(ChannelType.Background);
const book = new BookHandle(port);

// 添加事件监听
port.onMessage.addListener(async ({type, value}: {type: string, value: any}) => {
    switch(type) {
        case 'get-chapter':
            const chapter = await book.loadChapterInfo(value.bookId, value.chapterId);
            port.postMessage({ type: 'show-chapter', value: chapter });
            break;
        case 'get-menu':
            const bookInfo = await book.loadBookMenu(value.bookId);
            port.postMessage({ type: 'show-menu', value: bookInfo });
            break;
    }
});

const extension = initExtension(ExtensionType.Background, {storage, book})