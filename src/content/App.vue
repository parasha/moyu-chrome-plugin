<template>
  <div class="moyu-reader-window">
    <div class="window-header">
      <span class="close">x</span>
    </div>
    <ContentPage v-if="pageType === PageType.Content" :bookInfo="bookInfo"/>
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
    bookInfo: {
      type: Object,
      required: true,
    },
    pageType: {
      type: String,
      default: PageType.Content,
    },
  },
  setup(props) {
    const pageType = ref("content");
    console.log("content app:", props, props.bookInfo);

    return {
      PageType,
      pageType,
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

    .close{
      cursor: pointer;
    }
  }
}
</style>