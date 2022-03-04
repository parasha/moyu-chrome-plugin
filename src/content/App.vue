<template>
  <div class="moyu-reader-window">
    <div class="window-header">
      <span class="close">x</span>
    </div>
    <ContentPage v-if="pageType === PageType.Content" ref="content" />
  </div>
</template>

<script lang="ts">
import { PageType, BookDetail } from "@/definitions/book";
import useStore from "./store";
import { PropType, computed, provide, ref } from "vue";

import ContentPage from "./pages/content.vue";
import ChaptersListPage from "./pages/chapters.vue";

export default {
  components: { ContentPage, ChaptersListPage },
  props: {
    initData: {
      type: Object as PropType<BookDetail>,
      required: true,
    },
    port: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { port, initData } = props;

    // store 初始化
    const store = useStore();
    const pageType = computed(() => store.pageType);
    store.resetBookDetail(initData);

    // 获取 dom
    const content = ref(null);
    // 阅读区复位
    const resetContentDomScroll = () => {
      try {
        content.value.$el.scrollTo(0, 0);
      } catch {}
    };

    // 注册 content-background 消息事件
    const initMessageChannel = () => {
      // 事件注册
      port.addListener(({ type, value }) => {
        switch (type) {
          case "reset-book-info":
            store.resetBookDetail(value);
            resetContentDomScroll();
            break;
          case "update-book-info":
            store.updateBookDetail(value);
            resetContentDomScroll();
            break;
        }
      });
    };
    initMessageChannel();
    provide("port", port);

    return {
      pageType,
      PageType,
      content,
    };
  },
};
</script>

<style lang='less' scoped>
@import '@/common/less/reset.less';

.moyu-reader-window {
  width: 300px;
  height: 150px;
  background-color: rgb(253, 243, 139);
  border: 0.5px solid #f2f2f2;
  border-radius: 4px;
  box-shadow: 0 -2px 2px 0 rgba(200, 201, 204, 0.8);

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