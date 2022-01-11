<template>
  <Field
    class="book-search"
    v-model="bookname"
    left-icon="search"
    placeholder="小说名称、作者"
    @keydown="handleKeyDown"
  />
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Field, Button, Notify } from "vant";

export default {
  components: { Field, Button },
  setup() {
    const bookname = ref("");

    const router = useRouter();

    const handleKeyDown = async (e) => {
      if (e.keyCode === 13) {
        router.push(`/search?key=${bookname.value}`);
      }
    };

    return {
      bookname,
      handleKeyDown,
    };
  },
};
</script>

<style lang="less" scoped>
.book-search {
  flex-shrink: 0;
  box-shadow: 0 0 4px 0 rgba(200, 201, 204, 0.8);
}
</style>
