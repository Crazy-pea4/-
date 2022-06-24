<template>
  <div class="con">
    <button @click="show = !show">点我卸载页面</button>
    <Demo v-if="show"></Demo>
  </div>
</template>

<script>
import { ref } from "vue";
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: {
    Demo,
  },
  setup() {
    let show = ref(true);
    return {
      show
    }
  },
};
</script>

