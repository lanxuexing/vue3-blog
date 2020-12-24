import { ref, onMounted, onUnmounted, Ref } from 'vue'

/**
 * 需求：在外部点击的时候让dropdown隐藏
 * 思路：
 *   1. 在mounted的时候天津click事件，在unmounted的时候将事件删除
 *   2. 拿到Dropdown的Dom元素，从而判断点击内容是否被这个元素包含
 */
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      // contains API文档：https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
