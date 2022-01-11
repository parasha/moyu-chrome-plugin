import { getBookContent, getBookChapter, searchBook } from "./api";
import { getStorageBooks, setBookInStorage, setBooksSchedule } from "./storage";

const api = {
  searchBook,
  getBookChapter,
  getBookContent,
};

const storage = {
  getStorageBooks,
  setBookInStorage,
  setBooksSchedule,
};

if (ENV === "development") {
  // @ts-ignore
  window.bg = {
    api,
    storage,
  };
}
