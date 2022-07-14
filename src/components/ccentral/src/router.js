import { createRouter, createWebHistory } from "vue-router";
import Entrada from "./views/Entrada.vue"
import Clasificacion from "./views/Clasificacion.vue"
import PlanCuentas from "./views/PlanCuentas.vue"
import Pais from "./views/Pais.vue"
import Ciudad from "./views/Ciudad.vue"
import Comuna from "./views/Comuna.vue"
import Moneda from "./views/Moneda.vue"

const routes = [
    { path:'/' , component: Entrada},
    { path:'/views/Clasificacion.vue' , component: Clasificacion},
    { path:'/views/PlanCuentas.vue' , component: PlanCuentas},
    { path:'/views/Pais.vue' , component: Pais},
    { path:'/views/Ciudad.vue' , component: Ciudad},
    { path:'/views/Comuna.vue' , component: Comuna},
    { path:'/views/Moneda.vue' , component: Moneda}
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;


