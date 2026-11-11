<template>
  <BaseSection title="📦 Комора інгредієнтів">
    <template #header>
      <h3 style="color: #fbbf24; margin: 0; border: none; padding: 0;">📦 Комора інгредієнтів</h3>
    </template>

    <p style="font-size: 11px; color: #9ca3af; margin-top: 0; margin-bottom: 12px;">Натисніть на предмет, щоб додати у котел</p>
    <div class="pantry-grid">
      <div v-for="(count, id) in pantry.pantry" :key="id" @click="pantry.addToCauldron(id as IngredientId)" class="pantry-item" :class="getIngClass(id as IngredientId)">
        <div style="font-size: 12px; color: #9ca3af; font-weight: 500;">{{ getIngName(id as IngredientId) }}</div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 2px; color: #fff;">x{{ count }}</div>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { usePantryStore } from '../stores/pantry'
import { getIngName, getIngClass } from '../utils/dictionary'
import type { IngredientId } from '../types/alchemist'
import BaseSection from './ui/BaseSection.vue'

const pantry = usePantryStore()
</script>