import { usePantryStore } from '../stores/pantry'
import { useVitalsStore } from '../stores/vitals'
import type { IngredientId } from '../types/alchemist'

export function useMarket() {
  const pantry = usePantryStore()
  const vitals = useVitalsStore()

  function buyIngredient(id: IngredientId) {
    if (!vitals.isAlive) return
    const ing = pantry.marketIngredients.find(i => i.id === id)
    if (!ing) return

    if (vitals.gold >= ing.price) {
      pantry.buyIngredient(id)
    } else {
      vitals.showNotification("Недостатньо золота!")
    }
  }

  return { buyIngredient }
}