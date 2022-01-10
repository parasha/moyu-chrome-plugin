<template>
  <div class="book-list">
    <template v-if="list.length > 0">
      <book-item v-for="item of list" :key="item.id" :bookInfo="item" />
    </template>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import BookItem from "../components/search-book-item.vue";

export default {
  components: { BookItem },
  setup() {
    const store = useStore();
    const list = computed(
      () =>  [{ title: "术师手册" }]
    );

    return {
      list,
    };
  },
};
</script>

<style></style>
