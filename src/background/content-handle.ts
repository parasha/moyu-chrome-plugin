import { ChapterInfo, BookInfo } from '@/definitions/book';
import { BookDetail } from '@/definitions/content';
import { initMessageChannel, ChannelType } from '@/common/js/message';
import { getStorageBooks } from './storage';
import { getBookChapter, getBookContent } from './api';

const initChannelBetweenContentWithBackground = async () => {
  // let bookBaseInfo = {};

  const port = await initMessageChannel(ChannelType.Background);

  // 事件注册
  port.addListener(async ({ type, value }) => {
    switch (type) {
      case 'init-book':
        const { bookId, bookTitle } = value;
        const chapterInfo = await getBookChapter(bookId);
        port.postMessage({ type: 'base-book-info', value: { bookId, bookTitle, ...chapterInfo } })
        break;
      default:
        console.log('background listener:', type, value);
    }
  });

  return port;
}


// 打开注入到页面内的弹窗
export const openContentInsertWindow = async (bookInfo: BookInfo) => {
  const { id: bookId, title: bookTitle } = bookInfo;

  const port = await initChannelBetweenContentWithBackground();
  port.postMessage({ type: 'render', value: { bookId, bookTitle } });
}


// 获取当前阅读进度的页面内容
const openCurrentContentPage = async (bookInfo: BookInfo) => {
  const { id: bookId, title: bookTitle } = bookInfo;
  const localData = await getStorageBooks();
  const history = localData[bookId];
  console.log('历史记录：', history);

  let chapterId, chapterTitle;
  // 阅读记录还没实装
  if (false) {

  } else {
    const { chapterList } = await getBookChapter(bookId);
    const { id, title } = chapterList[0];
    chapterId = id;
    chapterTitle = title;
  }
  const content = await getBookContent(bookId, chapterId);


  if (ENV === "development") {
    window.chromeEvent.emit('content-render', { content, chapterTitle, chapterId, bookId, bookTitle });
  } else {

  }
};

const openContentPageByChapter = async (bookId: number, chapterInfo: ChapterInfo) => {
  const { id: chapterId, title } = chapterInfo;

  const content = await getBookContent(bookId, chapterId);

  if (ENV === "development") {
    window.chromeEvent.emit('content-render', { content, chapterTitle: title, chapterId, bookId });
  } else {

  }
}

const openBookChapterPage = async (bookId: number) => {
  const { chapterList } = await getBookChapter(bookId);
  console.log('章节列表：', chapterList);
}