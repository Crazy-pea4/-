import MD5 from "md5";
import { ref } from "vue";

function md5(value: string) {
  return ref(MD5(value)).value;
}

export default md5;
