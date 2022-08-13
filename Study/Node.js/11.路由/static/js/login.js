let loginBtn = document.querySelector(".login");
let username = document.querySelector(".usernameInp");
let password = document.querySelector(".paswordInp");

loginBtn.onclick = () => {
  // console.log(username.value, password.value);
  fetch(`/api/login`, {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
