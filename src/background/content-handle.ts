import { ChapterInfo, BookDetail } from '@/definitions/book';
import { initMessageChannel, ChannelType } from '@/common/js/message';
import { getStorageBooks } from './storage';
import { getBookChapter, getBookContent } from './api';


const getDefaultContentOfBook = async (bookId: number, chapterList: Array<ChapterInfo>) => {
  // 阅读进度功能还未实装，先不管
  const { id: chapterId, title: chapterTitle } = chapterList[0];
  const content = await getBookContent(bookId, chapterId);

  return content;
}

// message 初始化
const initChannelBetweenContentWithBackground = async () => {
  // let bookBaseInfo = {};

  const port = await initMessageChannel(ChannelType.Background);

  // 事件注册
  port.addListener(async ({ type, value }) => {
    switch (type) {
      case 'init-book':
        const { bookId, bookTitle } = value;
        const { chapterList, newChapterList } = await getBookChapter(bookId);
        const defaultContent = await getDefaultContentOfBook(bookId, chapterList);
        port.postMessage({ type: 'base-book-info', value: { bookId, bookTitle, chapterList, newChapterList, content: defaultContent } })
        break;
    }
  });

  return port;
}


// 打开注入到页面内的弹窗
export const openContentInsertWindow = async (bookInfo: BookDetail) => {
  const {  bookId, bookTitle } = bookInfo;

  const port = await initChannelBetweenContentWithBackground();
  port.postMessage({ type: 'render', value: { bookId, bookTitle } });
}
