import { ChapterInfo, BookInfo } from '@/definitions/book';
import { BookDetail } from '@/definitions/content';
import { getStorageBooks } from './storage';
import { getBookChapter, getBookContent } from './api';


const initChannelBetweenContentWithBackground = () => {
  console.log('注册 message 通信');

  let bookBaseInfo = {};

  if (ENV === "development") {
    // 
    window.chromeEvent.on('get-book-base-info', async (bookId: Number) => {
      // 
    })
  }else{

  }
}


// 打开注入到页面内的弹窗
export const openContentInsertWindow = (bookInfo: BookInfo) => {
  const { id: bookId, title: bookTitle } = bookInfo;

  initChannelBetweenContentWithBackground();

  if (ENV === "development") {
    window.chromeEvent.emit('content-render', { bookId, bookTitle });
  }else{

  }
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