import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useVitalsStore } from './vitals'
import { usePantryStore } from './pantry'
import type { Customer } from '../types/alchemist'

export const useShopStore = defineStore('shop', () => {
  const vitals = useVitalsStore()
  const pantry = usePantryStore()
  const currentCustomer = ref<Customer | null>(null)

  const names = ['Рональд', 'Грета', 'Сер Галлахад', 'Відьма Аґнес', 'Боб', 'Ельф Леголас']

  function generateCustomer() {
    if (!vitals.isAlive) { currentCustomer.value = null; return }
    const randomRecipe = pantry.recipes[Math.floor(Math.random() * pantry.recipes.length)]
    const randomName = names[Math.floor(Math.random() * names.length)]
    const fluctuation = 0.85 + Math.random() * 0.30
    const finalPrice = Math.round(randomRecipe.basePrice * fluctuation * vitals.priceBonusMultiplier)
    const xpReward = Math.round(randomRecipe.basePrice * 0.6)

    currentCustomer.value = {
      name: randomName, 
      potionId: randomRecipe.potionId, 
      potionName: randomRecipe.name, 
      price: finalPrice, 
      xp: xpReward
    }
  }

  function sellPotion() {
    if (!currentCustomer.value || !vitals.isAlive) return
    const id = currentCustomer.value.potionId
    
    const success = pantry.removePotion(id)
    if (success) {
      pantry.addGold(currentCustomer.value.price)
      vitals.addXp(currentCustomer.value.xp)
      generateCustomer()
    } else {
      vitals.showNotification("Немає такого зілля на вітрині!")
    }
  }

  function rejectCustomer() {
    if (vitals.isAlive) generateCustomer()
  }

  return { currentCustomer, generateCustomer, sellPotion, rejectCustomer }
})