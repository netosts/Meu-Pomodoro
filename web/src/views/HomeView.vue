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
@import '../assets/mixins';

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  @include mq(s-m) {
    margin-top: 60px;
  }

  @include mq(xs) {
    margin-top: 50px;
  }
}
</style>