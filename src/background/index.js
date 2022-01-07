import { getBookContent, getBookChapter, searchBook } from "./api";

// search('神话版三国');
// getChapter('txt/595/index.html');
// getContent(595, '408974.html');

const api = {
  book: {
    searchBook,
    getBookChapter,
    getBookContent,
  },
};

if (ENV === "development") {
  window.bg = {
    api,
  };
}
