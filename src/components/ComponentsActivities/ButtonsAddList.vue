<template>
    <div class="buttons-container">
        <button class="button is-success" @click="adicionarProjeto">Adicionar Lista de Tarefas</button>
        <div class="modal" :class="{ 'is-active': modalAtivo }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="field">
                        <label class="label">Titulo do projeto</label>
                        <div class="control">
                            <input class="input" type="text" v-model="name">
                        </div>
                    </div>
                    <button class="button is-success" @click="salvarProjeto">Salvar</button>
                    <button class="button" @click="modalAtivo = false">Cancelar</button>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalAtivo = false"></button>
        </div>
    </div>
</template>
    
<script >
import axios from '../../api/axiosConfig'
import mitt from 'mitt';

export default {
    data() {
        return {
            modalAtivo: false,
            name: null,
            project_id: null
        }
    },
    methods: {
        adicionarProjeto() {
            this.modalAtivo = true;
        },
        salvarProjeto() {
            let projectId = this.$route.params.projectId
            axios.post('/activitieslist', { name: this.name,show_order:3,backlog:false,project_id:projectId})
                .then(response => {
                    this.name = '';
                    
                    this.modalAtivo = false;
                    this.emitter.emit('lista-adicionado');
                })
                .catch(error => {
                    console.error('Erro ao salvar projeto:', error);
                });
        },
        disconnect() {
            // lógica para disconnect
        }
    },
    mounted() {
        this.emitter = mitt();
        this.emitter.on('lista-adicionado', () => {
            location.reload(); // recarrega a página
        });
    }
}
</script>