<template>
    <div className="content_main">
        <header className="personalized">
            <router-link to="/" class="icon-text">
                <span class="icon">
                    <i class="fas fa-home"></i>
                </span>
                <span>Home</span>
            </router-link>
            <h1>{{ projectNamed }}</h1>
            <ButtonsAddList class="button is-success" @click="adicionarLista"></ButtonsAddList>

        </header>
        <div class="tip columns is-multiline">
            <div v-for="(list, index) in activitieslist" :key="index" class=" lane">
                <div className="row">
                    <h2 class="lane-title">{{ list.name }}</h2>
                    <button class="button is-success" @click="adicionarTarefa(list.id)">Adicionar Tarefa</button>
                </div>
                <ActivityCard :activities="list.activities">

                </ActivityCard>
            </div>
        </div>
        <div class="modal" :class="{ 'is-active': modalAtivo }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="field">
                        <label class="label">Titulo da atividade</label>
                        <div class="control">
                            <input class="input" type="text" v-model="title">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Descrição</label>
                        <div class="control">
                            <input class="input" type="text" v-model="description">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Prazo</label>
                        <div class="control">
                            <input class="input" type="date" v-model="daeDate">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Status</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="status">
                              <option disabled value="">Selecione o status</option>
                              <option value="INICIAR">Iniciar</option>
                              <option value="EM_ANDAMENTO">Em andamento</option>
                              <option value="CONCLUIDA">CONCLUIDA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    <button class="button is-success" @click="salvarTarefa">Salvar</button>
                    <button class="button" @click="modalAtivo = false">Cancelar</button>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalAtivo = false"></button>
        </div>
    </div>
</template>
<script >
import axios from '../api/axiosConfig'
import { defineComponent } from 'vue'
import mitt from 'mitt';
import ActivityCard from "../components/ComponentsActivities/CardActivity.vue"
import ButtonsAddList from "../components/ComponentsActivities/ButtonsAddList"
export default defineComponent({
    name: 'ActivitiesView',
    components: {
        ActivityCard,
        ButtonsAddList
    },
    props: {
        projectName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            projectNamed: null,
            activitieslist: [],
            activity: null,
            modalAtivo: false,
            listId: null,
            title: this.title,
            description: this.description,
            status: this.status,
            dae_date: this.daeDate,
        }
    },
    mounted() {
        const projectId = this.$route.params.projectId
        const projectName = this.$route.params.projectName
        this.emitter = mitt();
        this.emitter.on('Tarefa-Adicionada', () => {
            location.reload(); // recarrega a página
        });
        this.verInfos(projectId, projectName)

    },

    methods: {

        adicionarTarefa(id) {
            this.modalAtivo = true;
            this.listId = id
        },
        verInfos(projectId, projectName) {
            this.projectNamed = projectName
            axios
                .get(`/activitieslist/${projectId}`)
                .then((res) => {
                    this.activitieslist = res.data

                })
                .catch((err) => console.log(err))
        },
        salvarTarefa() {

            axios.post(`/activity`, {title: this.title,description: this.description,status: this.status,start_date: "10/06/2023",dae_date: this.daeDate,show_order: 1,backlog: false,activities_list_id: this.listId})
                .then(response => {
                    this.title = '';
                    this.description = '';
                    this.modalAtivo = false;
                    this.emitter.emit('Tarefa-Adicionada');
                })
                .catch(error => {
                    console.error('Erro ao salvar projeto:', error);
                });
        },
        computed: {
            filteredActivities() {
                return (listId) => {
                    axios
                        .get(`/activitieslist/${listId}/justactivities`)
                        .then((res) => {
                            this.activitieslist = res.data

                        })
                        .catch((err) => console.log(err))
                };
            },
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

.content_main {
    width: 100%;
    min-height: 100%;
    background-color: #f14646;
}

.personalized {
    min-height: 4.5rem;
    background-color: #bb3737;
}

.lane {
    background-color: rgb(209, 209, 209);
    width: 23rem;
    min-height: 30rem;
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.2rem 0 rgba(33, 33, 33, 0.1);
    margin: 1rem 0.8rem;
    padding: 0 0.7rem;
}

.lane-title {
    padding: 0.8rem 0.5rem;
    margin-bottom: 0.6rem;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>