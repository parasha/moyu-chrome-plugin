import { defineStore } from "pinia";
import { BookInfo, BookInfoMap } from "@/definitions/book";
import { BG } from "../constant";

const useStore = defineStore("main", {
  // state
  state: (): {
    loading: false;
    searchBookList: Array<BookInfo>;
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
      this.searchBookList = bookList;
    },
    // 选择书
    async selectBook(bookInfo: BookInfo) {
      // 要获取列表吗？
      BG.bridge.openContainer(bookInfo);
    },
    // 获取全部书架
    async getStorageBooks() {
      const bookMap = await BG.storage.getStorageBooks();
      this.storageBooks = bookMap;
    },
    // 加进书架
    async addIntoStorage(bookInfo: BookInfo) {
      const bookMap = await BG.storage.setBookInStorage(bookInfo);
      this.storageBooks = bookMap;
    },
  },
});

export default useStore;
