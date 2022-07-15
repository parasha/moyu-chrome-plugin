<template>
    <div id="moyu-chrome-plugin-popup">
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
// import {Tabbar, TabbarItem} from 'vant';
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
}
</style>