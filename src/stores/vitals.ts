import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useVitalsStore = defineStore('vitals', () => {
  const saved = JSON.parse(localStorage.getItem('alchemist_vitals') || '{}')

  const hp = ref<number>(saved.hp !== undefined ? saved.hp : 100)
  const maxHp = ref<number>(100)
  const mp = ref<number>(saved.mp !== undefined ? saved.mp : 100)
  const maxMp = ref<number>(100)
  
  const gold = ref<number>(saved.gold !== undefined ? saved.gold : 50)
  const xp = ref<number>(saved.xp || 0)
  const level = ref<number>(saved.level || 1)
  
  const activeNotification = ref<string | null>(null)

  const xpNeededForNextLevel = computed(() => level.value * 100)
  const isAlive = computed(() => hp.value > 0)

  const masterRank = computed(() => {
    if (level.value >= 5) return 'Архімаг зілля'
    if (level.value >= 3) return 'Досвідчений алхімік'
    return 'Учень'
  })

  const priceBonusMultiplier = computed(() => 1 + (level.value - 1) * 0.15)

  function takeDamage(amount: number) {
    hp.value = Math.max(0, hp.value - amount)
  }

  function heal(amount: number) {
    if (!isAlive.value) return
    hp.value = Math.min(maxHp.value, hp.value + amount)
  }

  function useMana(amount: number): boolean {
    if (mp.value >= amount) {
      mp.value -= amount
      return true
    }
    return false
  }

  function restoreMana(amount: number) {
    if (!isAlive.value) return
    mp.value = Math.min(maxMp.value, mp.value + amount)
  }

  function addXp(amount: number) {
    if (!isAlive.value) return
    xp.value += amount
    while (xp.value >= xpNeededForNextLevel.value) {
      xp.value -= xpNeededForNextLevel.value
      level.value++
      hp.value = maxHp.value
      mp.value = maxMp.value
      showNotification(`Вітаємо! Досягнуто ${level.value} рівень майстерності!`)
    }
  }

  function showNotification(text: string) {
    activeNotification.value = text
    setTimeout(() => {
      if (activeNotification.value === text) activeNotification.value = null
    }, 3000)
  }

  function closeNotification() {
    activeNotification.value = null
  }

  function resurrect() {
    hp.value = maxHp.value
    mp.value = maxMp.value
    level.value = 1
    xp.value = 0
    showNotification("Ви повернулися до життя!")
  }

  watch([hp, mp, gold, xp, level], () => {
    localStorage.setItem('alchemist_vitals', JSON.stringify({
      hp: hp.value, mp: mp.value, gold: gold.value, xp: xp.value, level: level.value
    }))
  }, { deep: true })

  return {
    hp, maxHp, mp, maxMp, gold, xp, level, activeNotification,
    xpNeededForNextLevel, isAlive, masterRank, priceBonusMultiplier,
    takeDamage, heal, useMana, restoreMana, addXp, showNotification, closeNotification, resurrect
  }
})