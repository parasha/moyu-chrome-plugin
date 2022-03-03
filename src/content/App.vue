<template>
  <div class="moyu-reader-window">
    <div class="window-header">
      <span class="close">x</span>
    </div>
    <ContentPage v-if="pageType === PageType.Content" />
  </div>
</template>

<script>
import { PageType } from "@/definitions/content";
import useStore from "./store";
import { computed, provide } from "vue";

import ContentPage from "./pages/content.vue";
import ChaptersListPage from "./pages/chapters.vue";

export default {
  components: { ContentPage, ChaptersListPage },
  props: {
    initData: {
      // BookDetail: bookId & bookTitle
      type: Object,
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
    
    // 注册 content-background 事件总线
    const initMessageChannel = () => {
      // 事件注册
      port.addListener(({ type, value }) => {
        switch (type) {
          case "base-book-info":
            store.updateBookDetail(value);
            break;
        }
      });
      port.postMessage({ type: "init-book", value: initData });
    };

    initMessageChannel();
    provide('port', port);

    return {
      pageType,
      PageType,
    };
  },
};
</script>

<style lang='less' scoped>
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