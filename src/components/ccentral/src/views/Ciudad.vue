
<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Ciudad</h1>
    <div class="container">
        <label font-bold for="codigopais">Código País  </label>
        <input id="idcodigopais" type="text" size = "15" bg-sky-900 v-model="codigopais" maxlength = "20"><br><br>
 
        <label font-bold for="codigociudad">Código Ciudad  </label>
        <input id="idcodigociudad" type="text" size = "15" bg-sky-900 v-model="codigociudad" maxlength = "20"><br><br>        

        <label for="idnombreciudad">Nombre Ciudad  </label>
        <input id="idnombreciudad" type="text" size = "100" v-model="nombreciudad" maxlength = "100"><br><br>

        <label for="idcodigoareaciudad">Código Área Ciudad  </label>
        <input id="idcodigoareaciudad" class="border" type="text" size = "15" v-model="codigoareaciudad" maxlength = "10"><br><br>                  

        <label for="idinactivo">Inactivo  </label>
        <input id="idinactivo" type="checkbox" unchecked>
      <!-- <div class="bg-sky-900 row-start-1 h-4 col-start-2 h-[683px] col-end-6"></div> -->
    </div>
    <div class="botones"> 
      <div justify-center>
          <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" type="add" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
          <!-- <button class= "boton shadow-md bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" type="add" @click="addAndNavigate(name)">Eliminar</button>&nbsp &nbsp &nbsp &nbsp -->
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded" type="add" @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp         
          <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded" type="add" @click="addAndNavigate(name)">Salir</button> -->
      </div>
    </div>

  </template>

<script setup>
  function darFocus(){ 
    document.getElementById("idcodigociudad").focus();
  }
  function funcionGrabar() {
    alert('Grabar o Regrabar Ciudad ')
  }

  function funcionLimpiar() {
//  alert('nombre ' + idnombremoneda.value)
    idcodigociudad.value = '';
    idnombreciudad.value = '';
    idcodigoareaciudad.value = '';
    idinactivo.checked = false;
    darFocus();
  } 
</script>


<style>

</style>