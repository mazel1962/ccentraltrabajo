<template>
  <div>  
        <h1>despliegue o publicacion de funcionalidades</h1>
        <h1>{{userStore.identificadorUsuario}}</h1>
        <h1>{{userStore.passwordUsuario}}</h1>
        <h1>{{userStore.nombreUsuario}}</h1>

  </div>
</template>
<script setup>
 
import { useUserStore } from '../stores/user';
  
const userStore = useUserStore()


</script>
<style>

</style>