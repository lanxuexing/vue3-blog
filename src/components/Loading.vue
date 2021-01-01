<template>
  <teleport to='#loading'>
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{ background: background || '' }"
    >
      <div class="lading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <p class="text-primary small" v-if="message">{{ message }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Loading',
  props: {
    message: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    const node = document.createElement('div')
    node.id = 'loading'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style scoped>
  .loading-container {
    background: rgba(255, 255, 255, .5);
    z-index: 1001;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
</style>
