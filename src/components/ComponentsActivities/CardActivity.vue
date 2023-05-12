<template>
    <div>

        <div v-for="(item, index) in this.activities" :key="index" className="activity_card">
            
        <h1 class="titulo_atividade">{{item.title}}</h1>
        <p class="descricao_atividade">{{item.description}}</p>
        <p class="data_atividade_fim">Prazo: {{item.dae_date}}</p>
        <p class="status_atividade">Status: {{item.status}}</p>
        
            <slot />
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ActivityCard',
    components: {
        
    },
    props: {
        activities: {
            type: Array
        }
    },
    
})
</script>
<style scoped>
.activity_card {
    background-color: white;
    padding: 1.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
    cursor: pointer;
}
.descricao_atividade {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
 .titulo_atividade{
    color: black;
 }
</style>