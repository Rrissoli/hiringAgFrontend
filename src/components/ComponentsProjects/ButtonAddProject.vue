<template>
    <div class="buttons-container">
        <button class="button is-success" @click="adicionarProjeto">Adicionar Projeto</button>
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
                    <div class="field">
                        <label class="label">Descrição do projeto</label>
                        <div class="control">
                            <input class="input" type="text" v-model="description">
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
            name: '',
            description:''
        }
    },
    methods: {
        adicionarProjeto() {
            this.modalAtivo = true;
        },
        salvarProjeto() {
            let clientId = this.$route.params.clienteId
            axios.post('/projects', { name: this.name, description: this.description,background:"00000000", client_id:clientId })
                .then(response => {
                    this.name = '';
                    this.description = '';
                    this.modalAtivo = false;
                    this.emitter.emit('projeto-adicionado');
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
        this.emitter.on('projeto-adicionado', () => {
            location.reload(); // recarrega a página
        });
    }
}
</script>