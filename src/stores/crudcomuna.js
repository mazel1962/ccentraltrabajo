// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";
// import { usePaisStore } from '../stores/crudpais'; //Para Validar ingreso de pais

export const useComunaStore = defineStore('comunaStore',{
    state: () => ({
        arreglo:[],
   
        storeArrayComunas: {
          codcomuna:[],
          nomcomuna:[],
        },
      
        storeCodigoPais: ' ',
        storeNombrePais: ' ',
        storeValidaPais: true,

        storeCodigoCiudad: '',
        storeNombreCiudad: '',
        storeValidaCiudad: true,

        storeCodigoComuna: '',
        storeNombreComuna: '',        
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
      async leerComuna(codpais, codciudad, codcomuna){
        try{
              const pars = '&codpais=' + codpais + '&codciudad=' + codciudad + '&codcomuna=' + codcomuna;
              // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenercomuna?' + pars);
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenercomuna?'+pars,{
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
              // this.storeCodigoPais = data.codigociudad.codigopais.codigopais;
              // this.storeNombrePais = data.codigociudad.codigopais.nombrepais;
              // this.storeCodigoCiudad = data.codigociudad.codigociudad;
              // this.storeNombreCiudad = data.codigociudad.nombreciudad;

              this.storeCodigoPais = data.codigopais;
              this.storeCodigoCiudad = data.codigociudad;

              this.storeCodigoComuna = data.codigocomuna;
              this.storeNombreComuna = data.nombrecomuna;
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
            alert("Error en comuna (EN LEER):   " + error)
            console.error();
          }
        },
//=====================================================
//                   GRABAR COMUNA                           
//=====================================================      
          async grabarComuna(codcomuna, nomcomuna, codpais, codciudad, actividadcomuna, codusuario){
            // alert("llegue a grabar pais" + codpais + " " + nompais + " " + codmoneda + " " + actividadpais + " " + codusuario)
            if(codpais =='' || codciudad =='' || codcomuna =='' || nomcomuna ==''){
              swal({
                title: 'Advertencia',
                text: 'Código Pais, Código Ciudad, Código Comuna o Nombre Comuna no debe ser espacios...',
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }
            try{
                const pars = '&codcomuna=' + codcomuna + '&nomcomuna=' + nomcomuna + '&codpais=' + codpais + '&codciudad=' + codciudad + '&actividadcomuna=' + actividadcomuna + '&codusuario=' + codusuario;
                // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarcomuna?'+pars)
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarcomuna?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarcomuna?&codcomuna=SANTIAGO',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              })

              const data = await res.json();

              if(res.status == 200 || res.ok == true){
                swal({
                  title: 'Grabación', 
                  text: `Comuna de ${nomcomuna} fue grabada con exito ...`,
                  icon: 'success',
                  button: 'Aceptar',
                  button: false,
                  timer: 1500,
                });
                return;
              }
          }catch (error){ 
            swal({
              title: 'Error',
              text: `Comuna de ${nomcomuna} no fue grabada ... - error ${error}`,
              icon: 'error',
              button: 'Aceptar',
              className : "red-bg",
              dangerMode: true, 
            });
            return;
          }
        },
//=====================================================
//                   LISTAR COMUNA                           
//=====================================================       
async listarComuna(){
  try{
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomuna',{
          method: 'GET',
          mode: 'cors',
          headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        const data = await res.json();
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            this.storeArrayComunas.codpais = data.map(ciudad0 => ciudad0.codigopais);
            this.storeArrayComunas.codciudad = data.map(ciudad1 => ciudad1.codigociudad);
            this.storeArrayComunas.codcomuna = data.map(ciudad2 => ciudad2.codigocomuna);
            this.storeArrayComunas.nomcomuna = data.map(ciudad3 => ciudad3.nombrecomuna);
        }
    }catch (error){ 
      alert("Error en comuna en LISTAR :   " + error )
      console.error();
    }
  },

//=====================================================
//                  LISTAR COMUNA - CIUDAD - PAIS                          
//=====================================================       
async listarComunaCiudad(codpais, codciudad){
  try{
    // const pars = '&codpais=' + codpais + '&codciudad=' + codciudad;
    const pars = '&codpais=' + codpais + '&codciudad=' + codciudad;
    // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomunaciudadpais?' + pars);
    const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomunaciudadpais?' + pars,{
          method: 'GET',
          mode: 'cors',
          headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        if((res.status != 200) ){
           alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
          return;
        }        
        const data = await res.json();
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            // this.storeArrayComuna.codpais = data.map(comuna0 => comuna0.codigopais);
            this.storeArrayComunas.codcomuna = data.map(comuna1 => comuna1.codigocomuna);
            this.storeArrayComunas.nomcomuna = data.map(comuna2 => comuna2.nombrecomuna);
        }
    }catch (ex){ 
      // alert("Error en comuna en listarComunaCiudad :   ex= " + ex );
      return;
    }
  },  
     }   
})