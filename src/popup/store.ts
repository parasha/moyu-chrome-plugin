import { createStore } from "vuex";
import { BookInfo, BookInfoMap } from "@/definitions/book";
import { Background } from "@/definitions/background";

// @ts-ignore
const BG: Background =ENV === "development" ? window.bg : chrome.extension.getBackgroundPage();

const state: {
  loading: boolean;
  searchBookList: BookInfo[];
  currentBook: BookInfo | null;
  storageBooks: BookInfoMap;
} = {
  loading: false,
  searchBookList: [],
  currentBook: null,
  storageBooks: {},
};

const store = createStore({
  state,
  getters: {

  },
  mutations: {
    setLoading(state, isLoading: boolean) {
      state.loading = isLoading;
    },
    searchBook(state, bookList: BookInfo[]) {
      state.searchBookList = bookList;
      console.log(state.searchBookList);
    },
    selectBook(state, bookInfo: BookInfo) {
      state.currentBook = bookInfo;
      console.log(state.currentBook);
    },
    refreshStorageBook(state, booksMap: BookInfoMap) {
      state.storageBooks = booksMap;
    },
  },
  actions: {
    // 搜索书
    async searchBook(ctx, searchKey: string) {
      const { searchBook } = BG.api;
      if (!searchKey) {
        return;
      }
      const bookList = await searchBook(searchKey);
      ctx.commit("searchBook", bookList);
    },
    // 选择书，获取列表
    async selectBook(ctx, bookInfo: BookInfo) {
      const { getBookChapter } = BG.api;
      const { id } = bookInfo;
      const chapters = await getBookChapter(id);
      bookInfo.chapters = chapters;
      ctx.commit("selectBook", bookInfo);
    },
    // 获取全部书架
    async getStorageBooks(ctx){
      const bookMap = await BG.storage.getStorageBooks();
      ctx.commit("refreshStorageBook", bookMap);
    },
    // 加进书架
    async addIntoStorage(ctx, bookInfo: BookInfo) {
      const { id } = bookInfo;
      const bookMap = await BG.storage.setBookInStorage(bookInfo);
      ctx.commit("refreshStorageBook", bookMap);
    },
  },
});

export default store;
