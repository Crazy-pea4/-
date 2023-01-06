/**
 *
 */

// 'yarh' instanceof String --> true

function myIntanceof(left, right) {
  if (typeof left !== "object") return false;

  if (left === null) return false;
  if (left.__proto__ === right.prototype) return true;
  else return myIntanceof(left.__proto__, right); // 因为是递归调用，不要忘记返回函数返回值
}
