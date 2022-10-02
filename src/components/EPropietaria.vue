<template>
    <div class="grid grid-rows-4 grid-cols-12 gap-0 bg-gray-500 text-black h-32 w-full rounded">  
         <div class="bg-plata text-red  row-start-1 row-end-5 col-start-1 col-end-3 text-center">
            <img src="../assets/logo.png" width="200" height="50">
         </div>
         
         <div class="bg-gray-500 text-black  row-start-1 row-end-14 col-start-3 col-end-13 text-left"> 
         <hr>
         <font size=4>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            Agrupación : {{userStore.nombreEmpresaPropietaria}}&nbsp&nbsp
            RUT : {{userStore.rutEmpresaPropietaria}}<br>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            Dirección : {{userStore.direccionEmpresaPropietaria}}&nbsp&nbsp -
                {{userStore.comunaEmpresaPropietaria}}&nbsp&nbsp - &nbsp&nbsp
                {{userStore.ciudadEmpresaPropietaria}}&nbsp&nbsp - &nbsp&nbsp
                {{userStore.paisEmpresaPropietaria}}<br>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            Giro Comercial : {{userStore.girocomercialEmpresaPropietaria}}&nbsp&nbsp - &nbsp&nbsp
            Usuario: {{userStore.nombreUsuario}}&nbsp&nbsp - &nbsp&nbsp
                     {{userStore.identificadorUsuario}}
         </font>   
 <!-- PARA MOSTRAR UN ICONO DE PROCESANDO -->
<!-- <p class="relative rounded-xl overflow-auto p-8 flex items-center justify-center">
    <button type="button" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500" disabled="">
      <svg class="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Procesando...
    </button>
</p> -->
<button class="bg-cyan-500 shadow-lg shadow-white ...">Subscribe</button>
    </div>
</div>    
</template>

<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore()
</script>