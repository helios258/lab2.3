<template>
  <BaseSection title="📖 Гримуар рецептів">
    <template #header>
      <h3 style="color: #c084fc; margin: 0; border: none; padding: 0;">📖 Гримуар рецептів</h3>
    </template>

    <div v-for="recipe in pantry.recipes" :key="recipe.potionId" class="list-item" style="font-size: 13px;">
      <div>
        <span v-if="pantry.discoveredRecipes.includes(recipe.potionId)" style="font-weight: bold; color: #e9d5ff;">🧪 {{ recipe.name }}</span>
        <span v-else style="color: #6b7280; font-style: italic;">Невідомий рецепт</span>
      </div>
      <div style="font-size: 11px; color: #9ca3af; background-color: #0d1411; padding: 2px 6px; border-radius: 4px;">
        {{ getIngName(recipe.ingredients[0]) }} + {{ getIngName(recipe.ingredients[1]) }}
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { usePantryStore } from '../stores/pantry'
import { getIngName } from '../utils/dictionary'
import BaseSection from './ui/BaseSection.vue'

const pantry = usePantryStore()
</script>