<template>
  <div class="content-container">
    <div class="content" v-html="bookDetail.content"></div>
    <div class="content-handle">
      <div class="btn disabled">上一章</div>
      <div class="btn">返回目录</div>
      <div class="btn">下一章</div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from "vue";
import useStore from "../store";

export default {
  setup() {
    const port = inject('port');

    const store = useStore();
    const bookDetail = computed(() => store.bookDetail);

    return {
      bookDetail,
    };
  },
};
</script>

<style lang='less' scoped>
.content-container {
  height: 130px;
  padding: 5px;
  overflow-y: auto;

  .content {
    padding-bottom: 50px;
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