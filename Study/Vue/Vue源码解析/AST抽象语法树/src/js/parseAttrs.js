export default function parseAttrs(attrs) {
  const result = [{}];
  if (attrs) {
    attrs = attrs.trim();
    console.log(attrs);
    const arr = attrs.split('"');
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        arr[i] = arr[i].trim();
        // 双数代表属性名
        if (i % 2 === 0) {
          // 删掉属性名最后面的 =
          arr[i] = arr[i].slice(0, -1);
          result[result.length - 1].name = arr[i];
          console.log(arr[i]);
        } else {
          // 单数代表属性值
          result[result.length - 1].value = arr[i];
          console.log(arr[i]);
          result.push({});
        }
      }
    }
    // 最后再移除掉多出来的一个空对象 {}
    result.splice(result.length - 1, 1);
    return result;
  } else return [];
  // return [{ name, value }];
}
