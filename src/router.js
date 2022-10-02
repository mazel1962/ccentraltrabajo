import { createRouter, createWebHistory } from "vue-router";
import Entrada from "./views/Entrada.vue"
import Clasificacion from "./views/Clasificacion.vue"
import PlanCuenta from "./views/PlanCuenta.vue"
import Pais from "./views/Pais.vue"
import Ciudad from "./views/Ciudad.vue"
import Comuna from "./views/Comuna.vue"
import Moneda from "./views/Moneda.vue"
import Usuario from "./views/Usuario.vue"
import EmpresaPropietaria from "./views/EmpresaPropietaria.vue"
import EmpresaCliente from "./views/EmpresaCliente.vue"
import AperturaPeriodos from "./views/AperturaPeriodos.vue"
import MantencionFolios from "./views/MantencionFolios.vue"
import CargarPlanCuenta from "./views/CargarPlanCuenta.vue"
import LibroDiario from "./views/LibroDiario.vue"
import Pruebas1 from "./views/Pruebas1.vue"

const routes = [
    { path:'/' , component: Entrada},
    { path:'/views/Clasificacion.vue' , component: Clasificacion},
    { path:'/views/PlanCuenta.vue' , component: PlanCuenta},
    { path:'/views/Pais.vue' , component: Pais},
    { path:'/views/Ciudad.vue' , component: Ciudad},
    { path:'/views/Comuna.vue' , component: Comuna},
    { path:'/views/Moneda.vue' , component: Moneda},
    { path:'/views/Usuario.vue' , component: Usuario},
    { path:'/views/EmpresaPropietaria.vue' , component: EmpresaPropietaria},
    { path:'/views/EmpresaCliente.vue' , component: EmpresaCliente},
    { path:'/views/AperturaPeriodos.vue' , component: AperturaPeriodos},
    { path:'/views/MantencionFolios.vue' , component: MantencionFolios},
    { path:'/views/CargarPlanCuenta.vue' , component: CargarPlanCuenta},
    { path:'/views/LibroDiario.vue' , component: LibroDiario},
    { path:'/views/Pruebas1.vue' , component: Pruebas1}
    // { path:'/views/EmpresaCliente.vue' , component: EmpresaCliente}
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;


