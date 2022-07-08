<template>
  <div class="login">
    <div class="login-box">
      <ul>
        <li
          v-for="(item, index) in menuOptions"
          :key="index"
          @click="chooseMenu(item)"
          :class="{active: item.selected}"
        >
          {{ item.txt }}
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const menuOptions = reactive([
  { txt: "登录", selected: true, type: "login" },
  { txt: "注册", selected: false, type: "login" },
]);

let chooseMenu = (item: any) => {
  menuOptions.forEach((e) => {
    e.selected = false;
  });
  item.selected = true;
};
</script>

<style lang="scss">
.login {
  height: 100%;
  background-color: skyblue;
}
.active {
  background-color: rgba(255, 255, 255, 0.5)
}
.login-box {
  ul {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>