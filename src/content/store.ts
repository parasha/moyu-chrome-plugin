import { PageType, BookDetail } from '@/definitions/book';
import { defineStore } from 'pinia';


const useStore = defineStore('book', {
    state: (): {
        pageType: PageType,
        bookDetail: BookDetail,
    } => {
        return {
            pageType: PageType.Content,
            bookDetail: {
                bookId: null,
                bookTitle: null,
            }
        }
    },

    actions: {
        updateBookDetail(value: BookDetail){
            this.bookDetail = { ...this.bookDetail, ...value };
        },

        resetBookDetail(value: BookDetail){
            this.bookDetail = value;
        }
    }
})

export default useStore;