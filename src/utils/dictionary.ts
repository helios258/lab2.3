import type { IngredientId, PotionId } from '../types/alchemist'

export const INGREDIENT_NAMES: Record<IngredientId, string> = { 
  red_root: 'Червоний корінь', 
  moon_shroom: 'Місячний гриб', 
  sun_leaf: 'Сонячний листок', 
  ectoplasm: 'Ектоплазма' 
}

export const POTION_NAMES: Record<PotionId, string> = { 
  health_potion: 'Зілля лікування', 
  mana_potion: 'Зілля мани', 
  strength_potion: 'Зілля сили' 
}

export function getIngName(id: IngredientId): string {
  return INGREDIENT_NAMES[id] || id
}

export function getPotionName(id: PotionId): string {
  return POTION_NAMES[id] || id
}

export function getIngClass(id: IngredientId): string {
  const classes: Record<string, string> = { red_root: 'ing-red', moon_shroom: 'ing-moon', sun_leaf: 'ing-sun', ectoplasm: 'ing-ecto' }
  return classes[id] || ''
}