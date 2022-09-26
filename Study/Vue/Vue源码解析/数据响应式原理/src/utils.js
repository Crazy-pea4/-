/**
 * 将传进来的key添加到obj身上，不可枚举
 */
export const def = function (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true,
  });
};
