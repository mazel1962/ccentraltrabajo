
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Comuna</h1>
    <div class="container">

        <label >País </label>&nbsp &nbsp&nbsp &nbsp &nbsp &nbsp
        <select id ="idcodigopais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in paisStore.storeArrayPaises.codpais.length" v-bind:key="paisStore.storeArrayPaises.codpais[i-1]" v-bind:value="paisStore.storeArrayPaises.codpais[i-1]">{{paisStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>

        <label>Código Ciudad</label>&nbsp&nbsp&nbsp&nbsp&nbsp
        <select id ="idcodigociudad" v-model ="codigociudad" @change="funcionLlenarComuna()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in ciudadStore.storeArrayCiudades.codciudad.length" v-bind:key="ciudadStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="ciudadStore.storeArrayCiudades.codciudad[i-1]">{{ciudadStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>
        <br><br>          

        <label font-bold for="idcodigocomuna">Código Comuna</label>&nbsp&nbsp&nbsp&nbsp&nbsp
        <input id="idcodigocomuna" type="text" size = "15" bg-sky-900 v-model = "codigocomuna" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarcomuna()">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <select id ="idayudacomuna" v-model ="codigocomuna" @change="funcionvalidarcomuna()" required>
            <option disabled value="">Seleccione Comuna</option>
            <option v-for="i in comunaStore.storeArrayComunas.codcomuna.length" v-bind:key="comunaStore.storeArrayComunas.codcomuna[i-1]" v-bind:value="comunaStore.storeArrayComunas.codcomuna[i-1]">{{comunaStore.storeArrayComunas.nomcomuna[i-1]}}</option>
        </select>
        <br><br> 

        <label for="idnombrecomuna">Nombre Comuna </label>&nbsp&nbsp&nbsp
        <input type="text" size = "100" v-model="comunaStore.storeNombreComuna" maxlength = "100">
        <br><br>

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="comunaStore.storeInactividad" type="checkbox" unchecked>
        <br>
    </div>

     <div class="botones"> 
      <div justify-center>
        <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarCiudad()">Otra Ciudad</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarComuna()">Otra Comuna</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
      </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div>
      <label class="text-gray" >Usuario Creación : </label>  {{comunaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{comunaStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{comunaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{comunaStore.storeFechaModificacion}}
      <br> 
  </template>

<script setup>
   import { ref } from 'vue'
   import swal from "sweetalert";
   import { usePaisStore } from '../stores/crudpais';
   import { useCiudadStore } from '../stores/crudciudad';
   import { useComunaStore } from '../stores/crudcomuna';
   
   const paisStore = usePaisStore();
   const ciudadStore = useCiudadStore();
   const comunaStore = useComunaStore();

   const codigopais = ref('');
   const codigociudad = ref('');
   const codigocomuna = ref('');
   const nombrecomuna = ref('');
  
   funcionLlenarPais();

   function funcionLlenarPais(){ 
        paisStore.listarPais();
   } 

   function funcionLlenarCiudad(){ 
        document.getElementById("idcodigopais").disabled=true;
        ciudadStore.listarCiudadPais(codigopais.value.toUpperCase());
        ciudadStore.storeArrayCiudades.codciudad = '';
        ciudadStore.storeArrayCiudades.nomciudad = '';
   }

   function funcionLlenarComuna(){ 
        document.getElementById("idcodigociudad").disabled=true;
        // const ValidaUfuncionLlenarComunaFlecha = () => {
        // comunaStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
        // }
        comunaStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
   }   
  
      function funcionvalidarcomuna(){ 
      comunaStore.leerComuna(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigocomuna.value.toUpperCase())
      nombrecomuna.value = comunaStore.storeNombreComuna
      document.getElementById("idcodigocomuna").disabled=true;
    } 

  function funcionLimpiarCiudad() {
    // comunaStore.storeCodigoPais = '';    
    // comunaStore.storeNombrePais = '';

    // codigociudad.value = '';    
    comunaStore.storeNombreCiudad = '';
    codigocomuna.value = '';    
    comunaStore.storeNombreComuna = '';

    comunaStore.storeInactividad = false;
    comunaStore.storeUsuarioCreacion = '';
    comunaStore.storeUsuarioModificacion = '';
    comunaStore.storeFechaCreacion = '';
    comunaStore.storeFechaModificacion = '';
    comunaStore.storeArrayComunas.codcomuna = '';
    comunaStore.storeArrayComunas.nomcomuna = '';    
    document.getElementById("idcodigociudad").disabled=false;
    document.getElementById("idcodigocomuna").disabled=false;
    document.getElementById("idcodigociudad").focus();
  }

  function funcionLimpiarComuna() {
    codigocomuna.value = '';    
    comunaStore.storeNombreComuna = '';

    comunaStore.storeInactividad = false;
    comunaStore.storeUsuarioCreacion = '';
    comunaStore.storeUsuarioModificacion = '';
    comunaStore.storeFechaCreacion = '';
    comunaStore.storeFechaModificacion = '';
    document.getElementById("idcodigocomuna").disabled=false;
    document.getElementById("idcodigocomuna").focus();
    }

  //================================================================================
  //                              POR REVISAR
  //================================================================================
    function posicionarFocus(){ 
    document.getElementById("idcodigopais").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(comunaStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      // document.getElementById("idcodigociudad").disabled=true;
      comunaStore.grabarComuna(codigocomuna.value.toUpperCase(), comunaStore.storeNombreComuna, codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigoinactividad, 'jcrojas@solumerc.cl')
      funcionLimpiarComuna();
      // document.getElementById("idcodigocomuna").disabled=false;
      // document.getElementById("idcodigocomuna").focus();
    }

  function funcionLimpiar() {
    codigopais.value = '';
    codigociudad.value = '';
    codigocomuna.value = '';
    comunaStore.storeNombrePais = '';
    comunaStore.storeCodigoComuna = '';
    comunaStore.storeNombreComuna = '';
    comunaStore.storeCodigoPais = '';
    comunaStore.storeInactividad = false;
    comunaStore.storeUsuarioCreacion = '';
    comunaStore.storeUsuarioModificacion = '';
    comunaStore.storeFechaCreacion = '';
    comunaStore.storeFechaModificacion = '';
    ciudadStore.storeArrayCiudades.codciudad = '';
    ciudadStore.storeArrayCiudades.nomciudad ='';
    comunaStore.storeArrayComunas.codcomuna = '';
    comunaStore.storeArrayComunas.nomcomuna = '';
    document.getElementById("idcodigopais").disabled=false;
    document.getElementById("idcodigociudad").disabled=false;
    document.getElementById("idcodigocomuna").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarciudad(){ 
      ciudadStore.leerCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase())
      nombreciudad.value = ciudadStore.storeNombreCiudad
      document.getElementById("idcodigociudad").disabled=true;
    } 
    function funcionvalidarpais(){ 
      //  document.getElementById("idcodigopais").disabled=true;
      // alert("pais -->" + ciudadStore.storeCodigoPais)
      ciudadStore.storeValidaPais = true;
      ciudadStore.leerPais(codigopais.value.toUpperCase())
      if(ciudadStore.storeValidaPais === false){
        document.getElementById("idcodigopais").value='';
        document.getElementById("idcodigopais").focus();
      }else{
         document.getElementById("idcodigociudad").focus();
      }
    }
</script>


<style>

</style>