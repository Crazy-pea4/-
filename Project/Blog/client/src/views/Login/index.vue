<template>
    <div class="loginBox h-screen flex justify-end">

        <!-- 登录框 -->
        <div class="container flex flex-col justify-around w-108 h-full bg-slate-50">
            <!-- 表单 -->
            <a-form :model="formState" name="normal_login" :rules="rules" class="w-10/12 mx-auto relative"
                @finish="onFinish">
                <!-- 标题 -->
                <div class="absolute -top-24 w-full text-center right-1/2 translate-x-1/2 text-2xl text-slate-600">立即登录
                </div>
                <!-- 账号 -->
                <a-form-item name="phoneNumber" class="relative mb-12">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500 text-slate-600" :class="{
                        '-translate-y-2': isActSelected,
                        'text-xl': isActSelected,
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
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500 text-slate-600" :class="{
                        '-translate-y-2': isPwdSelected,
                        'text-xl': isPwdSelected,
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
                    <a-checkbox v-model:checked="rememberMe" class="checkBox">记住我</a-checkbox>
                    <span class="text-xs float-right mt-1"><a href="">忘记密码</a></span>
                </a-form-item>
                <!-- 登录和注册 -->
                <a-form-item class="ml-2">
                    <a-button type="text" html-type="submit" class="bg-slate-600 text-white">
                        登录
                    </a-button>
                    Or
                    <span class="text-xs text-slate-600 cursor-pointer" @click="ToRegister">立即注册！</span>
                </a-form-item>
                <span class="cursor-pointer" @click="hack">懒得注册, Click here~</span>
            </a-form>
            <div class="px-1 text-gray-400 absolute bottom-0">
                <span>
                    由于之前后端没有校验，数据都被捣蛋鬼删掉了😓.
                    所以现在后端加了个校验权限，不是自己创建的问题和回答删不掉！
                </span>
                <span>不过您要只想看一下我的笔记，可以直接</span>
                <span class="text-black cursor-pointer" @click="hack">点懒得注册获得我的账号</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { Modal } from 'ant-design-vue';
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
            localStorage.setItem('id', data.data._id)
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

const hack = () => {
    Modal.confirm({
        title: '不可以删掉我的笔记',
        'okText': '知道了~',
        onOk() {
            formState.phoneNumber = "19898510903"
            formState.password = "123456"
        },
    })

}
</script>

<style lang='css' scoped>
.loginBox {
    background: url("../../../public/assets/yanquan.jpg") no-repeat fixed;
    background-position: left;
    background-color: #ffffff;
    background-size: contain;
}

/* 不生效，去改源码了 */
.checkbox :deep(.ant-checkbox-input),
.checkbox :deep(.ant-checkbox-inner) {
    background-color: rgb(71 85 105) !important;
    border-color: rgb(71 85 105) !important;
}
</style>