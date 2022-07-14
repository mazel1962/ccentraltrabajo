import { defineStore} from "pinia";

export const useMonedaStore = defineStore('monedaStore',{
    state: () => ({
        arreglo:[],
        storeCodigoMoneda: ' ',
        storeNombreMoneda: ' ',
        storeDecimalesMoneda: ' ',
        storeInactividad: ' ',
        storeFechaCreacion: ' ',
        storeFechaModificacion: ' ',
        storeUsuarioCreacion: ' ',
        storeUsuarioModificacion: ' ',
    }),
    actions: {
      // async leerMoneda(codmoneda){
       leerMoneda(codmoneda){
          try{
              const pars = '&codmoneda='+codmoneda;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/crearmoneda?&codmoneda='+pars,{
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
              const data = await res.json();
              // this.storeCodigoMoneda = data.codigomoneda;
              // this.storeNombreMoneda = data.nombremoneda;
              // this.storeDecimalesMoneda = data.decimalesmoneda;
              // this.storeInactividad = data.inactividad;
              // this.storeFechaCreacion = data.fechacreacion;
              // this.storeFechaModificacion = data.fechamodificacion;
              // this.storeUsuarioCreacion = data.usuariocreacion;
              // this.storeUsuarioModificacion = data.usuariomodificacion;
              this.storeCodigoMoneda = 'CLP';
              this.storeNombreMoneda = 'NOMBRE MONEDA';
          }catch (error){ 
            alert("Error en moneda :   " + error  + "   " + this.storeNombreMoneda)
            console.error();
          }
        },
     }   
})
