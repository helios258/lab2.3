<template>
  <section class="base-section">
    <div @click="isOpen = !isOpen" class="section-header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
      <span class="toggle-text">{{ isOpen ? '▲ Сховати' : '▼ Відкрити' }}</span>
    </div>

    <div v-show="isOpen" class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
}>()

const isOpen = ref(true)
</script>

<style scoped>
.base-section {
  background-color: #18221f;
  border: 1px solid #2d4a3e;
  border-radius: 8px;
  padding: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding-bottom: 10px;
  border-bottom: 2px solid #2d4a3e;
  gap: 10px;
}

.section-header h3 {
  margin: 0;
  border: none;
  padding: 0;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.toggle-text {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  white-space: nowrap;
}

.section-content {
  margin-top: 12px;
}
</style>