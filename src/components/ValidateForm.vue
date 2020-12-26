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
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, ctx) {
    const submitForm = () => {
      ctx.emit('form-submit', true)
    }
    return {
      submitForm
    }
  }
})
</script>
