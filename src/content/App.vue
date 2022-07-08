<template>
    <div id="moyu-reader-contnet-window">
        <div class="window-header">
            <span class="close">-</span>
        </div>
        <ChapterPage v-if="page === 'read'" ref="chapterPage" :chapter="chapterInfo" @page="scrollPage"
            @menu="toMenuPage" />
        <MenuPage v-if="page === 'menu'" ref="menuPage" :book="bookInfo" @chapter="scrollPage" />
    </div>
</template>

<script lang="ts" setup>
import { inject, ref, defineProps, nextTick } from 'vue';
import { Chapter, BookDetail } from '@/definitions/book';
import ChapterPage from './Chapter.vue';
import MenuPage from './Menu.vue';

const props = defineProps<{ chapter: Chapter }>();

// 组件路由
const page = ref('read');
// 章节信息
const chapterInfo = ref(props.chapter);
const bookInfo = ref<BookDetail>();

// 获取 dom
// 这个类型可能不对
const chapterPage = ref<InstanceType<typeof ChapterPage>>();
const menuPage = ref<InstanceType<typeof MenuPage>>();
// 阅读区复位
const resetDomScroll = (page: any) => {
    try {
        page.value?.$el.scrollTo(0, 0);
    } catch { }
};

const port = inject<any>('port');

port.onMessage.addListener(async ({ type, value }: { type: string, value: any }) => {
    switch (type) {
        case 'show-chapter':
            chapterInfo.value = value;
            page.value = 'read';
            await nextTick();
            resetDomScroll(chapterPage);
            break;
        case 'show-menu':
            bookInfo.value = value;
            page.value = 'menu';
            await nextTick();
            resetDomScroll(menuPage);
            break;
    }
});

const scrollPage = (chapterId: number) => {
    port.postMessage({ type: 'get-chapter', value: { bookId: chapterInfo.value.bookId, chapterId } });
};

const toMenuPage = () => {
    port.postMessage({ type: 'get-menu', value: { bookId: chapterInfo.value.bookId } });
}

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
            font-size: 12px;
            line-height: 1;
            padding: 0 4px;
            border-radius: 50%;
            background-color: rgba(248, 248, 248, .6);
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>