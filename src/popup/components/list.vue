<template>
    <VanList v-model:loading="props.loading" :finished="true" finished-text="没有更多了">
        <div v-for="book of props.list" :key="`book-list-item-${book.id}`" class="book-item">
            <div class="left noselect" @click="openBook(book)">
                <p class="book-name ellipsis">{{ book.title }}</p>
                <div class="read-schedule ellipsis">阅读进度：{{ book.history ? book.history.title : "未读" }}</div>
                <div class="read-schedule ellipsis">最新章节：{{ book.newChapterText }}</div>
            </div>
            <div class="right">
                <slot :id="book.id" />
            </div>
        </div>
    </VanList>
</template>

<script lang="ts" setup>
import { defineProps, inject } from "vue";
import { BookDetail, BookInfo } from '@/definitions/book';
import { BaseMessage, ChannelType } from '@/common/js/chrome-message';

const props = defineProps<{
    loading: boolean,
    list: BookDetail[]
}>()

const port = inject<BaseMessage>('port');

const openBook = (book: BookDetail | BookInfo) => {
    if (port) {
        port.sendMessage(ChannelType.Background, { type: 'select-book', value: book });
    }
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
        width: 50px;
    }
}

.ellipsis {
    max-width: 200px;
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