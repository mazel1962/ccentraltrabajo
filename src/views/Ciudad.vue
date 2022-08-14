
<template>
     <div class="container">
        <h1 class="text-center bg-sky-900 text-plata">Mantención Ciudad</h1>
        <p style="color: white" align="right" v-if="ciudadStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <!-- <br> -->
        <label >País </label>&nbsp &nbsp&nbsp &nbsp &nbsp &nbsp
        <select id ="idcodigopais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in paisStore.storeArrayPaises.codpais.length" v-bind:key="paisStore.storeArrayPaises.codpais[i-1]" v-bind:value="paisStore.storeArrayPaises.codpais[i-1]">{{paisStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>  &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp  Código País: {{codigopais}}
        <br><br>

        <label font-bold for="idcodigociudad">Código Ciudad</label>&nbsp&nbsp&nbsp&nbsp&nbsp
        <input id="idcodigociudad" type="text" size = "15" bg-sky-900 v-model = "codigociudad" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarciudad()">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <select id ="idayudaciudad" v-model ="codigociudad" @change="funcionvalidarciudad()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in ciudadStore.storeArrayCiudades.codciudad.length" v-bind:key="ciudadStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="ciudadStore.storeArrayCiudades.codciudad[i-1]">{{ciudadStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>
        <br><br>        

        <label for="idnombreciudad">Nombre Ciudad </label>&nbsp&nbsp&nbsp
        <input type="text" size = "100" v-model="ciudadStore.storeNombreCiudad" maxlength = "100">
        <br><br>

        <label for="idcodigoareaciudad">Código Área Ciudad</label>&nbsp&nbsp&nbsp
        <input class="border"  type="text" size = "15" v-model="ciudadStore.storeCodigoAreaCiudad" maxlength = "10"> 
        <br><br>                  

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="ciudadStore.storeInactividad" type="checkbox" unchecked>
        <br><br>
        <hr>
        <br>
    <!-- </div>
     <div class="botones"> 
      <div justify-center> -->
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarCiudad()">Otra Ciudad</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
         <br><br>
         <!-- {{ciudadStore.storeValidaPais}} -->
      <!-- </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div> -->
      <label class="text-gray" >Usuario Creación : </label>  {{ciudadStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{ciudadStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{ciudadStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{ciudadStore.storeFechaModificacion}}
      <br>  
  </div>
  </template>

<script setup>
   import { ref } from 'vue'
   import swal from "sweetalert";
   import { usePaisStore } from '../stores/crudpais';
   import { useCiudadStore } from '../stores/crudciudad';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';    
   import { jsPDF } from "jspdf";
   import 'jspdf-autotable';
   
   const paisStore = usePaisStore();
   const ciudadStore = useCiudadStore();
   const userStore = useUserStore();
   const ClienteStore = useClienteStore();   

   const codigopais = ref('');
   const codigociudad = ref('');
   const nombreciudad = ref('');
  
   funcionLlenarPais();

   function funcionLlenarPais(){ 
         paisStore.listarPais();
   }

   function funcionLlenarCiudad(){ 
        document.getElementById("idcodigopais").disabled=true;
        ciudadStore.listarCiudadPais(codigopais.value.toUpperCase());
   }   

  function posicionarFocus(){ 
    document.getElementById("idcodigopais").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(ciudadStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      document.getElementById("idcodigociudad").disabled=true;
      ciudadStore.grabarCiudad(codigociudad.value.toUpperCase(), ciudadStore.storeNombreCiudad, ciudadStore.storeCodigoAreaCiudad, codigopais.value.toUpperCase(), codigoinactividad, `${userStore.identificadorUsuario}`)
      funcionLimpiarCiudad();
    }

  function funcionLimpiarCiudad() {
    // const ciudadStore = useCiudadStore();

    codigociudad.value = '';
    ciudadStore.storeNombrePais = '';
    ciudadStore.storeNombreCiudad = '';

    ciudadStore.storeCodigoPais = '';
    ciudadStore.storeCodigoAreaCiudad = '';
    ciudadStore.storeInactividad = false;
    ciudadStore.storeExiste=false;    

    ciudadStore.storeUsuarioCreacion = '';
    ciudadStore.storeUsuarioModificacion = '';
    ciudadStore.storeFechaCreacion = '';
    ciudadStore.storeFechaModificacion = '';
    document.getElementById("idcodigociudad").disabled=false;
    document.getElementById("idcodigociudad").focus();
    funcionLlenarCiudad();
  }
 
  function funcionLimpiar() {
    const ciudadStore = useCiudadStore();
    codigopais.value = '';
    codigociudad.value = '';
    ciudadStore.storeNombrePais = '';
    ciudadStore.storeNombreCiudad = '';
    ciudadStore.storeCodigoPais = '';
    ciudadStore.storeCodigoAreaCiudad = '';
    ciudadStore.storeInactividad = false;
    ciudadStore.storeExiste=false;   
    ciudadStore.storeUsuarioCreacion = '';
    ciudadStore.storeUsuarioModificacion = '';
    ciudadStore.storeFechaCreacion = '';
    ciudadStore.storeFechaModificacion = '';
    document.getElementById("idcodigopais").disabled=false;
    document.getElementById("idcodigociudad").disabled=false;
    posicionarFocus();
  }

  const funcionvalidarciudad = () => {
      ciudadStore.leerCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase())
      nombreciudad.value = ciudadStore.storeNombreCiudad
      document.getElementById("idcodigociudad").disabled=true;
  };
function funcionImprimir() {
    if(codigopais.value ==''){
       swal({
       title: 'Advertencia',
       text: 'Debe ingresar un País para emitir informe...',
       icon: 'warning',
       button: 'Aceptar',
       className: "red-bg",
       });
       return;
    }
     const doc = new jsPDF( 'p', 'mm', [216, 279]);
     var seleccion = document.getElementById('idcodigopais');
     var nombreCiudad = seleccion.options[seleccion.selectedIndex].text;   //esto es lo que ve el usuario
     var numeroPagina = 1;
     var fechaActual = new Date();
     var dd =String(fechaActual.getDate()).padStart(2,'0');
     var mm =String(fechaActual.getMonth()+1).padStart(2,'0');//January is 0!var yyyy = today.getFullYear();
     var yyyy = fechaActual.getFullYear() 
     fechaActual = dd +'/'+ mm +'/'+ yyyy;     
     let pageWidth = doc.internal.pageSize.getWidth();
     var textoAgrupacion = 'Agrupación : ' + `${userStore.nombreEmpresaPropietaria}`;
     var textoFecha =  'Fecha  :  ' + fechaActual;     
     var textoPagina = 'Pagina :  ';
     var textoTitulo = "INFORME CIUDADES DE " + nombreCiudad.toUpperCase();     

     doc.setFont("Arial", "Normal");
     doc.setFontSize(10);
     doc.text(textoAgrupacion, 5, 5);
     doc.text(textoFecha, 170 , 5); 
     doc.text(textoPagina  + numeroPagina, 170 , 10);    
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text(textoTitulo , pageWidth / 2, 17, 'center');
     doc.setFontSize(8);                
     doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("Item",5, 25);
     doc.text("Código",13, 25);
     doc.text("Nombre País",43, 25);
     doc.text("Código Área",160, 25);
     doc.text("Estado",190, 25);
     doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");

     let  linea = 33;
     let contador = 1;
     let item = 1;
     
     for(let i=0;i<ciudadStore.storeArrayCiudades.codciudad.length;i++){
        let estado = '';
        if(ciudadStore.storeArrayCiudades.inactividad[i]==0){
           estado = 'Activo'
        }else{
           estado = 'Inactivo'
        }
        doc.text(item.toString(), 5, linea);
        doc.text("" + ciudadStore.storeArrayCiudades.codciudad[i], 13, linea);
        doc.text("" + ciudadStore.storeArrayCiudades.nomciudad[i], 43, linea);
        doc.text("" + ciudadStore.storeArrayCiudades.codarea[i], 160, linea);
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
            doc.text(textoTitulo ,pageWidth / 2, 17, 'center');
            doc.setFontSize(8);                
            doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.text("Item",5, 25);
            doc.text("Código",13, 25);
            doc.text("Nombre Ciudad",43, 25);
            doc.text("Código Área",160, 25);
            doc.text("Estado",190, 25);
            doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
        }             
     }
       doc.save("ciudades.pdf");
}
</script>


<style>

</style>