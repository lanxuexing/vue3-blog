<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- 表单：https://getbootstrap.com/docs/5.0/forms/overview/ -->
    <form action="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input v-model="emailValue" :rules="emailRules"></validate-input>
      </div>
      {{ emailValue }}
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input type="email" class="form-control" id="exampleInputPassword1" />
      </div>
    </form>
    <!-- <column-list :list="list"></column-list> -->
  </div>
</template>

<script lang="ts">
/**
 * bootstrap 5.0 文档
 * @link https://getbootstrap.com/docs/5.0/getting-started/introduction/
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent, ref } from 'vue'
// import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这里是test1专栏，有一段非常有意思的简介，可以更新一下噢',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
//   },
//   {
//     id: 2,
//     title: 'test2的专栏',
//     description: '这里是test2专栏，有一段非常有意思的简介，可以更新一下噢'
//     // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
//   },
//   {
//     id: 3,
//     title: 'test3的专栏',
//     description: '这里是test3专栏，有一段非常有意思的简介，可以更新一下噢',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
//   },
//   {
//     id: 4,
//     title: 'test4的专栏',
//     description: '这里是test4专栏，有一段非常有意思的简介，可以更新一下噢',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
//   }
// ]
const currentUser: UserProps = {
  isLogin: true,
  name: 'muziyu',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup () {
    const emailValue = ref('')
    // 表单验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮件地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮件格式' }
    ]
    return {
      // list: testData,
      currentUser,
      emailRules,
      emailValue
    }
  }
})
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
