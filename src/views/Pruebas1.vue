
<template>
<div id="app" class="container">
 <h1 class="text-center bg-sky-900 text-plata">Mantención de pruebas</h1>
 <label >Folio </label>&nbsp&nbsp &nbsp
 <input type="text" size = "10" bg-sky-900 maxlength = "20" v-model="var10" >&nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp 

 <label >Fecha </label>&nbsp&nbsp 
 <input type="date"><br><br>
 
  <label >Glosa </label>&nbsp&nbsp 
  <input type="text" size = "100" bg-sky-900 maxlength = "100" v-model="var1" ><br><br>
  <div class=" rounded-lg text-black bg-gray-400 shadow-lg shadow-gray-900">
     <button class= "boton bg-gray-500 hover:bg-gray-200 text-right text-white py-2 px-4 rounded"  @click=sumar()>+</button>&nbsp
     <button class= "boton bg-gray-500 hover:bg-gray-200 text-right text-white py-2 px-4 rounded"  @click=sumar()>-</button>&nbsp
  nombre cuenta contable&nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp total debe &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp &nbsp&nbsp total haber 
  <hr>
     <DIV>		   
       <DIV class="head">
		   <TABLE width="100%">
			   <TR>
				 <TH width="05%" align="left"   valign="middle"><FONT class="FontPagina"><strong>Nº</strong></FONT></TH> 
				 <TH width="10%" align="left"   valign="middle"><FONT class="FontPagina"><strong>Código</strong></FONT></TH>
				 <TH width="60%" align="left"   valign="middle"><FONT class="FontPagina"><strong>Glosa</strong></FONT></TH>
				 <TH width="15%" align="center" valign="middle"><FONT class="FontPagina"><strong>Debe</strong></FONT></TH> 
				 <TH width="15%" align="center" valign="middle"><FONT class="FontPagina"><strong>Haber</strong></FONT></TH>
				 <TH width="29%" align="center" valign="middle"><FONT class="FontPagina"><strong>Analísis</strong></FONT></TH>

			   </TR>
           </TABLE>
       </DIV>
   <hr>
<!-- <div class="flex bg-gray-600 row-start-1 row-end-5 text-black  flex-nowrap overflow-y-auto">        -->
 <div class="flex from-gray-600 row-start-1 h-32 col-start-3 h-[280px] col-end-13 flex-nowrap overflow-y-auto">
 <div >

 <table v-for="i in numero" :key="i">
  <tr >
    <th v-if="i < 10"><label  > &nbsp {{ i }} </label> </th>
    <th v-else> <label bg-white > {{ i }} </label> </th>
    <th><input type="text" size = "10" bg-sky-900 maxlength = "20" v-model="var1" ></th>
    <th><input type="text" size = "80" bg-sky-900 maxlength = "80" v-model="var1a" ></th>
    <th><input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="var1c" ></th>
    <th><input type="text" size = "15" bg-sky-900 maxlength = "20" v-model="var1d" ></th>
    <th><input type="checkbox" unchecked bg-white  v-model="var1e" ></th>
    <br>
  </tr>
 </table>&nbsp
 </div>    
  </div>
   </div>
 
</div>
</div>

 <div w-full><hr></div>
 </template>

<script setup>
  //  import { DOMDirectiveTransforms } from '@vue/compiler-dom';
   import { SourceMapGenerator } from 'source-map-js/lib/source-map-generator';
import { ref } from 'vue'
   import { useMonedaStore } from '../stores/crudmoneda';
var numero = ref(25);
 
//  import { shallowReactive } from 'vue';

   function sumar(){
    numero = numero + 1;
   }
   function funcionentrar(){ 
   alert("cursor entra ...");
   }

   function funcionsalir(){ 
   alert("cursor sale ...");

 }



  // function funcionSalir(){
  //   <router-link v-bind:to="/views/PlanCuentas.vue"></router-link>
  // }
</script>
<style>

</style>