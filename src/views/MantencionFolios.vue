<template>
    <div class="flex h-full justify-center items-center">
        <div class="flex relative grid grid-rows-12 grid-cols-4 gap-0 bg-blue-100 text-sky-900 h-full justify-center items-center h-96 w-1/2 rounded border-4 border-sky-900">
            <div class="flex absolute top-0 row-start-1 row-end-1 col-start-1 col-end-5 h-8 w-full bg-sky-900 text-plata text-justify text-center">MANTENIMIENTO DE FOLIOS</div>
            <div class="flex row-start-2 row-end-2 col-start-1 col-end-3 h-8 w-full">ENTIDAD DE TRABAJO</div>
            <div class="flex row-start-2 row-end-2 col-start-3 col-end-5 h-8 w-full">{{userStore.nombreEmpresaPropietaria}}</div>
            <div class="flex row-start-3 row-end-3 col-start-1 col-end-3 h-8 w-full">EMPRESA CLIENTE</div>
            <div class="flex row-start-3 row-end-3 col-start-3 col-end-5 h-8 w-full">{{ClienteStore.nombreEmpresaCliente}}</div>
            <div class="flex row-start-4 row-end-4 col-start-1 col-end-3 h-8 w-full"><label>TIPO FOLIO</label></div>
            <div class="flex row-start-4 row-end-4 col-start-3 col-end-5 h-8 w-full">tipo de folio o codigo</div>
            <div class="flex row-start-5 row-end-5 col-start-1 col-end-3 h-8 w-full">NUMERACION FOLIO</div>
            <div class="flex row-start-5 row-end-5 col-start-3 col-end-5 h-8 w-full">numeracion de folio</div>
            <div class="flex row-start-6 row-end-6 col-start-1 col-end-3 h-8 w-full">BOTONES</div>
            <div class="flex row-start-6 row-end-6 col-start-3 col-end-5 h-8 w-full">BOTONES</div>
        </div>
    </div>    
</template>
<script setup>
import { useUserStore } from '../stores/user';
import { useClienteStore} from '../stores/clienteStore';
  
const userStore = useUserStore()
const ClienteStore = useClienteStore()
</script>