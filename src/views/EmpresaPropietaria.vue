
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Empresa Propietaria</h1>
    <div id="appempresapropietaria" class="container">
        <label font-bold >Código Empresa</label>&nbsp&nbsp&nbsp
        <input id="idcodigoempresapropietaria" type="text" size = "20" bg-sky-900 v-model="codigoempresapropietaria" maxlength = "20" style="text-transform:uppercase;" @change="funcionvalidarempresa()">
        <br><br>

        <label >Razón Social</label>&nbsp &nbsp &nbsp
        <input type="text" size = "100" v-model="empresapropietariaStore.storeNombreEmpresa" maxlength = "200">
        <br><br>

        <label >Rut Empresa</label>&nbsp &nbsp &nbsp
        <input type="text" size = "12" bg-sky-900 maxlength = "15" v-model="empresapropietariaStore.storeRutEmpresa">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        
        <label >País </label>&nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresapropietariaStore.storeCodigoPais" @change="funcionLlenarCiudad()">&nbsp
        <!-- <select id ="idcodigopais" v-model ="codigopais" required> -->
        <select id ="idcodigopais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in empresapropietariaStore.storeArrayPaises.codpais.length" v-bind:key="empresapropietariaStore.storeArrayPaises.codpais[i-1]" v-bind:value="empresapropietariaStore.storeArrayPaises.codpais[i-1]">{{empresapropietariaStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>

        <label>Ciudad</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresapropietariaStore.storeCodigoCiudad">&nbsp
        <select id ="idcodigociudad" v-model ="codigociudad" @change="funcionLlenarComuna()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in empresapropietariaStore.storeArrayCiudades.codciudad.length" v-bind:key="empresapropietariaStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="empresapropietariaStore.storeArrayCiudades.codciudad[i-1]">{{empresapropietariaStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>&nbsp &nbsp &nbsp &nbsp &nbsp

        <label font-bold for="idcodigocomuna">Comuna</label>&nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresapropietariaStore.storeCodigoComuna">&nbsp
        <select id ="idayudacomuna" v-model ="codigocomuna">
            <option disabled value="">Seleccione Comuna</option>
            <option v-for="i in empresapropietariaStore.storeArrayComunas.codcomuna.length" v-bind:key="empresapropietariaStore.storeArrayComunas.codcomuna[i-1]" v-bind:value="empresapropietariaStore.storeArrayComunas.codcomuna[i-1]">{{empresapropietariaStore.storeArrayComunas.nomcomuna[i-1]}}</option>
        </select>
        <br><br> 

        <label >Dirección</label>&nbsp &nbsp &nbsp &nbsp &nbsp 
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresapropietariaStore.storeDireccion">
        <br><br> 

        <label >Giro Comercial</label>&nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresapropietariaStore.storeGiroComercial">
        <br><br>

        <label >Teléfono</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresapropietariaStore.storeTelefono1">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <label >Teléfono</label>&nbsp &nbsp &nbsp &nbsp &nbsp 
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresapropietariaStore.storeTelefono2">
        <br><br>

        <label >Correo Contacto</label>
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresapropietariaStore.storeCorreo">
        <br><br>        

        <label for="idinactivo">Inactivo</label>&nbsp
        <input id="idinactivo" v-model="empresapropietariaStore.storeInactividad" type="checkbox" unchecked>
    </div>
     <div class="botones"> 
      <div justify-center>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div>
      <label class="text-gray" >Usuario Creación : </label>  {{empresapropietariaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{empresapropietariaStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{empresapropietariaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{empresapropietariaStore.storeFechaModificacion}}
      <br>   

  </template>

<script setup>
   import { ref } from 'vue'
   import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';

   const empresapropietariaStore = useEmpresaPropietariaStore();
   const codigoempresapropietaria = ref('');
   const codigopais = ref('');
   const codigociudad = ref('');
   const codigocomuna = ref('');
   const nombreempresapropietaria = ref('');

   empresapropietariaStore.storeCodigoPais = codigopais;
   empresapropietariaStore.storeCodigoCiudad = codigociudad;
   empresapropietariaStore.storeCodigoComuna = codigocomuna;
  
  function funcionLlenarCiudad(){ 
     empresapropietariaStore.listarCiudadPais(codigopais.value.toUpperCase());
     empresapropietariaStore.storeArrayComunas.codciudad = '';
     empresapropietariaStore.storeArrayComunas.codcomuna = '';
  }

  function funcionLlenarComuna(){ 
     empresapropietariaStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
  } 

  function posicionarFocus(){ 
    document.getElementById("idcodigoempresapropietaria").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(empresapropietariaStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      // document.getElementById("idcodigopais").disabled=true;
      empresapropietariaStore.grabarEmpresaPropietaria(codigoempresapropietaria.value.toUpperCase(), empresapropietariaStore.storeRutEmpresa, empresapropietariaStore.storeNombreEmpresa, empresapropietariaStore.storeDireccion, empresapropietariaStore.storeGiroComercial, empresapropietariaStore.storeTelefono1, empresapropietariaStore.storeTelefono2, empresapropietariaStore.storeCorreo, codigoinactividad, 'jcrojas@solumerc.cl', codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigocomuna.value.toUpperCase())
      funcionLimpiar();
    }

  function funcionLimpiar() {
    codigoempresapropietaria.value = '';
    empresapropietariaStore.storeCodigoEmpresa = '';
    empresapropietariaStore.storeNombreEmpresa = '';
    empresapropietariaStore.storeRutEmpresa = '';
    empresapropietariaStore.storeDireccion = '';
    empresapropietariaStore.storeGiroComercial = '';
    empresapropietariaStore.storeTelefono1 = '';
    empresapropietariaStore.storeTelefono2 = '';
    empresapropietariaStore.storeCorreo = '';
    empresapropietariaStore.storeInactividad = false;
    empresapropietariaStore.storeFechaCreacion = '';
    empresapropietariaStore.storeFechaModificacion =  '';
    empresapropietariaStore.storeUsuarioCreacion = '';
    empresapropietariaStore.storeUsuarioModificacion = '';
    empresapropietariaStore.storeCodigoPais = '';
    empresapropietariaStore.storeCodigoCiudad = '';
    empresapropietariaStore.storeCodigoComuna = '';
    document.getElementById("idcodigoempresapropietaria").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarempresa(){ 
      document.getElementById("idcodigoempresapropietaria").disabled=true;
      empresapropietariaStore.leerEmpresaPropietaria(codigoempresapropietaria.value.toUpperCase())
      nombreempresapropietaria.value = empresapropietariaStore.storeNombreEmpresa
    } 
</script>


<style>

</style>