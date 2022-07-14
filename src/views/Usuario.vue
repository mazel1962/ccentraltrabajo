
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Usuarios</h1>
    <div id="appusuario" class="container">
        <label font-bold >Código Usuario  </label>&nbsp&nbsp&nbsp
        <input id="idcodigousuario" type="text" size = "50" bg-sky-900 v-model="codigousuario" maxlength = "50" style="text-transform:uppercase;" @blur.lazy="funcionvalidarusuario()" >
        <br><br>
        <label >Nombre Usuario</label>&nbsp&nbsp
        <input type="text" size = "100" v-model="usuarioStore.storeNombreUsuario" maxlength = "100">
        <br><br>
        <label >Contraseña  </label>&nbsp &nbsp 
        <input type="password" size = "20" bg-sky-900 maxlength = "20" v-model="usuarioStore.storeContrasena">
        <br><br>

        <label >Nivel Usuario </label>&nbsp &nbsp
        <select id="cmbnivelusuario" v-model ="usuarioStore.storeTipoUsuario" :value="usuarioStore.storeTipoUsuario" :text="presione">
            <option disabled value="">Selecciona nivel usuario</option>
            <option >Super Usuario</option>
            <option >Administrador</option>
            <option >Usuario</option>
            <!-- <option v-for="i in monedaStore.storeArrayMonedas.nommoneda.length" >{{monedaStore.storeArrayMonedas.nommoneda[i-1]}}</option> -->
        </select>

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="usuarioStore.storeInactividad" type="checkbox" unchecked>
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
      <label class="text-gray" >Usuario Creación : </label>  {{usuarioStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{usuarioStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{usuarioStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{usuarioStore.storeFechaModificacion}}
      <br>   

  </template>

<script setup>
   import { ref } from 'vue'
   import { useUsuarioStore } from '../stores/crudusuario';

   const usuarioStore = useUsuarioStore()
   const codigousuario = ref('');
   const nombreusuario = ref('');
  
  // funcionListar();

   function funcionListar(){ 
        //  monedaStore.listarMoneda();
         paisStore.listarUsuario();
   }

  function posicionarFocus(){ 
    document.getElementById("idcodigousuario").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(usuarioStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigousuario").disabled=true;
      usuarioStore.grabarUsuario(codigousuario.value.toUpperCase(), usuarioStore.storeNombreUsuario, usuarioStore.storeContrasena, usuarioStore.storeNivelUsuario, codigoinactividad, 'jcrojas@solumerc.cl')
      alert(codigousuario.value.toUpperCase() + "<br> " + usuarioStore.storeNombreUsuario + " " + usuarioStore.storeContrasena + usuarioStore.storeNivelUsuario + codigoinactividad + " " + 'jcrojas@solumerc.cl')
      funcionLimpiar();
    }

  function funcionLimpiar() {
    codigopais.value = '';
    paisStore.storeNombreUsuario = '';
    paisStore.storeContrasena = '';
    paisStore.storeTipoUsuario = '';
    paisStore.storeInactividad = false;
    paisStore.storeUsuarioCreacion = '';
    paisStore.storeUsuarioModificacion = '';
    paisStore.storeFechaCreacion = '';
    paisStore.storeFechaModificacion = '';
    document.getElementById("idcodigousuario").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarusuario(){ 
      document.getElementById("idcodigousuario").disabled=true;
      usuarioStore.leerUsuario(codigousuario.value.toUpperCase())
      nombreusuario.value = usuarioStore.storeNombreUsuario
    } 
</script>


<style>

</style>