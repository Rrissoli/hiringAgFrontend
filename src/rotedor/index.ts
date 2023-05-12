import {RouteRecordRaw, createRouter, createWebHashHistory} from "vue-router"

import Projects from "../views/ProjectsView.vue"
import ClientsViewVue from "../views/ClientsView.vue"
import ActivitiesView from "../views/ActivitiesView.vue"
const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'ClientsView',
    component: ClientsViewVue,
    props:true
},
{
    path: '/projetos/:clienteId',
    name: 'ProjectsView',
    component: Projects,
    props:true
},
{
    path: '/activities/:projectId/:projectName',
    name: 'ActivitiesView',
    component: ActivitiesView,
    props:true
}
]

const roteador = createRouter(
    {
        history: createWebHashHistory(),
        routes: rotas
    }
)

export default roteador;