<template>
  <div class="buttons-container">
    <button class="button is-success" @click="adicionarCliente">Adicionar Cliente</button>
    <button class="button is-danger" @click="disconnect">Disconnect</button>
    <div class="modal" :class="{ 'is-active': modalAtivo }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            <label class="label">Nome do Cliente</label>
            <div class="control">
              <input class="input" type="text" v-model="nomeCliente">
            </div>
          </div>
          <button class="button is-success" @click="salvarCliente">Salvar</button>
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
      nomeCliente: '',
    }
  },
  methods: {
    adicionarCliente() {
      this.modalAtivo = true;
    },
    salvarCliente() {
      axios.post('/clients', { name: this.nomeCliente })
        .then(response => {
          console.log('Cliente salvo com sucesso:', response.data);
          this.nomeCliente = '';
          this.modalAtivo = false;
          this.emitter.emit('cliente-adicionado'); 
        })
        .catch(error => {
          console.error('Erro ao salvar cliente:', error);
        });
    },
    disconnect() {
      // lógica para disconnect
    }
  },
  mounted() {
    this.emitter = mitt();
    this.emitter.on('cliente-adicionado', () => {
      location.reload(); // recarrega a página
    });
  }
}
</script>
  