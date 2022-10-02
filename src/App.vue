<template>
  <div class="grid grid-rows-2 grid-cols-12 gap-0">
    <div class="bg-gray-600 row-start-1 row-end-3 h-32 col-start-1 col-end-3">01</div>
      <div class="bg-gray-600 row-start-1 row-end-2 h-16 col-start-3 col-end-11">
        <div class="flex space-x-1 h-16 w-full flex-nowrap overflow-x-auto" v-if="bandera==0">
            <draggable class="dragArea list-group w-full flex flex-nowrap" :list="arrcteopcion" @start="cambio" group = "task">
              <div class="list-group-item top-0 h-12 w-48 bg-gradient-to-r from-emerald-700 via-emerald-300 to-emerald-700 text-blue rounded-lg flex flex-nowrap" v-for="ia in arrcteopcion" :key="ia.id">
                {{ia.name}}
              </div> 
            </draggable>
        </div>
        <div class="flex space-x-1 h-16 w-full flex-nowrap overflow-x-auto" v-else>
            <div class="list-group-item top-0 h-12 w-48 bg-gradient-to-r from-emerald-700 via-emerald-300 to-emerald-700 text-plata rounded-lg flex flex-nowrap" v-for="ia in arrcteopcion" :key="ia.id">
               {{ia.name}}
            </div> 
        </div>         
      </div>
    <div class="bg-gray-700 row-start-2 row-end-3 h-16 col-start-3 col-end-11">
        <div class="flex space-x-1 h-16 w-full flex-nowrap" v-if="bandera==0">
          <draggable class="dragArea list-group w-full flex flex-nowrap" :list="arrctefijo" @change="cambiofijo" group = "task">
            <div class=" top-0 h-12 w-48 text-navy bg-gradient-to-r from-emerald-700 via-emerald-300 to-emerald-700 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.name}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-tl from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.direccion}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-tl from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.comuna}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-tl from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.ciudad}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-tl from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.giro}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-tl from-emerald-200 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.rol}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-tl from-emerald-200 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.contacto}} 
            </div>
         </draggable>
        </div>
          <div class="flex space-x-1 h-16 w-full flex-nowrap" v-else>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.name}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.direccion}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.comuna}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.ciudad}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.giro}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.rol}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-gradient-to-t from-emerald-100 via-emerald-700 to-emerald-600 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.contacto}} 
            </div>
        </div>

    </div> 
    <div class="bg-gray-600 text-neutral-900 row-start-1 row-end-3 h-32 col-start-11 col-end-13">
        <div class="grid grid-rows-2 grid-cols-8 gap-2 bg-gray-600 text-neutral-900 row-start-1 row-end-2">
          <div class="text-plata bg-gray-600 text-neutral-900 row-start-1 row-end-2 col-start-1 col-end-4 h-8"><p><font size="3">Usuario</font></p></div>
          <div class="text-gray-700 bg-gray-600 text-neutral-900 row-start-1 row-end-2 col-start-4 col-end-7 h-8"><input id="idusuario" type="text" size="14" text-size="3" v-model="idUsuario" placeholder="Usuario"></div>
          <div class="text-plata bg-gray-600 text-neutral-900 row-start-2 row-end-3 col-start-1 col-end-4 h-8"><p><font size="2"></font></p>Contraseña</div>
          <div class="text-gray-700 bg-gray-600 text-neutral-900 row-start-2 row-end-3 col-start-4 col-end-7 h-8"><input id="idclave" type="password" size="14" v-model="pwUsuario" placeholder="Contraseña" @change="ValidaUsuario()"></div>
        </div>
       <!-- <div class="grid grid-rows-2 grid-cols-4 gap-2 bg-gray-600 text-neutral-900 row-start-3 row-end-4">  -->
       <div class="grid grid-rows-2 grid-cols-9 gap-2 bg-gray-600 text-neutral-900 row-star-3 row-end-4 h8" >
        
          <div class="row-start-1 row-end-4 col-start-1 col-end-4 h-7" v-if="bandera<=0">&nbsp<button class=" rounded-lg text-center text-plata bg-gray-400 hover:bg-gray-700 shadow-lg shadow-gray-900" @click="IniciaSesion()">Buscar<br>empresa</button></div>
          <div class="row-start-1 row-end-4 col-start-1 col-end-4 h-7" v-else><button disabled  class="not-allowed rounded-lg text-center text-plata bg-gray-400">Buscar<br>empresa</button></div>
          <div class="row-start-1 row-end-4 col-start-4 col-end-8 h-7" v-if="bandera==0"><button class=" rounded-lg text-center text-plata bg-gray-400 hover:bg-gray-700 shadow-lg shadow-gray-900 " @click="FijarSesion()">&nbspIngresar&nbsp<br>al sistema</button></div>
          <div class="row-start-1 row-end-4 col-start-4 col-end-8 h-7" v-else><button disabled   class="not-allowed  animate-none rounded-lg text-center text-plata bg-gray-400">&nbspIngresar&nbsp<br>al sistema</button></div>
          <div class="row-start-1 row-end-4 col-start-7 col-end-9 h-7" v-if="bandera==1"><button class=" rounded-lg text-center text-plata bg-gray-400 hover:bg-gray-700 shadow-lg shadow-gray-900 " @click="CerrarSesion()">&nbspCerrar&nbsp<br>&nbspsesión&nbsp</button>&nbsp</div>
          <div class="row-start-1 row-end-4 col-start-7 col-end-9 h-7" v-else><button disabled   class="not-allowed  stroke-1 hover:stroke-2  rounded-lg text-center text-plata bg-gray-400">&nbspCerrar&nbsp<br>&nbspsesión&nbsp</button>&nbsp</div>
       <!-- animate-bounce = rebote     animate-pulse = aclara oscurece       animate-spin = girar     animate-ping= se agranda y desaparece-->
       </div>
    </div>
  </div>
