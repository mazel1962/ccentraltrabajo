
<template>

    <div id="appempresacliente" class="container" h-12>
        <h1 class="text-center bg-sky-900 text-plata">Mantención Empresas</h1>
        <p style="color: white" align="right" v-if="empresaclienteStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
        <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
        <p style="color: plata" >  Agrupación&nbsp:  &nbsp&nbsp&nbsp&nbsp{{userStore.nombreEmpresaPropietaria}} </p>  
        <br>
        <label font-bold >Código Empresa</label>&nbsp&nbsp&nbsp
        <input id="idcodigoempresacliente" type="text" size = "20" bg-sky-900 v-model="codigoempresacliente" maxlength = "20" style="text-transform:uppercase;" @change="funcionvalidarempresacliente()">&nbsp &nbsp
        <select id ="idayudaempresacliente" v-model ="codigoempresacliente" @change="funcionvalidarempresacliente()" required>
            <option disabled value="">Seleccione Empresa</option>
            <option v-for="i in empresaclienteStore.storeArrayEmpresaCliente.codempresa.length" v-bind:key="empresaclienteStore.storeArrayEmpresaCliente.codempresa[i-1]" v-bind:value="empresaclienteStore.storeArrayEmpresaCliente.codempresa[i-1]">{{empresaclienteStore.storeArrayEmpresaCliente.nomempresa[i-1]}}</option>
        </select>        
        <br><br>

        <label >Razón Social</label>&nbsp &nbsp &nbsp
        <input type="text" size = "100" v-model="empresaclienteStore.storeNombreEmpresa" maxlength = "200">
        <br><br>

        <label >Rut Empresa</label>&nbsp &nbsp &nbsp
        <input type="text" size = "12" bg-sky-900 maxlength = "15" v-model="empresaclienteStore.storeRutEmpresa">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        
        <label >País </label>&nbsp
        
        <!-- <select id ="idcodigopais" v-model ="codigopais" required> -->
        <select id ="idayudapais" v-model ="codigopais" @change="funcionLlenarCiudad()" required>
            <option disabled value="">Seleccione Pais</option>
            <option v-for="i in empresaclienteStore.storeArrayPaises.codpais.length" v-bind:key="empresaclienteStore.storeArrayPaises.codpais[i-1]" v-bind:value="empresaclienteStore.storeArrayPaises.codpais[i-1]">{{empresaclienteStore.storeArrayPaises.nompais[i-1]}}</option>
        </select>&nbsp
        <input id ="idcodigopais" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoPais" @change="funcionLlenarCiudad()">
        <br><br>

        <label>Ciudad</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        
        <select id ="idayudaciudad" v-model ="codigociudad" @change="funcionLlenarComuna()" required>
            <option disabled value="">Seleccione Ciudad</option>
            <option v-for="i in empresaclienteStore.storeArrayCiudades.codciudad.length" v-bind:key="empresaclienteStore.storeArrayCiudades.codciudad[i-1]" v-bind:value="empresaclienteStore.storeArrayCiudades.codciudad[i-1]">{{empresaclienteStore.storeArrayCiudades.nomciudad[i-1]}}</option>
        </select>&nbsp 
        <input id ="idcodigociudad" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoCiudad">&nbsp &nbsp &nbsp &nbsp

        <label font-bold for="idcodigocomuna">Comuna</label>&nbsp
        <select id ="idayudacomuna" v-model ="codigocomuna">
            <option disabled value="">Seleccione Comuna</option>
            <option v-for="i in empresaclienteStore.storeArrayComunas.codcomuna.length" v-bind:key="empresaclienteStore.storeArrayComunas.codcomuna[i-1]" v-bind:value="empresaclienteStore.storeArrayComunas.codcomuna[i-1]">{{empresaclienteStore.storeArrayComunas.nomcomuna[i-1]}}</option>
        </select>&nbsp
        <input id ="idcodigocomuna" type="text" size = "15" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoComuna">
        <br><br> 

        <label >Dirección</label>&nbsp &nbsp &nbsp &nbsp &nbsp 
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeDireccion">
        <br><br> 

        <label >Giro Comercial</label>&nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeGiroComercial">
        <br><br>

        <label >Teléfono</label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresaclienteStore.storeTelefono1">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
        <label >Teléfono</label>&nbsp &nbsp &nbsp 
        <input type="text" size = "15" bg-sky-900 maxlength = "15" v-model="empresaclienteStore.storeTelefono2">
        <br><br>

        <label >Nombre Contacto</label>&nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeContacto">
        <br><br>         

        <label >Correo Contacto</label>&nbsp &nbsp
        <input type="text" size = "100" bg-sky-900 maxlength = "200" v-model="empresaclienteStore.storeCorreo">
        <br><br>        

        <label >Moneda  </label>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
        <select id ="idayudamoneda" v-model ="codigomoneda" >
            <option disabled value="">Seleccione Moneda</option>
            <option v-for="i in empresaclienteStore.storeArrayMonedas.codmoneda.length" v-bind:key="empresaclienteStore.storeArrayMonedas.codmoneda[i-1]" v-bind:value="empresaclienteStore.storeArrayMonedas.codmoneda[i-1]">{{empresaclienteStore.storeArrayMonedas.nommoneda[i-1]}}</option>
        </select>&nbsp &nbsp 
        <input id ="idcodigomoneda" type="text" size = "20" bg-sky-900 maxlength = "20" v-model="empresaclienteStore.storeCodigoMoneda">        
        <br><br>

        <label for="idinactivo">Inactivo</label>&nbsp
        <input id="idinactivo" v-model="empresaclienteStore.storeInactividad" type="checkbox" unchecked>
        <br><br>
        <hr>
        <br>
     <!-- <div class="botones"> 
      <div justify-center> -->
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
        <br><br>
         <!-- <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp   -->
      <!-- </div>
    </div> -->
      <label class="text-gray" >Usuario Creación : </label>  {{empresaclienteStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{empresaclienteStore.storeFechaCreacion}}
      <br> 
      <label >Usuario Modificación : </label>  {{empresaclienteStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{empresaclienteStore.storeFechaModificacion}}
      <br>   
   </div>
  </template>

<script setup>
   import { ref } from 'vue'
   import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';
   import { useEmpresaClienteStore } from '../stores/crudempresacliente';
   import { useUserStore } from '../stores/user';
   import { useClienteStore} from '../stores/clienteStore';

   import { jsPDF } from "jspdf";
   import 'jspdf-autotable';   

   const userStore = useUserStore()
   const ClienteStore = useClienteStore()

   const empresapropietariaStore = useEmpresaPropietariaStore();
   const codigoempresapropietaria = ref('');

   const empresaclienteStore = useEmpresaClienteStore();
   const codigoempresacliente = ref('');

   const codigomoneda = ref('');
   const codigopais = ref('');
   const codigociudad = ref('');
   const codigocomuna = ref('');
   const nombreempresacliente = ref('');
 
   empresaclienteStore.storeCodigoPais = codigopais;
   empresaclienteStore.storeCodigoCiudad = codigociudad;
   empresaclienteStore.storeCodigoComuna = codigocomuna;
   empresaclienteStore.storeCodigoMoneda = codigomoneda;

  //  funcionLlenarEmpresaPropietaria();
   funcionLlenarEmpresaCliente();
   funcionLlenarMoneda();

  // function funcionLlenarEmpresaPropietaria(){ 
  //    empresapropietariaStore.listarEmpresaPropietaria();
  //  }
  function funcionLlenarMoneda (){ 
     empresaclienteStore.listarMoneda();
   }
  
 function funcionLlenarEmpresaCliente () { 
    // alert('funcionLlenarEmpresaCliente     -->  codigoempresapropietaria='+ `${userStore.identificadorEmpresaPropietaria}`);
     empresaclienteStore.listarEmpresaCliente(`${userStore.identificadorEmpresaPropietaria}`);
   }
  // const funcionLlenarEmpresaCliente = () => { 
  //    alert('funcionLlenarEmpresaCliente     -->  codigoempresapropietaria='+ {codigoempresapropietaria} + '   idayudaempresapropietaria=' + idayudaempresapropietaria.value);
  //    empresaclienteStore.listarEmpresaCliente(idayudaempresapropietaria.value);
  //  };
  
  function funcionLlenarCiudad(){ 
     empresaclienteStore.listarCiudadPais(codigopais.value.toUpperCase());
     empresaclienteStore.storeCodigoCiudad ='';
     empresaclienteStore.storeCodigoComuna ='';
  }

  function funcionLlenarComuna(){ 
     empresaclienteStore.listarComunaCiudad(codigopais.value.toUpperCase(), codigociudad.value.toUpperCase());
     empresaclienteStore.storeCodigoComuna ='';
  } 

  function posicionarFocus(){ 
    document.getElementById("idcodigoempresacliente").focus();
  }

  function funcionGrabar() {
      let codigoinactividad = 0;  
      if(empresaclienteStore.storeInactividad==false)
        {
          codigoinactividad = 0;
        }else{
          codigoinactividad = 1;
        } 
      // document.getElementById("idcodigopais").disabled=true;
      empresaclienteStore.grabarEmpresaCliente(`${userStore.identificadorEmpresaPropietaria}`, codigoempresacliente.value, empresaclienteStore.storeRutEmpresa, empresaclienteStore.storeNombreEmpresa, empresaclienteStore.storeDireccion, empresaclienteStore.storeGiroComercial, empresaclienteStore.storeTelefono1, empresaclienteStore.storeTelefono2, empresaclienteStore.storeContacto, empresaclienteStore.storeCorreo, codigoinactividad, `${userStore.identificadorUsuario}`, codigopais.value.toUpperCase(), codigociudad.value.toUpperCase(), codigocomuna.value.toUpperCase(), codigomoneda.value)
      funcionLimpiar();
    }

  function funcionLimpiar() {
    codigoempresacliente.value = '';
    codigomoneda.value = '';
    empresaclienteStore.storeCodigoEmpresa = '';
    empresaclienteStore.storeNombreEmpresa = '';
    empresaclienteStore.storeRutEmpresa = '';
    empresaclienteStore.storeDireccion = '';
    empresaclienteStore.storeGiroComercial = '';
    empresaclienteStore.storeTelefono1 = '';
    empresaclienteStore.storeTelefono2 = '';
    empresaclienteStore.storeContacto = '';
    empresaclienteStore.storeCorreo = '';
    empresaclienteStore.storeInactividad = false;
    empresaclienteStore.storeExiste = false;
    empresaclienteStore.storeFechaCreacion = '';
    empresaclienteStore.storeFechaModificacion =  '';
    empresaclienteStore.storeUsuarioCreacion = '';
    empresaclienteStore.storeUsuarioModificacion = '';
    empresaclienteStore.storeCodigoPais = '';
    empresaclienteStore.storeCodigoCiudad = '';
    empresaclienteStore.storeCodigoComuna = '';
    empresaclienteStore.storeCodigoMoneda = '';
    document.getElementById("idcodigoempresacliente").disabled=false;
    posicionarFocus();
  }
    const funcionvalidarempresacliente = () => { 
      document.getElementById("idcodigopais").disabled=true;
      document.getElementById("idcodigociudad").disabled=true;
      document.getElementById("idcodigocomuna").disabled=true;
      document.getElementById("idcodigomoneda").disabled=true;
      // alert('codigoempresacliente.value ' + codigoempresacliente.value)
      empresaclienteStore.leerEmpresaCliente(codigoempresacliente.value, `${userStore.identificadorEmpresaPropietaria}`)
      nombreempresacliente.value = empresaclienteStore.storeNombreEmpresa
      codigomoneda.value = empresaclienteStore.storeCodigoMoneda
    };

    function funcionvalidarempresa(){ 
      // document.getElementById("idcodigoempresapropietaria").disabled=true;
      empresapropietariaStore.leerEmpresaPropietaria(codigoempresapropietaria.value.toUpperCase())
      // nombreempresapropietaria.value = empresapropietariaStore.storeNombreEmpresa
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
     var nombreTitulo = "INFORME DE CLIENTES";
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
     doc.text("Nombre Cliente",30, 25);
     doc.text("Dirección",117, 25);
     doc.text("Ciudad",193, 25);
     doc.text("Comuna",220, 25);
     doc.text("Moneda",250, 25);
     doc.text("Estado",265, 25);
     doc.line(275, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");
     let  linea = 33;
     let contador = 1;
     let item = 1;

     for(let i=0;i<empresaclienteStore.storeArrayEmpresaCliente.codempresa.length;i++){
        let estado = '';
        if(empresaclienteStore.storeArrayEmpresaCliente.inactividad[i]==0){
           estado = 'Activo'
         }else{
           estado = 'Inactivo'
         }
        doc.text(item.toString(), 5, linea);
        doc.text("" + empresaclienteStore.storeArrayEmpresaCliente.codempresa[i], 13, linea);
        doc.text("" + empresaclienteStore.storeArrayEmpresaCliente.nomempresa[i].slice(0, 60), 30, linea);
        doc.text("" + empresaclienteStore.storeArrayEmpresaCliente.dirempresa[i].slice(0, 50), 117, linea);
        doc.text("" + empresaclienteStore.storeArrayEmpresaCliente.ciuempresa[i].slice(0, 15), 193, linea);
        doc.text("" + empresaclienteStore.storeArrayEmpresaCliente.comempresa[i].slice(0, 15), 220, linea);        
        doc.text("" + empresaclienteStore.storeArrayEmpresaCliente.monempresa[i].slice(0, 15), 250, linea);
        doc.text(estado, 265, linea);
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
            doc.text("Nombre Cliente",30, 25);
            doc.text("Dirección",117, 25);
            doc.text("Ciudad",193, 25);
            doc.text("Comuna",220, 25);
            doc.text("Moneda",250, 25);
            doc.text("Estado",265, 25);
            doc.line(275, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
         }             
       }
   doc.save("clientes.pdf");
  }        
</script>


<style>

</style>