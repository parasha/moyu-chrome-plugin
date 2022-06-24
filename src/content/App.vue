<template>
    <div id="moyu-reader-contnet-window">
        <div class="window-header">
            <span class="close">x</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {inject} from 'vue';
const port = inject('port');

console.log('port:', port)
</script>

<style lang="less" scoped>
#moyu-reader-contnet-window {
    width: 300px;
    height: 150px;
    background-color: rgb(253, 243, 139);
    border: 0.5px solid #f2f2f2;
    border-radius: 4px;
    box-shadow: 0 -2px 2px 0 rgba(200, 201, 204, 0.8);

    position: fixed;
    bottom: 30px;
    right: 20px;

    .window-header {
        padding-left: 5px;
        height: 20px;
        background-color: rgb(254, 233, 48);

        .close {
            cursor: pointer;
        }
    }
}
</style>