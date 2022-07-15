import { defineStore } from "pinia";
import { BookDetail } from "@/definitions/book";
import { getBookDetail } from '@/common/js/api';
import {getStorageBooks, getReadHistoryById, addBookIntoStorage, deleteBookFromStorage} from '@/common/js/book-storage';


const useStore = defineStore("book", {
    // state
    state: (): {
        bookInfoMap: { [id: number]: BookDetail };
        storageBookIdList: number[]
    } => {
        return {
            bookInfoMap: {},
            storageBookIdList: []
        };
    },

    // action
    actions: {
        async getStorageBooksIds() {
            const idsList = await getStorageBooks();
            this.storageBookIdList = idsList;
        },
        // 获取书架中的书
        async getStorageBooks() {
            await this.getStorageBooksIds();
            const promiseList = this.storageBookIdList.map(id => getBookDetail(id));
            const booksList = await Promise.all(promiseList);
            booksList.forEach(async book => {
                const bookHistory = await getReadHistoryById(book.id);
                if (bookHistory) {
                    book.history = bookHistory;
                }
                this.bookInfoMap[book.id] = book;
            });
        },
        // 添加书籍进书架
        async addBookIntoStorage(id: number) {
            const idsList = await addBookIntoStorage(id);
            this.storageBookIdList = idsList;
        },
        // 从书架中删除书籍
        async deleteBookFromStorage(id: number) {
            const idsList = await deleteBookFromStorage(id);
            this.storageBookIdList = idsList;
        }
    }
});

export default useStore;
