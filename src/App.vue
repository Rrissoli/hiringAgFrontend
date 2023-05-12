<template>
  <main class="columns is-gapless is-multiline">
    
    
      <router-view></router-view>
    
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    
  }
});
</script>

<style>
main {
  min-height: 100vh;
}
</style>
