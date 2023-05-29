<script setup>
import Timer from '../components/Timer.vue'
</script>

<template>
  <main>
    <Timer />
  </main>
</template>

<style lang="scss">
@import '../assets/variables';

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
</style>