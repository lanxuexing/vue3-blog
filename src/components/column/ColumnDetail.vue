<template>
  <h1>
    <!-- Tips：预览Object对象可以采用这个等宽技巧进行显示到页面上 -->
    <pre>{{ route }}</pre>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ColumnDetail',
  setup () {
    const route = useRoute()
    console.log('路由: ', route)
    return {
      route
    }
  }
})
</script>
