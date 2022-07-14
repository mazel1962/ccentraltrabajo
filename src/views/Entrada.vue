<template>
  <div>  
        <h1>despliegue o publicacion de funcionalidades</h1>
        <h1>{{userStore.identificadorUsuario}}</h1>
        <h1>{{userStore.passwordUsuario}}</h1>
        <h1>{{userStore.nombreUsuario}}</h1>
        <label for="idnombreUsuario">nombreUsuario : </label>
        <input id="idnombreUsuario" type="text" size = "100" v-model="nombreUsuario" maxlength = "100"><br>         


  </div>
</template>
<script setup>
 
import { useUserStore } from '../stores/user';
  
const userStore = useUserStore()

const nombreUsuario = userStore.nombreUsuario;

</script>
<style>

</style>