<template>
  <!-- 网格布局文档：https://getbootstrap.com/docs/5.0/layout/grid/#stacked-to-horizontal -->
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <!-- 卡片文档：https://getbootstrap.com/docs/5.0/components/card/#example -->
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar && column.avatar.url" class="rounded-circle border border-light w-25 my-3" alt="column.title" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <!-- 第一种写法 -->
          <!-- <router-link :to="{ name: 'detail', params: { id: column.id } }" class="btn btn-outline-primary">进入专栏</router-link> -->
          <!-- 第二种写法 -->
          <router-link :to="`/detail/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/model/DataProps'

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
          column.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          column.avatar.url = column.avatar.url + '?x-oss-process=image/resize,m_pad,h_100,w_100'
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
