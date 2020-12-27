<template>
  <!-- 网格布局文档：https://getbootstrap.com/docs/5.0/layout/grid/#stacked-to-horizontal -->
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column.id">
      <!-- 卡片文档：https://getbootstrap.com/docs/5.0/components/card/#example -->
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" class="rounded-circle border border-light w-25 my-3" alt="column.title" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <router-link :to="{ name: 'detail', params: { id: column.id } }" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

// 定义组件的数据类型
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>
