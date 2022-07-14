// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";

export const useMonedaStore = defineStore('monedaStore',{
    state: () => ({
        arreglo:[],
        storeCodigoMoneda: ' ',
        storeNombreMoneda: ' ',
        storeDecimalesMoneda: ' ',
        storeInactividad: false,
        storeFechaCreacion: ' ',
        storeFechaModificacion: ' ',
        storeUsuarioCreacion: ' ',
        storeUsuarioModificacion: ' ',
    }),
    actions: {
      
//=====================================================
//                   GRABAR MONEDAS                           
//=====================================================      
      async grabarMoneda(codmoneda0, nommoneda0, decimalmoneda0, actividadmoneda0, codusuario0){
        alert("GRABAR MONEDAS   : " + codmoneda0 + " nommoneda0= " +  nommoneda0 + " decimalmoneda0= " +  decimalmoneda0);
        try{
          let _datos = {

            codmoneda: "foo", 
            nommoneda: "xxxx", 
            decimalmoneda: 2, 
            actividadmoneda: 0, 
            codusuario: "jcrojas@solumerc.cl"
          }
          
          // fetch('https://jsonplaceholder.typicode.com/posts', {

            fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarmoneda?', {
            method: "POST",
            body: JSON.stringify(_datos),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })         
        }catch (error){ 
          alert("Error en moneda :   " + error )
          console.error();
        }
        },
     }   
})
