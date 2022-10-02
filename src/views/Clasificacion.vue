<template>
    <div id="appclasificacion" class="container">
        <h1 class="text-center bg-sky-900 text-plata">Mantención Clasificación</h1>
        <p style="color: white" align="right" v-if="clasificacionStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <!-- <br> -->
        <label font-bold>Agrupación&nbsp:</label>&nbsp&nbsp&nbsp&nbsp{{userStore.nombreEmpresaPropietaria}}
        <br><br>
        <label font-bold >Código Clasificación</label>&nbsp&nbsp&nbsp
        <input id="idcodigoclasificacion" type="text" size = "20" bg-sky-900 v-model="codigoclasificacion" maxlength = "20" style="text-transform:uppercase;" @change="funcionvalidarclasificacion()">&nbsp
        <select id ="idayudaclasificacion" v-model ="codigoclasificacion" @change="funcionvalidarclasificacion()" required>
            <option disabled value="">Seleccione Clasificación</option>
            <option v-for="i in clasificacionStore.storeArrayClasificacion.codclasificacion.length" v-bind:key="clasificacionStore.storeArrayClasificacion.codclasificacion[i-1]" v-bind:value="clasificacionStore.storeArrayClasificacion.codclasificacion[i-1]">{{clasificacionStore.storeArrayClasificacion.codclasificacion[i-1]}} - {{clasificacionStore.storeArrayClasificacion.nomclasificacion[i-1]}}</option>
        </select>  
        <br><br>

        <label >Nombre Clasificación</label>&nbsp &nbsp &nbsp
        <input id="idnombreclasificacion" type="text" size = "100" v-model="clasificacionStore.storeNombreClasificacion" maxlength = "100">
        <br><br>

        <label for="idinactivo">Inactivo</label>&nbsp
        <input id="idinactivo" v-model="clasificacionStore.storeInactividad" type="checkbox" unchecked>
        <br><br>
        <hr>
        <br>
    <!-- </div>
     <div class="botones"> 
      <div justify-center> -->
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionExportar()">Exportar a Excel</button>&nbsp &nbsp &nbsp &nbsp
         <button onclick="generateCSV()">Download</button> 
         <br><br>
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      <!-- </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div> -->
      <label class="text-gray" >Usuario Creación : </label>  {{clasificacionStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{clasificacionStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{clasificacionStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{clasificacionStore.storeFechaModificacion}}
      <br>  
    </div> 
  </template>

<script setup>
   import { ref } from 'vue'
    // import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';
    import { useClasificacionStore } from '../stores/crudclasificacion';
    import { useUserStore } from '../stores/user';
    import { useClienteStore} from '../stores/clienteStore';

    import { jsPDF } from "jspdf";
    import 'jspdf-autotable';    

  //  const empresapropietariaStore = useEmpresaPropietariaStore();
  //  const codigoempresapropietaria = ref('');

   const userStore = useUserStore()
   const ClienteStore = useClienteStore()

   const clasificacionStore = useClasificacionStore();
   const codigoclasificacion = ref('');
   const nombreclasificacion = ref('');

   funcionLlenarClasificacion();

  function funcionLlenarClasificacion(){ 
      clasificacionStore.listarClasificacion(`${userStore.identificadorEmpresaPropietaria}`);
   }
function funcionExportar(){ 
    clasificacionStore.exportarClasificacion(`${userStore.identificadorEmpresaPropietaria}`);
}   

  function posicionarFocus(){ 
    document.getElementById("idcodigoclasificacion").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(clasificacionStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      clasificacionStore.grabarClasificacion(codigoclasificacion.value.toUpperCase(), clasificacionStore.storeNombreClasificacion, `${userStore.identificadorEmpresaPropietaria}`,codigoinactividad,`${userStore.identificadorUsuario}`)
      funcionLimpiar();
    }

  function funcionLimpiar() {
    codigoclasificacion.value = '';
    clasificacionStore.storeCodigoClasificacion = '';
    clasificacionStore.storeNombreClasificacion = '';
    clasificacionStore.storeInactividad = false;
    clasificacionStore.storeFechaCreacion = '';
    clasificacionStore.storeFechaModificacion =  '';
    clasificacionStore.storeUsuarioCreacion = '';
    clasificacionStore.storeUsuarioModificacion = '';
    clasificacionStore.storeExiste=false;
    document.getElementById("idcodigoclasificacion").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarclasificacion(){ 
      document.getElementById("idcodigoclasificacion").disabled=true;
      clasificacionStore.leerClasificacion(`${userStore.identificadorEmpresaPropietaria}`, codigoclasificacion.value.toUpperCase())
      nombreclasificacion.value = clasificacionStore.storeNombreClasificacion
    }

    //-------------------------------------------
    var data = [
        ["name1", 1, 2, 3],
        ["name2", 4, 54, 44],
        ["name3", 212, 212, 1213],
        ["name4", 32, 133, 33]
        ];

        function generateCSV() {
            var csv = 'Name, Value1, Value2, Value3\n';
            data.forEach(function(row) {
                csv += row.join(',');
                csv += "\n";
            });

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'data.csv';
            hiddenElement.click();
        }

    //---------------------------------------------

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
     var textoTitulo = "INFORME CLASIFICACION CONTABLE ";  

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
     doc.text("Identificación Clasificación",43, 25);
     doc.text("Estado",190, 25);
     doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");

     let  linea = 33;
     let contador = 1;
     let item = 1;

     for(let i=0;i<clasificacionStore.storeArrayClasificacion.codclasificacion.length;i++){
        let estado = '';
        if(clasificacionStore.storeArrayClasificacion.inactividad[i]==0){
           estado = 'Activo'
         }else{
           estado = 'Inactivo'
         }
        doc.text(item.toString(), 5, linea);
        doc.text("" + clasificacionStore.storeArrayClasificacion.codclasificacion[i], 13, linea);
        doc.text("" + clasificacionStore.storeArrayClasificacion.nomclasificacion[i], 43, linea);
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
            doc.text("Identificación Clasificación",43, 25);
            doc.text("Estado",190, 25);
            doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
         }             
       }
   doc.save("clasificacion.pdf");
  }  


 
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