<template>
  <div class="book-item">
    <div class="left noselect" @click="openBook">
      <p class="book-name ellipsis">{{ bookInfo.bookTitle }}</p>
      <div class="read-schedule ellipsis">阅读进度：{{ lasted }}</div>
      <div class="read-schedule ellipsis">最新章节：{{ bookInfo.newChapter }}</div>
    </div>
    <span v-if="isInStorage"></span>
    <Icon
      name="add-o"
      class="right noselect"
      size="20px"
      v-else
      @click="addStorage"
    />
  </div>
</template>

<script lang="ts">
import { Icon } from "vant";
import { computed, PropType } from "vue";
import useStore from "../store/index";
import { BookDetail } from "@/definitions/book";
import { BG } from "../constant";

export default {
  components: { Icon },
  props: {
    bookInfo: {
      type: Object as PropType<BookDetail>,
      required: true,
    },
    isInStorage: Boolean,
  },
  setup(props) {
    const { bookInfo } = props;

    const store = useStore();

    const lasted = computed(() => {
      const { schedule } = bookInfo;
      return schedule ? `${schedule.title}` : "未读";
    });

    // 添加进书架
    const addStorage = () => {
      store.addIntoStorage(bookInfo);
    };

    // 打开书籍
    const openBook = () => {
      BG.bridge.openContainer(bookInfo);
    };

    return {
      lasted,
      addStorage,
      openBook,
    };
  },
};
</script>

<style scoped lang="less">
.book-item {
  padding: 16px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f3f5;
  cursor: pointer;

  .left {
    flex: 1;

    .book-name {
      font-weight: bold;
      color: #333;
    }
    .read-schedule {
      font-size: 12px;
      color: #969799;
    }
  }

  .right {
    flex-shrink: 0;
  }
}

.ellipsis {
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
