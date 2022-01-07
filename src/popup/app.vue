<template>
  <div id="moyu-chrome-plugin-popup">
    <Search />
    <div class="child-container">
      <router-view />
    </div>
    <Loading />
  </div>
</template>

<script>
import Search from "./components/search.vue";
import Loading from "./components/loading.vue";

export default {
  components: { Search, Loading },
};
</script>

<style lang="less" scoped>
#moyu-chrome-plugin-popup {
  width: 200px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid #fefefe;

  > div {
    width: 100%;
  }

  .child-container {
    flex: 1;
    overflow: scroll;
  }
}
</style>
