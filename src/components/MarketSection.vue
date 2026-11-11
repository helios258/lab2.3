<template>
  <BaseSection title="🛒 Ринок сировини">
    <template #header>
      <h3 style="color: #34d399; margin: 0; border: none; padding: 0;">🛒 Ринок сировини</h3>
    </template>
    
    <table class="market-table">
      <tr v-for="ing in pantry.marketIngredients" :key="ing.id" :class="getIngClass(ing.id)">
        <td style="font-size: 14px; font-weight: 500;">{{ ing.name }}</td>
        <td style="font-weight: bold; text-align: center; width: 60px; color: #fbbf24;">{{ ing.price }} 💰</td>
        <td style="text-align: right;">
          <button @click="buyIngredient(ing.id)" :disabled="vitals.gold < ing.price" style="font-size: 11px; padding: 4px 8px;">Купити</button>
        </td>
      </tr>
    </table>
  </BaseSection>
</template>

<script setup lang="ts">
import { usePantryStore } from '../stores/pantry'
import { useVitalsStore } from '../stores/vitals'
import { useMarket } from '../composables/useMarket'
import { getIngClass } from '../utils/dictionary'
import BaseSection from './ui/BaseSection.vue'

const pantry = usePantryStore()
const vitals = useVitalsStore()
const { buyIngredient } = useMarket()
</script>