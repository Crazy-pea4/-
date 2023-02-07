export default function clearLoginInfo() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("isValid");
}
