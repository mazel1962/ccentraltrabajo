<template>
    <div id="appperiodos" class="container">
        <h1 class="text-center bg-sky-900 text-plata">Apertura Periodos</h1>
        <p style="color: white" align="right" v-if="aperturaperiodosStore.storeExiste === true">  Modificar Periodos&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Ingresar Periodos&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <!-- <br> -->
        <label font-bold>Agrupación&nbsp:</label>&nbsp&nbsp&nbsp&nbsp{{userStore.nombreEmpresaPropietaria}}  
        <br><br>
       <label font-bold >Sistema</label>&nbsp&nbsp&nbsp
       <select id="idayudasistema" v-model="codigosistema">
           <option disabled value="">Seleccione Sistema</option>
           <option value="CONTABILIDAD">Contabilidad</option>
       
       </select>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp         
       <label font-bold >Periodo</label>&nbsp&nbsp&nbsp
       <input id="idcodigoperiodo" type="text" size="10" bg-sky-900 v-model="codigoperiodo" @change="funcionvalidarsistema()">&nbsp

    <select id="idayudaperiodo" v-model="codigoperiodo" @change="funcionvalidarperiodo()" required>
      <option disabled value="">Seleccione Año</option>
      <option v-for="i in aperturaperiodosStore.storeArrayPeriodos.codigoperiodo.length"
        v-bind:key="aperturaperiodosStore.storeArrayPeriodos.codigoperiodo[i - 1]"
        v-bind:value="aperturaperiodosStore.storeArrayPeriodos.codigoperiodo[i - 1]">
        Año - {{ aperturaperiodosStore.storeArrayPeriodos.codigoperiodo[i - 1] }}
      </option>
    </select>        
        <!-- <Datepicker v-model="date"></Datepicker>          -->
         <!-- <Datepicker v-model="year" yearPicker /> -->
        
        <!-- <select id ="idayudaclasificacion" v-model ="anoperiodo" @change="funcionvalidarclasificacion()" required>
            <option disabled value="">Seleccione Clasificación</option>
            <option v-for="i in clasificacionStore.storeArrayClasificacion.codclasificacion.length" v-bind:key="clasificacionStore.storeArrayClasificacion.codclasificacion[i-1]" v-bind:value="clasificacionStore.storeArrayClasificacion.codclasificacion[i-1]">{{clasificacionStore.storeArrayClasificacion.codclasificacion[i-1]}} - {{clasificacionStore.storeArrayClasificacion.nomclasificacion[i-1]}}</option>
        </select>   -->
        <br><br>

