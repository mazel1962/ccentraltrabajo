<template>
    <div id="appcargarplancuenta" class="container">
        <h1 class="text-center bg-sky-900 text-plata">Carga automática Plan de Cuentas</h1>
        <p style="color: white" align="right" v-if="cargarplancuentaStore.storeExiste === true">  Cargar Plan de Cuentas&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Ingresar Periodos&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <!-- <br> -->
        <label font-bold>Agrupación&nbsp:</label>&nbsp&nbsp&nbsp&nbsp{{userStore.nombreEmpresaPropietaria}}  
        <br><br>
        <p> Este procedimiento tiene como finalidad la carga automática del plan de cuenta para la empresa {{ClienteStore.nombreEmpresaCliente}} , seleccione el archivo y luego presionar botón cargar</p>
       <br>
       <input id="archivoExcel" type="file" bg-sky-900 @change="subirExcel()" />
  <br><br>
        <table
          :headers="cabecera"
          :items="items"
        >
        <!-- </table>

      <table border="2">
        <font size=2> -->
 
      <tr v-for="i in cargarplancuentaStore.items.length">
          <td style="text-align:right;"> {{i - 1}} .- </td>
          <td style="text-align:center;">{{ cargarplancuentaStore.items[i - 1] [0]}}</td> 
          <td>{{ cargarplancuentaStore.items[i - 1] [1]}} </td>
          <td style="text-align:center;"> {{ cargarplancuentaStore.items[i - 1] [2]}}</td>
          <td style="text-align:center;"> {{ cargarplancuentaStore.items[i - 1] [3]}}</td>
          <td style="text-align:center;"> {{ cargarplancuentaStore.items[i - 1] [4]}}</td>
          <td style="text-align:center;"> {{ cargarplancuentaStore.items[i - 1] [5]}}</td>
          <td style="text-align:center;"> {{ cargarplancuentaStore.items[i - 1] [6]}}</td>
          <td style="text-align:center;"> {{ cargarplancuentaStore.items[i - 1] [7]}}</td>
      </tr>
    </table>

      <!-- <select id="idayudacuenta" v-model="codigocuenta" @change="funcionvalidarcuenta()" required>
      <option disabled value="">Seleccione Cuenta</option>
      <option v-for="i in cargarplancuentaStore.items.length"
        v-bind:key="cargarplancuentaStore.items[i - 1]"
        v-bind:value="cargarplancuentaStore.items[i - 1]">
        {{ cargarplancuentaStore.items[i - 1] [1]}} 
        </option>
    </select><br>  -->

   <br><br>
    <!-- </div>
     <div class="botones"> 
      <div justify-center> -->
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Cargar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <br><br>
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      <!-- </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div> -->
      <br>  
    </div> 
  </template>

<script setup>
   import { ref } from 'vue'
    // import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';
    import { useCargarPlanCuentaStore } from '../stores/crudcargarplancuenta';
    import { useUserStore } from '../stores/user';
    import { useClienteStore} from '../stores/clienteStore';

    import { jsPDF } from "jspdf";
    import 'jspdf-autotable'; 
    // import readXlsFile from "read-excel-file"

  //  const empresapropietariaStore = useEmpresaPropietariaStore();
  //  const codigoempresapropietaria = ref('');

   const userStore = useUserStore()
   const ClienteStore = useClienteStore()

   const cargarplancuentaStore = useCargarPlanCuentaStore();
   const codigosistema = ref('');
   const codigoperiodo = ref('');
   const codigocuenta = ref('');
  //  const periodo = ref('');

  //  funcionLlenarSistemas();
 
  function subirExcel(){
    const entrada = document.getElementById("archivoExcel");
    cargarplancuentaStore.subirExcel(entrada);
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
import { isThisSecond } from 'date-fns';

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