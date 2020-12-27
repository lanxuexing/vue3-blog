<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到博客</h5>
      <!-- 表单：https://getbootstrap.com/docs/5.0/forms/overview/ -->
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            type="text"
            placeholder="请输入邮箱地址"
            v-model="emailValue"
            :rules="emailRules"
          >
          </validate-input>
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            type="password"
            placeholder="请输入密码"
            v-model="passwordValue"
            :rules="passwordRules"
          >
          </validate-input>
        </div>
        <!-- 插槽的写法： [1] v-slot:soltName [2] #slotName -->
        <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
        </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '@/components/form/ValidateInput.vue'
import ValidateForm from '@/components/form/ValidateForm.vue'
import { GlobalDataProps, RulesProp } from '@/model/DataProps'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const emailValue = ref('')
    const passwordValue = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    // 表单验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮件地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮件格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push('/')
        store.commit('login')
      }
    }
    return {
      emailValue,
      passwordValue,
      emailRules,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
