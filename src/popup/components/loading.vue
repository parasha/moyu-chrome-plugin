<template>
  <Overlay :show="true" z-index='114514'>
    <Loading />
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

<style></style>
