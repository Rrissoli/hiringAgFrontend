<template>
  <div class="columns is-multiline">
    <div class="column is-one-third" v-for="(cliente, index) in clientes" :key="index">
      <div class="card">
        <div class="card-content" @click="verProjetos(cliente.id)">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ cliente.name }}</p>
              
            </div>
            <div class="right">
              <button class="delete" @click="deletarCliente(cliente.id)"></button>
            </div>
          </div>
          <div class="card-footer">
            <button class="button is-primary is-small" @click="verProjetos(cliente.id)">Visualizar projetos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../api/axiosConfig'
import mitt from "mitt";

const emitter = mitt(); // criar o emitter do mitt

export default {
  name: "GridClientes",
  data() {
    return {
      clientes: [],
    };
  },
  mounted() {
    this.buscarClientes();
    emitter.on("cliente-adicionado", this.buscarClientes); 
  },
  methods: {
    buscarClientes() {
      axios
        .get("/clients")
        .then((res) => {
          this.clientes = res.data;
          
        })
        .catch((err) => console.log(err));
    },
    deletarCliente(id) {
      axios
        .delete(`/clients/${id}`)
        .then(() => {
          this.buscarClientes();
        }) 
        .catch((err) => console.log(err));
    },
    formatarData(data) {
      const date = new Date(data);
      const dia = date.getDate().toString().padStart(2, "0");
      const mes = (date.getMonth() + 1).toString().padStart(2, "0");
      const ano = date.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },
    verProjetos(clienteId) {
      
      this.$router.push({ name: 'ProjectsView', params: { clienteId: clienteId }})
    }
  },
  beforeUnmount() {
    emitter.off("cliente-adicionado", this.buscarClientes);
  },
};
</script>

<style scoped>
.card {
  background-color: #c2d9eb;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  width: 200px;
  height: 100px;
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
.criacao{
  position: absolute;
  bottom: 5px;
  left: 10px;
  
  font-size: 10px;
  font-weight: 200;
}
</style>


