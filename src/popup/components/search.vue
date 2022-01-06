<template>
  <field
    class="book-search"
    v-model="bookname"
    left-icon="search"
    placeholder="小说名称、作者"
  />
</template>

<script>
import { ref } from "vue";
import { Field } from "vant";
export default {
  components: { Field },
  setup() {
    const bookname = ref("");

    return {
      bookname,
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
