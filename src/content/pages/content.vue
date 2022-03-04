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
    // 上一章和下一章
    const chapters = computed(() => {
      const {chapterList, chapterId} = store.bookDetail;
      if(!chapterId || !chapterList || chapterList.length === 0){
        return []
      }
      const index = chapterList.findIndex(item => item.id === chapterId);
      const lastChapter = index - 1 < 0 ? null : chapterList[index - 1], nextChapter = index + 1 >= chapterList.length ? null : chapterList[index + 1];
      console.log(index, chapterList.length, lastChapter, nextChapter);
      return [lastChapter, nextChapter];
    })
    console.log('book detail:', bookDetail);
    return {
      bookDetail,
      chapters,
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