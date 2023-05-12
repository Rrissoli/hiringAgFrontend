<template>
    <header>
        
        <h1>
            ToDoList
        </h1>
        <ButtonsAddCliente/>
        
    </header>
</template>





<script lang="ts">
import { defineComponent } from 'vue';

import ButtonsAddCliente from '../ComponentsClient/ButtonsAddCliente.vue';
export default defineComponent(
    {
        name: 'BarraLateral',
        components:{
            ButtonsAddCliente
        }
       
    }
)
</script>




<style scoped>
header {
    padding: 1rem;
    background-color: #0d3b66;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;

}

.buttons-container {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: space-between;
    margin-top: 20px;
}

h1 {
    font-size: 34px;
    color: #fff;
}

@media only screen and (max-width: 768px; ) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>