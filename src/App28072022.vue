<template>
  <div class="grid grid-rows-2 grid-cols-12 gap-0">  
    <div class="bg-yellow-400 row-start-1 row-end-3 h-32 col-start-1 col-end-3">01</div>
      <div class="bg-yellow-400 row-start-1 row-end-2 h-16 col-start-3 col-end-11">
        <div class="flex space-x-1 h-16 w-full flex-nowrap overflow-x-auto">
            <draggable class="dragArea list-group w-full flex flex-nowrap" :list="arrcteopcion" @start="cambio" group = "task">
              <div class="list-group-item top-0 h-12 w-48 bg-fuchsia-900 text-plata rounded-lg flex flex-nowrap" v-for="ia in arrcteopcion" :key="ia.id">
                {{ia.name}}
              </div> 
            </draggable>
          </div>    
      </div>
    <div class="bg-yellow-100 row-start-2 row-end-3 h-16 col-start-3 col-end-11">
        <div class="flex space-x-1 h-16 w-full flex-nowrap">
          <draggable class="dragArea list-group w-full flex flex-nowrap" :list="arrctefijo" @change="cambiofijo" group = "task">
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.name}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.direccion}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.comuna}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.ciudad}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.giro}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.rol}} 
            </div>
            <div class=" top-0 h-12 w-48 text-plata bg-fuchsia-900 rounded-lg list-group-item flex flex-nowrap" v-for="ib in arrctefijo" :key="ib.id">
              {{ib.contacto}} 
            </div>
         </draggable>
        </div>
    </div> 
    <div class="bg-yellow-400 text-neutral-900 row-start-1 row-end-3 h-32 col-start-11 col-end-13">
      <div class="grid grid-rows-4 grid-cols-8 gap-2 bg-yellow-400 text-neutral-900">
        <div class="bg-yellow-400 text-neutral-900 row-start-1 row-end-2 col-start-1 col-end-4 h-8">Usuario</div>
        <div class="bg-yellow-400 text-neutral-900 row-start-1 row-end-2 col-start-4 col-end-7 h-8"><input type="text" v-model="idUsuario" placeholder="Usuario"></div>
        <div class="bg-yellow-400 text-neutral-900 row-start-2 row-end-3 col-start-1 col-end-4 h-8">Contraseña</div>
        <div class="bg-yellow-400 text-neutral-900 row-start-2 row-end-3 col-start-4 col-end-7 h-8"><input type="text" v-model="pwUsuario" placeholder="Contraseña" @change="ValidaUsuario()"></div>
        <div class="bg-sky-900 text-plata text-center row-start-3 row-end-4 col-start-2 col-end-3 h-8" v-if="bandera==1"><button @click="IniciaSesion()">I SESION</button></div>
        <div class="bg-sky-900 text-plata text-center row-start-3 row-end-4 col-start-2 col-end-3 h-8" v-else><button disabled>I SESION</button></div>
        <div class="bg-sky-900 text-plata text-center row-start-3 row-end-4 col-start-4 col-end-5 h-8" v-if="bandera==1"><button @click="FijarSesion()">F SESION</button></div>
        <div class="bg-sky-900 text-plata text-center row-start-3 row-end-4 col-start-4 col-end-5 h-8" v-else><button disabled>F SESION</button></div>
        <div class="bg-sky-900 text-plata text-center row-start-3 row-end-4 col-start-5 col-end-6 h-8" v-if="bandera==0"><button @click="CerrarSesion()">C SESION</button></div>
        <div class="bg-sky-900 text-plata text-center row-start-3 row-end-4 col-start-5 col-end-6 h-8" v-else><button disabled>C SESION</button></div>
      </div>
    </div>
  </div>
<div class="bg-yellow-400 row-start-5 row-end-5 col-start-1 h-4 w-full col-end-13">05</div>   
  <div class="grid grid-cols-12 gap-0">
    <div class="flex bg-sky-900 row-start-1  text-plata col-start-1 h-[683px] col-end-3 flex-nowrap overflow-y-auto">
         <nav>
             <ul>   
                <li v-for="Item of menuselect" >
                     <div v-if="Item.titulo==0" class="bg-blue-600 text-plata">{{Item.nombre}}</div>
                     <div v-else class="bg-sky-900 text-plata"><router-link v-bind:to="'/views/'+Item.linker">{{Item.nombre}}</router-link></div>
                </li>
              </ul>
          </nav>
    </div> 
    <div class="flex bg-plata row-start-1 col-start-3 h-[683px] col-end-13 flex-nowrap overflow-y-auto">
         <router-view></router-view>
    </div>   
  </div>
 
  <div class="grid grid-cols-12 gap-0">
      <div class="bg-sky-900 text-plata row-start-1 row-end-3 col-start-1 h-32 w-full col-end-13"><EPropietaria/></div> 
  </div>

</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { defineComponent} from 'vue'
import { useUserStore } from './stores/user';
import { userMenuStore } from './stores/menustore';
 export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      
    },
     data() {
      return {
        bandera:1,
        enabled: true,
        arrcteopcion:[{id:0,name:"Demo",codcliente:"",direccion:"",giro:"",comuna:"",ciudad:"",rol:"",contacto:""}],
        arrctefijo:[{id:0,name:"Demo",codcliente:"",direccion:"",giro:"",comuna:"",ciudad:"",rol:"",contacto:""}],
        dragging: false,
        imguno: '../uno.png',
        imgdos: '../dos.png',
        imgtres: '../tres.png',
        imgcuatro: '../cuatro.png',
        menuselect:[{nombre:"Demo",linker:'Entrada.vue',titulo:0, publicacion:"bg-sky-600 text-plata"}]
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
        this.bandera=0;
        const DataUserStore=useUserStore();
        const lm=this.menuselect.length;
        this.menuselect.splice(0,lm);
        const menuStore = userMenuStore();
        for(let i=0;i<menuStore.usuariomenu.nombre.length;i++){
           if(DataUserStore.tipousuario<=menuStore.usuariomenu.tpouser[i] || menuStore.usuariomenu.titulo[i]==0)
              this.menuselect.push({nombre:menuStore.usuariomenu.nombre[i],linker:menuStore.usuariomenu.link[i],titulo:menuStore.usuariomenu.titulo[i],publicacion:menuStore.usuariomenu.publicacion[i]})
        }
    },
    CerrarSesion(){
             alert("cerrar sesion");
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
