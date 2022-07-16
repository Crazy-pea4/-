/**
 * 解析字符串'a.b.c'的值
 */

export default function lookUp(obj, keyName) {
  if (keyName.includes(".") && keyName.length > 1) {
    let tempObj = obj;
    let resolveArr = keyName.split(".");

    for (let i = 0; i < resolveArr.length; i++) {
      tempObj = tempObj[resolveArr[i]];
    }
    return tempObj;
  }
  return obj[keyName];
}
