<template>
    <div class="page-home">
        <VanField class="book-search" v-model="bookname" left-icon="search" placeholder="小说名称、作者"
            @keydown="handleKeyDown" />
        <BookList class="book-list" :loading="isLoading" :list="storageBooksList" v-slot="slotProps">
            <VanButton round plain type="primary" size="small"
                @click.prevent.stop="deleteBookFromStorage(slotProps.id)">删除</VanButton>
        </BookList>
    </div>
</template>

<script lang="ts" setup>
// 这里感觉是 vant 的问题，组件使用必须带一个Van前缀
import { Field, Button } from "vant";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
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
.page-home {
    display: flex;
    flex-direction: column;

    .book-search {
        height: 44px;
        flex-shrink: 0;
        box-shadow: 0 0 4px 0 rgba(200, 201, 204, 0.8);
    }

    .book-list {
        flex: 1;
        overflow-y: scroll;
    }
}
</style>