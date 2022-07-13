import { defineStore } from "pinia";
import { BookDetail, BookInfoMap } from "@/definitions/book";
import { BG } from "../constant";

const useStore = defineStore("main", {
  // state
  state: (): {
    loading: false;
    searchBookList: Array<BookDetail>;
    storageBooks: BookInfoMap;
  } => {
    return {
      loading: false,
      searchBookList: [],
      storageBooks: {},
    };
  },

  // action
  actions: {
    // 搜索书
    async searchBook(searchKey: string) {
      const { searchBook } = BG.api;
      if (!searchKey) {
        return;
      }
      const bookList = await searchBook(searchKey);
      const bookSchedulrMap = await BG.storage.getBooksSchedule();
      bookList.forEach(book => {
        const { bookId } = book;
        const schedule = bookSchedulrMap[bookId];
        if (schedule) {
          book.schedule = schedule;
        }
      })
      this.searchBookList = bookList;
    },
    // 选择书
    async selectBook(bookInfo: BookDetail) {
      // 通过 background 去操作 content
      BG.bridge.openContainer(bookInfo);
    },
    // 获取全部书架
    async getStorageBooks() {
      const bookMap = await BG.storage.getStorageBooks();
      const bookSchedulrMap = await BG.storage.getBooksSchedule();
      // 
      const booksKeys = Object.keys(bookMap);
      booksKeys.forEach(key => {
        const schedule = bookSchedulrMap[key];
        if (schedule) {
          bookMap[key].schedule = schedule;
        }
      })
      this.storageBooks = bookMap;
    },
    // 加进书架
    async addIntoStorage(bookInfo: BookDetail) {
      const bookMap = await BG.storage.setBookInStorage(bookInfo);
      this.storageBooks = bookMap;
    },
  },
});

export default useStore;
