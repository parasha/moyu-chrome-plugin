<template>
    <BookList :loading="isLoading" :list="bookList" />
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import BookList from '../components/list.vue';
import {BookDetail} from '@/definitions/book';
import {searchBook} from '@/common/js/api';

const bookList = ref<BookDetail[]>([]);
const isLoading = ref(false);

const route = useRoute();

watch(() => route.query.key, async (newValue) => {
    isLoading.value = true;
    bookList.value = await searchBook(newValue as string);
    console.log('books:', bookList.value);
    isLoading.value = false;
}, {immediate: true});
</script>


<style lang="less" scoped></style>