<div class="bg-gray-600 row-start-5 row-end-5 col-start-1 h-4 w-full col-end-13">05</div>   
  <div class="grid grid-cols-12 gap-0">
    <div class="flex bg-gray-600 row-start-1 text-plata col-start-1 h-[683px] col-end-3 flex-nowrap overflow-y-auto">
        <nav>
            <ul v-if="bandera==1">  
              
              <!-- <li >
                <div class="bg-gray-600 text-plata"><router-link v-bind:to="'/views/Pais.vue'">ciudad</router-link></div>
                <div class="bg-gray-600 text-plata"><router-link v-bind:to="'/views/Pruebas.vue'">Pruebas</router-link></div>
                <div class="bg-gray-600 text-plata"><router-link v-bind:to="'/views/Pruebas1.vue'">Pruebas Uno</router-link></div>
              </li> -->
              
                <li v-for="Item of menuselect" >
                     <div v-if="Item.titulo==0" class="bg-gray-400 text-plata">{{Item.nombre}}</div>
                     <div v-else class="bg-gray-600 text-plata"><router-link v-bind:to="'/views/'+Item.linker">{{Item.nombre}}</router-link></div>
                </li>
            </ul>
        </nav>
    </div> 
    <div class="flex bg-gradient-to-b from-gray-600 via-emerald-400 to-gray-500 row-start-1 h-32 col-start-3 h-[683px] col-end-13 flex-nowrap overflow-y-auto">
         
         <router-view>

          
         </router-view>
    </div>
  </div>
 
  <div class="grid grid-cols-12 gap-0">
      <div class="bg-gray-500 text-black row-start-1 row-end-3 col-start-1 h-32 w-full col-end-13"><EPropietaria/></div> 
  </div>

