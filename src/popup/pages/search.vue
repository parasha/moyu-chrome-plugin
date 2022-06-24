<template>
    <BookList class="search-list" :loading="isLoading" :list="bookList" v-slot="slotProps">
        <Button v-if="!checkBookInStorage(slotProps.id)" round plain type="primary" size="small"
            @click.prevent.stop="addBookIntoStorage(slotProps.id)">收藏</Button>
    </BookList>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from "vue";
import { useRoute } from "vue-router";
import useStore from '../store';
import BookList from '../components/list.vue';
import { Button } from "vant";
import { BookDetail, BookInfo } from '@/definitions/book';
import { searchBook } from '@/common/js/api';

const bookList = ref<Array<BookDetail | BookInfo>>([]);
const isLoading = ref(false);

const route = useRoute();

const store = useStore();
const storageBookIdList = computed(() => store.storageBookIdList);
const checkBookInStorage = (id: number) => storageBookIdList.value.indexOf(id) > -1;

// Tips: setup 内执行异步怎么搞？
// 使用 onMounted 钩子来操作异步调用
// 或者在父一级使用 suspense 包裹
await store.getStorageBooksIds();

watch(() => route.query.key, async (newValue) => {
    isLoading.value = true;
    bookList.value = await searchBook(newValue as string);
    isLoading.value = false;
}, { immediate: true });

const addBookIntoStorage = async (id: number) => {
    await store.addBookIntoStorage(id);
};
</script>


<style lang="less" scoped>
.search-list {
    max-height: 350px;
    overflow-y: scroll;
}
</style>
