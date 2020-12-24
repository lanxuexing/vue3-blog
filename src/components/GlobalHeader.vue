<template>
  <!-- 导航栏文档： https://getbootstrap.com/docs/5.0/components/navbar/#color-schemes -->
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">博客专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登录</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-if="user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">你好，{{ user.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GloablHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>
