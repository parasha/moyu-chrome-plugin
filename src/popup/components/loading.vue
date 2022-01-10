<template>
  <Overlay :show="loading" z-index='114514'>
    <div class="overlay-container">
      <Loading type="spinner" />
    </div>
  </Overlay>
</template>

<script>
import { computed } from "vue";
import { Overlay, Loading } from "vant";
import { useStore } from "vuex";
export default {
  components: { Overlay, Loading },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);

    return {
      loading,
    };
  },
};
</script>

<style scoped>
.overlay-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
