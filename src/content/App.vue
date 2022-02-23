<template>
  <div class="test">ceshi</div>
</template>

<script>
export default {
  props: {
    bookInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log("content app:", props, props.bookInfo);
  },
};
</script>

<style>
.test {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
}
</style>