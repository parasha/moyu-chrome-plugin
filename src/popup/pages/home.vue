<template>
    <BookList class="book-list" :loading="isLoading" :list="storageBooksList" v-slot="slotProps">
        <VanButton round plain type="primary" size="small" @click.prevent.stop="deleteBookFromStorage(slotProps.id)">删除
        </VanButton>
    </BookList>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { Button } from "vant";
import BookList from '../components/list.vue';
import useStore from '../store';

const isLoading = ref(false);

// 更新书架列表
const store = useStore();
const storageBooksList = computed(() => {
    const idList = store.storageBookIdList;
    const booksInfo = store.bookInfoMap;

    return idList.map(id => booksInfo[id]).filter(item => !!item);
});
const refreshBookList = async () => {
    isLoading.value = true;
    await store.getStorageBooks();
    isLoading.value = false;
}
onMounted(refreshBookList);

// 从书架中移除
const deleteBookFromStorage = async (id: number) => {
    isLoading.value = true;
    await store.deleteBookFromStorage(id);
    isLoading.value = false;
}
</script>


<style lang="less" scoped>
.book-list {
    max-height: 350px;
    overflow-y: scroll;
}
</style>