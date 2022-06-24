<template>
    <List v-model:loading="props.loading" :finished="true" finished-text="没有更多了">
        <div v-for="book of props.list" :key="`book-list-item-${book.id}`" class="book-item">
            <div class="left noselect" @click="openBook(book)">
                <p class="book-name ellipsis">{{ book.title }}</p>
                <div class="read-schedule ellipsis">阅读进度：未读</div>
                <div class="read-schedule ellipsis">最新章节：{{ book.newChapterText }}</div>
            </div>
            <slot :id="book.id" />
        </div>
    </List>
</template>

<script lang="ts" setup>
import { List } from "vant";
import { defineProps } from "vue";
import useStore from '../store';
import { BookDetail, BookInfo } from '@/definitions/book';

const props = defineProps<{
    loading: boolean,
    list: BookDetail[]
}>()

const store = useStore();

const openBook = (book: BookDetail | BookInfo) => {
    store.bg.book.openBook(book.id, book);
}

</script>


<style lang="less" scoped>
.book-item {
    padding: 16px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f3f5;
    cursor: pointer;

    .left {
        flex: 1;

        .book-name {
            font-weight: bold;
            color: #333;
        }

        .read-schedule {
            font-size: 12px;
            color: #969799;
        }
    }

    .right {
        flex-shrink: 0;
    }
}

.ellipsis {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>