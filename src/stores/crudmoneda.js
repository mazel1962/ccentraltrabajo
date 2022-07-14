// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";

export const useMonedaStore = defineStore('monedaStore',{
    state: () => ({
        arreglo:[],
        storeArrayMonedas: {
          codmoneda:[],
          nommoneda:[],
        },
        storeCodigoMoneda: ' ',
        storeNombreMoneda: '',
        storeDecimalesMoneda: '0',
        storeInactividad: false,
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
            if(codmoneda =='' || nommoneda ==''){
              swal({
                title: 'Advertencia',
                text:  'Código o nombre no debe ser espacios...',
                icon:  'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }
            try{
                const pars = '&codmoneda=' + codmoneda + '&nommoneda=' + nommoneda + '&decimalmoneda=' + decimalmoneda + '&actividadmoneda=' + actividadmoneda + '&codusuario=' + codusuario;
                // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarmoneda?' + pars)
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarmoneda?'+pars,{
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
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            // for(var i in data){
            //   this.storeArrayMonedas.codmoneda.push(data[i].codigomoneda);
            //   this.storeArrayMonedas.nommoneda.push(data[i].nombremoneda);
            // }
            this.storeArrayMonedas.codmoneda = data.map(moneda => moneda.codigomoneda);
            this.storeArrayMonedas.nommoneda = data.map(moneda1 => moneda1.nombremoneda);
        }

    }catch (error){ 
      alert("Error en moneda en LISTAR :   " + error + "<---" )
      console.error();
    }
  },        
     }   
})