
<template>
    <div id="apppais" class="container">
        <h1 class="text-center bg-sky-900 text-plata">Mantención País</h1>
        <p style="color: white" align="right" v-if="paisStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        
        <label font-bold >Código País  </label>&nbsp&nbsp&nbsp 
        <input id="idcodigopais" type="text" size = "15" bg-sky-900 v-model="codigopais" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarpais()" >&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <select id ="idayudapais" v-model ="codigopais" @change="funcionvalidarpais()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in paisStore.storeArrayPaises.codpais.length" v-bind:key="paisStore.storeArrayPaises.codpais[i-1]" v-bind:value="paisStore.storeArrayPaises.codpais[i-1]">{{paisStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>
        <br><br>        
        <label >Nombre País</label>&nbsp&nbsp
        <input type="text" size = "70" v-model="paisStore.storeNombrePais" maxlength = "100">
        <br><br>

        <label >Código Moneda  </label>&nbsp &nbsp 
        <select id ="idayudamoneda" v-model ="codigomoneda" >
            <option disabled value="">Seleccione Moneda</option>
            <option v-for="i in monedaStore.storeArrayMonedas.codmoneda.length" v-bind:key="monedaStore.storeArrayMonedas.codmoneda[i-1]" v-bind:value="monedaStore.storeArrayMonedas.codmoneda[i-1]">{{monedaStore.storeArrayMonedas.nommoneda[i-1]}}</option>
        </select>&nbsp &nbsp 
        <input id ="idcodigomoneda" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="paisStore.storeCodigoMoneda" @blur="funcionvalidarmoneda()">        
        <br><br>

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="paisStore.storeInactividad" type="checkbox" unchecked>
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
      <label class="text-gray" >Usuario Creación : </label>  {{paisStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{paisStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{paisStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{paisStore.storeFechaModificacion}}
      <br> 
  </div>  

  </template>

<script setup>
   import { ref } from 'vue'
   import { usePaisStore } from '../stores/crudpais';
   import { useMonedaStore } from '../stores/crudmoneda';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';   
   import { jsPDF } from "jspdf";
   import 'jspdf-autotable';
   
   const paisStore = usePaisStore();
   const monedaStore = useMonedaStore();
   const userStore = useUserStore()
   const ClienteStore = useClienteStore()   
   const codigopais = ref('');
   const nombrepais = ref('');
   const codigomoneda = ref('');

   paisStore.storeCodigoMoneda = codigomoneda;
  
  funcionLlenarPais();
  funcionLlenarMoneda();

   function funcionLlenarPais(){ 
         paisStore.listarPais();
   }
   function funcionLlenarMoneda(){ 
         monedaStore.listarMoneda();
   }
   function funcionvalidarmoneda(){
           if("idayudapais" ==''){
              swal({
                title: 'Advertencia',
                text: 'Código moneda no existe...',
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
              });
              return;
            }
   }

  function posicionarFocus(){ 
    document.getElementById("idcodigopais").focus();
  }

  function funcionGrabar() {

      let codigoinactividad = 0;  
      if(paisStore.storeCodigoMoneda == '123'){
         swal({
         title: 'Advertencia',
         text: `Moneda ${paisStore.storeCodigoMoneda} no existe...`,
         icon: 'warning',
         button: 'Aceptar',
         className: "red-bg",
         // dangerMode: true,
         });
         return;
      }

      if(paisStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigopais").disabled=true;
      paisStore.grabarPais(codigopais.value.toUpperCase(), paisStore.storeNombrePais, paisStore.storeCodigoMoneda, codigoinactividad, `${userStore.identificadorUsuario}`)
      funcionLimpiar();
      funcionLlenarPais();
  }

  function funcionLimpiar() {
    codigopais.value = '';
    codigomoneda.value = '';
    paisStore.storeNombrePais = '';
    paisStore.storeCodigoMoneda = '';
    paisStore.storeInactividad = false;
    paisStore.storeExiste=false;
    paisStore.storeUsuarioCreacion = '';
    paisStore.storeUsuarioModificacion = '';
    paisStore.storeFechaCreacion = '';
    paisStore.storeFechaModificacion = '';
    document.getElementById("idcodigopais").disabled=false;
    posicionarFocus();
  }

  function funcionvalidarpais(){ 
      document.getElementById("idcodigopais").disabled=true;
      document.getElementById("idcodigomoneda").disabled=true;
      paisStore.leerPais(codigopais.value.toUpperCase())
      nombrepais.value = paisStore.storeNombrePais
  }
    
  function funcionImprimir2() {
     const doc = new jsPDF( 'p', 'mm', [216, 279]);
    //  addPage(letter, landscape);
    //  const fechaActual = new Date();
     let pageWidth = doc.internal.pageSize.getWidth();
     var textoAgrupacion = 'Agrupación : ' + `${userStore.nombreEmpresaPropietaria}`;
     var Fecha = 'Fecha:';
     var Pagina = 'Pagina:';
     doc.setFontSize(8);
     doc.text(15, 5, Titulo);
     doc.text(Fecha, pageWidth - 30 , 5, 'right'); 
     doc.text(Pagina, pageWidth - 30 , 10, 'right');     
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text("INFORME PAISES",pageWidth / 2, 15, 'center');
    //  doc.text(fechaActual.getDay ,pageWidth , 15, 'right');    
     
     var col1 = ["Item", "Código", "Nombre País", "Moneda", "Estado"];
     var rows1 = [];
     var arregloListar = [];

  /* The following array of object as response from the API req  */

          for(let i=0;i<paisStore.storeArrayPaises.codpais.length;i++){
            let inactivo = '';
            if(paisStore.storeArrayPaises.inactividad[i]==0){
               inactivo = 'Activo'
            }else{
               inactivo = 'Inactivo'
            }
              arregloListar.push({item:i,
                            codigo:paisStore.storeArrayPaises.codpais[i],
                            nombre:paisStore.storeArrayPaises.nompais[i],
                            moneda:paisStore.storeArrayPaises.codmoneda[i],
                            inactividad:inactivo
              });
          }

   arregloListar.forEach(element => {      
        var temp1 = [element.item + 1,element.codigo,element.nombre, element.moneda, element.inactividad ];
        rows1.push(temp1);
    });        

        // doc.autoTable(col, rows, { startY: 10 });

   doc.autoTable(col1, rows1, { startY: 20 } );
   doc.save("paises.pdf");

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

     doc.setFont("Arial", "Normal");
     doc.setFontSize(10);
     doc.text(textoAgrupacion, 5, 5);
     doc.text(textoFecha, 170 , 5); 
     doc.text(textoPagina  + numeroPagina, 170 , 10);    
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text("INFORME PAISES",pageWidth / 2, 15, 'center');
     doc.setFontSize(8);                
     doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("Item",5, 25);
     doc.text("Código",13, 25);
     doc.text("Nombre País",43, 25);
     doc.text("Moneda",160, 25);
     doc.text("Estado",190, 25);
     doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");
     let  linea = 33;
     let contador = 1;
     let item = 1;

     for(let i=0;i<paisStore.storeArrayPaises.codpais.length;i++){
        let estado = '';
        if(paisStore.storeArrayPaises.inactividad[i]==0){
           estado = 'Activo'
         }else{
           estado = 'Inactivo'
         }
        doc.text(item.toString(), 5, linea);
        doc.text("" + paisStore.storeArrayPaises.codpais[i], 13, linea);
        doc.text("" + paisStore.storeArrayPaises.nompais[i], 43, linea);
        doc.text("" + paisStore.storeArrayPaises.codmoneda[i], 160, linea);
        doc.text(estado, 190, linea);
        linea = linea +  5;
        contador = contador + 1;
        item = item + 1;
        if (contador > 45){
            doc.addPage();
            numeroPagina = numeroPagina + 1;
            // var textoPagina = 'Pagina :   ' + numeroPagina;
            doc.setFontSize(10);
            doc.text(textoAgrupacion, 5, 5);
            doc.text(textoFecha, 170 , 5); 
            doc.text(textoPagina  + numeroPagina, 170 , 10);      
            doc.setFontSize(12);
            doc.setFont("Arial", "bold");
            doc.text("INFORME PAISES",pageWidth / 2, 15, 'center');
            doc.setFontSize(8);                
            doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.text("Item",5, 25);
            doc.text("Código",13, 25);
            doc.text("Nombre País",43, 25);
            doc.text("Moneda",160, 25);
            doc.text("Estado",190, 25);
            doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
         }             
       }
   doc.save("paises.pdf");
  }    

</script>


<style>

</style>