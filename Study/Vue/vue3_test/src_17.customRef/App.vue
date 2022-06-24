<template>
  <div class="con">
    <input type="text" v-model="keyword" />
    <h2>{{ keyword }}</h2>
  </div>
</template>

<script>
import { ref, customRef } from "vue";
export default {
  name: "App",
  setup() {
    function myRef(value) {
      let timer = null;
      return customRef((track, trigger) => {
        return {
          get() {
            /*
              在数据改动后（调用set()后）trigger()通知Vue3让它重新解析一下模板
              然后在模板读取到{{ keyword }}时，跑去问get()，此时如果不写track()让get追踪一下return的值
              那么get就认为值没有改变，因此必须要在return前调用track()
            */
            track();
            return value;
          },
          set(newVal) {
            /*
              不同于defineProperty和computed中的set() get()
              他们在set中将数据改变后，get检测到自身所依赖的数据发生了改变，会自动在set后调用一次get，保障数据自动刷新
              但在customRef中，此处的get不会自动检测，必须手动通知Vue3重新解析一次模板。这就用到了customRef提供的两个参数
            */
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newVal;
              trigger();
            }, 800);
          },
        };
      });
    }

    let keyword = myRef("你好");

    return {
      keyword,
    };
  },
};
</script>

