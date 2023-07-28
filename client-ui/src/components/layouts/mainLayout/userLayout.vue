<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "userLayout",
  components: {},
  setup() {},
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
