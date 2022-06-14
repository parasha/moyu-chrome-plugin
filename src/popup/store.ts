import { defineStore } from "pinia";
import { BookDetail } from "@/definitions/book";
import { getBookDetail } from '@/common/js/api';
import { initExtension, ExtensionType } from '@/common/js/chrome-extension';


// 获取 background
const getBackground = () => {
    const extension = initExtension(ExtensionType.Popup, {});
    const bg = extension.getBackgroundPage();
    return bg;
}


const useStore = defineStore("book", {
    // state
    state: (): {
        bg: any,
        bookInfoMap: { [id: number]: BookDetail };
        storageBookIdList: number[]
    } => {
        return {
            bg: null,
            bookInfoMap: {},
            storageBookIdList: []
        };
    },

    // action
    actions: {
        async getStorageBooksIds() {
            if (!this.bg) {
                this.bg = getBackground();
            }
            const idsList = (await this.bg.storage.getStorageBooks()) as number[];
            this.storageBookIdList = idsList;
        },
        // 获取书架中的书
        async getStorageBooks() {
            await this.getStorageBooksIds();
            const promiseList = this.storageBookIdList.map(id => getBookDetail(id));
            const booksList = await Promise.all(promiseList);
            booksList.forEach(book => {
                console.log('book:', book)
                this.bookInfoMap[book.id] = book;
            })
        },
        // 添加书籍进书架
        async addBookIntoStorage(id: number) {
            if (!this.bg) {
                this.bg = getBackground();
            }
            const idsList = (await this.bg.storage.addBookIntoStorage(id)) as number[];
            this.storageBookIdList = idsList;
        },
        // 从书架中删除书籍
        async deleteBookFromStorage(id: number) {
            if (!this.bg) {
                this.bg = getBackground();
            }
            const idsList = (await this.bg.storage.deleteBookFromStorage(id)) as number[];
            this.storageBookIdList = idsList;
        }
    }
});

export default useStore;
