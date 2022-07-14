<template>
 <h1 class="text-center bg-sky-900 text-yellow-400">Mantención Moneda</h1>
    <div id="appmoneda" class="container">
        <label font-bold >Código Moneda  </label>
        <input id="idcodigomoneda" type="text" size = "15" bg-sky-900 v-model="codigomoneda" maxlength = "20" style="text-transform:uppercase;" @blur="funcionvalidar()" >&nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp

        <label >Monedas desde api </label>&nbsp &nbsp
        <select id="cmbmonedas" v-model ="monedaStore.storeArrayMonedas.codmoneda" :value="monedaStore.storeArrayMonedas.codmoneda[i-1]" :text="presione">
            <option disabled value="">Selecciona una moneda</option>
            <option v-for="i in monedaStore.storeArrayMonedas.nommoneda.length" >{{monedaStore.storeArrayMonedas.nommoneda[i-1]}}</option>
        </select>
LARGO DE MONEDA {{monedaStore.storeArrayMonedas.codmoneda.length}}<br>
value={{monedaStore.storeArrayMonedas.codmoneda[i-1]}}<br>
<!-- {{arrayMoneda.nombremoneda[1]}} -->

        <label >Monedas desde un arreglo </label>&nbsp &nbsp
        <select v-model="selected" class="form-control" id="docente" label="Seleccione moneda...">
            <option disabled value="">Please select one</option>
            <option v-for="docente in docentes" :value="docente">{{docente.nombremoneda}}</option>
        </select>

        <br>

  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
 
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
 
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>


        <br>
        <br>
<ul>
  <li>uno</li>
  <li>dos</li>
  <li>{{monedaStore.storeNombreMoneda}}</li>
  <!-- <li>storeArrayMonedas.nombremoneda[1],</li> -->
  <li>TRES</li>
</ul>   

<ul>
  <li v-for="arrayMoneda in monedaStore.storeArrayMonedas" v-bind:key="monedaStore.storeArrayMonedas.codigomoneda">{{arrayMoneda.nombremoneda}}</li>
