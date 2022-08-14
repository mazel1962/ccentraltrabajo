// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";


export const useMonedaStore = defineStore('monedaStore',{
    state: () => ({
        arreglo:[],
        storeArrayMonedas: {
          codmoneda:[],
          nommoneda:[],
          decimales:[],
          inactividad:[],
        },
        storeCodigoMoneda: ' ',
        storeNombreMoneda: '',
        storeDecimalesMoneda: '0',
        storeInactividad: false,
        storeExiste: false,
        storeFechaCreacion: ' ',
        storeFechaModificacion: ' ',
        storeUsuarioCreacion: ' ',
        storeUsuarioModificacion: ' ',
    }),
    actions: {
//=====================================================
//                   LEER MONEDAS                           
//=====================================================       
      async leerMoneda(codmoneda){
        try{
              const pars = '&codmoneda='+codmoneda;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/crearmoneda?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/crearmoneda?&codmoneda=USD',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
              if((res.status != 200) || (res.ok != true)){
                //  alert("dio un error al leerMoneda-->" + "<--res.status -->" + res.status + "<--")
                return;
              }
              const data = await res.json();

              this.storeCodigoMoneda = data.codigomoneda;
              this.storeNombreMoneda = data.nombremoneda;
              this.storeDecimalesMoneda = data.decimalesmoneda;
              if(data.inactividad==0)
                {
                  this.storeInactividad =false
                }else{
                  this.storeInactividad =true 
                } 
              this.storeFechaCreacion = data.fechacreacion;
              this.storeFechaModificacion = data.fechamodificacion;
              this.storeUsuarioCreacion = data.usuariocreacion;
              this.storeUsuarioModificacion = data.usuariomodificacion;
              this.storeExiste=true;
          }catch (error){ 
            // alert("Error en moneda :   " + error  + " CODIGO MONEDA-->" + this.storeCodigoMoneda + "<--" + " NOMBRE MONEDA-->" + data.nombremoneda + "<--")
            alert("Revise si tiene conexion a Internet" + " Descipcion del error:   " + error )
            console.error();
          }
        },
//=====================================================
//                   GRABAR MONEDAS                           
//=====================================================      
          async grabarMoneda(codmoneda, nommoneda, decimalmoneda, actividadmoneda, codusuario){
            if(codmoneda =='' || nommoneda =='' || decimalmoneda < 0){
              swal({
                title: 'Advertencia',
                text:  'Código o nombre no debe ser espacios, ni decimales en negativos...',
                icon:  'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }
            try{
                const pars = '&codmoneda=' + codmoneda + '&nommoneda=' + nommoneda + '&decimalmoneda=' + decimalmoneda + '&actividadmoneda=' + actividadmoneda + '&codusuario=' + codusuario;
                alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarmoneda?' + pars)
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarmoneda?' + pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/crearmoneda?&codmoneda=USD',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              })
              const data = await res.json();

              if(res.status == 200 || res.ok == true){
                swal({
                  title: 'Grabación',
                  text: `Moneda ${codmoneda} fue grabada con exito...`,
                  icon: 'success',
                  button: 'Aceptar',
                  button: false,
                  timer: 1000,
                });
                return;
              }

          }catch (error){ 
            swal({
              title: 'Error',
              text: `Moneda ${codmoneda} no fue grabada...`, 
              icon: 'error',
              button: 'Aceptar',
              className : "red-bg",
              dangerMode: true, 
            });
            return;
          }
        },
//=====================================================
//                   LISTAR MONEDAS                           
//=====================================================       
async listarMoneda(){
  try{
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarmoneda',{
          method: 'GET',
          mode: 'cors',
          headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        const data = await res.json();
        this.storeArrayMonedas.codmoneda.splice(0,this.storeArrayMonedas.codmoneda.length)
        this.storeArrayMonedas.nommoneda.splice(0,this.storeArrayMonedas.nommoneda.length)
        this.storeArrayMonedas.decimales.splice(0,this.storeArrayMonedas.decimales.length)
        this.storeArrayMonedas.inactividad.splice(0,this.storeArrayMonedas.inactividad.length)
        if (typeof data.length === 'undefined'){
            this.storeArrayMonedas.codmoneda.push(data.codigomoneda);
            this.storeArrayMonedas.nommoneda.push(data.nombremoneda);
            this.storeArrayMonedas.decimales.push(data.decimalesmoneda);
            this.storeArrayMonedas.inactividad.push(data.inactividad);  
        }else{
            this.storeArrayMonedas.codmoneda = data.map(moneda0 => moneda0.codigomoneda);
            this.storeArrayMonedas.nommoneda = data.map(moneda1 => moneda1.nombremoneda);
            this.storeArrayMonedas.decimales = data.map(moneda2 => moneda2.decimalesmoneda);
            this.storeArrayMonedas.inactividad = data.map(moneda3 => moneda3.inactividad);
        }

    }catch (error){ 
      alert("Error en moneda en LISTAR :   " + error + "<---" )
      console.error();
    }
  },        
     }   
})