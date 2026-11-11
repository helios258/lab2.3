export type IngredientId = 'red_root' | 'moon_shroom' | 'sun_leaf' | 'ectoplasm'
export type PotionId = 'health_potion' | 'mana_potion' | 'strength_potion'

export interface Ingredient {
  id: IngredientId
  name: string
  price: number
}

export interface Recipe {
  ingredients: [IngredientId, IngredientId]
  potionId: PotionId
  name: string
  basePrice: number
}

export interface Customer {
  name: string
  potionId: PotionId
  potionName: string
  price: number
  xp: number
}

export interface SynthesisResult {
  success: boolean
  message: string
  severity?: string
  damage?: number
}