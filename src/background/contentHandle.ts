import { ChapterInfo, BookInfo } from '@/definitions/book';
import { getStorageBooks } from './storage';
import { getBookChapter, getBookContent } from './api';


// 获取当前阅读进度的页面内容
export const openCurrentContentPage = async (bookInfo: BookInfo) => {
  const {id: bookId, title: bookTitle} = bookInfo;
  const localData = await getStorageBooks();
  const history = localData[bookId];
  console.log('历史记录：', history);

  let chapterId, chapterTitle;
  // 阅读记录还没实装
  if(false){

  }else{
    const { chapterList } = await getBookChapter(bookId);
    const {id, title} = chapterList[0];
    chapterId = id;  
    chapterTitle = title;  
  }
  const content = await getBookContent(bookId, chapterId);


  if (ENV === "development") {
    window.chromeEvent.emit('content-render', {content, chapterTitle, bookId, bookTitle });
  } else {

  }
};

export const openContentPageByChapter = async (bookId: number, chapterInfo: ChapterInfo) => {
  const { id : chapterId, title } = chapterInfo;

  const content = await getBookContent(bookId, chapterId);

  if (ENV === "development") {
    window.chromeEvent.emit('content-render', { content, chapterTitle: title, bookId });
  } else {

  }
}

export const openBookChapterPage = async (bookId: number) => {
  const { chapterList } = await getBookChapter(bookId);
  console.log('章节列表：', chapterList);
}