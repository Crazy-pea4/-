function CKPhoneNum(value: string) {
  // 手机号验证
  const reg = /^1[345789]\d{9}$/;
  return !reg.test(value);
}

function CKPassword(value: string) {
  const reg = /^\w{6,18}$/; // 验证密码 6至18位字母+数字
  return !reg.test(value);
}

export { CKPhoneNum, CKPassword };
