<template>
  <!-- Tips：预览Object对象可以采用这个等宽技巧进行显示到页面上 -->
  <!-- <pre>{{ route }}</pre> -->
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-100" />
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
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/column/PostList.vue'
import { GlobalDataProps, ColumnProps } from '@/model/DataProps'
import { addColumnAvatar } from '@/utils/helper'

export default defineComponent({
  components: { PostList },
  name: 'ColumnDetail',
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    // 直接从store的getters中获取对应的数据
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      route,
      column,
      list
    }
  }
})
</script>
