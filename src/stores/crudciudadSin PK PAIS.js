// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";
import { usePaisStore } from './crudpais'; //Para Validar ingreso de pais
const paisStore = usePaisStore()

export const useCiudadStore = defineStore('ciudadStore',{
    state: () => ({
        arreglo:[],
        storeArrayCiudad: {
          codciudad:[],
          nomciudad:[],
        },
        storeCodigoPais: ' ',
        storeCodigoCiudad: ' ',
        storeNombreCiudad: '',
        storeCodigoAreaCiudad: '',
        storeInactividad: false,
        storeFechaCreacion: ' ',
        storeFechaModificacion: ' ',
        storeUsuarioCreacion: ' ',
        storeUsuarioModificacion: ' ',
    }),
    actions: {
//=====================================================
//                   LEER CIUDAD                           
//=====================================================       
      async leerCiudad(codciudad){
        try{
              const pars = '&codciudad=' + codciudad;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerciudad?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerpais?&codpais=CHILE',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
              if((res.status != 200) || (res.ok != true)){
                // alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
                return;
              }
              const data = await res.json();

              this.storeCodigoPais = data.codigopais.codigopais;
              this.storeCodigoCiudad = data.codigociudad;
              this.storeNombreCiudad = data.nombreciudad;
              this.storeCodigoAreaCiudad = data.codigoareatelefono;
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
            alert("Error en ciudad (EN LEER):   " + error)
            console.error();
          }
        },
//=====================================================
//                   GRABAR CIUDAD                           
//=====================================================      
          async grabarCiudad(codciudad, nomciudad, codigoareatelefono, codpais, actividadciudad, codusuario){
            // alert("llegue a grabar pais" + codpais + " " + nompais + " " + codmoneda + " " + actividadpais + " " + codusuario)
            if(codpais =='' || codciudad =='' || nomciudad ==''){
              swal({
                title: 'Advertencia',
                text: 'Código Pais, Código Ciudad o Nombre Ciudad no debe ser espacios...',
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }
            try{
                const pars = '&codciudad=' + codciudad + '&nomciudad=' + nomciudad + '&codigoareatelefono=' + codigoareatelefono + '&codpais=' + codpais + '&actividadciudad=' + actividadciudad + '&codusuario=' + codusuario;
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarciudad?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarciudad?&codciudad=SANTIAGO',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              })
              const data = await res.json();

              if(res.status == 200 || res.ok == true){
                swal({
                  title: 'Grabación',
                  text: 'Ciudad fue grabada con exito ...',
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
              text: 'Ciudad no fue grabado...',
              icon: 'error',
              button: 'Aceptar',
              className : "red-bg",
              dangerMode: true, 
            });
            return;
          }
        },
//=====================================================
//                   LISTAR CIUDADES                           
//=====================================================       
async listarCiudad(){
  try{
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarciudad',{
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
            this.storeArrayCiudades.codpais = data.map(ciudad => ciudad.codigopais);
            this.storeArrayCiudades.codciudad = data.map(ciudad1 => ciudad1.codigociudad);
            this.storeArrayCiudades.nomciudad = data.map(ciudad2 => ciudad2.nombreciudad);
        }

    }catch (error){ 
      alert("Error en ciudad en LISTAR :   " + error )
      console.error();
    }
  },        
     }   
})