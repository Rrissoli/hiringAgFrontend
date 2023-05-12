<template>
  <div class="column is-one-quarter">
    <BarraLateral />

</div>
  <div class="column is-three-quarter">
  <header>
    <router-link to="/" class="icon-text">
      <span class="icon">
        <i class="fas fa-home"></i>
      </span>
      <span>Home</span>
    </router-link>
    <h1>{{nomeCliente}}</h1>
    <ButtonAddProject />
  </header>
  <div class="tip columns is-multiline">
    <CardProjeto v-for="(projeto, index) in projetos" :key="index" :projeto="projeto" class="column is-one-third" />
  </div>
</div>
</template>
<script >
import axios from '../api/axiosConfig'
import CardProjeto from '../components/ComponentsProjects/CardProjects.vue'
import ButtonAddProject from '../components/ComponentsProjects/ButtonAddProject.vue'
import BarraLateral from '../components/Patterns/BarraLateral.vue';
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProjectsView',
  components: {
    CardProjeto,
    ButtonAddProject,
    BarraLateral
  },
  data() {
    return {
      projetos: [],
      nomeCliente: {
        type: String
      }
    }
  },
  mounted() {
    const clientId = this.$route.params.clienteId
    this.buscarProjetos(clientId)
  },
  methods: {
    buscarProjetos(clientId) {
      axios
        .get(`/clients/${clientId}`)
        .then((res) => {
          this.nomeCliente = res.data.name
          this.projetos = res.data.projects
        })
        .catch((err) => console.log(err))
    }
  }
})
</script>
<style>
header {
  height: 100px;
  background-color: #f14646;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
}

.tam {
  width: 100%;
}
h1{
  color: white;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Courier New', Courier, monospace;
}
.tip{
  padding: 40px;
}
</style>