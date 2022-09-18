<template>
  <div class="login">
    <div class="login-box">
      <el-tabs v-model="activeName" :stretch="true" class="login-tabs">
        <el-tab-pane v-for="(item, index) in menuOptions" :key="index" :label="item.txt" :name="item.type">
        </el-tab-pane>
      </el-tabs>
      <!-- 表单部分 -->
      <!-- 这里犯了个小错误：N1 -->s
      <div>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-ruleForm">
          <el-form-item prop="account">
            <label for="">账号</label>
            <el-input v-model="ruleForm.account" type="text" autocomplete="off" maxlength="11" />
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
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from "element-plus";
import { CKPhoneNum, CKPassword } from "../../utils/verification";
import link from "../../api/link";
import { success, error } from "../../utils/elMessage";
import md5 from "../../utils/pwdMD5";

// 这里犯了个错误 N2
const router = useRouter();
const route = useRoute();

// 标签页部分
const menuOptions = reactive([
  { txt: "登录", selected: true, type: "login" },
  { txt: "注册", selected: false, type: "register" },
]);
let activeName = ref("login");

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
  let data = {
    account: ruleForm.account,
    password: md5(ruleForm.password),
  };
  formEl.validate((valid) => {
    if (valid) {
      if (activeName.value === "login") {
        link("/users", "get", {}, data).then((res: any) => {
          // console.log(res);
          if (res.data.length != 0) {
            router.push({ name: 'home' })
          } else {
            error('账号或密码有误！');
          }
        })
      } else {
        link("/users", "post", data).then((res) => {
          // console.log(res);
          success('注册成功');
          activeName.value = "login";
          ruleForm.account = '';
          ruleForm.password = ''
          ruleForm.checkPass = '';
        });
      }
    } else {
      error('请输入正确信息！');
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
