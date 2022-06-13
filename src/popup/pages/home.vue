<template>
    <div class="page-home">
        <Field class="book-search" v-model="bookname" left-icon="search" placeholder="小说名称、作者"
            @keydown="handleKeyDown" />
    </div>
</template>

<script lang="ts" setup>
import { Field } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const bookname = ref("");

const handleKeyDown = async (e: KeyboardEvent) => {
    console.log(e.code);
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