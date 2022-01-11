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

const bridge = {
  openContainer: (book) => {
    console.log('open container', book);
  }
}

if (ENV === "development") {
  // @ts-ignore
  window.bg = {
    api,
    storage,
    bridge,
  };
}
