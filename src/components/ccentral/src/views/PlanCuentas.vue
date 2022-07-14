<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Plan de Cuentas</h1>
    <div class="container">
        <label font-bold for="new-task">Código Plan de Cuenta  </label>
        <input id="new-task" type="text" size = "15" bg-sky-900 v-model="codigocuenta"><br><br>
        <label for="new-task">Nombre Cuenta  </label>
        <input id="new-task" type="text" size = "100" v-model="nombrecuenta"><br><br>
        <label for="new-task">Cuenta Banco  </label>&nbsp 
        <input class="border" type="checkbox" unchecked @click="toggle(cuentabanco.id)"><br><br>                       
       <b><label class="text-bold" for="new-task">CLASIFICACION BALANCE </label></b><br><br>
        <label for="new-task">Deudor   </label>
        <input class="border" id="new-task" type="text" size = "15" v-model="clasificaciondeudor">&nbsp &nbsp &nbsp &nbsp
        <label for="new-task">Acreedor   </label>
        <input class="border" id="new-task" type="text" size = "15" v-model="clasificacionacreedor"><br><br>
        <label for="new-task">Inactivo  </label>&nbsp 
        <input class="border" type="checkbox" unchecked @click="toggle(inactivo.id)"><br><br>        
         

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
  border: 1px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input[type=text]:focus {
  background-color:rgb(212 212 216);
}
</style>