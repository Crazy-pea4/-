<template>
    <div class="loginBox h-screen flex justify-end relative">
        <!-- 介绍语 -->
        <!-- <div class="container w-1/2 h-full flex flex-col items-end relative">
            <div class="text-8xl font-serif mt-40 2xl:mt-60 xl:mt-40">welcome</div>
            <div class="text-2xl mt-10 2xl:mt-10 xl:mt-10">博客v1.0</div>
        </div> -->
        <!-- 注册框 -->
        <div class="container flex flex-col justify-around w-108 h-full bg-slate-50">
            <!-- 表单 -->
            <a-form ref="formRef" :model="formState" :rules="rules" class="w-9/12 relative mx-auto mt-6"
                @finish="onFinish">
                <!-- 标题 -->
                <div class="absolute -top-24 w-auto text-center right-1/2 translate-x-1/2 text-2xl">注册</div>
                <!-- 昵称 -->
                <a-form-item name="nickname" class="relative">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500" :class="{
                        '-translate-y-2': isNickSelected,
                        'text-xl': isNickSelected,
                        'text-blue-400': isNickSelected,
                    }">昵称：</span>
                    <a-input class="border-0 border-b-2 shadow-none" v-model:value="formState.nickname" type="text"
                        autocomplete="new-form" @focus="nickAnimation" @blur="nickAnimation">
                        <template #prefix>
                            <UserOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <!-- 账号 -->
                <a-form-item name="phoneNumber" class="relative my-11">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500" :class="{
                        '-translate-y-2': isActSelected,
                        'text-xl': isActSelected,
                        'text-blue-400': isActSelected,
                    }">账号：</span>
                    <a-input class="border-0 border-b-2 shadow-none" v-model:value="formState.phoneNumber"
                        autocomplete="new-form" type="text" @focus="actAnimation" @blur="actAnimation">
                        <template #prefix>
                            <UserOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <!-- 密码 -->
                <a-form-item name="password" class="relative my-11">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500" :class="{
                        '-translate-y-2': isPwdSelected,
                        'text-xl': isPwdSelected,
                        'text-blue-400': isPwdSelected,
                    }">密码：</span>
                    <a-input class="border-0 border-b-2 shadow-none" v-model:value="formState.password" type="password"
                        autocomplete="new-form" @focus="pwdAnimation" @blur="pwdAnimation">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <!-- 确认密码 -->
                <a-form-item name="checkPass" class="relative">
                    <span class="absolute left-1 -top-8 text-base transition-all duration-500" :class="{
                        '-translate-y-2': isCheckPwdSelected,
                        'text-xl': isCheckPwdSelected,
                        'text-blue-400': isCheckPwdSelected,
                    }">确认密码：</span>
                    <a-input class="border-0 border-b-2 shadow-none" v-model:value="formState.checkPass" type="password"
                        autocomplete="new-form" @focus="checkPwdAnimation" @blur="checkPwdAnimation">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input>
                </a-form-item>
                <!-- 提交按钮 -->
                <a-form-item>
                    <a-button type="primary" html-type="submit">Submit</a-button>
                    <span class="ml-2"><a class="text-xs" @click="ToLogin">已有账号？去登陆</a></span>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { register } from '@/api/user'
import regPhone from '@/utils/regPhone'
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const router = useRouter()

interface FormState {
    nickname: string
    phoneNumber: string;
    password: string;
    checkPass?: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    nickname: '',
    phoneNumber: '',
    password: '',
    checkPass: '',
});

const ToLogin = () => {
    router.replace({ name: 'Login' })
}

// 账号、密码label动画
const isNickSelected = ref(false)
const isActSelected = ref(false)
const isPwdSelected = ref(false)
const isCheckPwdSelected = ref(false)
const actAnimation = () => {
    isActSelected.value = !isActSelected.value
}
const pwdAnimation = () => {
    isPwdSelected.value = !isPwdSelected.value
}
const checkPwdAnimation = () => {
    isCheckPwdSelected.value = !isCheckPwdSelected.value
}
const nickAnimation = () => {
    isNickSelected.value = !isNickSelected.value
}

// 表单验证函数
const validatePhoneNumber = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入注册手机号');
    } else {
        if (value.length !== 11) {
            return Promise.reject('手机号长度必须是11位')
        } else if (!regPhone(value)) {
            return Promise.reject('请输入有效手机号')
        } else return Promise.resolve();

    }
};
const validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入密码');
    } else {
        if (value.length > 30) {
            return Promise.reject('密码长度不能大于30')
        }
        return Promise.resolve();
    }
};
const validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请再次输入密码');
    } else if (value !== formState.password) {
        return Promise.reject("两次密码不匹配");
    } else {
        return Promise.resolve();
    }
};

// 验证规则
const rules: Record<string, Rule[]> = {
    phoneNumber: [{ required: true, validator: validatePhoneNumber, trigger: 'change', len: 11 }],
    password: [{ required: true, validator: validatePass, trigger: 'change', max: 30 }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'change', max: 30 }],
};

const onFinish = (values: FormState) => {
    // 删除不必要的checkPass
    delete values.checkPass
    register(values).then((res) => {
        console.log(res);
        router.push({ name: 'Login' })
    }).catch((err) => { })
}
</script>

<style lang='css' scoped>
.loginBox {
    background: url("../../../public/assets/yanquan.jpg") no-repeat fixed;
    background-position: left;
    background-color: #ffffff;
    background-size: contain;
}
</style>