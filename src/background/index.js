import { getBookContent, getBookChapter, searchBook } from "./api";
import { getStorageBooks, setBookInStorage, setBooksSchedule } from "./storage";

const api = {
  book: {
    searchBook,
    getBookChapter,
    getBookContent,
  },
};

const storage = {
  book: {
    getStorageBooks,
    setBookInStorage,
    setBooksSchedule,
  },
};

if (ENV === "development") {
  window.bg = {
    api,
    storage,
  };
}