<table border="1">

  <tr>
      <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>
      <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>
      <td><hr></td>  <td><hr></td>  <td><hr></td>
  </tr>  
  <tr>
	    <td>SISTEMAS</td>
	    <td style="text-align:center;">&nbsp&nbsp&nbspEnero&nbsp&nbsp&nbsp</td>
	    <td style="text-align:center;">&nbsp&nbspFebrero&nbsp&nbsp</td>
	    <td style="text-align:center;">&nbsp&nbsp&nbspMarzo&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbsp&nbsp&nbspAbril&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbsp&nbsp&nbspMayo&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbsp&nbsp&nbspJunio&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbsp&nbsp&nbspJulio&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbsp&nbsp&nbspAgosto&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbspSeptiembre&nbsp</td>
      <td style="text-align:center;">&nbsp&nbsp&nbspOctubre&nbsp&nbsp&nbsp</td>
      <td style="text-align:center;">&nbspNoviembre&nbsp</td>
      <td style="text-align:center;">&nbspDiciembre&nbsp</td>
  </tr>
  <tr>
      <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>
      <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>
      <td><hr></td>  <td><hr></td>  <td><hr></td>
  </tr>
  <tr>
      <td>{{codigosistema}} &nbsp {{codigoperiodo}}</td>
		  <td style="text-align:center;"> <input id="idenero" v-model="aperturaperiodosStore.storeEnero" type="checkbox" unchecked></td>
		  <td style="text-align:center;"> <input id="idfebrero" v-model="aperturaperiodosStore.storeFebrero" type="checkbox" unchecked></td>      
		  <td style="text-align:center;"> <input id="idmarzo" v-model="aperturaperiodosStore.storeMarzo" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="idabril" v-model="aperturaperiodosStore.storeAbril" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="idmayo" v-model="aperturaperiodosStore.storeMayo" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="idjunio" v-model="aperturaperiodosStore.storeJunio" type="checkbox" unchecked></td>
			<td style="text-align:center;"> <input id="idjulio" v-model="aperturaperiodosStore.storeJulio" type="checkbox" unchecked></td>
		  <td style="text-align:center;"> <input id="idagosto" v-model="aperturaperiodosStore.storeAgosto" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="idseptiembre" v-model="aperturaperiodosStore.storeSeptiembre" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="idoctubre" v-model="aperturaperiodosStore.storeOctubre" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="idnoviembre" v-model="aperturaperiodosStore.storeNoviembre" type="checkbox" unchecked></td>
      <td style="text-align:center;"> <input id="iddiciembre" v-model="aperturaperiodosStore.storeDiciembre" type="checkbox" unchecked></td>
  </tr>

  <br>

  <tr>
     <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  
     <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>  <td><hr></td>
     <td><hr></td>  <td><hr></td>  <td><hr></td>
  </tr>
  </table>
  <br>
    <!-- </div>
     <div class="botones"> 
      <div justify-center> -->
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <br><br>
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      <!-- </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div> -->
      <label class="text-gray" >Usuario Creación : </label>  {{aperturaperiodosStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{aperturaperiodosStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{aperturaperiodosStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{aperturaperiodosStore.storeFechaModificacion}}
      <br>  
    </div> 
  </template>

<script setup>
   import { ref } from 'vue'
    // import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';
    import { useAperturaPeriodosStore } from '../stores/crudaperturaperiodos';
    import { useUserStore } from '../stores/user';
    import { useClienteStore} from '../stores/clienteStore';

    import { jsPDF } from "jspdf";
    import 'jspdf-autotable'; 
    
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

  //  const empresapropietariaStore = useEmpresaPropietariaStore();
  //  const codigoempresapropietaria = ref('');

   const userStore = useUserStore()
   const ClienteStore = useClienteStore()

   const aperturaperiodosStore = useAperturaPeriodosStore();
   const codigosistema = ref('');
   const codigoperiodo = ref('');
  //  const periodo = ref('');

  //  funcionLlenarSistemas();
 funcionLlenarAnhos();

function funcionLlenarAnhos() {
    aperturaperiodosStore.listarperiodosistema(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, 'CONTABILIDAD');
}

  function funcionLlenarSistemas(){ 
      aperturaperiodosStore.listarPeriodos(`${userStore.identificadorEmpresaPropietaria}`);
   }

  function posicionarFocus(){ 
    document.getElementById("idcodigoperiodo").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(aperturaperiodosStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      aperturaperiodosStore.grabarPeriodos(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, codigosistema.value.toUpperCase(), codigoperiodo.value, aperturaperiodosStore.storeEnero, aperturaperiodosStore.storeFebrero, aperturaperiodosStore.storeMarzo, aperturaperiodosStore.storeAbril, aperturaperiodosStore.storeMayo, aperturaperiodosStore.storeJunio, aperturaperiodosStore.storeJulio, aperturaperiodosStore.storeAgosto, aperturaperiodosStore.storeSeptiembre, aperturaperiodosStore.storeOctubre, aperturaperiodosStore.storeNoviembre, aperturaperiodosStore.storeDiciembre, `${userStore.identificadorUsuario}`)
      funcionLimpiar();
    }

  function funcionLimpiar() {
    codigoperiodo.value = '';
    codigosistema.value = 'CONTABILIDAD';
    aperturaperiodosStore.storeCodigoSistema = 'Contabilidad';
    // aperturaperiodosStore.storeCodigoPeriodo = '';
    aperturaperiodosStore.storeEnero = false;
    aperturaperiodosStore.storeFebrero = false;
    aperturaperiodosStore.storeMarzo = false;
    aperturaperiodosStore.storeAbril = false;
    aperturaperiodosStore.storeMayo = false;
    aperturaperiodosStore.storeJunio = false;
    aperturaperiodosStore.storeJulio = false;
    aperturaperiodosStore.storeAgosto = false;
    aperturaperiodosStore.storeSeptiembre = false;
    aperturaperiodosStore.storeOctubre = false;
    aperturaperiodosStore.storeNoviembre = false;
    aperturaperiodosStore.storeDiciembre = false;
    aperturaperiodosStore.storeInactividad = false;
    aperturaperiodosStore.storeFechaCreacion = '';
    aperturaperiodosStore.storeFechaModificacion =  '';
    aperturaperiodosStore.storeUsuarioCreacion = '';
    aperturaperiodosStore.storeUsuarioModificacion = '';
    aperturaperiodosStore.storeExiste=false;
    document.getElementById("idcodigoperiodo").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarperiodo(){ 
      document.getElementById("idcodigoperiodo").disabled=true;
      aperturaperiodosStore.leerPeriodos(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, codigosistema.value.toUpperCase(), codigoperiodo.value)
    }
 
</script>
<script>
import { ref } from 'vue';

export default {
    setup() {
        const year = ref(new Date().getFullYear());
        
        return {
          year,
        }
    }
}
</script>
<style>
.container {
  
  /* display: block; */
  /* background-color: #0ecc30; */
  margin-top: 30px;
  margin-left: 30px;
   margin-bottom: 50px;
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