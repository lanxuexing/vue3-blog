<template>
  <!-- Tips：预览Object对象可以采用这个等宽技巧进行显示到页面上 -->
  <!-- <pre>{{ route }}</pre> -->
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList, { testPosts } from '@/components/column/PostList.vue'
import { testData } from '@/views/Home.vue'

export default defineComponent({
  components: { PostList },
  name: 'ColumnDetail',
  setup () {
    const route = useRoute()
    const currentId = +route.params.id
    const column = testData.find(c => c.id === currentId)
    const list = testPosts.filter(post => post.columnId === currentId)
    console.log(column)
    return {
      route,
      column,
      list
    }
  }
})
</script>
