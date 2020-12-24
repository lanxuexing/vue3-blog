<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    /**
     * 需求：在外部点击的时候让dropdown隐藏
     * 思路：
     *      1. 在mounted的时候天津click事件，在unmounted的时候将事件删除
     *      2. 拿到Dropdown的Dom元素，从而判断点击内容是否被这个元素包含
     */
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        // contains API文档：https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
        if (!(dropdownRef.value.contains(e.target as HTMLElement)) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
