<template>
  <div class="login">
    <div class="login-box">
      <!-- <ul>
        <li v-for="(item, index) in menuOptions" :key="index" @click="chooseMenu(item)"
          :class="{ active: item.selected }">
          {{ item.txt }}
        </li>
      </ul> -->
      <el-tabs v-model="activeName" :stretch="true" class="login-tabs">
        <el-tab-pane v-for="(item, index) in menuOptions" :key="index" :label="item.txt" :name="item.type">
        </el-tab-pane>
      </el-tabs>
      <!-- 表单部分 -->
      <!-- 这里犯了个小错误N1 -->
      <div>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-ruleForm">
          <el-form-item prop="account">
            <label for="">账号</label>
            <el-input v-model="ruleForm.account" type="password" autocomplete="off" maxlength="11" />
          </el-form-item>
          <el-form-item prop="password">
            <label for="">密码</label>
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" minlength="6" maxlength="18" />
          </el-form-item>
          <el-form-item prop="checkPass" v-show="activeName === 'register'">
            <label for="">确认密码</label>
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" minlength="6" maxlength="18" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" class="login-btn">{{ activeName === 'login' ?
                '登录' : '注册'
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { CKPhoneNum, CKPassword } from "../../utils/verification";
// 标签页部分
const menuOptions = reactive([
  { txt: "登录", selected: true, type: "login" },
  { txt: "注册", selected: false, type: "register" },
]);
const activeName = ref("login");
// let chooseMenu = (item: any) => {
//   menuOptions.forEach((e) => {
//     e.selected = false;
//   });
//   item.selected = true;
// };

// 下面是表单验证
const ruleFormRef = ref<FormInstance>();

const checkAccount = (rule: any, value: any, callback: any) => {
  if (value === "") {
    return callback(new Error("请输入账号！"));
  } else if (CKPhoneNum(value)) {
    return callback(new Error("手机号格式不正确！"))
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码！"));
  } else if (CKPassword(value)) {
    callback(new Error("密码必须是6至18位字母数字下划线组合！"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (activeName.value === "login") {
    callback();
  } else if (value === "") {
    callback(new Error("请再次输入密码！"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不相符！"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  account: "",
  password: "",
  checkPass: "",
});

const rules = reactive({
  account: [{ validator: checkAccount, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit');
    } else {
      console.log('error');

    }
  });
};
</script>

<style lang="scss">
.login {
  height: 100%;
  background-color: skyblue;
}

.active {
  background-color: rgba(255, 255, 255, 0.5);
}

.login-box {
  // ul {
  //   text-align: center;

  //   li {
  //     display: inline-block;
  //     width: 88px;
  //     line-height: 36px;
  //     color: white;
  //     cursor: pointer;
  //   }
  // }
  .login-tabs {
    margin: 0 auto;
    width: 340px;
  }

  .login-ruleForm {
    margin: 20px auto;
    width: 340px;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
