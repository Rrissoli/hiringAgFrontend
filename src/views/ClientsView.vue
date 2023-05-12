<template>
    <div class="column is-one-quarter">
        <BarraLateral />

    </div>
    <div class="column is-three-quarter">
        <GridClient />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

import GridClient from '../components/ComponentsClient/GridClient.vue'
import BarraLateral from '../components/Patterns/BarraLateral.vue';
export default defineComponent({
    name: 'ClientsView',
    components: {
        GridClient,
        BarraLateral
    }
});
</script>
  
<style>
main {
    min-height: 100vh;
}
</style>
  