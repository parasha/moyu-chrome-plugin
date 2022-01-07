<template>
  <div class="book-item">
    <p class="book-name">{{bookInfo.title}}</p>
    <div class="read-schedule">{{bookInfo.lasted || '未读'}}</div>
  </div>
</template>

<script>
export default {
  props: {
    bookInfo: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style>

</style>