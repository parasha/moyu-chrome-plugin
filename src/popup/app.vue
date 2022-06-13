<template>
    <div id="moyu-chrome-plugin-popup">
        <RouterView />
        <Tabbar v-model="active" :fixed="false">
            <TabbarItem icon="home-o" name="home" >首页</TabbarItem>
            <TabbarItem icon="contact" name="user" >我的</TabbarItem>
        </Tabbar>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import {Tabbar, TabbarItem} from 'vant';
import {useRouter} from 'vue-router';

const router = useRouter();

const active = ref('home')
watch(active, (newValue) => {
    router.replace({name: newValue})
});
</script>


<style lang="less" scoped>
#moyu-chrome-plugin-popup {
    width: 300px;
    height: 450px;
}
</style>