<template>
  <div class="app">
    <h3>App组件。{{ name }}----{{ price }}</h3>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  readonly,
  isRef,
  isReactive,
  isReadonly,
  isProxy,
} from "vue";
export default {
  name: "App",
  setup() {
    let car1 = reactive({
      name: "别克",
      price: 50,
    });
    let sum = ref(0);
    let car2 = readonly(car1);

    console.log('isRef', isRef(sum));
    console.log('isReactive', isReactive(car1));
    console.log('isReadonly', isReadonly(car2));
    console.log('isProxy', isProxy(car1));
    // 值得注意的是，readonly也会返回一个Proxy
    console.log('isProxy--->readonly', isProxy(car2));

    return {
      ...toRefs(car1),
    };
  },
};
</script>

<style scoped>
.app {
  padding: 10px;
  background-color: blanchedalmond;
}
</style>