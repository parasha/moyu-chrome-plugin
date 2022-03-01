<template>
  <div class="moyu-reader-window">
    <div class="window-header">
      <span class="close">x</span>
    </div>
    <ContentPage v-if="pageType === PageType.Content" />
  </div>
</template>

<script>
import { ref } from "vue";
import { PageType } from "@/definitions/content";

import ContentPage from "./pages/content.vue";
import ChaptersListPage from "./pages/chapters.vue";

export default {
  components: { ContentPage, ChaptersListPage },
  props: {
    bookDetail: {
      type: Object,
      required: true,
    },
    pageType: {
      type: String,
      default: PageType.Content,
    },
    port: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log("content app:", props);
    const { port, bookDetail } = props;

    // 注册 content-background 事件总线
    const initMessageChannel = () => {
      // 事件注册
      console.log('事件注册：', port);
      port.addListener(({ type, value }) => {
        switch (type) {
          case "base-book-info":
            console.log("base-book-info", value);
            break;
          default:
            console.log("vue listener:", type, value);
        }
      });
      port.postMessage({ type: "init-book", value: bookDetail });
    };

    initMessageChannel();

    return {
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