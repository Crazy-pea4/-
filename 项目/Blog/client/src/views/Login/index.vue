<template>
    <div class="loginBox h-screen flex justify-between items-center">
        <!-- 介绍语 -->
        <div class="container w-1/2 h-full flex flex-col items-end relative">
            <div class="text-8xl font-serif mt-40 2xl:mt-60 xl:mt-40">welcome</div>
            <div class="text-2xl mt-10 2xl:mt-10 xl:mt-10">博客v1.0</div>
        </div>
        <!-- 登录框 -->
        <div class="container flex flex-col justify-around w-108 h-full bg-slate-50">
            <!-- 表单 -->
            <a-form :model="formState" name="normal_login" :rules="rules" class="w-10/12 mx-auto relative"
                @finish="onFinish">
                <!-- 标题 -->
                <div class="absolute -top-24 w-full text-center right-1/2 translate-x-1/2 text-2xl">已有账号？立即登录</div>
                <!-- 账号 -->
                <a-form-item name="phoneNumber" class="relative mb-12">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500" :class="{
                        '-translate-y-2': isActSelected,
                        'text-xl': isActSelected,
                        'text-blue-400': isActSelected,
                    }">手机号：</span>
                    <a-input class="border-0 border-b-2 shadow-none" v-model:value="formState.phoneNumber" type="text"
                        @focus="actAnimation" @blur="actAnimation">
                        <template #prefix>
                            <UserOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <!-- 密码 -->
                <a-form-item name="password" class="relative">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500" :class="{
                        '-translate-y-2': isPwdSelected,
                        'text-xl': isPwdSelected,
                        'text-blue-400': isPwdSelected,
                    }">密码：</span>
                    <a-input-password class="border-0 border-b-2 shadow-none" v-model:value="formState.password"
                        @focus="pwdAnimation" @blur="pwdAnimation">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>
                <!-- 记住我 -->
                <a-form-item class="ml-2">
                    <a-checkbox v-model:checked="rememberMe">记住我</a-checkbox>
                    <span class="text-xs float-right mt-1"><a href="">忘记密码</a></span>
                </a-form-item>
                <!-- 登录和注册 -->
                <a-form-item class="ml-2">
                    <a-button type="primary" html-type="submit">
                        登录
                    </a-button>
                    Or
                    <a class="text-xs" @click="ToRegister">立即注册！</a>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { login } from "@/api/auth"
interface FormState {
    phoneNumber: string;
    password: string;
}
// 创建路由实例
const router = useRouter()

const rememberMe = ref(true)
const ToRegister = () => {
    router.replace({ name: 'Register' })
}

// 验证完成并且成功
const onFinish = (values: FormState) => {
    login(values).then(({ data }) => {
        if (rememberMe.value === true) {
            localStorage.setItem('token', data.token)
        } else localStorage.removeItem('token')
        router.push({ name: 'Home' })
    }).catch((err) => { })
};

// 账号、密码label动画
const isActSelected = ref(false)
const isPwdSelected = ref(false)
const actAnimation = () => {
    isActSelected.value = !isActSelected.value
}
const pwdAnimation = () => {
    isPwdSelected.value = !isPwdSelected.value
}

const formState = reactive<FormState>({
    phoneNumber: '',
    password: '',
});

const validatePhoneNumber = (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入手机号');
    } else {
        if (value.length !== 11) {
            return Promise.reject('手机号长度必须是11位')
        }
        return Promise.resolve();
    }
};
const validatePass = (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入密码');
    } else {
        if (value.length > 30) {
            return Promise.reject('密码长度不能大于30')
        }
        return Promise.resolve();
    }
};
// 验证规则
const rules: Record<string, Rule[]> = {
    phoneNumber: [{ required: true, validator: validatePhoneNumber, trigger: 'blur', len: 11 }],
    password: [{ required: true, validator: validatePass, trigger: 'blur', max: 30 }],
};


</script>

<style lang='css' scoped>
.loginBox {
    background-color: #ffffff;
    background-image: url("../../../assets/subtle-prism.svg");
    background-attachment: fixed;
    background-size: cover;
}
</style>