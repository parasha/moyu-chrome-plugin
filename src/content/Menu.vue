<template>
    <ul class="moyu-reader-menu-list" v-if="props.book">
        <li v-for="chapter of props.book.chapterList" :key="`book-${props.book.id}-chapter-${chapter.id}`" @click="openChapter(chapter.id)">
            {{ chapter.title }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { BookDetail } from '@/definitions/book';

const props = defineProps<{ book: BookDetail }>();

const emit = defineEmits<{
    (e: 'chapter', chapterId: number): void
}>();

const openChapter = (chapterId: number) => {
    emit('chapter', chapterId);
}

</script>

<style lang="less" scoped>
.moyu-reader-menu-list {
  height: 130px;
  padding: 5px;
  box-sizing: content-box;
  overflow-y: auto;

  li {
    padding: 4px 8px;
    cursor: pointer;
  }
}
</style>
