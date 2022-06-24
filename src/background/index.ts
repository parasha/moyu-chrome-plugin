import { getStorageBooks, addBookIntoStorage, deleteBookFromStorage } from './storage';
import BookHandle from './book-handle';
import {initExtension, ExtensionType} from '@/common/js/chrome-extension';
import {initMessageChannel, ChannelType} from '@/common/js/chrome-message';

const storage = {
    getStorageBooks, addBookIntoStorage, deleteBookFromStorage
}

const port = await initMessageChannel(ChannelType.Background);
const book = new BookHandle(port);

const extension = initExtension(ExtensionType.Background, {storage, book})