</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { defineComponent} from 'vue'
import { useUserStore } from './stores/user';
import { userMenuStore } from './stores/menustore';
import { useClienteStore} from './stores/clienteStore';
export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      
    },
     data() {
      return {
        bandera:-1,
        enabled: true,
        arrcteopcion:[{id:0,name:"Demo",codcliente:"",direccion:"",giro:"",comuna:"",ciudad:"",rol:"",contacto:""}],
        arrctefijo:[{id:0,name:"Demo",codcliente:"",direccion:"",giro:"",comuna:"",ciudad:"",rol:"",contacto:""}],
        dragging: false,
        menuselect:[{nombre:"Demo",linker:'Entrada.vue',titulo:0, publicacion:"bg-emerald-400 text-plata"}]
      }
    },
    methods: {
      cambio() {
          const lf=this.arrctefijo.length;
          this.arrctefijo.splice(0,lf);
      },
      cambiofijo(event){
      },
      IniciaSesion(){
          this.bandera=0;
          const DataUserStore=useUserStore();
          const lf=this.arrctefijo.length;
          const lo=this.arrcteopcion.length;
          this.arrctefijo.splice(0,lf);
          this.arrcteopcion.splice(0,lo);
          for(let i=0;i<DataUserStore.empresacliente.nombreempresacliente.length;i++){
              this.arrcteopcion.push({id:i,name:DataUserStore.empresacliente.nombreempresacliente[i],
              codcliente:DataUserStore.empresacliente.codigoempresacliente[i],
              direccion:DataUserStore.empresacliente.direccionempresacliente[i],
              giro:DataUserStore.empresacliente.giroempresacliente[i],
              comuna:DataUserStore.empresacliente.nombrecomunaempresacliente[i],
              ciudad:DataUserStore.empresacliente.nombreciudadempresacliente[i],
              rol:DataUserStore.empresacliente.rut_empresacliente[i],
              contacto:DataUserStore.empresacliente.contactoempresacliente[i]
              });
          }
        },
      FijarSesion(){
        document.getElementById("idusuario").disabled=true;
        document.getElementById("idclave").disabled=true;
        this.bandera=1;
        const DataUserStore=useUserStore();
        const lm=this.menuselect.length;
        this.menuselect.splice(0,lm);
        const menuStore = userMenuStore();
        for(let i=0;i<menuStore.usuariomenu.nombre.length;i++){
           if(DataUserStore.tipousuario<=menuStore.usuariomenu.tpouser[i] || menuStore.usuariomenu.titulo[i]==0)
              this.menuselect.push({nombre:menuStore.usuariomenu.nombre[i],linker:menuStore.usuariomenu.link[i],titulo:menuStore.usuariomenu.titulo[i],publicacion:menuStore.usuariomenu.publicacion[i]})
        }
        const DataClienteStore=useClienteStore();
        DataClienteStore.defineCliente(DataUserStore.identificadorEmpresaPropietaria,this.arrctefijo[0].codcliente);
    },
    CerrarSesion(){
          document.getElementById("idusuario").disabled=false;
          document.getElementById("idclave").disabled=false;

          this.bandera=0;
          const DataUserStore=useUserStore();
          const lf=this.arrctefijo.length;
          const lo=this.arrcteopcion.length;
          this.arrctefijo.splice(0,lf);
          this.arrcteopcion.splice(0,lo);
          for(let i=0;i<DataUserStore.empresacliente.nombreempresacliente.length;i++){
              this.arrcteopcion.push({id:i,name:DataUserStore.empresacliente.nombreempresacliente[i],
              codcliente:DataUserStore.empresacliente.codigoempresacliente[i],
              direccion:DataUserStore.empresacliente.direccionempresacliente[i],
              giro:DataUserStore.empresacliente.giroempresacliente[i],
              comuna:DataUserStore.empresacliente.nombrecomunaempresacliente[i],
              ciudad:DataUserStore.empresacliente.nombreciudadempresacliente[i],
              rol:DataUserStore.empresacliente.rut_empresacliente[i],
              contacto:DataUserStore.empresacliente.contactoempresacliente[i]
              });
          }
    },
   }
 });
</script>
<script setup>
  import { ref } from 'vue';
  import { useUserStore } from './stores/user';
  import { userMenuStore } from './stores/menustore';
  const idUsuario = ref('');
  const pwUsuario = ref('');
  const userStore = useUserStore();
  const menuStore = userMenuStore();
  const ValidaUsuario = () => {
        userStore.registerUsuario(idUsuario.value,pwUsuario.value)
        menuStore.fijarsesionmenuUsuario(idUsuario.value);
  }; 
</script>

<style>
*{
  margin: 0;
};
div:hover {background:#2f9f40;}
.not-allowed{cursor:not-allowed;};

.container {
  
  /* display: block; */
  /* background-color: #0ecc30; */
  margin-top: 30px;
  margin-left: 30px;
   margin-bottom: 50px;
  /* width: 800px; */
  /* margin: 20px auto 0; */
}
.imagen {
  
  /* display: block; */
  /* background-color: #0ecc30; */
  margin-top: 10px;
  margin-left: 50px;
   margin-bottom: 10px;
  /* width: 800px; */
  /* margin: 20px auto 0; */
}
.botones {
  
  display: block;
  /* background-color: #0ecc30; */
  margin-top: 30px;
  padding: 30px 20px 20px 100px ;
  margin-bottom: 10px;
}
.boton:hover {
      background-color:rgb(3, 105, 161);
      /* color: rgb(250, 204, 21); */
      color: rgb(255, 255, 255);
      /* text-shadow: 1px 1px #fff; */
      transition: 0.7s;
}
  /* width: 800px; */
input[type=text] {
  /* width: 100%;
  padding: 12px 20px;
  margin: 8px 0; */
  box-sizing: border-box;
  border: 1px solid rgb(212 212 216);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input[type=text]:focus {
  background-color:rgb(201, 200, 200);
}
</style>

