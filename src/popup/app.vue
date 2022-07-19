<template>
    <div id="moyu-chrome-plugin-popup">
        <VanField class="book-search" v-model="bookname" left-icon="search" placeholder="小说名称、作者"
            @keydown="handleKeyDown" />
        <suspense>
            <RouterView />
        </suspense>
        <!-- <VanTabbar route :fixed="false">
            <VanTabbarItem icon="home-o" replace to="/home" >书架</VanTabbarItem>
            <TabbarItem icon="contact" name="user" >我的</TabbarItem>
        </VanTabbar> -->
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
// 这里感觉是 vant 的问题，组件使用必须带一个Van前缀
import {Field, Tabbar, TabbarItem} from 'vant';
import {useRouter} from 'vue-router';

const router = useRouter();

//搜索
const bookname = ref("");
const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
        if (bookname.value) {
            router.replace(`/search?key=${bookname.value}`);
        } else {
            router.replace('/home');
        }
    }
};
</script>


<style lang="less" scoped>
#moyu-chrome-plugin-popup {
    width: 300px;

    .book-search {
        height: 44px;
        flex-shrink: 0;
        box-shadow: 0 0 4px 0 rgba(200, 201, 204, 0.8);
    }
}
</style>