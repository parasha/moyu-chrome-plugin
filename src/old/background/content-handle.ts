import { ChapterInfo, BookDetail } from '@/definitions/book';
import { initMessageChannel, ChannelType } from '@/common/js/message';
import { setBooksSchedule, getBooksSchedule } from './storage';
import { getBookChapter, getBookContent } from './api';

const getDefaultContentOfBook = async (bookId: number, chapterList: Array<ChapterInfo>) => {
  const bookScheduleMap = await getBooksSchedule();
  const schedule = bookScheduleMap[bookId];

  let content;
  if (schedule) {
    const { id: chapterId, title: chapterTitle } = schedule;
    content = await getBookContent(bookId, chapterId);
    return { chapterId, chapterTitle, content };
  } else {
    // 阅读进度功能还未实装，先不管
    const { id: chapterId, title: chapterTitle } = chapterList[0];
    content = await getBookContent(bookId, chapterId);
    return { chapterId, chapterTitle, content };
  }
}

// message 初始化
const initChannelBetweenContentWithBackground = async () => {
  // let bookBaseInfo = {};

  const port = await initMessageChannel(ChannelType.Background);

  // 事件注册
  port.addListener(async ({ type, value }) => {
    switch (type) {
      case "read":
        const { bookId, chapterId, chapterTitle } = value;
        const content = await getBookContent(bookId, chapterId);
        port.postMessage({ type: 'update-book-info', value: { bookId, chapterId, chapterTitle, content } });
        // 保存本地阅读进度
        setBooksSchedule(bookId, { id: chapterId, title: chapterTitle });
        break;
    }
  });

  return port;
}


// content 初始化
const initBookData = async (bookId, bookTitle): Promise<BookDetail> => {
  const { chapterList, newChapterList } = await getBookChapter(bookId);
  const { chapterId, chapterTitle, content } = await getDefaultContentOfBook(bookId, chapterList);
  return { bookId, bookTitle, chapterList, newChapterList, chapterId, chapterTitle, content };
}

// 打开注入到页面内的弹窗
export const openContentInsertWindow = async (bookInfo: BookDetail) => {
  const { bookId, bookTitle } = bookInfo;
  const bookDetail = await initBookData(bookId, bookTitle);
  const port = await initChannelBetweenContentWithBackground();
  port.postMessage({ type: 'render-app', value: bookDetail });
}
