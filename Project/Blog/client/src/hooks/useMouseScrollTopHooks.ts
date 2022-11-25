import { ref, onMounted, onUnmounted } from "vue";

export default function useMouseScrollTop() {
  const flag = ref(false);
  function update(e: any) {
    if (e.wheelDeltaY < 0) {
      flag.value = true;
    } else {
      flag.value = false;
    }
  }
  onMounted(() => {
    document.addEventListener("wheel", update);
  });
  onUnmounted(() => {
    document.removeEventListener("wheel", update);
  });

  return flag;
}
