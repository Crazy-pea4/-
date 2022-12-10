import { message } from "ant-design-vue";

export function success(msg?: string, delay?: number) {
  message.success(msg, delay);
}
export function warning(msg?: string, delay?: number) {
  message.warning(msg, delay);
}
export function error(msg?: string, delay?: number) {
  message.error(msg, delay);
}
