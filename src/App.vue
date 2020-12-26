<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <form action="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div>
      </div>
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
import { defineComponent, reactive } from 'vue'
// import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
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

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader
  },
  setup () {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = '邮箱不能为空'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = '邮箱格式不符合要求'
      }
    }
    return {
      // list: testData,
      currentUser,
      emailRef,
      validateEmail
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
