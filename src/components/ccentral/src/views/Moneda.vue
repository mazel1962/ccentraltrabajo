<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Moneda</h1>
    <div id="appmoneda" class="container">
        <label font-bold for="idcodigomoneda">Código Moneda  </label>
        <input id="idcodigomoneda" type="text" size = "15" bg-sky-900 v-model="codigomoneda" maxlength = "20"  @blur="funcionblur()"><br><br>
        <label for="idnombremoneda">Nombre Moneda  </label>
        <input id="idnombremoneda" type="text" size = "100" v-model="nombremoneda" maxlength = "100"><br><br>        
        <label for="iddecimalesmoneda">Decimales Moneda  </label>
        <input id="iddecimalesmoneda" type="number" size = "8" bg-sky-900 maxlength = "1" v-model="decimalesmoneda"><br><br>        
        <label for="idinactivo">Inactivo  </label>
        <input id="idinactivo" v-model="inactivo" type="checkbox" unchecked>
        <br>
    </div>

     <div class="botones"> 
      <div justify-center>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp 
        <!-- <p>{{monedaStore.codigoMoneda}}</p>
        <p>{{monedaStore.nombreMoneda}}</p> -->
      </div>
    </div>
  <div w-full><hr></div>
  </template>

<script setup>
   import { ref } from 'vue'
   import { useMonedaStore } from '../stores/crudmoneda';

   const count = ref(0)
   const estado = ref(false)
   const monedaStore = useMonedaStore()
  //  const CodMoneda = ref('');
  //  const NomMoneda = ref('');   
  

//  import { shallowReactive } from 'vue';

    function funcionblur(){ 
      // alert("pierde el cursor ..." + idcodigomoneda.value )
      monedaStore.leerMoneda(idcodigomoneda.value)
      idnombremoneda.value = monedaStore.storeNombreMoneda
      // nombremoneda.value = monedaStore.storeNombreMoneda
      // alert(monedaStore.storeNombreMoneda)
      document.getElementById("idnombremoneda").focus();
    }

  function posicionarFocus(){ 
    document.getElementById("idcodigomoneda").focus();
  }

  function funcionGrabar() {
    alert('Grabar o Regrabar Monedas ')
  }

  function funcionLimpiar() {
    idcodigomoneda.value = '';
    idnombremoneda.value = '';
    idnombremoneda.value = '';
    iddecimalesmoneda.value = '';
    idinactivo.checked = false;
    posicionarFocus();
  }

  const ValidarMoneda = () => {
       alert.log(codigomoneda.value)
       monedaStore.leerMoneda(codigomoneda.value)
       console.log(monedaStore.codigomoneda)
   }
  // function funcionSalir(){
  //   <router-link v-bind:to="/views/PlanCuentas.vue"></router-link>
  // }
</script>

<style>
input[type=number] {
  box-sizing: border-box;
  border: 1px solid rgb(212 212 216);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input[type=number]:focus {
  background-color:rgb(201, 200, 200);
}

</style>