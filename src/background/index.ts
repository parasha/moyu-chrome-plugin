import BookHandle from './book-handle';
import {initMessageChannel} from '@/common/js/chrome-message';

const port = await initMessageChannel();

const book = new BookHandle(port);
