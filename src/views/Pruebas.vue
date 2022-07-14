<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Moneda</h1>
    <div id="app" class="container">
      <input id="idbusqueda" type="search" v-model="nombremoneda"><br><br>
        <label font-bold for="idcodigomoneda">Código Moneda  </label>
        <input id="idcodigomoneda" type="text" size = "15" bg-sky-900 v-model="codigomoneda" maxlength = "20"  @blur="funcionblur()"><br><br>
        <label for="idnombremoneda">Nombre Moneda  </label>
        <input id="idnombremoneda" type="text" v-model="nombremoneda"><br><br>
        <label for="idinactivo">Inactivo  </label>
        <input id="idinactivo" v-model="inactivo" type="checkbox" unchecked>

        <h5> hola {{nombremoneda}}</h5>
        <br>
    </div>

     <div class="botones"> 
      <div justify-center>
        
          <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
          <!-- <button class= "boton shadow-md bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" type="add" @click="funcionEliminar(name)">Eliminar</button>&nbsp &nbsp &nbsp &nbsp -->
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp 
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarReactivo()">Limpiar Reactivo</button>&nbsp &nbsp &nbsp &nbsp                 
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded" @click="count++"> Calculo + {{ count }}</button>&nbsp &nbsp &nbsp &nbsp 
          <!-- <button  @mouseover="{estado = true }">Coloca el puntero sobre mi</button> -->
          <button  class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @mouseout="estado=false" @mouseover="estado=true">Coloca el puntero sobre mi estado {{estado}}</button>
          <br><h1>estado mouse: {{estado}}</h1>
        <!-- <p>{{monedaStore.codigoMoneda}}</p>
        <p>{{monedaStore.nombreMoneda}}</p> -->
      </div>
    </div>

    <div w-full><hr></div>

  </template>

<script setup>
  //  import { DOMDirectiveTransforms } from '@vue/compiler-dom';
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

   function funcionentrar(){ 
   alert("cursor entra ...");
   }

   function funcionsalir(){ 
   alert("cursor sale ...");

 }

  function darFocus(){ 
    document.getElementById("idcodigomoneda").focus();
  }
  function funcionGrabar() {
    alert('Grabar o Regrabar Monedas ')
  }

    function funcionLimpiar() {
//  alert('nombre ' + idnombremoneda.value)
    codigomoneda.value = '';
    nombremoneda.value = '';
    idinactivo.checked = false;
    darFocus();
  }

    function funcionLimpiarReactivo() {
//  alert('nombre ' + idnombremoneda.value)
   const auxcodigomoneda = ref('');
   const auxnombremoneda = ref('');

    codigomoneda.value = '';
    nombremoneda.value = '';
    idinactivo.checked = false;
    darFocus();
  }
  const ValidarMoneda = () => {
       alert.log(codigomoneda.value)
       monedaStore.LeerMoneda(codigomoneda.value)
       console.log(monedaStore.codigomoneda)
   }
  // function funcionSalir(){
  //   <router-link v-bind:to="/views/PlanCuentas.vue"></router-link>
  // }
</script>



<!-- <script src="https://unpkg.com/vue@next"></script> -->
<!-- <script>
import { ref } from 'vue';
const app ={
  data() {
    return {
     nombremoneda:''
    }
  }
}

</script> -->


<style>


</style>