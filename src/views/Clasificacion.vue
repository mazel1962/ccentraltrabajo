<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Clasificación</h1>
    <div id="appclasificacion" class="container">
        <label font-bold for="idcodigoclasificacion">Código Clasificación  </label>
        <input id="idcodigoclasificacion" type="text" size = "15" bg-sky-900 v-model="codigoclasificacion" maxlength = "20"><br><br>
        <label for="idnombreclasificacion">Nombre Clasificación  </label>
        <input id="idnombreclasificacion" type="text" size = "100" v-model="nombreclasificacion" maxlength = "100"><br><br>
        <label for="idinactivo">Inactivo  </label>
        <input id="idinactivo" type="checkbox" unchecked v-model="inactivo">
        <br>
    </div>

     <div class="botones"> 
      <div justify-center>
        
          <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
          <!-- <button class= "boton shadow-md bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" type="add" @click="funcionEliminar(name)">Eliminar</button>&nbsp &nbsp &nbsp &nbsp -->
          <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp         
          <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded" @click="funcionSalir()">Salir</button> -->
      </div>
    </div>

    <div w-full><hr></div>

  </template>

<script setup>

  function darFocus(){ 
    document.getElementById("idcodigoclasificacion").focus();
  }
  function funcionGrabar() {
    alert('Grabar o Regrabar Clasificación ')
  }

  function funcionLimpiar() {
//  alert('nombre ' + idnombremoneda.value)
    codigoclasificacion.value = '';
    nombreclasificacion.value = '';
    inactivo.checked = false;
    darFocus();
  }

  // function funcionSalir(){
  //   <router-link v-bind:to="/views/PlanCuentas.vue"></router-link>
  // }
</script>

<style>
.container {
  
  /* display: block; */
  /* background-color: #0ecc30; */
  margin-top: 30px;
  margin-left: 30px;
   margin-bottom: 50px;
  /* width: 800px; */

  /* margin: 20px auto 0; */
}
.botones {
  
  display: block;
  /* background-color: #0ecc30; */
  margin-top: 30px;
  padding: 30px 20px 20px 100px ;
  margin-bottom: 10px;

}
.boton:hover {
      background-color:rgb(3, 105, 161);
      /* color: rgb(250, 204, 21); */
      color: rgb(255, 255, 255);
      /* text-shadow: 1px 1px #fff; */
      transition: 0.7s;
}

  /* width: 800px; */

input[type=text] {
  /* width: 100%;
  padding: 12px 20px;
  margin: 8px 0; */
  box-sizing: border-box;
  border: 1px solid rgb(212 212 216);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input[type=text]:focus {
  background-color:rgb(201, 200, 200);
}

</style>