// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";

export const useUsuarioStore = defineStore('usuarioStore',{
    state: () => ({
        arreglo:[],
        storeArrayUsuarios: {
          codusuario:[],
          nomusuario:[],
        },
        storeCodigoUsuario: ' ',
        storeNombreUsuario: '',
        storeContrasena: '',
        storeTipoUsuario: '0',
        storeInactividad: false,
        storeFechaCreacion: ' ',
        storeFechaModificacion: ' ',
        storeUsuarioCreacion: ' ',
        storeUsuarioModificacion: ' ',
    }),
    actions: {
//=====================================================
//                   LEER USUARIOS                           
//=====================================================       
      async leerUsuario(codusuario){
        try{
              const pars = '&codusuario='+codusuario;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/crearusuario?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/crearmoneda?&codmoneda=USD',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
              if((res.status != 200) || (res.ok != true)){
                 alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
                return;
              }
              const data = await res.json();

              this.storeCodigoUsuario = data.codigousuario;
              this.storeNombreUsuario = data.nombreusuario;
              this.storeContrasenaUsuario = data.contrasenausuario;
              this.storeTipoUsuario = data.tipousuario;
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
            alert("Revise si tiene conexion a Internet" + "<br>" + "Descipcion del error:   " + error )
            console.error();
          }
        },
//=====================================================
//                   GRABAR USUARIOS                           
//=====================================================      
        //   async grabarUsuario(codusuario, nomusuario, contrasenausuario, tipousuario, actividadusuario, codusuario){
        //     if(codusuario =='' || nomusuario =='' || contrasenausuario ==''){
        //       swal({
        //         title: 'Advertencia',
        //         text:  'Código, nombre o contrasena no debe ser espacios...',
        //         icon:  'warning',
        //         button: 'Aceptar',
        //         className: "red-bg",
        //         // dangerMode: true,
        //       });
        //       return;
        //     }
        //     try{
        //         const pars = '&codusuario=' + codusuario + '&nomusuario=' + nomusuario + '&contrasenausuario=' + contrasenausuario + '&tipousuario=' + tipousuario + '&actividadusuario=' + actividadusuario + '&codusuario=' + codusuario;
        //         alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarusuario?' + pars)
        //         const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarusuario?'+pars,{
        //         method: 'GET',
        //         mode: 'cors',
        //         headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        //       })
        //       const data = await res.json();

        //       if(res.status == 200 || res.ok == true){
        //         swal({
        //           title: 'Grabación',
        //           text: 'Usuario fue grabado con exito ...',
        //           icon: 'success',
        //           button: 'Aceptar',
        //           button: false,
        //           timer: 1000,
        //         });
        //         return;
        //       }

        //   }catch (error){ 
        //     swal({
        //       title: 'Error',
        //       text: 'Usuario no fue grabado...',
        //       icon: 'error',
        //       button: 'Aceptar',
        //       className : "red-bg",
        //       dangerMode: true, 
        //     });
        //     return;
        //   }
        // },
//=====================================================
//                   LISTAR USUARIO                           
//=====================================================       
async listarUsuario(){
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
      alert("Error en Usuario en LISTAR :   " + error + "<---" )
      console.error();
    }
  },        
     }   
})