<template>
    <div>

        <div v-for="(item, index) in this.activities" :key="index" className="activity_card">

            <h1 class="titulo_atividade">{{ item.title }}</h1>
            <p class="descricao_atividade">{{ item.description }}</p>
            <p class="data_atividade_fim">Prazo: {{ item.dae_date }}</p>
            <div class="row">
                <p class="status_atividade">Status: {{ item.status }}</p>

            </div>
            <div class="row align-center">
                <div class="" >
                    <div class="modal-dropdown">
                        <label class="label">Status</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="status">
                                    <option disabled value="">Selecione o status</option>
                                    <option value="INICIAR"  >iniciar</option>
                                    <option value="EM_ANDAMENTO">Em andamento</option>
                                    <option value="CONCLUIDA">CONCLUIDA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="button is-success " @click="ModificarPatchStatus(item.id)">Confirmar</button>
                </div>
                


            </div>
            

            <slot />
        </div>

    </div>
</template>
<script >
import { defineComponent } from 'vue'
import axios from '../../api/axiosConfig'
import mitt from 'mitt';
export default defineComponent({
    name: 'ActivityCard',
    components: {

    },
    data() {
        return {
            modalAtivo: false,
            status: ""

        }
    },
    mounted() {
        this.emitter = mitt();
        
        this.emitter.on('StatusAdicionada', () => {
            this.status = ""
            location.reload(); 
        });
        
    },
    methods: {
        
       ModificarPatchStatus( id){
        axios
                .patch(`/activity/status/${id}`,{status:this.status})
                .then((res) => {
                    console.log(res.data)
                    
                    this.emitter.emit('StatusAdicionada');
                })
                .catch((err) => console.log(err))
       }
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

.titulo_atividade {
    color: black;
}

.clicavel {
    width: 50px;
    height: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.align-center{
    align-items: center;
    
}
</style>