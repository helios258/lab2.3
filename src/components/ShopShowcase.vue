<template>
  <BaseSection title="🍾 Вітрина зіль">
    <template #header>
      <h3 style="color: #38bdf8; margin: 0; border: none; padding: 0;">🍾 Вітрина зіль</h3>
    </template>

    <div v-for="(count, id) in pantry.potions" :key="id" class="list-item" style="font-size: 14px;" :class="getIngClass((id === 'health_potion' ? 'red_root' : id === 'mana_potion' ? 'moon_shroom' : 'sun_leaf') as IngredientId)">
      <span>{{ getPotionName(id as PotionId) }} (<b>x{{ count }}</b>)</span>
      <button v-if="String(id) !== 'strength_potion'" @click="pantry.drinkPotion(id as PotionId)" :disabled="Number(count) <= 0" style="font-size: 11px; padding: 2px 6px;">Випити</button>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { usePantryStore } from '../stores/pantry'
import { getPotionName, getIngClass } from '../utils/dictionary'
import type { PotionId, IngredientId } from '../types/alchemist'
import BaseSection from './ui/BaseSection.vue'

const pantry = usePantryStore()
</script>