
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Ciudad</h1>
    <div class="container">
        <label font-bold >Código País</label>&nbsp&nbsp&nbsp
        <input id="idcodigopais" type="text" size = "15" bg-sky-900 v-model="codigopais" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarpais()" >&nbsp &nbsp &nbsp{{ciudadStore.storeNombrePais}}
        <br><br>

        <label >Código País Api 1</label>&nbsp &nbsp
        <select id="cmbpais" v-model.lazy ="codigopais" :value="ciudadStore.storeArrayPaises.codpais[i-1]" :text="presione" >
            <option disabled value="">Seleccione un Pais</option>
            <option v-for="i in ciudadStore.storeArrayPaises.nompais.length">{{ciudadStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>

        <label >Código País Api 2</label>&nbsp &nbsp
        <select id="cmbpais" v-model.lazy ="codigopais" :value="ciudadStore.storeArrayPaises.codpais[i-1]" :text="presione" >
            <option disabled value="">Seleccione un Pais</option>
            <option v-for="i in ciudadStore.storeArrayPaises.codpais.length" @click="codigopais = ciudadStore.storeArrayPaises.nompais[i-1]">{{ciudadStore.storeArrayPaises.codpais[i-1]}}</option>
        </select>
        <br><br>
        <!-- {{i.key}} -->

        <label >Código País Api 3</label>&nbsp &nbsp
        <select v-model ="codigopais">
            <option disabled value="">Seleccione un Pais</option>
            <option v-for="i in ciudadStore.storeArrayPaises.codpais.length" v-bind:key="ciudadStore.storeArrayPaises.codpais[i-1]" v-bind:value="ciudadStore.storeArrayPaises.codpais[i-1]">{{ciudadStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>
Código País: {{codigopais}}
        <label font-bold for="idcodigociudad">Código Ciudad</label>&nbsp&nbsp&nbsp&nbsp&nbsp
        <!-- <input id="idcodigociudad" type="text" size = "15" bg-sky-900 v-model="codigociudad" maxlength = "20" > -->
        <input id="idcodigociudad" type="text" size = "15" bg-sky-900 v-model.lazy = "codigociudad" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarciudad()">
        <br><br>        

        <label for="idnombreciudad">Nombre Ciudad </label>&nbsp&nbsp&nbsp
        <input type="text" size = "100" v-model="ciudadStore.storeNombreCiudad" maxlength = "100">
        <br><br>

        <label for="idcodigoareaciudad">Código Área Ciudad</label>&nbsp&nbsp&nbsp
        <input class="border"  type="text" size = "15" v-model="ciudadStore.storeCodigoAreaCiudad" maxlength = "10"> 
        <br><br>                  

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="ciudadStore.storeInactividad" type="checkbox" unchecked>
        <br>
      <!-- <div class="bg-sky-900 row-start-1 h-4 col-start-2 h-[683px] col-end-6"></div> -->
    </div>
     <div class="botones"> 
      <div justify-center>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarCiudad()">Otra Ciudad</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         {{ciudadStore.storeValidaPais}}
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div>
      <label class="text-gray" >Usuario Creación : </label>  {{ciudadStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{ciudadStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{ciudadStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{ciudadStore.storeFechaModificacion}}
      <br>  

  </template>

<script setup>
   import { ref } from 'vue'
   import swal from "sweetalert";
   import { useCiudadStore } from '../stores/crudciudad';

   const ciudadStore = useCiudadStore()
   const codigopais = ref('');
   const codigociudad = ref('');
   const nombreciudad = ref('');
  
   funcionListarPais();
  
   function funcionListar(){ 
        //  monedaStore.listarMoneda();
         ciudadStore.listarCiudad();
   }

     function funcionListarPais(){ 
        //  monedaStore.listarMoneda();
         ciudadStore.listarPais();
   }

  function posicionarFocus(){ 
    document.getElementById("idcodigopais").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(ciudadStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigociudad").disabled=true;
      ciudadStore.grabarCiudad(codigociudad.value.toUpperCase(), ciudadStore.storeNombreCiudad, ciudadStore.storeCodigoAreaCiudad, codigopais.value.toUpperCase(), codigoinactividad, 'jcrojas@solumerc.cl')
      funcionLimpiarCiudad();
    //  document.getElementById("cmbmonedas").
    // document.getElementById("nombremoneda").focus();
    }

  function funcionLimpiarCiudad() {
    codigociudad.value = '';
    ciudadStore.storeNombrePais = '';
    ciudadStore.storeNombreCiudad = '';
    ciudadStore.storeCodigoPais = '';
    ciudadStore.storeCodigoAreaCiudad = '';
    ciudadStore.storeInactividad = false;
    ciudadStore.storeUsuarioCreacion = '';
    ciudadStore.storeUsuarioModificacion = '';
    ciudadStore.storeFechaCreacion = '';
    ciudadStore.storeFechaModificacion = '';
    document.getElementById("idcodigociudad").disabled=false;
    document.getElementById("idcodigociudad").focus();
  }
 
  function funcionLimpiar() {
    codigopais.value = '';
    codigociudad.value = '';
    ciudadStore.storeNombrePais = '';
    ciudadStore.storeNombreCiudad = '';
    ciudadStore.storeCodigoPais = '';
    ciudadStore.storeCodigoAreaCiudad = '';
    ciudadStore.storeInactividad = false;
    ciudadStore.storeUsuarioCreacion = '';
    ciudadStore.storeUsuarioModificacion = '';
    ciudadStore.storeFechaCreacion = '';
    ciudadStore.storeFechaModificacion = '';
    document.getElementById("idcodigociudad").disabled=false;
    posicionarFocus();

  }
    function funcionvalidarciudad(){ 
      ciudadStore.leerCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase())
      nombreciudad.value = ciudadStore.storeNombreCiudad
      // document.getElementById("idcodigociudad").disabled=true;
    } 
    function funcionvalidarpais(){ 
      //  document.getElementById("idcodigopais").disabled=true;
      // alert("pais -->" + ciudadStore.storeCodigoPais)
      ciudadStore.storeValidaPais = true;
      ciudadStore.leerPais(codigopais.value.toUpperCase())
      if(ciudadStore.storeValidaPais === false){
        document.getElementById("idcodigopais").value='';
        // codigopais.value = '';
        document.getElementById("idcodigopais").focus();
      }else{
         document.getElementById("idcodigociudad").focus();
      }
      
      // nombrepais.value = paisStore.storeNombrePais
    }
</script>


<style>

</style>