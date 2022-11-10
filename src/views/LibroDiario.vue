<template>
    <div id="applibrodiario" class="container">
        <h1 class="text-center bg-sky-900 text-plata">Libro Diario</h1>
        <p style="color: white" align="right" v-if="librodiarioStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Imprimir Libro Diario&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>

        <label>Libro oficial</label>&nbsp
        <input id="idlibrooficial" v-model="librodiarioStore.storeLibroOficial" type="checkbox" unchecked>&nbsp&nbsp
        <br><br>
      
        <label font-bold >Año Contable</label>&nbsp&nbsp&nbsp
        <select id="idcodigoperiodo" v-model="codigoperiodo" @change="funcionvalidarperiodo()" required>
            <option disabled value="">Seleccione Año</option>
            <option v-for="i in librodiarioStore.storeArrayPeriodos.codigoperiodo.length"
               v-bind:key="librodiarioStore.storeArrayPeriodos.codigoperiodo[i - 1]"
               v-bind:value="librodiarioStore.storeArrayPeriodos.codigoperiodo[i - 1]">
               {{ librodiarioStore.storeArrayPeriodos.codigoperiodo[i - 1] }}
            </option>
        </select>        
         &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <label>Mes Desde </label>&nbsp
        <select id="idmesdesde" v-model="mesDesde">
           <option disabled value="">Seleccione mes contable</option>
           <option value=1>Enero</option>
           <option value=2>Febrero</option>
           <option value=3>Marzo</option>
           <option value=4>Abril</option>
           <option value=5>Mayo</option>
           <option value=6>Junio</option>
           <option value=7>Julio</option>
           <option value=8>Agosto</option>
           <option value=9>Septiembre</option>
           <option value=10>Octubre</option>
           <option value=11>Noviembre</option>
           <option value=12>Diciembre</option>                
        </select>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <label>Mes Hasta </label>&nbsp
        <select id="idmeshasta" v-model="mesHasta">
          <option disabled value="">Seleccione mes contable</option>
          <option value=1>Enero</option>
          <option value=2>Febrero</option>
          <option value=3>Marzo</option>
          <option value=4>Abril</option>
          <option value=5>Mayo</option>
          <option value=6>Junio</option>
          <option value=7>Julio</option>
          <option value=8>Agosto</option>
          <option value=9>Septiembre</option>
          <option value=10>Octubre</option>
          <option value=11>Noviembre</option>
          <option value=12>Diciembre</option>
        </select>
        <br><br>mes hasta {{mesHasta}}
        <fieldset>
           <legend>Criterio de orden</legend>
           <label>
               <input type="radio" name="orden" value="F" checked> Cronológico
           </label>&nbsp&nbsp&nbsp
           <label>
               <input type="radio" name="orden" value="C"> Tipo de comprobante
           </label>
        </fieldset>
<br><br>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <br><br>
    </div>
  </template>

<script setup>
   import { ref } from 'vue'
   import { useLibroDiarioStore } from '../stores/crudlibrodiario';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';
 
   const userStore = useUserStore()
   const ClienteStore = useClienteStore()
   const librodiarioStore = useLibroDiarioStore();
   const anhocontable = ref('');
   const mesDesde = ref('');
   const mesHasta = ref('');
   const codigoperiodo = ref('');
  
 funcionLlenarAnhos();

  function funcionLlenarAnhos() {
    librodiarioStore.listarperiodosistema(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, 'CONTABILIDAD');
  }

  function posicionarFocus(){ 
    document.getElementById("idcodigoperiodo").focus();
  }

  function funcionLimpiar() {
    codigoperiodo.value = '';
    mesDesde.value = '';
    mesHasta.value = '';
    librodiarioStore.storeInactividad.unchecked;
    codigosistema.value = 'CONTABILIDAD';
    // aperturaperiodosStore.storeCodigoPeriodo = '';
    librodiarioStore.storeLibroOficial = false;
    librodiarioStore.storeExiste=false;
    document.getElementById("idcodigoperiodo").disabled=false;
    posicionarFocus();
  }   

  function funcionvalidarperiodo(){ 
      // document.getElementById("idcodigoperiodo").disabled=true;
      librodiarioStore.leerPeriodos(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, 'CONTABILIDAD', codigoperiodo)
  }
  function funcionImprimir() {
     var combo = document.getElementById("idmesdesde");
     var nombreMes = combo.options[combo.selectedIndex].text;

     alert("mesDesde.value="+ mesDesde.value + "  " + "mesHasta.value="+ mesHasta.value + "  " + "mesDesde="+ mesDesde + "<----  nombreMes = "+ nombreMes)
    //  mesDesde.selectedIndex
     librodiarioStore.listarLibroDiario(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, codigoperiodo.value, mesDesde.value, mesHasta.value, nombreMes, 'F', librodiarioStore.storeLibroOficial, `${userStore.nombreEmpresaPropietaria}`, `${ClienteStore.nombreEmpresaCliente}`, `${ClienteStore.rutEmpresaCliente}`,`${ClienteStore.direccionEmpresaCliente}`, `${ClienteStore.comunaEmpresaCliente}`, `${ClienteStore.girocomerialEmpresaCliente}`);
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