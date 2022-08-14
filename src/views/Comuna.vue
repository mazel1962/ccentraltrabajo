
<template>
    <div class="container">
       <h1 class="text-center bg-sky-900 text-plata">Mantención Comuna</h1>
        <p style="color: white" align="right" v-if="comunaStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
        <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
       <br>
        <label >País </label>&nbsp &nbsp&nbsp &nbsp &nbsp &nbsp
        <select id ="idcodigopais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in paisStore.storeArrayPaises.codpais.length" v-bind:key="paisStore.storeArrayPaises.codpais[i-1]" v-bind:value="paisStore.storeArrayPaises.codpais[i-1]">{{paisStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>&nbsp &nbsp&nbsp &nbsp &nbsp &nbsp  Código País: {{codigopais}}
        <br><br>

        <label>Ciudad</label>&nbsp &nbsp &nbsp  
        <select id ="idcodigociudad" v-model ="codigociudad" @change="funcionLlenarComuna()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in ciudadStore.storeArrayCiudades.codciudad.length" v-bind:key="ciudadStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="ciudadStore.storeArrayCiudades.codciudad[i-1]">{{ciudadStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp    Código Ciudad: {{codigociudad}}
        <br><br>          

        <label font-bold for="idcodigocomuna">Código Comuna</label>&nbsp&nbsp&nbsp&nbsp&nbsp
        <input id="idcodigocomuna" type="text" size = "15" bg-sky-900 v-model = "codigocomuna" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidarcomuna()">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <select id ="idayudacomuna" v-model ="codigocomuna" @change="funcionvalidarcomuna()" required>
            <option disabled value="">Seleccione Comuna</option>
            <option v-for="i in comunaStore.storeArrayComunas.codcomuna.length" v-bind:key="comunaStore.storeArrayComunas.codcomuna[i-1]" v-bind:value="comunaStore.storeArrayComunas.codcomuna[i-1]">{{comunaStore.storeArrayComunas.nomcomuna[i-1]}}</option>
        </select>
        <br><br> 

        <label for="idnombrecomuna">Nombre Comuna </label>&nbsp&nbsp&nbsp
        <input type="text" size = "100" v-model="comunaStore.storeNombreComuna" maxlength = "100">
        <br><br>

        <label for="idinactivo">Inactivo  </label>&nbsp
        <input id="idinactivo" v-model="comunaStore.storeInactividad" type="checkbox" unchecked>
        <br><br>
        <hr>
        <br>
    <!-- </div>
     <div class="botones"> 
      <div justify-center> -->
        <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarCiudad()">Otra Ciudad</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiarComuna()">Otra Comuna</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
        <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
        <br><br>
      <!-- </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div> -->
      <label class="text-gray" >Usuario Creación : </label>  {{comunaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{comunaStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{comunaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{comunaStore.storeFechaModificacion}}
      <br> 
    </div>
  </template>

<script setup>
   import { ref } from 'vue'
   import swal from "sweetalert";
   import { usePaisStore } from '../stores/crudpais';
   import { useCiudadStore } from '../stores/crudciudad';
   import { useComunaStore } from '../stores/crudcomuna';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';    
   import { jsPDF } from "jspdf";
   import 'jspdf-autotable';
   
   const paisStore = usePaisStore();
   const ciudadStore = useCiudadStore();
   const comunaStore = useComunaStore();
   const userStore = useUserStore();
   const ClienteStore = useClienteStore();    

   const codigopais = ref('');
   const codigociudad = ref('');
   const codigocomuna = ref('');
   const nombrecomuna = ref('');
  
   funcionLlenarPais();

   function funcionLlenarPais(){ 
        paisStore.listarPais();
   } 

   function funcionLlenarCiudad(){ 
        document.getElementById("idcodigopais").disabled=true;
        ciudadStore.listarCiudadPais(codigopais.value.toUpperCase());
   }

   function funcionLlenarComuna(){ 
        document.getElementById("idcodigociudad").disabled=true;
        // const ValidaUfuncionLlenarComunaFlecha = () => {
        // comunaStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
        // }
        comunaStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
   }   
  
      function funcionvalidarcomuna(){ 
      comunaStore.leerComuna(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigocomuna.value.toUpperCase())
      nombrecomuna.value = comunaStore.storeNombreComuna
      document.getElementById("idcodigocomuna").disabled=true;
    } 

  function funcionLimpiarCiudad() {
    comunaStore.storeNombreCiudad = '';
    codigocomuna.value = '';    
    comunaStore.storeNombreComuna = '';
    comunaStore.storeInactividad = false;
    comunaStore.storeExiste=false;      
    comunaStore.storeUsuarioCreacion = '';
    comunaStore.storeUsuarioModificacion = '';
    comunaStore.storeFechaCreacion = '';
    comunaStore.storeFechaModificacion = '';
    document.getElementById("idcodigociudad").disabled=false;
    document.getElementById("idcodigocomuna").disabled=false;
    document.getElementById("idcodigociudad").focus();
  }

  function funcionLimpiarComuna() {
    codigocomuna.value = '';    
    comunaStore.storeNombreComuna = '';
    comunaStore.storeInactividad = false;
    comunaStore.storeUsuarioCreacion = '';
    comunaStore.storeUsuarioModificacion = '';
    comunaStore.storeFechaCreacion = '';
    comunaStore.storeFechaModificacion = '';
    comunaStore.storeExiste=false;  
    document.getElementById("idcodigocomuna").disabled=false;
    document.getElementById("idcodigocomuna").focus();
    }

  //================================================================================
  //                              POR REVISAR
  //================================================================================
    function posicionarFocus(){ 
    document.getElementById("idcodigopais").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(comunaStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      // document.getElementById("idcodigociudad").disabled=true;
      comunaStore.grabarComuna(codigocomuna.value.toUpperCase(), comunaStore.storeNombreComuna, codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigoinactividad, `${userStore.identificadorUsuario}`)
      funcionLimpiarComuna();
      // document.getElementById("idcodigocomuna").disabled=false;
      // document.getElementById("idcodigocomuna").focus();
    }

  function funcionLimpiar() {
    codigopais.value = '';
    codigociudad.value = '';
    codigocomuna.value = '';
    comunaStore.storeNombrePais = '';
    comunaStore.storeCodigoComuna = '';
    comunaStore.storeNombreComuna = '';
    comunaStore.storeCodigoPais = '';
    comunaStore.storeInactividad = false;
    comunaStore.storeUsuarioCreacion = '';
    comunaStore.storeUsuarioModificacion = '';
    comunaStore.storeFechaCreacion = '';
    comunaStore.storeFechaModificacion = '';
    comunaStore.storeExiste=false;
    document.getElementById("idcodigopais").disabled=false;
    document.getElementById("idcodigociudad").disabled=false;
    document.getElementById("idcodigocomuna").disabled=false;
    posicionarFocus();
  }

    function funcionvalidarciudad(){ 
      ciudadStore.leerCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase())
      nombreciudad.value = ciudadStore.storeNombreCiudad
      document.getElementById("idcodigociudad").disabled=true;
    } 
    function funcionvalidarpais(){ 
      ciudadStore.storeValidaPais = true;
      ciudadStore.leerPais(codigopais.value.toUpperCase())
      if(ciudadStore.storeValidaPais === false){
        document.getElementById("idcodigopais").value='';
        document.getElementById("idcodigopais").focus();
      }else{
         document.getElementById("idcodigociudad").focus();
      }
    }
function funcionImprimir() {
    if(codigopais.value =='' || codigociudad.value ==''){
       swal({
       title: 'Advertencia',
       text: 'Debe ingresar País y Ciudad para emitir informe...',
       icon: 'warning',
       button: 'Aceptar',
       className: "red-bg",
       });
       return;
    }
     const doc = new jsPDF( 'p', 'mm', [216, 279]);
     var seleccion = document.getElementById('idcodigociudad');
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
     var textoTitulo = "INFORME COMUNAS DE " + nombreCiudad.toUpperCase();     

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
     doc.text("Nombre Comuna",43, 25);
     doc.text("Estado",190, 25);
     doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");

     let  linea = 33;
     let contador = 1;
     let item = 1;
     
     for(let i=0;i<comunaStore.storeArrayComunas.codcomuna.length;i++){
        let estado = '';
        if(comunaStore.storeArrayComunas.inactividad[i]==0){
           estado = 'Activo'
        }else{
           estado = 'Inactivo'
        }
        doc.text(item.toString(), 5, linea);
        doc.text("" + comunaStore.storeArrayComunas.codcomuna[i], 13, linea);
        doc.text("" + comunaStore.storeArrayComunas.nomcomuna[i], 43, linea);
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
            doc.text("Nombre Comuna",43, 25);
            doc.text("Estado",190, 25);
            doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
        }             
     }
       doc.save("comunas.pdf");
}    
</script>


<style>

</style>