import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useVitalsStore } from './vitals'
import type { Ingredient, Recipe, SynthesisResult, IngredientId, PotionId } from '../types/alchemist'

export const usePantryStore = defineStore('pantry', () => {
  const vitals = useVitalsStore()
  const saved = JSON.parse(localStorage.getItem('alchemist_pantry') || '{}')

  const marketIngredients = ref<Ingredient[]>([
    { id: 'red_root', name: 'Червоний корінь', price: 5 },
    { id: 'moon_shroom', name: 'Місячний гриб', price: 8 },
    { id: 'sun_leaf', name: 'Сонячний листок', price: 12 },
    { id: 'ectoplasm', name: 'Ектоплазма', price: 20 }
  ])

  const pantry = ref<Record<IngredientId, number>>(saved.pantry || { 
    red_root: 0, moon_shroom: 0, sun_leaf: 0, ectoplasm: 0 
  })
  
  const cauldron = ref<Array<IngredientId | null>>([null, null])
  
  const potions = ref<Record<PotionId, number>>(saved.potions || { 
    health_potion: 0, mana_potion: 0, strength_potion: 0 
  })

  const recipes: Recipe[] = [
    { ingredients: ['red_root', 'moon_shroom'], potionId: 'health_potion', name: 'Зілля лікування', basePrice: 25 },
    { ingredients: ['moon_shroom', 'sun_leaf'], potionId: 'mana_potion', name: 'Зілля мани', basePrice: 30 },
    { ingredients: ['sun_leaf', 'ectoplasm'], potionId: 'strength_potion', name: 'Зілля сили', basePrice: 50 }
  ]
  
  const discoveredRecipes = ref<PotionId[]>(saved.discoveredRecipes || [])

  function addGold(amount: number) {
    vitals.gold += amount
  }

  function removePotion(id: PotionId): boolean {
    if (potions.value[id] > 0) {
      potions.value[id]--
      return true
    }
    return false
  }

  function buyIngredient(id: IngredientId) {
    if (!vitals.isAlive) return
    const ing = marketIngredients.value.find(i => i.id === id)
    if (ing && vitals.gold >= ing.price) {
      vitals.gold -= ing.price
      pantry.value[id]++
    }
  }

  function addToCauldron(id: IngredientId) {
    if (!vitals.isAlive) return
    if (pantry.value[id] <= 0) return
    const freeSlot = cauldron.value.findIndex(s => s === null)
    if (freeSlot !== -1) {
      cauldron.value[freeSlot] = id
      pantry.value[id]--
    }
  }

  function removeFromCauldron(index: number) {
    if (!vitals.isAlive) return
    const id = cauldron.value[index]
    if (id) {
      pantry.value[id]++
      cauldron.value[index] = null
    }
  }

  function synthesize(): SynthesisResult | null {
    if (!vitals.isAlive) return null
    if (cauldron.value[0] === null || cauldron.value[1] === null) return null
    
    if (!vitals.useMana(15)) {
      vitals.showNotification("Недостатньо мани!")
      return null
    }

    const currentMix = [...cauldron.value].sort() as [IngredientId, IngredientId]
    cauldron.value = [null, null]

    const found = recipes.find((r: Recipe) => 
      [...r.ingredients].sort().every((v, i) => v === currentMix[i])
    )

    if (found) {
      potions.value[found.potionId]++
      if (!discoveredRecipes.value.includes(found.potionId)) {
        discoveredRecipes.value.push(found.potionId)
      }
      return { success: true, message: `Успіх! Зварено: ${found.name}` }
    } else {
      const rand = Math.random()
      let damage = 25
      let severity = "Звичайний вибух"
      if (rand > 0.85) { damage = 75; severity = "Катастрофічний вибух (x3 Шкода!)" }
      else if (rand > 0.60) { damage = 50; severity = "Важкий вибух (x2 Шкода!)" }
      
      vitals.takeDamage(damage)
      return { success: false, severity, damage, message: `Колба вибухнула! ${severity} завдав -${damage} HP.` }
    }
  }

  function drinkPotion(id: PotionId) {
    if (!vitals.isAlive || potions.value[id] <= 0) return
    
    if (id === 'health_potion' && vitals.hp < vitals.maxHp) { 
      vitals.heal(40)
      potions.value[id]-- 
      vitals.showNotification("Ви випили зілля лікування (+40 HP)")
    }
    else if (id === 'mana_potion' && vitals.mp < vitals.maxMp) { 
      vitals.restoreMana(40)
      potions.value[id]-- 
      vitals.showNotification("Ви випили зілля мани (+40 MP)")
    }
  }

  watch([pantry, potions, discoveredRecipes], () => {
    localStorage.setItem('alchemist_pantry', JSON.stringify({
      pantry: pantry.value, potions: potions.value, discoveredRecipes: discoveredRecipes.value
    }))
  }, { deep: true })

  return {
    marketIngredients, pantry, cauldron, potions, recipes, discoveredRecipes,
    buyIngredient, addToCauldron, removeFromCauldron, synthesize, drinkPotion, addGold, removePotion
  }
})