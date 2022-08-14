<template>
  <div id="appmoneda" class="container">
     <h1 class="text-center bg-sky-900 text-plata">Mantención Moneda</h1>
     <p style="color: white" align="right" v-if="monedaStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
     <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
     <label font-bold >Código Moneda  </label>&nbsp&nbsp&nbsp
     <input id="idcodigomoneda" type="text" size = "15" bg-sky-900 v-model="codigomoneda" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarmoneda()" >&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
     <select id ="idayudamoneda" v-model ="codigomoneda" @change="funcionvalidarmoneda()" required>
          <option disabled value="">Seleccione Moneda</option>
          <option v-for="i in monedaStore.storeArrayMonedas.codmoneda.length" v-bind:key="monedaStore.storeArrayMonedas.codmoneda[i-1]" v-bind:value="monedaStore.storeArrayMonedas.codmoneda[i-1]">{{monedaStore.storeArrayMonedas.nommoneda[i-1]}}</option>
     </select>
     <br><br>

     <label >Nombre Moneda</label>&nbsp
     <input type="text" size = "100" v-model="monedaStore.storeNombreMoneda" maxlength = "100">
     <br><br>
     <label >Decimales Moneda  </label>&nbsp &nbsp 
     <input type="number" size = "8" bg-sky-900 maxlength = "1" v-model.number="monedaStore.storeDecimalesMoneda">
     <p v-if="monedaStore.storeDecimalesMoneda < 0">
               Decimales no debe ser negativos
     </p>
     <br><br> 

     <label for="idinactivo">Inactivo  </label>&nbsp
     <input id="idinactivo" v-model="monedaStore.storeInactividad" type="checkbox" unchecked>
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
      <label class="text-gray" >Usuario Creación : </label>  {{monedaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{monedaStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{monedaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{monedaStore.storeFechaModificacion}}
      <br> 
   </div>  
  </template>

<script setup>
   import { ref } from 'vue'
   import { useMonedaStore } from '../stores/crudmoneda';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';   
   import { jsPDF } from "jspdf";
   import 'jspdf-autotable';

   const monedaStore = useMonedaStore()
   const userStore = useUserStore()
   const ClienteStore = useClienteStore()

   const codigomoneda = ref('');
   const nombremoneda = ref('');
   funcionLlenarMoneda();

   function funcionLlenarMoneda(){ 
       monedaStore.listarMoneda();
   }

  function posicionarFocus(){ 
    document.getElementById("idcodigomoneda").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(monedaStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigomoneda").disabled=true;
      monedaStore.grabarMoneda(codigomoneda.value.toUpperCase(), monedaStore.storeNombreMoneda, monedaStore.storeDecimalesMoneda, codigoinactividad, `${userStore.identificadorUsuario}`)
      funcionLimpiar();
      funcionLlenarMoneda();
    //  document.getElementById("cmbmonedas").
    // document.getElementById("nombremoneda").focus();
    }

  function funcionLimpiar() {
    codigomoneda.value = '';
    monedaStore.storeNombreMoneda = '';
    monedaStore.storeDecimalesMoneda = '0';
    monedaStore.storeInactividad = false;
    monedaStore.storeExiste=false;
    monedaStore.storeUsuarioCreacion = '';
    monedaStore.storeUsuarioModificacion = '';
    monedaStore.storeFechaCreacion = '';
    monedaStore.storeFechaModificacion = '';
    document.getElementById("idcodigomoneda").disabled=false;
    posicionarFocus();
    // document.getElementById("idcodigomoneda").focus();

    // Limpiar el select y dejarlo vacio
    // const $select = document.querySelector("#cmbmonedas");
    // const limpiar = () => {
    //   for (let i = $select.options.length; i >= 0; i--) {
    //    $select.remove(i);
    //  }
    // };
  }

    function funcionvalidarmoneda(){ 
      document.getElementById("idcodigomoneda").disabled=true;
      monedaStore.leerMoneda(codigomoneda.value.toUpperCase())
      nombremoneda.value = monedaStore.storeNombreMoneda
    }

function funcionImprimir() {
     const doc = new jsPDF( 'p', 'mm', [216, 279]);
     var fechaActual = new Date();
     var dd =String(fechaActual.getDate()).padStart(2,'0');
     var mm =String(fechaActual.getMonth()+1).padStart(2,'0');//January is 0!var yyyy = today.getFullYear();
     var yyyy = fechaActual.getFullYear() 
     fechaActual = dd +'/'+ mm +'/'+ yyyy;

     let pageWidth = doc.internal.pageSize.getWidth();
     var textoAgrupacion = 'Agrupación : ' + `${userStore.nombreEmpresaPropietaria}`;
     var numeroPagina = 1;
     var textoFecha =  'Fecha  :  ' + fechaActual;     
     var textoPagina = 'Pagina :  ';
     var textoTitulo = "INFORME DE MONEDAS ";  

     doc.setFont("Arial", "Normal");
     doc.setFontSize(10);
     doc.text(textoAgrupacion, 5, 5);
     doc.text(textoFecha, 170 , 5); 
     doc.text(textoPagina  + numeroPagina, 170 , 10);    
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text(textoTitulo, pageWidth / 2, 15, 'center');
     doc.setFontSize(8);                
     doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("Item",5, 25);
     doc.text("Código",13, 25);
     doc.text("Nombre Monedas",43, 25);
     doc.text("Decimales",160, 25);     
     doc.text("Estado",190, 25);
     doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");

     let  linea = 33;
     let contador = 1;
     let item = 1;

     for(let i=0;i<monedaStore.storeArrayMonedas.codmoneda.length;i++){
        let estado = '';
        if(monedaStore.storeArrayMonedas.inactividad[i]==0){
           estado = 'Activo'
        }else{
           estado = 'Inactivo'
        }
        // let estado1 = '';
        doc.text(item.toString(), 5, linea);
        doc.text("" + monedaStore.storeArrayMonedas.codmoneda[i], 13, linea);
        doc.text("" + monedaStore.storeArrayMonedas.nommoneda[i], 43, linea);
        doc.text("" + monedaStore.storeArrayMonedas.decimales[i], 167, linea, { align: 'right' });
        // doc.text("" + monedaStore.storeArrayMonedas.decimales[i], 160, linea);
        doc.text(estado, 190, linea);
        linea = linea +  5;
        contador = contador + 1;
        item = item + 1;
        if (contador > 45){
            doc.addPage();
            numeroPagina = numeroPagina + 1;
            doc.setFontSize(10);
            doc.text(textoAgrupacion, 5, 5);
            doc.text(textoFecha, 170 , 5); 
            doc.text(textoPagina  + numeroPagina, 170 , 10);      
            doc.setFontSize(12);
            doc.setFont("Arial", "bold");
            doc.text(textoTitulo, pageWidth / 2, 15, 'center');
            doc.setFontSize(8);                
            doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.text("Item",5, 25);
            doc.text("Código",13, 25);
            doc.text("Nombre Moneda",43, 25);
            doc.text("Decimales",160, 25);
            doc.text("Estado",190, 25);
            doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
         }             
       }
   doc.save("monedas.pdf");
  }    

</script>

<style>
input[type=number] {
  box-sizing: border-box;
  border: 1px solid rgb(212 212 216);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input[type=number]:focus {
  background-color:rgb(201, 200, 200);
}

</style>