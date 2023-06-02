<template>
    <img class="barcode" :src="imageUrl" :alt="alt"/>
</template>

<script setup>
defineProps(['imageUrl', 'alt'])
</script>

<style scoped lang="scss">
.barcode {
  max-width: 256px;
  max-height: 256px;
}
</style>