</ul>   
        <br>
        <label >Nombre Moneda  </label>
        <input type="text" size = "100" v-model="monedaStore.storeNombreMoneda" maxlength = "100"><br><br>        
        <label >Decimales Moneda  </label>&nbsp &nbsp &nbsp &nbsp &nbsp
        <input type="number" size = "8" bg-sky-900 maxlength = "1" v-model.number="monedaStore.storeDecimalesMoneda"><br><br>        
        <label for="idinactivo">Inactivo  </label>
        <input id="idinactivo" v-model="monedaStore.storeInactividad" type="checkbox" unchecked>
        <br>
    </div>

     <div class="botones"> 
      <div justify-center>
         <button class= "boton shadow-lg bg-sky-900 hover:bg-blue-500 text-plata py-2 px-4 rounded" @click="funcionGrabar()">Grabar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionLimpiar()">Limpiar</button>&nbsp &nbsp &nbsp &nbsp
         <button class= "boton bg-sky-900 hover:bg-blue-500 text-white py-2 px-4 rounded"  @click="funcionListar()">Listar</button>&nbsp &nbsp &nbsp &nbsp  
      </div>
    </div>
  <div w-full><hr class="bg-sky-900" ></div>
      <label class="text-gray" >Usuario Creación : </label>  {{monedaStore.storeUsuarioCreacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label class="text-gray" >Fecha Creación : </label>  {{monedaStore.storeFechaCreacion}}<br> 
      <label >Usuario Modificación : </label>  {{monedaStore.storeUsuarioModificacion.toLowerCase()}}&nbsp &nbsp &nbsp &nbsp &nbsp 
      <label >Fecha Modificación : </label>  {{monedaStore.storeFechaModificacion}}<br>   
  </template>
<!-- <script>
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
</script> -->

<script>
export default {
  data() {
    return {
      selected:''
    }
  }
}
</script>

<script setup>
   import { ref } from 'vue'
   import { useMonedaStore } from '../stores/crudmoneda';

   const monedaStore = useMonedaStore()
   const codigomoneda = ref('');
   const nombremoneda = ref('');
  
let docentes =[
  {
    "codigomoneda":"USD",
    "decimalesmoneda":2,
    "fechacreacion":"2022-05-19Z",
    "fechamodificacion":"2022-06-12Z",
    "inactividad":1,
    "nombremoneda":"DOLARES AMERICANOS",
    "usuariocreacion":"JUANC-USD-CREACION",
    "usuariomodificacion":"jcrojas@solumerc.cl"
    },
    {
      "codigomoneda":"CLP","decimalesmoneda":2,"fechacreacion":"2022-06-10Z","fechamodificacion":"2022-06-14Z","inactividad":0,"nombremoneda":"PESO CHILENO ","usuariocreacion":"jsoto&vallesunidos.cl","usuariomodificacion":"jcrojas@solumerc.cl"},{"codigomoneda":"EUR","decimalesmoneda":2,"fechacreacion":"2022-06-01Z","fechamodificacion":"2022-06-01Z","inactividad":0,"nombremoneda":"EURO","usuariocreacion":"jcrojas@solumerc.cl","usuariomodificacion":"jcrojas@solumerc.cl"},{"codigomoneda":"YEN","decimalesmoneda":2,"fechacreacion":"2022-06-10Z","fechamodificacion":"2022-06-10Z","inactividad":1,"nombremoneda":"YEN JAPAN","usuariocreacion":"jsoto&vallesunidos.cl","usuariomodificacion":"jcrojas@solumerc.cl"},{"codigomoneda":"CUP","decimalesmoneda":0,"fechacreacion":"2022-05-01Z","fechamodificacion":"2022-06-10Z","inactividad":1,"nombremoneda":"PESO CUBANO","usuariocreacion":"jcrojas@therakine.cl","usuariomodificacion":"jcrojas@solumerc.cl"},{"codigomoneda":"GBP","decimalesmoneda":2,"fechacreacion":"2022-06-10Z","fechamodificacion":"2022-06-11Z","inactividad":1,"nombremoneda":"LIBRA ESTERLINA","usuariocreacion":"jcrojas@solumerc.cl","usuariomodificacion":"jcrojas@solumerc.cl"}
];


// data: () => ({
//     docenteSeleccionado: {nombremoneda:"DOLARES AMERICANO"},//<-- el seleccionado estará aquí
//     docentes: [], // <-- La lista de docentes
// }),
const docenteSeleccionado= "DOLARES AMERICANO";

  funcionListar();

   function funcionListar(){ 
        //  monedaStore.listarMoneda();
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
      monedaStore.grabarMoneda(codigomoneda.value.toUpperCase(), monedaStore.storeNombreMoneda, monedaStore.storeDecimalesMoneda, codigoinactividad, 'jcrojas@solumerc.cl')
      monedaStore.listarMoneda();
     
    //  document.getElementById("cmbmonedas").
     funcionLimpiar();
     // document.getElementById("nombremoneda").focus();
    }

  function funcionLimpiar() {
    codigomoneda.value = '';
    monedaStore.storeNombreMoneda = '';
    monedaStore.storeDecimalesMoneda = '0';
    monedaStore.storeInactividad = false;

    // Limpiar el select y dejarlo vacio
    // const $select = document.querySelector("#cmbmonedas");
    // const limpiar = () => {
    //   for (let i = $select.options.length; i >= 0; i--) {
    //    $select.remove(i);
    //  }
    // };


    document.getElementById("idcodigomoneda").disabled=false;
    posicionarFocus();
  }

    function funcionvalidar(){ 
      document.getElementById("idcodigomoneda").disabled=true;
      
      monedaStore.leerMoneda(codigomoneda.value.toUpperCase())
      
      //  alert("DESPUES DE IR A   monedaStore.leerMoneda(codigomoneda.value)    |  (MONEDA.VUE) codigomoneda.value-->" + codigomoneda.value);
        //  const nombremoneda = ref(rescatarMoneda);
      // const nombremoneda = ref(value : monedaStore.storeNombreMoneda)
   
    // alert("(MONEDA.VUE) monedaStore.storeNombreMoneda-->" + monedaStore.storeNombreMoneda + "<--");
      
      // idusuariomodificacion.value = monedaStore.storeUsuarioModificacion
      nombremoneda.value = monedaStore.storeNombreMoneda
      // alert(monedaStore.storeNombreMoneda)
      // const usuariocreacion = () => ref(monedaStore.storeUsuarioCreacion);

      // document.getElementById("nombremoneda").focus();
    }

  
  // const rescatarMoneda = (nombmoneda) => ({
  //      nombmoneda: monedaStore.storeNombreMoneda
  //  });
 
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