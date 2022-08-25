<template>

  <div id="appplandecuentas" class="container">
    <h1 class="text-center bg-sky-900  text-plata">Mantención Plan de Cuentas</h1>
    <p style="color: white" align="right" v-if="plancuentaStore.storeExiste === true">  Modificar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
    <p style="color: white" align="right" v-else>  Ingresar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </p>
    <p style="color: plata" >  Agrupación&nbsp:  &nbsp&nbsp&nbsp&nbsp{{userStore.nombreEmpresaPropietaria}} </p>
    <!-- <p style="color: plata" >  Cliente&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:  &nbsp&nbsp&nbsp&nbsp{{ClienteStore.nombreEmpresaCliente}} </p> -->
    <br>

    <label font-bold for="idcodigoplancuenta">Código Cuenta </label>
    <input id="idcodigocuenta" type="text" size="10" bg-sky-900 v-model="codigocuenta" @change="funcionvalidarcuenta()">&nbsp
    <select id="idayudacuenta" v-model="codigocuenta" @change="funcionvalidarcuenta()" required>
      <option disabled value="">Seleccione Cuenta</option>
      <option v-for="i in plancuentaStore.storeArrayPlanCuenta.codcuenta.length"
        v-bind:key="plancuentaStore.storeArrayPlanCuenta.codcuenta[i - 1]"
        v-bind:value="plancuentaStore.storeArrayPlanCuenta.codcuenta[i - 1]">
        {{ plancuentaStore.storeArrayPlanCuenta.codcuenta[i - 1] }} -
        {{ plancuentaStore.storeArrayPlanCuenta.nomcuenta[i - 1] }}</option>
    </select>
    <br><br>
    <label for="idnombrecuenta">Nombre Cuenta </label>
    <input id="idnombrecuenta" type="text" size="100" maxlength = "90" v-model="plancuentaStore.storeNombreCuenta">
    <br><br>
    <label for="idcuentaauxiliar">Cuenta Auxiliar </label>&nbsp
    <input id="idcuentaauxiliar" v-model="plancuentaStore.storeCuentaAuxiliar" type="checkbox" unchecked>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    <label for="idnombrecuenta">Tipo Cuenta </label>&nbsp
    <select id="idayudatipocuenta" v-model="plancuentaStore.storeTipoCuenta">
        <option disabled value="">Seleccione Tipo Cuenta</option>
        <option value="AC">Activo</option>
        <option value="PA">Pasivo</option>
        <option value="PE">Perdida</option>
        <option value="GA">Ganancia</option>
    </select>&nbsp&nbsp
    <br><br>
    <b><label class="text-bold">CLASIFICACION BALANCE </label></b>
    <br><br>
    <label>Deudor </label>&nbsp&nbsp&nbsp
    <select id="idayudadeudor" v-model="plancuentaStore.storeClasificacionDeudor">
      <option disabled value="">Seleccione Clasificación</option>
      <option v-for="i in plancuentaStore.storeArrayClasificacion.codclasificacion.length"
        v-bind:key="plancuentaStore.storeArrayClasificacion.codclasificacion[i - 1]"
        v-bind:value="plancuentaStore.storeArrayClasificacion.codclasificacion[i - 1]">
        {{ plancuentaStore.storeArrayClasificacion.codclasificacion[i - 1] }} -
        {{ plancuentaStore.storeArrayClasificacion.nomclasificacion[i - 1] }}</option>
    </select>&nbsp&nbsp
    <input id="idacreedorclasificacion" type="text" size="15" v-model="plancuentaStore.storeClasificacionDeudor">&nbsp &nbsp &nbsp &nbsp
    <br><br>
    <label>Acreedor </label>&nbsp
    <select id="idayudaacreedor" v-model="plancuentaStore.storeClasificacionAcreedor">
      <option disabled value="">Seleccione Clasificación</option>
      <option v-for="i in plancuentaStore.storeArrayClasificacion.codclasificacion.length"
        v-bind:key="plancuentaStore.storeArrayClasificacion.codclasificacion[i - 1]"
        v-bind:value="plancuentaStore.storeArrayClasificacion.codclasificacion[i - 1]">
        {{ plancuentaStore.storeArrayClasificacion.codclasificacion[i - 1] }} -
        {{ plancuentaStore.storeArrayClasificacion.nomclasificacion[i - 1] }}</option>
    </select>&nbsp&nbsp

    <input id="iddeudorclasificacion" type="text" size="15" v-model="plancuentaStore.storeClasificacionAcreedor">
    <br><br>
    <label for="idinactivo">Inactivo</label>&nbsp
    <input id="idinactivo" v-model="plancuentaStore.storeInactividad" type="checkbox" unchecked>
    <br><br>
    <hr><br>
    <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
    <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
    <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionImprimir()">Imprimir</button>&nbsp &nbsp &nbsp &nbsp
    <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionExportar()">Exportar a Excel</button>&nbsp &nbsp &nbsp &nbsp
    <br><br>
    <label class="text-gray" >Usuario Creación : </label>  {{plancuentaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
    <label class="text-gray" >Fecha Creación : </label>  {{plancuentaStore.storeFechaCreacion}}
    <br> 
    <label >Usuario Modificación : </label>  {{plancuentaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
    <label >Fecha Modificación : </label>  {{plancuentaStore.storeFechaModificacion}}
    <br> 
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useEmpresaPropietariaStore } from '../stores/crudempresapropietaria';
import { usePlanCuentaStore } from '../stores/crudplancuenta';
import { useUserStore } from '../stores/user';
import { useClienteStore} from '../stores/clienteStore';

import { jsPDF } from "jspdf";
import 'jspdf-autotable';
  
const userStore = useUserStore()
const ClienteStore = useClienteStore()

//  const empresapropietariaStore = useEmpresaPropietariaStore();
const codigoempresapropietaria = ref('');

const plancuentaStore = usePlanCuentaStore();
const codigocuenta = ref('');
const nombrecuenta = ref('');
// const clasificaciondeudor = ref('');
// const clasificacionacreedor = ref('');

 funcionLlenarPlanCuenta();
 funcionLlenarClasificacion();

function funcionLlenarPlanCuenta() {
    plancuentaStore.listarPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`);
}

function funcionLlenarClasificacion(){ 
    plancuentaStore.listarClasificacion();
}
function funcionExportar(){ 
    plancuentaStore.exportarPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`);
}
function posicionarFocus() {
  document.getElementById("idcodigocuenta").focus();
}

function funcionGrabar() {
  let codigoinactividad = 0;
  let codigoauxiliar = 0;
  let nivel = 0;

  if (plancuentaStore.storeInactividad == false) {
    codigoinactividad = 0;
  } else {
    codigoinactividad = 1;
  }
 
  if (plancuentaStore.storeCuentaAuxiliar == false) {
    codigoauxiliar = 0;
  } else {
    codigoauxiliar = 1;
  }
//=========================================
  let cuentaContable = codigocuenta.value;
  alert ('cuentaContable ' + cuentaContable)
  
  if (cuentaContable.slice(1,7) == '000000'){
      alert('en la comparacion-->'  + cuentaContable.slice(1,7))
      nivel = 1 
  } else if(cuentaContable.slice(2,7)=='00000'){
      alert('en la comparacion-->'  + cuentaContable.slice(2,7))
      nivel = 2
  } else if(cuentaContable.slice(4,7)=='000'){
      alert('en la comparacion-->'  + cuentaContable.slice(4,7))
      nivel = 3
  } else {
      alert(cuentaContable.slice(4,7))
      nivel = 4
  }
//===========================================

  plancuentaStore.grabarPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, codigocuenta.value, plancuentaStore.storeNombreCuenta, idayudatipocuenta.value, codigoauxiliar, nivel, plancuentaStore.storeClasificacionDeudor, plancuentaStore.storeClasificacionAcreedor, codigoinactividad, `${userStore.identificadorUsuario}`, codigoauxiliar)
  funcionLimpiar();
}

function funcionLimpiar() {
  codigocuenta.value = '';
  plancuentaStore.storeCodigoCuenta = '';
  plancuentaStore.storeNombreCuenta = '';
  plancuentaStore.storeCuentaAuxiliar = false;
  plancuentaStore.storeInactividad = false;
  plancuentaStore.storeFechaCreacion = '';
  plancuentaStore.storeFechaModificacion = '';
  plancuentaStore.storeUsuarioCreacion = '';
  plancuentaStore.storeUsuarioModificacion = '';
  plancuentaStore.storeClasificacionDeudor = '';
  plancuentaStore.storeClasificacionAcreedor = '';
  plancuentaStore.storeExiste=false;
  plancuentaStore.storeTipoCuenta = ''
  document.getElementById("idcodigocuenta").disabled = false;
  document.getElementById("iddeudorclasificacion").disabled = false;
  document.getElementById("idacreedorclasificacion").disabled = false;
  posicionarFocus();
}

const funcionvalidarcuenta = () =>{
  document.getElementById("idcodigocuenta").disabled = true;
  document.getElementById("iddeudorclasificacion").disabled = true;
  document.getElementById("idacreedorclasificacion").disabled = true;
  plancuentaStore.leerPlanCuenta(`${userStore.identificadorEmpresaPropietaria}`, `${ClienteStore.identificadorEmpresaCliente}`, codigocuenta.value);
  nombrecuenta.value = plancuentaStore.storeNombreCuenta;
}

function funcionImprimir() {
  // funcionLlenarPlanCuenta();
  const doc = new jsPDF('l', 'mm', [216, 279]);
  var fechaActual = new Date();
  var dd = String(fechaActual.getDate()).padStart(2, '0');
  var mm = String(fechaActual.getMonth() + 1).padStart(2, '0');//January is 0!var yyyy = today.getFullYear();
  var yyyy = fechaActual.getFullYear()
  fechaActual = dd + '/' + mm + '/' + yyyy;

  let pageWidth = doc.internal.pageSize.getWidth();
  var textoNombreAgrupacion = 'Agrupación :  ' + `${userStore.nombreEmpresaPropietaria} `;
  var textoNombreEmpresa = 'Cliente :  ' + `${ClienteStore.nombreEmpresaCliente}`;
  var numeroPagina = 1;
  var textoFecha = 'Fecha  :  ' + fechaActual;
  var textoPagina = 'Pagina :  ';
  var textoTitulo = "INFORME PLAN DE CUENTAS";

  doc.setFont("Arial", "Normal");
  doc.setFontSize(10);
  doc.text(textoNombreAgrupacion, 5, 5);
  doc.text(textoFecha, 240, 5);
  doc.text(textoNombreEmpresa, 5, 10);
  doc.text(textoPagina + numeroPagina, 240, 10);
  doc.setFontSize(12);
  doc.setFont("Arial", "bold");
  doc.text(textoTitulo, pageWidth / 2, 15, 'center');
  doc.setFontSize(8);
      doc.line(275, 20, 5, 20);  // eje x final, eje y inicial, eje x inicial, eje y final
      doc.text("Item", 5, 25);
      doc.text("Código", 13, 25);
      doc.text("Nombre Cuenta", 31, 25);
      doc.text("Balance Clasificado", 162, 25);
      doc.text("Tipo", 200, 25);
      doc.text("Nivel", 217, 25);
      doc.text("Cuenta", 235, 25);
      doc.text("Deudor", 162,30);
      doc.text("Acreedor", 174, 30);
      doc.text("Cuenta", 200, 30);
      doc.text("Cuenta", 217, 30);
      doc.text("Auxiliar", 235, 30);
      doc.text("Estado", 260, 30);
      doc.line(275, 32, 5, 32);  // eje x final, eje y inicial, eje x inicial, eje y final
  doc.setFont("Arial", "Normal");

  let linea = 36;
  let contador = 1;
  let item = 1;

  for (let i = 0; i < plancuentaStore.storeArrayPlanCuenta.codcuenta.length; i++) {
    let estado = '';
    if (plancuentaStore.storeArrayPlanCuenta.inactividad[i] == 0) {
      estado = 'Vigente'
    } else {
      estado = 'Inactivo'
    }
    let tipoCuenta = ''
    if (plancuentaStore.storeArrayPlanCuenta.tipocuenta[i] == 'AC') {
      tipoCuenta = 'Activo'
    } else if (plancuentaStore.storeArrayPlanCuenta.tipocuenta[i] == 'PA') {
      tipoCuenta = 'Pasivo'
        } else if (plancuentaStore.storeArrayPlanCuenta.tipocuenta[i] == 'PE') {
      tipoCuenta = 'Perdida'
        } else if (plancuentaStore.storeArrayPlanCuenta.tipocuenta[i] == 'GA') {
      tipoCuenta = 'Ganancia'
    }
    let auxiliar = '';
    if (plancuentaStore.storeArrayPlanCuenta.auxiliar[i] == 0) {
        auxiliar = ''
    } else if (plancuentaStore.storeArrayPlanCuenta.auxiliar[i] == 1) {
        auxiliar = 'SI'
    } else{
        auxiliar = 'XxX';
    }   

    doc.text(item.toString(), 5, linea);
    doc.text("" + plancuentaStore.storeArrayPlanCuenta.codcuenta[i], 13, linea);
    doc.text("" + plancuentaStore.storeArrayPlanCuenta.nomcuenta[i], 30, linea);
    doc.text("" + plancuentaStore.storeArrayPlanCuenta.codclasificaciondeudor[i], 171, linea, { align: 'right' });
    doc.text("" + plancuentaStore.storeArrayPlanCuenta.codclasificacionacreedor[i], 185, linea, { align: 'right' });
    // doc.text("" + plancuentaStore.storeArrayPlanCuenta.tipocuenta[i], 200, linea, { align: 'left' });
    doc.text(tipoCuenta, 200, linea);
    doc.text("" + plancuentaStore.storeArrayPlanCuenta.nivelcuenta[i], 222, linea, { align: 'right' });
    doc.text(auxiliar, 240, linea, { align: 'right' });
    doc.text(estado, 260, linea);
    linea = linea + 5;
    contador = contador + 1;
    item = item + 1;
    if (contador > 35) {
      doc.addPage();
      numeroPagina = numeroPagina + 1;
      doc.setFontSize(10);
      doc.text(textoNombreAgrupacion, 5, 5);
      doc.text(textoFecha, 240, 5);
      doc.text(textoNombreEmpresa, 5, 10);
      doc.text(textoPagina + numeroPagina, 240, 10);
      doc.setFontSize(12);
      doc.setFont("Arial", "bold");
      doc.text(textoTitulo, pageWidth / 2, 15, 'center');
      doc.setFontSize(8);
      doc.line(275, 20, 5, 20);  // eje x final, eje y inicial, eje x inicial, eje y final
      doc.text("Item", 5, 25);
      doc.text("Código", 13, 25);
      doc.text("Nombre Cuenta", 31, 25);
      doc.text("Balance Clasificado", 162, 25);
      doc.text("Tipo", 200, 25);
      doc.text("Nivel", 217, 25);
      doc.text("Cuenta", 235, 25);
      doc.text("Deudor", 162,30);
      doc.text("Acreedor", 174, 30);
      doc.text("Cuenta", 200, 30);
      doc.text("Cuenta", 217, 30);
      doc.text("Auxiliar", 235, 30);
      doc.text("Estado", 260, 30);
      doc.line(275, 32, 5, 32);  // eje x final, eje y inicial, eje x inicial, eje y final
      doc.setFont("Arial", "Normal");
      contador = 1;
      linea = 36;
    }
  }
  doc.save("PlanDeCuentas.pdf");
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
  padding: 30px 20px 20px 100px;
  margin-bottom: 10px;

}

.boton:hover {
  background-color: rgb(3, 105, 161);
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
  background-color: rgb(212 212 216);
}
</style>