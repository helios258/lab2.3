<template>
  <div class="app-container">
    <div v-if="!vitals.isAlive" class="death-screen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(45, 20, 20, 0.95);">
      <h1 style="color: #ef4444; font-size: 32px; margin-bottom: 10px;">Ви загинули!</h1>
      <p style="font-size: 16px; color: #fca5a5;">Ваші експерименти зазнали краху. Алхімія — небезпечна справа.</p>
      <button @click="resurrect" style="margin-top: 20px; padding: 12px 24px; font-size: 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px;">
        Спробувати знову
      </button>
    </div>

    <div v-if="vitals.activeNotification" class="notification-toast" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: #1e293b; border: 1px solid #fbbf24; color: #fbbf24; padding: 12px 24px; border-radius: 6px; z-index: 1000; font-weight: bold; display: flex; align-items: center; gap: 15px;">
      {{ vitals.activeNotification }}
      <button @click="vitals.closeNotification" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 14px; padding: 0;">✕</button>
    </div>

    <header class="header">
      <h1>Лавка алхіміка</h1>
      
      <div class="header-vitals-inline">
        <div class="vital-bar-group">
          <div class="bar-label-inline">
            <span style="color: #ef4444;">HP</span>
            <span>{{ vitals.hp }} / {{ vitals.maxHp }}</span>
          </div>
          <div class="bar-outer">
            <div class="bar-inner bg-hp" :style="{ width: (vitals.hp / vitals.maxHp * 100) + '%' }"></div>
          </div>
        </div>

        <div class="vital-bar-group">
          <div class="bar-label-inline">
            <span style="color: #3b82f6;">MP</span>
            <span>{{ vitals.mp }} / {{ vitals.maxMp }}</span>
          </div>
          <div class="bar-outer">
            <div class="bar-inner bg-mp" :style="{ width: (vitals.mp / vitals.maxMp * 100) + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="header-info-inline">
        <span style="color: #fbbf24;">💰 {{ vitals.gold }}</span>
        <span style="color: #c084fc;">Lvl {{ vitals.level }} ({{ vitals.xp }}/{{ vitals.xpNeededForNextLevel }} XP)</span>
        <span style="color: #38bdf8;">{{ vitals.masterRank }}</span>
      </div>
    </header>

    <div class="game-grid" v-if="vitals.isAlive">
      <div class="column">
        <MarketSection />
        <PantrySection />
      </div>
      <div class="column">
        <CauldronSection />
        <GrimoireSection />
      </div>
      <div class="column">
        <ShopShowcase />
        <CustomerQueue />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVitalsStore } from './stores/vitals'
import { useShopStore } from './stores/shop'

import MarketSection from './components/MarketSection.vue'
import PantrySection from './components/PantrySection.vue'
import CauldronSection from './components/CauldronSection.vue'
import GrimoireSection from './components/GrimoireSection.vue'
import ShopShowcase from './components/ShopShowcase.vue'
import CustomerQueue from './components/CustomerQueue.vue'

const vitals = useVitalsStore()
const shop = useShopStore()

onMounted(() => {
  if (!shop.currentCustomer && vitals.isAlive) {
    shop.generateCustomer()
  }
})

function resurrect() {
  vitals.resurrect()
  shop.generateCustomer()
}
</script>