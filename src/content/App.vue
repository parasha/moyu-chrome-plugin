<template>
    <div id="moyu-reader-contnet-window" :class="{ 'moyu-reader-hide-window': isClose }">
        <div class="moyu-reader-window-header">
            <div class="left"></div>
            <div class="title">{{ page === 'read' ? chapterInfo.title : "" }}</div>
            <span class="close-point-button" @click="toggleContainerIsClose">
                <VanIcon :name="isClose ? 'plus' : 'minus'" size="12px" />
            </span>
        </div>
        <div class="moyu-reader-main-container">
            <ChapterPage v-if="page === 'read'" ref="chapterPage" :chapter="chapterInfo" @page="updatePage"
                @menu="toMenuPage" />
            <MenuPage v-if="page === 'menu'" ref="menuPage" :book="bookInfo" @chapter="updatePage" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inject, ref, defineProps, nextTick } from 'vue';
import { BaseMessage, ChannelType } from '@/common/js/chrome-message';
import { Chapter, BookDetail } from '@/definitions/book';
import ChapterPage from './Chapter.vue';
import MenuPage from './Menu.vue';

const props = defineProps<{ chapter: Chapter }>();

const isClose = ref(false);

const toggleContainerIsClose = () => {
    isClose.value = !isClose.value;
}

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

// message 事件监听
// sendMessage 的 sendResponse 不好使，不确定是哪里有问题
const port = inject<BaseMessage>('port');
port?.addListener(async request => {
    const { type, value } = request;
    switch (type) {
        case 'load-chapter': {
            chapterInfo.value = value;
            page.value = 'read';
            await nextTick();
            resetDomScroll(chapterPage);
            break;
        }
        case 'load-menu': {
            bookInfo.value = value;
            page.value = 'menu';
            await nextTick();
            resetDomScroll(menuPage);
            break;
        }
    }
});
const updatePage = async (chapterId: number) => {
    port?.sendMessage(ChannelType.Background, { type: 'get-chapter', value: { bookId: chapterInfo.value.bookId, chapterId } });

};
const toMenuPage = async () => {
    port?.sendMessage(ChannelType.Background, { type: 'get-menu', value: { bookId: chapterInfo.value.bookId } });
}

</script>

<style lang="less" scoped>
#moyu-reader-contnet-window {
    width: 300px;
    overflow: hidden;
    background-color: rgb(253, 243, 139);
    border: 0.5px solid #f2f2f2;
    border-radius: 4px;
    box-shadow: 0 -2px 2px 0 rgba(200, 201, 204, 0.8);

    position: fixed;
    top: calc(100vh - 200px);
    // left: calc(100vw - 350px);
    right: 20px;
    z-index: 114514;

    transition: height 0.5s linear, width 0.2s linear;


    .moyu-reader-window-header {
        padding-right: 5px;
        height: 20px;
        background-color: rgb(254, 233, 48);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            color: #666;
            font-size: 12px;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .close-point-button {
            font-size: 12px;
            line-height: 1;
            padding: 1px;
            border-radius: 50%;
            background-color: rgba(248, 248, 248, .6);
            cursor: pointer;
        }
    }
}

.moyu-reader-hide-window {
    width: 25px !important;
    height: 20px !important;
}
</style>