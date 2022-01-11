<template>
  <div class="book-list">
    <template v-if="list.length > 0">
      <BookItem v-for="item of list" :key="item.id" :bookInfo="item" :isInStorage="!!storageList[item.id]"/>
    </template>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Notify } from "vant";
import BookItem from "../components/search-book-item.vue";

export default {
  components: { BookItem },
  setup() {
    const store = useStore();
    const storageList = computed(() => store.state.storageBooks);
    const list = computed(() => store.state.searchBookList);

    const route = useRoute();
    const { key } = route.query;

    const init = async () => {
      if (key) {
        store.commit("setLoading", true);
        try {
          await store.dispatch("searchBook", key);
        } catch (error) {
          Notify({
            type: "danger",
            message: error.msg || "网络错误，请稍后再试。",
          });
        }
        store.commit("setLoading", false);
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
