<template>
  <div class="book-list">
    <template v-if="list.length > 0">
      <BookItem
        v-for="item of list"
        :key="item.id"
        :bookInfo="item"
        :isInStorage="!!storageList[item.bookId]"
      />
    </template>
  </div>
</template>

<script>
import { computed } from "vue";
import useStore from "../store/index";
import { useRoute } from "vue-router";
import { Notify } from "vant";
import BookItem from "../components/search-book-item.vue";

export default {
  components: { BookItem },
  setup() {
    const store = useStore();
    const storageList = computed(() => store.storageBooks);
    const list = computed(() => store.searchBookList);

    const route = useRoute();
    const { key } = route.query;

    const init = async () => {
      if (key) {
        store.loading = true;
        try {
          await store.searchBook(key);
        } catch (error) {
          Notify({
            type: "danger",
            message: error.msg || "网络错误，请稍后再试。",
          });
        }
        store.loading = false;
      }
    };

    init();

    return {
      list,
      storageList,
    };
  },
};
</script>

<style></style>
