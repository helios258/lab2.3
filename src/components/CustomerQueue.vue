<template>
  <BaseSection title="👥 Черга покупців">
    <template #header>
      <h3 style="color: #f59e0b; margin: 0; border: none; padding: 0;">👥 Черга покупців</h3>
    </template>

    <div v-if="shop.currentCustomer" style="font-size: 14px;">
      <div style="margin-bottom: 4px;"><b>Клієнт:</b> <span style="color: #fcd34d;">{{ shop.currentCustomer.name }}</span></div>
      <div><b>Шукає:</b> <span style="text-decoration: underline;">{{ shop.currentCustomer.potionName }}</span></div>
      <div style="margin: 10px 0; border-top: 1px dashed #b45309; padding-top: 8px; display: flex; justify-content: space-between;">
        <span style="color: #fbbf24; font-weight: bold;">Ціна: {{ shop.currentCustomer.price }} 💰</span>
        <span style="color: #c084fc; font-weight: bold;">+{{ shop.currentCustomer.xp }} XP</span>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <button @click="shop.sellPotion" class="btn-sell-action">Продати</button>
        <button @click="shop.rejectCustomer" style="background-color: transparent; border-color: #7c2d12; color: #f97316;">Відмовити</button>
      </div>
    </div>
    <div v-else style="text-align: center; color: #a8a29e; font-style: italic;">Очікування клієнта...</div>
  </BaseSection>
</template>

<script setup lang="ts">
import { useShopStore } from '../stores/shop'
import BaseSection from './ui/BaseSection.vue'

const shop = useShopStore()
</script>