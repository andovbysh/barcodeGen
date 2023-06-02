<script setup>
import BarcodeGenerator from "@/components/Barcode/BarcodeGenerator.vue";
</script>

<template>
  <main class="main-wrapper">
    <BarcodeGenerator />
  </main>
</template>

<style scoped lang="scss">
.main-wrapper {
  max-width: 1024px;
  display: flex;
  justify-content: center;
}
</style>
