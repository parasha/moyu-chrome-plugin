<template>
  <div id="moyu-chrome-plugin-popup">
    <search />
    <div class="child-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Search from "./components/search.vue";

export default {
  components: { Search },
};
</script>

<style lang='less' scoped>
#moyu-chrome-plugin-popup {
  width: 320px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #fefefe;

  >div{
    width: 100%;
  }

  .child-container{
    flex: 1;
    overflow: scroll;
  }
}
</style>
