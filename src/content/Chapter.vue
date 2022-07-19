<template>
    <div class="content-container" v-if="props.chapter">
        <div class="content" v-html="props.chapter.content"></div>
        <div class="content-handle">
            <div class="btn" :class="{ disabled: !props.chapter.preId }" @click="loadChapter(props.chapter.preId)">
                上一章
            </div>
            <div class="btn" @click="loadMenu">返回目录</div>
            <div class="btn" :class="{ disabled: !props.chapter.nextId }" @click="loadChapter(props.chapter.nextId)">
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
.content-container {
    height: 130px;
    padding: 5px;
    box-sizing: content-box;
    overflow-y: auto;

    .content {
        padding: 6px 6px 50px;
    }

    .content-handle {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 5px;
        border-top: 1px solid #e5e5e5;

        .btn {
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