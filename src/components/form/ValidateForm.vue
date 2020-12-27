<template>
<!-- 具名插槽文档： https://vue3js.cn/docs/zh/guide/component-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD -->
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter, Handler } from 'mitt'

export const emitter: Emitter = mitt()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, ctx) {
    const submitForm = () => {
      ctx.emit('form-submit', true)
    }
    /**
     * mitt库的handler回调函数TS类型报错
     *  1. 引入声明：https://github.com/developit/mitt/issues/119#issuecomment-722807694
     *  2. 回调函数：https://github.com/developit/mitt/issues/112#issuecomment-740517823
     */
    const callback: Handler = (event: string) => {
      console.log('回调信息: ', event)
    }
    emitter.on('from-item-created', callback)
    onUnmounted(() => {
      emitter.off('from-item-created', callback)
    })
    return {
      submitForm
    }
  }
})
</script>
