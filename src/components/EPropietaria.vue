<template>
    <div class="grid grid-rows-4 grid-cols-12 gap-0 bg-fuchsia-900 text-amber-50 h-32 w-full rounded">
         <div class="bg-fuchsia-900 text-amber-50 row-start-1 row-end-5 col-start-1 col-end-3 text-center">logo propietario</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-1 row-end-2 col-start-3 col-end-6">{{userStore.nombreEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-1 row-end-2 col-start-5 col-end-8">{{userStore.rutEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-1 row-end-2 col-start-7 col-end-10">{{userStore.girocomercialEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-2 row-end-3 col-start-3 col-end-6">{{userStore.direccionEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-2 row-end-3 col-start-5 col-end-8">{{userStore.comunaEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-2 row-end-3 col-start-7 col-end-10">{{userStore.ciudadEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-3 row-end-4 col-start-3 col-end-6">{{userStore.paisEmpresaPropietaria}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-3 row-end-4 col-start-5 col-end-8">{{userStore.identificadorUsuario}}</div>
         <div class="bg-orange-500 text-sky-900 h-8 row-start-3 row-end-4 col-start-7 col-end-10">{{userStore.nombreUsuario}}</div>
       
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
  
const userStore = useUserStore()

</script>