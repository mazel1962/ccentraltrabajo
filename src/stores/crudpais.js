// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";

export const usePaisStore = defineStore('paisStore',{
    state: () => ({
        arreglo:[],
        storeArrayPaises: {
          codpais:[],
          nompais:[],
        },
        storeCodigoPais: '',
        storeNombrePais: '',
        storeCodigoMoneda: '',
        storeInactividad: false,
        storeFechaCreacion: ' ',
        storeFechaModificacion: ' ',
        storeUsuarioCreacion: ' ',
        storeUsuarioModificacion: ' ',
    }),
    actions: {
//=====================================================
//                   LEER PAIS                           
//=====================================================       
      async leerPais(codpais){
        try{
              const pars = '&codpais='+codpais;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerpais?'+pars,{
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

              this.storeCodigoPais = data.codigopais;
              this.storeNombrePais = data.nombrepais;
              this.storeCodigoMoneda = data.codigomoneda.codigomoneda;
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
            alert("Revisar conexión a Internet   -   " + " Descipción del error:   " + error )
            console.error();
          }
        },
//=====================================================
//                   GRABAR PAIS                            
//=====================================================      
          async grabarPais(codpais, nompais, codmoneda, actividadpais, codusuario){
            if(codpais =='' || nompais =='' || codmoneda ==''){
              swal({
                title: 'Advertencia',
                text: 'Código, nombre o moneda no debe ser espacios...',
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }
            try{
                const pars = '&codpais=' + codpais + '&nompais=' + nompais + '&codmoneda=' + codmoneda + '&actividadpais=' + actividadpais + '&codusuario=' + codusuario;
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarpais?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarpais??&codpais=CHILE',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              })
              const data = await res.json();

              if(res.status == 200 || res.ok == true){
                swal({
                  title: 'Grabación',
                  text: `Pais ${codpais} fue grabado con exito...`,
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
              text: `Pais ${codpais} no fue grabado...`,
              icon: 'error',
              button: 'Aceptar',
              className : "red-bg",
              dangerMode: true, 
            });
            return;
          }
        },
//=====================================================
//                   LISTAR PAISES                           
//=====================================================       
async listarPais(){
  try{
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarpais',{
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
            this.storeArrayPaises.codpais = data.map(pais => pais.codigopais);
            this.storeArrayPaises.nompais = data.map(pais1 => pais1.nombrepais);
        }

    }catch (error){ 
      alert("Error en pais en LISTAR :   " + error )
      console.error();
    }
  }, 
     }   
})