
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Empresas Clientes</h1>
    <div id="appempresacliente" class="container">
        <label font-bold >Código Empresa</label>&nbsp&nbsp&nbsp
        <input id="idcodigoempresacliente" type="text" size = "20" bg-sky-900 v-model="codigoempresacliente" maxlength = "20" style="text-transform:uppercase;" @change="funcionvalidarempresa()">
        <br><br>

        <label >Razón Social</label>&nbsp &nbsp &nbsp
        <input type="text" size = "100" v-model="empresaclienteStore.storeNombreEmpresa" maxlength = "200">
        <br><br>

        <label >Rut Empresa</label>&nbsp &nbsp &nbsp
        <input type="text" size = "12" bg-sky-900 maxlength = "15" v-model="empresaclienteStore.storeRutEmpresa">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        
        <label >País </label>&nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoPais" @change="funcionLlenarCiudad()">&nbsp
        <!-- <select id ="idcodigopais" v-model ="codigopais" required> -->
        <select id ="idcodigopais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in empresaclienteStore.storeArrayPaises.codpais.length" v-bind:key="empresaclienteStore.storeArrayPaises.codpais[i-1]" v-bind:value="empresaclienteStore.storeArrayPaises.codpais[i-1]">{{empresaclienteStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>

        <label>Ciudad</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoCiudad">&nbsp
        <select id ="idcodigociudad" v-model ="codigociudad" @change="funcionLlenarComuna()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in empresaclienteStore.storeArrayCiudades.codciudad.length" v-bind:key="empresaclienteStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="empresaclienteStore.storeArrayCiudades.codciudad[i-1]">{{empresaclienteStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>&nbsp &nbsp &nbsp &nbsp &nbsp

        <label font-bold for="idcodigocomuna">Comuna</label>&nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoComuna">&nbsp
        <select id ="idayudacomuna" v-model ="codigocomuna">
            <option disabled value="">Seleccione Comuna</option>
            <option v-for="i in empresaclienteStore.storeArrayComunas.codcomuna.length" v-bind:key="empresaclienteStore.storeArrayComunas.codcomuna[i-1]" v-bind:value="empresaclienteStore.storeArrayComunas.codcomuna[i-1]">{{empresaclienteStore.storeArrayComunas.nomcomuna[i-1]}}</option>
        </select>
        <br><br> 

        <label >Dirección</label>&nbsp &nbsp &nbsp &nbsp &nbsp 
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeDireccion">
        <br><br> 

        <label >Giro Comercial</label>&nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeGiroComercial">
        <br><br>

        <label >Teléfono</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresaclienteStore.storeTelefono1">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <label >Teléfono</label>&nbsp &nbsp &nbsp &nbsp &nbsp 
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresaclienteStore.storeTelefono2">
        <br><br>

        <label >Correo Contacto</label>
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeCorreo">
        <br><br>        

        <label for="idinactivo">Inactivo</label>&nbsp
        <input id="idinactivo" v-model="empresaclienteStore.storeInactividad" type="checkbox" unchecked>
    </div>
     <div class="botones"> 
      <div justify-center>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div>
      <label class="text-gray" >Usuario Creación : </label>  {{empresaclienteStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{empresaclienteStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{empresaclienteStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{empresaclienteStore.storeFechaModificacion}}
      <br>   

  </template>

<script setup>
   import { ref } from 'vue'
   import { useEmpresaClienteStore } from '../stores/crudempresacliente';

   const empresaclienteStore = useEmpresaClienteStore();
   const codigoempresacliente = ref('');
   const codigopais = ref('');
   const codigociudad = ref('');
   const codigocomuna = ref('');
   const nombreempresacliente = ref('');

   empresaclienteStore.storeCodigoPais = codigopais;
   empresaclienteStore.storeCodigoCiudad = codigociudad;
   empresaclienteStore.storeCodigoComuna = codigocomuna;
  
  function funcionLlenarCiudad(){ 
     empresaclienteStore.listarCiudadPais(codigopais.value.toUpperCase());
     empresaclienteStore.storeArrayComunas.codciudad = '';
     empresaclienteStore.storeArrayComunas.codcomuna = '';
  }

  function funcionLlenarComuna(){ 
     empresaclienteStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
  } 

  function posicionarFocus(){ 
    document.getElementById("idcodigoempresacliente").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(empresaclienteStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      // document.getElementById("idcodigopais").disabled=true;
      empresaclienteStore.grabarEmpresaCliente(empresaclienteStore.value.toUpperCase(), empresaclienteStore.storeRutEmpresa, empresaclienteStore.storeNombreEmpresa, empresaclienteStore.storeDireccion, empresaclienteStore.storeGiroComercial, empresaclienteStore.storeTelefono1, empresaclienteStore.storeTelefono2, empresaclienteStore.storeCorreo, codigoinactividad, 'jcrojas@solumerc.cl', codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigocomuna.value.toUpperCase())
      funcionLimpiar();
    }

  function funcionLimpiar() {
    empresaclienteStore.value = '';
    empresaclienteStore.storeCodigoEmpresa = '';
    empresaclienteStore.storeNombreEmpresa = '';
    empresaclienteStore.storeRutEmpresa = '';
    empresaclienteStore.storeDireccion = '';
    empresaclienteStore.storeGiroComercial = '';
    empresaclienteStore.storeTelefono1 = '';
    empresaclienteStore.storeTelefono2 = '';
    empresaclienteStore.storeCorreo = '';
    empresaclienteStore.storeInactividad = false;
    empresaclienteStore.storeFechaCreacion = '';
    empresaclienteStore.storeFechaModificacion =  '';
    empresaclienteStore.storeUsuarioCreacion = '';
    empresaclienteStore.storeUsuarioModificacion = '';
    empresaclienteStore.storeCodigoPais = '';
    empresaclienteStore.storeCodigoCiudad = '';
    empresaclienteStore.storeCodigoComuna = '';
    document.getElementById("idcodigoempresacliente").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarempresa(){ 
      document.getElementById("idcodigoempresacliente").disabled=true;
      empresaclienteStore.leerEmpresaCliente(codigoempresacliente.value.toUpperCase())
      nombreempresacliente.value = empresaclienteStore.storeNombreEmpresa
    } 
</script>


<style>

</style>