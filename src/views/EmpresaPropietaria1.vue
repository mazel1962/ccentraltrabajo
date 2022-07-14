
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención País</h1>
    <div id="apppais" class="container">
      
        <label font-bold >Códigossss País  </label>&nbsp&nbsp&nbsp
        <input id="idcodigopais" type="text" size = "15" bg-sky-900 v-model="codigopais" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarpais()" >&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <select id ="idayudapais" v-model ="codigopais" @change="funcionvalidarpais()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in paisStore.storeArrayPaises.codpais.length" v-bind:key="paisStore.storeArrayPaises.codpais[i-1]" v-bind:value="paisStore.storeArrayPaises.codpais[i-1]">{{paisStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>        
        
        <br><br>
        <label >Nombre País</label>&nbsp&nbsp
        <input type="text" size = "100" v-model="paisStore.storeNombrePais" maxlength = "100">
        <br><br>

        <label >Código Moneda  </label>&nbsp &nbsp 
        <input type="text" size = "20" bg-sky-900 maxlength = "20" v-model="paisStore.storeCodigoMoneda" @blur="funcionvalidarmoneda()">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <select id ="idayudamoneda" v-model ="codigomoneda" >
            <option disabled value="">Seleccione Moneda</option>
            <option v-for="i in monedaStore.storeArrayMonedas.codmoneda.length" v-bind:key="monedaStore.storeArrayMonedas.codmoneda[i-1]" v-bind:value="monedaStore.storeArrayMonedas.codmoneda[i-1]">{{monedaStore.storeArrayMonedas.nommoneda[i-1]}}</option>
        </select>
        <br><br>

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="paisStore.storeInactividad" type="checkbox" unchecked>
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
      <label class="text-gray" >Usuario Creación : </label>  {{paisStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{paisStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{paisStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{paisStore.storeFechaModificacion}}
      <br>   

  </template>

<script setup>
   import { ref } from 'vue'
   import { usePaisStore } from '../stores/crudpais';
   import { useMonedaStore } from '../stores/crudmoneda';

   const paisStore = usePaisStore();
   const monedaStore = useMonedaStore();
   const codigopais = ref('');
   const nombrepais = ref('');
   const codigomoneda = ref('');
   paisStore.storeCodigoMoneda = codigomoneda;
  
  funcionLlenarPais();
  funcionLlenarMoneda();

   function funcionLlenarMoneda(){ 
         monedaStore.listarMoneda();
   }
   function funcionLlenarPais(){ 
         paisStore.listarPais();
   }

   function funcionvalidarmoneda(){
           if("idayudapais" ==''){
              swal({
                title: 'Advertencia',
                text: 'Código moneda no existe...',
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
              });
              return;
            }
   }
  //  function funcionListar(){ 
  //       //  monedaStore.listarMoneda();
  //        paisStore.listarPais();
  //  }

  function posicionarFocus(){ 
    document.getElementById("idcodigopais").focus();
  }

  function funcionGrabar() {

      let codigoinactividad = 0;  

            if(paisStore.storeCodigoMoneda == '123'){
              swal({
                title: 'Advertencia',
                text: `Moneda ${paisStore.storeCodigoMoneda} no existe...`,
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }

      if(paisStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigopais").disabled=true;
      paisStore.grabarPais(codigopais.value.toUpperCase(), paisStore.storeNombrePais, paisStore.storeCodigoMoneda, codigoinactividad, 'jcrojas@solumerc.cl')
      funcionLimpiar();
      funcionLlenarPais();
    //  document.getElementById("cmbmonedas").
    // document.getElementById("nombremoneda").focus();
    }

  function funcionLimpiar() {
    codigopais.value = '';
    codigomoneda.value = '';
    paisStore.storeNombrePais = '';
    paisStore.storeCodigoMoneda = '';
    paisStore.storeInactividad = false;
    paisStore.storeUsuarioCreacion = '';
    paisStore.storeUsuarioModificacion = '';
    paisStore.storeFechaCreacion = '';
    paisStore.storeFechaModificacion = '';
    document.getElementById("idcodigopais").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarpais(){ 
      document.getElementById("idcodigopais").disabled=true;
      paisStore.leerPais(codigopais.value.toUpperCase())
      nombrepais.value = paisStore.storeNombrePais
      // document.getElementById("idcodigomoneda").value=paisStore.storeCodigoMoneda;
      // const codigomoneda1 = ref(paisStore.storeCodigoMoneda);
      //  codigomoneda = paisStore.storeCodigoMoneda
      // codigomoneda = codigomoneda1.value
    } 
</script>


<style>

</style>