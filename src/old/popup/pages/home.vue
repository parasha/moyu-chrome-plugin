<template>
  <div class="book-list">
    <template v-if="storageBooks.length > 0">
      <BookItem
        v-for="item of storageBooks"
        :key="item.id"
        :bookInfo="item"
        :isInStorage="true"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
// import { useStore } from "vuex";
import useStore  from '../store/index';
import BookItem from "../components/search-book-item.vue";

export default {
  components: { BookItem },
  setup() {
    const store = useStore();
    const storageBooks = computed(() => {
      const list = [];
      const books = store.storageBooks;
      const keys = Object.keys(books);
      keys.forEach((key) => {
        list.push(books[key]);
      });
      return list;
    });

    return {
      storageBooks,
    };
  },
};
</script>

<style lang="less" scoped></style>
