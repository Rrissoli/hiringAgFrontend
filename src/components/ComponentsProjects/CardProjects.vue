<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Nome: {{ projeto.name }}</h5>
            
            <p class="card-text">Status: {{ projeto.terminated == false ? "Em Aberto" : "Finalizado" }}</p>
            <div class="card-footer">
                <button class="button is-primary is-small" @click="verAtividades(projeto.id, projeto.name)" >Visualizar Tarefas</button>
                
            </div>
        </div>
    </div>
</template>
<script >
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CardProjeto',
    props: {
        projeto: {
            type: Object,
            required: true
        }
    },
    methods: {
        verAtividades(projectId, projectName) {

            this.$router.push({ name: 'ActivitiesView', params: { projectId: projectId, projectName:projectName } })
        }
    }
})
</script>
<style>
.card {
    background-color: #c2d9eb;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: inline-block;
    width: 200px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card p {
    font-size: 18px;
    margin-bottom: 10px;
}

.card a {
    background-color: #0080ff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
}

.card a:hover {
    background-color: #0059b3;
}

.delete {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    background-color: #db3737;
    border: none;
    color: #fff;
    font-size: 10px;
    cursor: pointer;
}

.criacao {
    position: absolute;
    bottom: 5px;
    left: 10px;

    font-size: 10px;
    font-weight: 200;
}

.card-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>