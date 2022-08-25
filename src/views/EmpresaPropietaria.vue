
<template>
    <div id="appempresapropietaria" class="container">
      <h1 class="text-center bg-sky-900 text-plata">Mantención Agrupación</h1>
      <p style="color: white" align="right" v-if="empresapropietariaStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
      <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <label font-bold >Código Agrupación</label>&nbsp&nbsp&nbsp
        <input id="idcodigoempresapropietaria" type="text" size = "15" bg-sky-900 v-model="codigoempresapropietaria" maxlength = "15" style="text-transform:uppercase;" @change="funcionvalidarempresa()">&nbsp &nbsp
        <select id ="idayudaempresapropietaria" v-model ="codigoempresapropietaria" @change="funcionvalidarempresa()" required>
            <option disabled value="">Seleccione Grupo</option>
            <option v-for="i in empresapropietariaStore.storeArrayEmpresaPropietaria.codempresapropietaria.length" v-bind:key="empresapropietariaStore.storeArrayEmpresaPropietaria.codempresapropietaria[i-1]" v-bind:value="empresapropietariaStore.storeArrayEmpresaPropietaria.codempresapropietaria[i-1]">{{empresapropietariaStore.storeArrayEmpresaPropietaria.nomempresapropietaria[i-1]}}</option>
        </select>        
        <br><br>
        <label >Razón Social</label>&nbsp &nbsp &nbsp
        <input type="text" size = "100" v-model="empresapropietariaStore.storeNombreEmpresa" maxlength = "100">
        <br><br>

        <label >Rut Empresa</label>&nbsp &nbsp &nbsp
        <input type="text" size = "12" bg-sky-900 maxlength = "15" v-model="empresapropietariaStore.storeRutEmpresa">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        
        <label >País </label>&nbsp
        
        <select id ="idayudapais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in empresapropietariaStore.storeArrayPaises.codpais.length" v-bind:key="empresapropietariaStore.storeArrayPaises.codpais[i-1]" v-bind:value="empresapropietariaStore.storeArrayPaises.codpais[i-1]">{{empresapropietariaStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>&nbsp
        <input id ="idcodigopais" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresapropietariaStore.storeCodigoPais" @change="funcionLlenarCiudad()">
        <br><br>

        <label>Ciudad</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        
        <select id ="idayudaciudad" v-model ="codigociudad" @change="funcionLlenarComuna()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in empresapropietariaStore.storeArrayCiudades.codciudad.length" v-bind:key="empresapropietariaStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="empresapropietariaStore.storeArrayCiudades.codciudad[i-1]">{{empresapropietariaStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>&nbsp 
        <input id ="idcodigociudad" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresapropietariaStore.storeCodigoCiudad">&nbsp &nbsp &nbsp &nbsp

        <label font-bold for="idcodigocomuna">Comuna</label>&nbsp
        <select id ="idayudacomuna" v-model ="codigocomuna">
            <option disabled value="">Seleccione Comuna</option>
            <option v-for="i in empresapropietariaStore.storeArrayComunas.codcomuna.length" v-bind:key="empresapropietariaStore.storeArrayComunas.codcomuna[i-1]" v-bind:value="empresapropietariaStore.storeArrayComunas.codcomuna[i-1]">{{empresapropietariaStore.storeArrayComunas.nomcomuna[i-1]}}</option>
        </select>&nbsp
        <input id ="idcodigocomuna" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresapropietariaStore.storeCodigoComuna">
        <br><br> 

        <label >Dirección</label>&nbsp &nbsp &nbsp &nbsp &nbsp 
        <input type="text" size = "100" bg-sky-900 maxlength = "100" v-model="empresapropietariaStore.storeDireccion">
        <br><br> 

        <label >Giro Comercial</label>&nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "100" v-model="empresapropietariaStore.storeGiroComercial">
        <br><br>

        <label >Teléfono</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresapropietariaStore.storeTelefono1">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <label >Teléfono</label>&nbsp &nbsp &nbsp 
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresapropietariaStore.storeTelefono2">
        <br><br>

        <label >Correo Contacto</label>&nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "100" v-model="empresapropietariaStore.storeCorreo">
        <br><br>        

        <label for="idinactivo">Inactivo</label>&nbsp
        <input id="idinactivo" v-model="empresapropietariaStore.storeInactividad" type="checkbox" unchecked>
        <br><br>
        <hr>
        <br>
    <!-- </div>
     <div class="botones"> 
      <div justify-center> -->
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
         <br><br>
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      <!-- </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div> -->
      <label class="text-gray" >Usuario Creación : </label>  {{empresapropietariaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{empresapropietariaStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{empresapropietariaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{empresapropietariaStore.storeFechaModificacion}}
      <br>   
   </div>
  </template>

<script setup>
   import { ref } from 'vue'
   import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';
   import { jsPDF } from "jspdf";
   import 'jspdf-autotable';

   const empresapropietariaStore = useEmpresaPropietariaStore();
   const userStore = useUserStore();
   const ClienteStore = useClienteStore();

   const codigoempresapropietaria = ref('');
   const codigopais = ref('');
   const codigociudad = ref('');
   const codigocomuna = ref('');
   const nombreempresapropietaria = ref('');

   empresapropietariaStore.storeCodigoPais = codigopais;
   empresapropietariaStore.storeCodigoCiudad = codigociudad;
   empresapropietariaStore.storeCodigoComuna = codigocomuna;

   funcionLlenarEmpresaPropietaria();
   funcionLlenarPais();

  function funcionLlenarEmpresaPropietaria(){ 
     empresapropietariaStore.listarEmpresaPropietaria();
   }
  function funcionLlenarPais(){ 
     empresapropietariaStore.listarPais();
  }   
  
  function funcionLlenarCiudad(){ 
     empresapropietariaStore.listarCiudadPais(codigopais.value.toUpperCase());
     empresapropietariaStore.storeArrayComunas.codciudad = '';
     empresapropietariaStore.storeArrayComunas.codcomuna = '';
     empresapropietariaStore.storeCodigoCiudad ='';
     empresapropietariaStore.storeCodigoComuna ='';
  }

  function funcionLlenarComuna(){ 
     empresapropietariaStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
     empresapropietariaStore.storeCodigoComuna ='';
  } 

  function posicionarFocus(){ 
    document.getElementById("idcodigoempresapropietaria").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(empresapropietariaStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      // document.getElementById("idcodigopais").disabled=true;
      empresapropietariaStore.grabarEmpresaPropietaria(codigoempresapropietaria.value.toUpperCase(), empresapropietariaStore.storeRutEmpresa, empresapropietariaStore.storeNombreEmpresa, empresapropietariaStore.storeDireccion, empresapropietariaStore.storeGiroComercial, empresapropietariaStore.storeTelefono1, empresapropietariaStore.storeTelefono2, empresapropietariaStore.storeCorreo, codigoinactividad, `${userStore.identificadorUsuario}`, codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigocomuna.value.toUpperCase())
      funcionLimpiar();
    }

  function funcionLimpiar() {
    codigoempresapropietaria.value = '';
    empresapropietariaStore.storeCodigoEmpresa = '';
    empresapropietariaStore.storeNombreEmpresa = '';
    empresapropietariaStore.storeRutEmpresa = '';
    empresapropietariaStore.storeDireccion = '';
    empresapropietariaStore.storeGiroComercial = '';
    empresapropietariaStore.storeTelefono1 = '';
    empresapropietariaStore.storeTelefono2 = '';
    empresapropietariaStore.storeCorreo = '';
    empresapropietariaStore.storeInactividad = false;
    empresapropietariaStore.storeExiste=false;
    empresapropietariaStore.storeFechaCreacion = '';
    empresapropietariaStore.storeFechaModificacion =  '';
    empresapropietariaStore.storeUsuarioCreacion = '';
    empresapropietariaStore.storeUsuarioModificacion = '';
    empresapropietariaStore.storeCodigoPais = '';
    empresapropietariaStore.storeCodigoCiudad = '';
    empresapropietariaStore.storeCodigoComuna = '';
    document.getElementById("idcodigoempresapropietaria").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarempresa(){ 
      document.getElementById("idcodigoempresapropietaria").disabled=true;
      document.getElementById("idcodigopais").disabled=true;
      document.getElementById("idcodigociudad").disabled=true;
      document.getElementById("idcodigocomuna").disabled=true;
      empresapropietariaStore.leerEmpresaPropietaria(codigoempresapropietaria.value.toUpperCase())
      nombreempresapropietaria.value = empresapropietariaStore.storeNombreEmpresa
    }

function funcionImprimir() {
  const doc = new jsPDF('l', 'mm', [216, 279]);
  var fechaActual = new Date();
  var dd = String(fechaActual.getDate()).padStart(2, '0');
  var mm = String(fechaActual.getMonth() + 1).padStart(2, '0');//January is 0!var yyyy = today.getFullYear();
  var yyyy = fechaActual.getFullYear()
  fechaActual = dd + '/' + mm + '/' + yyyy;

  let pageWidth = doc.internal.pageSize.getWidth();
  var textoNombreAgrupacion = 'Agrupación :  ' + `${userStore.nombreEmpresaPropietaria} `;
  var numeroPagina = 1;
  var textoFecha = 'Fecha  :  ' + fechaActual;
  var textoPagina = 'Pagina :  ';
  var nombreTitulo = "INFORME DE AGRUPACIÓN";

     doc.setFont("Arial", "Normal");
     doc.setFontSize(10);
     doc.text(textoNombreAgrupacion, 5, 5);
     doc.text(textoFecha, 240, 5);
     doc.text(textoPagina + numeroPagina, 240, 10);
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text(nombreTitulo, pageWidth / 2, 15, 'center');
     doc.setFontSize(8);                
     doc.line(275, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("Item",5, 25);
     doc.text("Código",13, 25);
     doc.text("Nombre Agrupación",30, 25);
     doc.text("Dirección",117, 25);
     doc.text("Ciudad",195, 25);
     doc.text("Comuna",225, 25);
     doc.text("Estado",260, 25);
     doc.line(275, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");
     let  linea = 33;
     let contador = 1;
     let item = 1;

     for(let i=0;i<empresapropietariaStore.storeArrayEmpresaPropietaria.codempresapropietaria.length;i++){
        let estado = '';
        if(empresapropietariaStore.storeArrayEmpresaPropietaria.inactividad[i]==0){
           estado = 'Activo'
         }else{
           estado = 'Inactivo'
         }
        doc.text(item.toString(), 5, linea);
        doc.text("" + empresapropietariaStore.storeArrayEmpresaPropietaria.codempresapropietaria[i], 13, linea);
        doc.text("" + empresapropietariaStore.storeArrayEmpresaPropietaria.nomempresapropietaria[i].slice(0, 60), 30, linea);
        doc.text("" + empresapropietariaStore.storeArrayEmpresaPropietaria.dirempresapropietaria[i].slice(0, 50), 117, linea);
        doc.text("" + empresapropietariaStore.storeArrayEmpresaPropietaria.ciuempresapropietaria[i].slice(0, 15), 195, linea);
        doc.text("" + empresapropietariaStore.storeArrayEmpresaPropietaria.comempresapropietaria[i].slice(0, 15), 225, linea);
        doc.text(estado, 260, linea);
        linea = linea +  5;
        contador = contador + 1;
        item = item + 1;
        if (contador > 35){
            doc.addPage();
            numeroPagina = numeroPagina + 1;
     doc.setFont("Arial", "Normal");
     doc.setFontSize(10);
     doc.text(textoNombreAgrupacion, 5, 5);
     doc.text(textoFecha, 240, 5);
     doc.text(textoPagina + numeroPagina, 240, 10);
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text(nombreTitulo, pageWidth / 2, 15, 'center');
     doc.setFontSize(8);                
     doc.line(275, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("Item",5, 25);
     doc.text("Código",13, 25);
     doc.text("Nombre Agrupación",30, 25);
     doc.text("Dirección",117, 25);
     doc.text("Ciudad",195, 25);
     doc.text("Comuna",225, 25);
     doc.text("Estado",260, 25);
     doc.line(275, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
         }             
       }
   doc.save("agrupacion.pdf");
  }    

</script>


<style>

</style>