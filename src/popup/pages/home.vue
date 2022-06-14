<template>
    <div class="page-home">
        <Field class="book-search" v-model="bookname" left-icon="search" placeholder="小说名称、作者"
            @keydown="handleKeyDown" />
        <BookList :loading="isLoading" :list="storageBooksList" v-slot="slotProps">
            <Button round plain type="primary" size="small"
                @click="deleteBookFromStorage(slotProps.id)">删除</Button>
        </BookList>
    </div>
</template>

<script lang="ts" setup>
import { Field, Button } from "vant";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BookList from '../components/list.vue';
import useStore from '../store';

const isLoading = ref(false);

// 更新书架列表
const store = useStore();
isLoading.value = true;
await store.getStorageBooks();
isLoading.value = false;
const storageBooksList = computed(() => {
    const idList = store.storageBookIdList;
    const booksInfo = store.bookInfoMap;
    return idList.map(id => booksInfo[id]);
});

// 从书架中移除
const deleteBookFromStorage = async (id: number) => {
    isLoading.value = true;
    await store.deleteBookFromStorage(id);
    isLoading.value = false;
}

//搜索
const router = useRouter();
const bookname = ref("");
const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
        router.push(`/search?key=${bookname.value}`);
    }
};
</script>


<style lang="less" scoped>
.book-search {
    flex-shrink: 0;
    box-shadow: 0 0 4px 0 rgba(200, 201, 204, 0.8);
}
</style>