import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

export function success(msg: string) {
  ElMessage({
    message: msg,
    type: "success",
  });
}

export function error(msg: string) {
  ElMessage({
    message: msg,
    type: "error",
  });
}
