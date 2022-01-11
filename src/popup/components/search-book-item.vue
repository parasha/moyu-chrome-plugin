<template>
  <div class="book-item">
    <div class="left">
      <p class="book-name ellipsis">{{ bookInfo.title }}</p>
      <div class="read-schedule ellipsis">阅读进度：{{ lasted }}</div>
    </div>
    <span v-if="isInStorage"></span>
    <Icon name="add-o" class="right" size="20px" v-else @click="addStorage"/>
  </div>
</template>

<script lang="ts">
import { Icon } from "vant";
import { computed, PropType } from "vue";
import { useStore } from 'vuex';
import { BookInfo } from "@/definitions/book";

export default {
  components: { Icon },
  props: {
    bookInfo: {
      type: Object as PropType<BookInfo>,
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

    const addStorage = () => {
      store.dispatch('addIntoStorage', bookInfo);
    }

    return {
      lasted,
      addStorage,
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
</style>
