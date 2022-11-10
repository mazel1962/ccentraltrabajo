<template>
    <div id="applibromayor" class="container">
        <h1 class="text-center bg-sky-900 text-plata">Libro Mayor</h1>
        <p style="color: white" align="right" v-if="libromayorStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Imprimir Libro Mayor&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>

        <label>Libro oficial</label>&nbsp
        <input id="idlibrooficial" v-model="libromayorStore.storeLibroOficial" type="checkbox" unchecked>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <label>Una Página por hoja</label>&nbsp
        <input id="idpaginaporhoja" v-model="libromayorStore.storePaginaPorHoja" type="checkbox" unchecked>

        <br><br>
      
        <label font-bold >Año Contable</label>&nbsp&nbsp&nbsp
        <select id="idcodigoperiodo" v-model="codigoperiodo" @change="funcionvalidarperiodo()" required>
            <option disabled value="">Seleccione Año</option>
            <option v-for="i in libromayorStore.storeArrayPeriodos.codigoperiodo.length"
               v-bind:key="libromayorStore.storeArrayPeriodos.codigoperiodo[i - 1]"
               v-bind:value="libromayorStore.storeArrayPeriodos.codigoperiodo[i - 1]">
               {{ libromayorStore.storeArrayPeriodos.codigoperiodo[i - 1] }}
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
        <br><br>
        <fieldset>
           <legend>Criterio de selección</legend>
           <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <input type="radio" id="iduno" name="seleccion" value="T" v-model="selector" checked @change="funcionvalidarselector()" required> Todas
          </label><br>
           <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <input type="radio" id="iddos" name="seleccion" value="I" v-model="selector" @change="funcionvalidarselector()"> Intervalo de cuentas
            <p v-if="selector === 'I' ">
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <label font-bold for="idcuentainicial">Cuenta Inicial</label>&nbsp&nbsp
              <input id="idcuentainicial" type="text" size="10" v-model="cuentaInicial" @change="funcionvalidarcuentainicial()" required>
              <!-- {{libromayorStore.storeValidarCuentaContable}}  -  {{cuentaInicial}}  -->
              <!-- <h2 v-if ="libromayorStore.storeValidarCuentaContable===false">
                cuentaInicial =''
              </h2> -->
              &nbsp&nbsp&nbsp&nbsp
              <label font-bold for="idcuentafinal">Cuenta Final</label>&nbsp&nbsp
              <input id="idcuentafinal" type="text" size="10" v-model="cuentaFinal" @change="funcionvalidarcuentafinal()" required>
              <!-- {{libromayorStore.storeValidarCuentaContable}}  -  {{cuentaFinal}}  -->
              <!-- <h2 v-if ="libromayorStore.storeValidarCuentaContable===false">
                Reingrese cuenta...
              </h2>               -->
            </p>
<!-- =============================================  -->
          </label><br>
           <!-- <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp -->
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <input type="radio" id="idtres" name="seleccion" value="S" v-model="selector" @change="funcionvalidarselector()"> Cuenta Individual
            <p v-if="selector === 'S'">
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <label font-bold for="idcuentacontable">Cuenta Contable</label>&nbsp&nbsp
              <input id="idcuentacontable" type="text" size="10" v-model="cuentaContable" @change="funcionvalidarcuentacontable()" required>
              <!-- <h2 v-if ="libromayorStore.storeValidarCuentaContable===false">
                No existe cuenta contable, reingrese...
              </h2> -->
            </p>
            <br>
           <span>Eligió: {{ selector }}</span>
     <!-- <h1 v-if="selector === 'I'">  Pedir cuentas &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </h1>
     <h1 v-else>  NO PEDIR CUENTAS &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </h1> -->
        </fieldset>
        <br><br>
        <br><br>

         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <br><br>
    </div>
  </template>

<script setup>
   import { ref } from 'vue'
   import { useLibroMayorStore } from '../stores/crudlibromayor';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';
 
   const userStore = useUserStore()
   const ClienteStore = useClienteStore()
   const libromayorStore = useLibroMayorStore();
   const anhocontable = ref('');
   const mesDesde = ref('');
   const mesHasta = ref('');
   const codigoperiodo = ref('');
   const selector = ref('');
   const cuentaContable = ref('');
   const cuentaInicial = ref('');
   const cuentaFinal = ref('');
   const nombrecuenta = ref('');
  
 funcionLlenarAnhos();

// -------------    TERMINO DEL PROGRAMA    ----------------
  
  function funcionLlenarAnhos() {
    libromayorStore.listarperiodosistema(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, 'CONTABILIDAD');
  }

  function posicionarFocus(){ 
    document.getElementById("idcodigoperiodo").focus();
  }

  function funcionLimpiar() {
    codigoperiodo.value = '';
    mesDesde.value = '';
    mesHasta.value = '';
    libromayorStore.storeInactividad.unchecked;
    codigosistema.value = 'CONTABILIDAD';
    // aperturaperiodosStore.storeCodigoPeriodo = '';
    libromayorStore.storeLibroOficial = false;
    libromayorStore.storeExiste=false;
    document.getElementById("idcodigoperiodo").disabled=false;
    posicionarFocus();
  }   

  function funcionvalidarperiodo(){ 
      // document.getElementById("idcodigoperiodo").disabled=true;
      libromayorStore.leerPeriodos(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, 'CONTABILIDAD', codigoperiodo)
  }
  function funcionImprimir() {
     var combo = document.getElementById("idmesdesde");
     var nombreMes = combo.options[combo.selectedIndex].text;

     alert("mesDesde.value="+ mesDesde.value + "  " + "mesHasta.value="+ mesHasta.value + "  " + "mesDesde="+ mesDesde + "<----  nombreMes = "+ nombreMes)
    //  mesDesde.selectedIndex
     libromayorStore.listarLibroMayor(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, codigoperiodo.value, mesDesde.value, mesHasta.value, nombreMes, 'F', libromayorStore.storeLibroOficial, `${userStore.nombreEmpresaPropietaria}`, `${ClienteStore.nombreEmpresaCliente}`, `${ClienteStore.rutEmpresaCliente}`,`${ClienteStore.direccionEmpresaCliente}`, `${ClienteStore.comunaEmpresaCliente}`, `${ClienteStore.girocomerialEmpresaCliente}`);
  }

  function funcionvalidarselector() {
    switch (selector.value) {
      case 'T':
          cuentaInicial.value ='';
          cuentaFinal.value ='';
          cuentaContable.value =''; 
          break;
      case 'I':
    // alert("se fue por I ")
          cuentaContable.value =''; 
          break;
      case 'S':
          cuentaInicial.value ='';
          cuentaFinal.value ='';
          break;    
      default:
          alert("se fue por default ")
          break; 
    }
  }

  const funcionvalidarcuentacontable = () =>{
  libromayorStore.leerPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, cuentaContable.value);
  nombrecuenta.value = libromayorStore.storeNombreCuenta;
}

const funcionvalidarcuentainicial = () =>{
  libromayorStore.leerPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, cuentaInicial.value);
  nombrecuenta.value = libromayorStore.storeNombreCuenta;
}

const funcionvalidarcuentafinal = () =>{
  libromayorStore.leerPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, cuentaFinal.value);
  nombrecuenta.value = libromayorStore.storeNombreCuenta;
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