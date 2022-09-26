export default function (
  phone,
  secureCode,
  password,
  passwordCheck,
  agreement
) {
  if (phone && secureCode && phone !== "") {
    if (password === passwordCheck) {
      if (agreement === true) {
        return Promise.resolve();
      } else {
        return Promise.reject("请勾选同意协议");
      }
    } else {
      return Promise.reject("两次密码不一样");
    }
  } else {
    return Promise.reject("请输入完整信息");
  }
}
