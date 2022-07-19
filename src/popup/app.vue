<template>
    <div id="moyu-chrome-plugin-popup">
        <VanField class="book-search" v-model="bookname" left-icon="search" placeholder="小说名称、作者"
            @keydown="handleKeyDown" />
        <suspense>
            <RouterView />
        </suspense>
        <!-- <Tabbar v-model="active" :fixed="false">
            <TabbarItem icon="home-o" name="home" >书架</TabbarItem>
            <TabbarItem icon="contact" name="user" >我的</TabbarItem>
        </Tabbar> -->
    </div>
</template>

<script lang="ts" setup>
import {ref, watch, provide} from 'vue';
// 这里感觉是 vant 的问题，组件使用必须带一个Van前缀
// import {Tabbar, TabbarItem} from 'vant';
import { Field } from "vant";
import {useRouter} from 'vue-router';

const router = useRouter();

// const active = ref('home')
// watch(active, (newValue) => {
//     router.replace({name: newValue})
// });

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