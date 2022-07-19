<template>
    <div class="moyu-reader-content-container" v-if="props.chapter">
        <div class="moyu-reader-chapter-content" v-html="props.chapter.content"></div>
        <div class="moyu-reader-content-handle">
            <div class="moyu-reader-content-handle-btn" :class="{ disabled: !props.chapter.preId }" @click="loadChapter(props.chapter.preId)">
                上一章
            </div>
            <div class="moyu-reader-content-handle-btn" @click="loadMenu">返回目录</div>
            <div class="moyu-reader-content-handle-btn" :class="{ disabled: !props.chapter.nextId }" @click="loadChapter(props.chapter.nextId)">
                下一章
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Chapter } from '@/definitions/book';

const props = defineProps<{ chapter: Chapter }>();

const emit = defineEmits<{
    (e: 'page', id: number): void,
    (e: 'menu'): void
}>();

const loadChapter = (id: number) => {
    if (!id) {
        return;
    }
    emit('page', id);
};

const loadMenu = () => {
    emit('menu');
}

</script>

<style lang="less" scoped>
.moyu-reader-content-container {
    height: 130px;
    padding: 5px;
    box-sizing: content-box;
    overflow-y: auto;

    .moyu-reader-chapter-content {
        padding: 6px 6px 50px;
        font-size: 13px;
        color: #666;
        word-break: break-all;
    }

    .moyu-reader-content-handle {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 5px;
        border-top: 1px solid #e5e5e5;

        .moyu-reader-content-handle-btn {
            cursor: pointer;
            margin: 0 10px;
        }

        .disabled {
            color: #b3c4d1;
            cursor: no-drop;
        }
    }
}
</style>