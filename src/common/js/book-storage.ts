import { set, get, remove, clear } from "./chrome-storage";
import { Chapter, ReadHistory } from "@/definitions/book";

// 获取书架中的书籍列表
export const getStorageBooks = async (): Promise<number[]> => {
    return await get<number[]>("books-in-storage") || [];
};

// 添加新书进书架
export const addBookIntoStorage = async (id: number): Promise<number[]> => {
    const booksIdList = await getStorageBooks() || [];
    if (booksIdList.findIndex(bookId => bookId === id) > -1) {
        // 重复保存
        return booksIdList;
    } else {
        const newList = [...booksIdList, id];
        await set("books-in-storage", newList);
        return newList;
    }
};

// 从书架里删除书
export const deleteBookFromStorage = async (id: number): Promise<number[]> => {
    const booksIdList = await getStorageBooks() || [];
    const index = booksIdList.findIndex(bookId => bookId === id)
    if (index > -1) {
        booksIdList.splice(index, 1);
        await set("books-in-storage", booksIdList);
        return booksIdList;
    } else {
        // 无效操作
        return booksIdList;
    }
};


const getReadHistory = async () => {
    return await get<ReadHistory>("books-read-schedule") || {};
}

export const getReadHistoryById = async (id: number) => {
    const history = await getReadHistory();
    return history[id];
}

// 保存当前书籍的阅读进度
export const setReadHistory = async (bookId: number, chapterInfo: Chapter) => {
    const readHistory = await getReadHistory() || {};
    // 没必要保存正文，太占空间
    const newHistory = { ...readHistory, [bookId]: {...chapterInfo, content: ''} }
    await set("books-read-schedule", newHistory);
    return newHistory;
};
