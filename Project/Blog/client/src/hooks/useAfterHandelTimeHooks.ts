import { ref, watch } from "vue";
import type { Store } from "pinia";

export default function useAfterHandelTime(store: Store) {
  // 展示标识
  const isShow = ref(false);
  watch(
    () => store,
    () => {
      isShow.value = true;
    },
    { deep: true }
  );

  return isShow;
}
