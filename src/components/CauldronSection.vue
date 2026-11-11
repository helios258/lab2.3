<template>
  <BaseSection title="🔮 Котел синтезу">
    <template #header>
      <h3 style="color: #818cf8; margin: 0; border: none; padding: 0;">🔮 Котел синтезу</h3>
    </template>

    <div class="slots-container">
      <div v-for="(slot, index) in pantry.cauldron" :key="index" @click="pantry.removeFromCauldron(index)" class="cauldron-slot" :class="slot ? getIngClass(slot) : ''">
        <span v-if="slot">{{ getIngName(slot) }}</span>
        <span v-else style="color: #4b5563; font-weight: normal;">Порожньо</span>
      </div>
    </div>
    <button @click="handleSynthesis" :disabled="pantry.cauldron.includes(null)" style="width: 100%; padding: 10px; background-color: #312e81; border-color: #818cf8; color: #a5b4fc;">
      Зварити зілля (15 MP)
    </button>
    <div v-if="logMessage" class="log-box">
      {{ logMessage }}
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePantryStore } from '../stores/pantry'
import { getIngName, getIngClass } from '../utils/dictionary'
import BaseSection from './ui/BaseSection.vue'

const pantry = usePantryStore()
const logMessage = ref('')

function handleSynthesis() {
  const result = pantry.synthesize()
  if (result) {
    logMessage.value = result.message
  }
}
</script>