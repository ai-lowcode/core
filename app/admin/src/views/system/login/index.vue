<script lang="ts" setup>
import {
  AlButton,
  AlCheckbox,
  AlIcon,
  AlInput,
  AlLoading,
  Hide,
  Lock,
  SuccessFilled,
  User,
  View,
} from '@ai-lowcode/element-plus'

import { AlHttp, ResponseCodeEnum } from '@ai-lowcode/request'
import { onMounted, ref } from 'vue'

import loginBg from '@/assets/img/login-bg.png'
import { useUserStore } from '@/store/modules/user'

const bg = 'data:image/png;base64,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'

const oauth2Config = {
  client_id: 'system',
  client_secret: 'system',
  response_type: 'code',
  redirect_uri: 'http://localhost:5281/oauth2',
  state: 1,
}

const loginForm = ref({
  username: 'admin',
  password: '!QAZ2wsx',
  rememberMe: true,
  client_id: oauth2Config.client_id,
  client_secret: oauth2Config.client_secret,
  grant_type: 'password',
  redirect_uri: oauth2Config.redirect_uri,
  captchaValue: '',
  captchaKey: '',
  mode: 'modal',
})

const verificationCode = ref({
  captchaKey: '',
  captchaOnOff: true,
  img: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
})

const showPassword = ref(false)

const loginLoading = ref(false)

const userStore = useUserStore()

function changePasswordStatus() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  loginLoading.value = true
  const code = await userStore.login({
    ...loginForm.value,
    captchaKey: verificationCode.value.captchaKey as string,
  })
  if (code !== ResponseCodeEnum.SUCCESS)
    await handleVerificationCode()
  loginLoading.value = false
}

async function handleVerificationCode() {
  const loading = AlLoading.service({
    customClass: 'al-verification-code',
    target: '.verification-code',
    background: 'rgba(255, 255, 255, 0.7)',
  })
  try {
    const { data } = await AlHttp.get('/captcha', {
      width: 100,
      height: 50,
    }, {
      isShowSuccessMessage: false,
      isShowErrorMessage: false,
    })
    verificationCode.value = data
  }
  finally {
    loading.close()
  }
}

onMounted(() => {
  handleVerificationCode()
})
</script>

<template>
  <div class="flex justify-center items-center h-full" :style="`background: #fff url(${bg})`">
    <div class="w-[900px] h-[480px] bg-basic-color rounded-md flex" style="box-shadow: 0 1px 14px 2px rgb(7 27 48 / 9%)">
      <img class="w-[420px] h-full bg-cover p-[20px]" :src="loginBg" alt="登录背景">
      <div class="p-[60px] flex-1">
        <div class="text-xl text-center">
          欢迎登录 Ai Lowcode
        </div>
        <div class="mt-[40px]">
          <AlInput v-model="loginForm.username" :prefix-icon="User" placeholder="请输入账户(admin)" />
          <AlInput v-model="loginForm.password" :prefix-icon="Lock" :type="showPassword ? 'text' : 'password'" class="mt-[20px]" placeholder="请输入密码(!QAZ2wsx)">
            <template #suffix>
              <AlIcon class="cursor-pointer" @click="changePasswordStatus">
                <View v-if="showPassword" />
                <Hide v-else />
              </AlIcon>
            </template>
          </AlInput>
          <AlInput v-model="loginForm.captchaValue" :prefix-icon="SuccessFilled" class="mt-[20px]" placeholder="请输入验证码">
            <template #suffix>
              <div class="verification-code h-[30px]">
                <img :src="`data:image/jpeg;base64,${verificationCode.img}`" alt="验证码" class="cursor-pointer h-full" @click="handleVerificationCode">
              </div>
            </template>
          </AlInput>
          <div class="flex justify-between items-center mt-[15px]">
            <AlCheckbox v-model="loginForm.rememberMe">
              记住密码
            </AlCheckbox>
            <div class="text-sm cursor-pointer text-active-color select-none">
              忘记密码
            </div>
          </div>
          <div class="mt-[20px]">
            <AlButton :loading="loginLoading" class="w-full" type="primary" @click="handleLogin">
              登录
            </AlButton>
          </div>
          <div class="mt-[15px]">
            <AlButton class="w-full" text>
              注册账户
            </AlButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.al-verification-code){
  .el-loading-spinner {
    margin-top: -10px;

    .circular {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
