let box = document.querySelector(".box");
let header = document.querySelector(".header");
let body = document.querySelector(".body");

header.onmousedown = function (e) {
  let relativeX = e.pageX - box.offsetLeft;
  let relativeY = e.pageY - box.offsetTop;
  body.innerText = "疼疼疼，不要拽了";
  window.onmousemove = function (e) {
    box.style.left = e.pageX - relativeX + "px";
    box.style.top = e.pageY - relativeY + "px";
    window.onmouseup = function () {
      window.onmousemove = null;
      window.onmouseup = null;
      body.innerText = "不要拽我的头";
    };
  };
};
