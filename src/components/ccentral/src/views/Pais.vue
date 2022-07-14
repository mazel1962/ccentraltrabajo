
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención País</h1>
    <div class="container">
        <label font-bold for="new-task">Código País  </label>
        <input id="new-task" type="text" size = "15" bg-sky-900 v-model="codigopais"><br><br>
        <label for="new-task">Nombre País  </label>
        <input id="new-task" type="text" size = "100" v-model="nombrepais"><br><br>
        <label for="new-task">Código Moneda  </label>
        <input class="border" id="new-task" type="text" size = "15" v-model="codigomoneda"><br><br>
        <label for="new-task">Código Área   </label>
        <input class="border" id="new-task" type="text" size = "15" v-model="codigoareapais"><br><br>                  
        <label for="new-task">Inactivo  </label>
        <input class="border" type="checkbox" unchecked @click="toggle(inactivo.id)">
      <!-- <div class="bg-sky-900 row-start-1 h-4 col-start-2 h-[683px] col-end-6"></div> -->
    </div>
    <div class="botones"> 
      <div justify-center>
          <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" type="add" @click="addAndNavigate(name)">Grabar</button>&nbsp &nbsp &nbsp &nbsp
          <button class= "boton shadow-md bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" type="add" @click="addAndNavigate(name)">Eliminar</button>&nbsp &nbsp &nbsp &nbsp
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded" type="add" @click="addAndNavigate(name)">Limpiar</button>&nbsp &nbsp &nbsp &nbsp         
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded" type="add" @click="addAndNavigate(name)">Salir</button>
      </div>
    </div>

  </template>

<script setup>
 
</script>


<style>

</style>