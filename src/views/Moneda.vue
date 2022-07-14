<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Moneda</h1>
    <div id="appmoneda" class="container">
        <label font-bold >Código Moneda  </label>&nbsp&nbsp&nbsp
        <input id="idcodigomoneda" type="text" size = "15" bg-sky-900 v-model="codigomoneda" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarmoneda()" >&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
        <select id ="idayudamoneda" v-model ="codigomoneda" @change="funcionvalidarmoneda()" required>
            <option disabled value="">Seleccione Moneda</option>
            <option v-for="i in monedaStore.storeArrayMonedas.codmoneda.length" v-bind:key="monedaStore.storeArrayMonedas.codmoneda[i-1]" v-bind:value="monedaStore.storeArrayMonedas.codmoneda[i-1]">{{monedaStore.storeArrayMonedas.nommoneda[i-1]}}</option>
        </select>
        <br><br>

        <label >Nombre Moneda</label>&nbsp
        <input type="text" size = "100" v-model="monedaStore.storeNombreMoneda" maxlength = "100">
        <br><br>

        <label >Decimales Moneda  </label>&nbsp &nbsp 
        <input type="number" size = "8" bg-sky-900 maxlength = "1" v-model.number="monedaStore.storeDecimalesMoneda">
        <br><br> 

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="monedaStore.storeInactividad" type="checkbox" unchecked>
        <br>
    </div>

     <div class="botones"> 
      <div justify-center>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div>
      <label class="text-gray" >Usuario Creación : </label>  {{monedaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{monedaStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{monedaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{monedaStore.storeFechaModificacion}}
      <br>   
  </template>
<!-- <script>
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
</script> -->

<script>
export default {
  data() {
    return {
      selected:''
    }
  }
}
</script>

<script setup>
   import { ref } from 'vue'
   import { useMonedaStore } from '../stores/crudmoneda';

   const monedaStore = useMonedaStore()
   const codigomoneda = ref('');
   const nombremoneda = ref('');
   funcionLlenarMoneda();

   function funcionLlenarMoneda(){ 
         monedaStore.listarMoneda();
   }

  //  function funcionListar(){ 
  //       //  monedaStore.listarMoneda();
  //        monedaStore.listarMoneda();
  //  }

  function posicionarFocus(){ 
    document.getElementById("idcodigomoneda").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(monedaStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigomoneda").disabled=true;
      monedaStore.grabarMoneda(codigomoneda.value.toUpperCase(), monedaStore.storeNombreMoneda, monedaStore.storeDecimalesMoneda, codigoinactividad, 'jcrojas@solumerc.cl')
      funcionLimpiar();
      funcionLlenarMoneda();
    //  document.getElementById("cmbmonedas").
    // document.getElementById("nombremoneda").focus();
    }

  function funcionLimpiar() {
    codigomoneda.value = '';
    monedaStore.storeNombreMoneda = '';
    monedaStore.storeDecimalesMoneda = '0';
    monedaStore.storeInactividad = false;
    monedaStore.storeUsuarioCreacion = '';
    monedaStore.storeUsuarioModificacion = '';
    monedaStore.storeFechaCreacion = '';
    monedaStore.storeFechaModificacion = '';
    document.getElementById("idcodigomoneda").disabled=false;
    posicionarFocus();
    // document.getElementById("idcodigomoneda").focus();

    // Limpiar el select y dejarlo vacio
    // const $select = document.querySelector("#cmbmonedas");
    // const limpiar = () => {
    //   for (let i = $select.options.length; i >= 0; i--) {
    //    $select.remove(i);
    //  }
    // };
  }

    function funcionvalidarmoneda(){ 
      document.getElementById("idcodigomoneda").disabled=true;
      monedaStore.leerMoneda(codigomoneda.value.toUpperCase())
      nombremoneda.value = monedaStore.storeNombreMoneda
    }
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