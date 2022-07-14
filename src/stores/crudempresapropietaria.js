// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";

export const useEmpresaPropietariaStore = defineStore('empresapropietariaStore',{
    state: () => ({

        storeArrayPaises: {
          codpais:[],
          nompais:[],
        },        
        storeArrayEmpresa: {
          codempresa:[],
          nomempresa:[],
        },
        storeArrayCiudades: {
          codciudad:[],
          nomciudad:[],
        },        
        storeArrayComunas: {
          codcomuna:[],
          nomcomuna:[],
        },        

        storeCodigoEmpresa: '',
        storeNombreEmpresa: '',
        storeRutEmpresa: '',
        storeDireccion: '',
        storeGiroComercial: '',
        storeTelefono1: '',
        storeTelefono2: '',
        storeCorreo: '',
        storeInactividad: false,
        storeFechaCreacion: '',
        storeFechaModificacion: '',
        storeUsuarioCreacion: '',
        storeUsuarioModificacion: '',
        storeCodigoPais: '',
        storeCodigoCiudad: '',
        storeCodigoComuna: '',
    }),
    actions: {
//=====================================================
//                LEER EMPRESA PROPIETARIA                           
//=====================================================       
     async leerEmpresaPropietaria(codigoempresapropietaria){
         try{
              const pars = '&codigoempresapropietaria=' + codigoempresapropietaria;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerempresapropietaria?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerempresapropietaria?&codpais=CHILE',{                
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

              this.storeCodigoEmpresa = data.codigoempresaduena;
              this.storeNombreEmpresa = data.razonsocial;

              this.storeRutEmpresa = data.rut;
              this.storeDireccion = data.direccion;
              this.storeGiroComercial = data.girocomercial;
              this.storeTelefono1 = data.telefono1;
              this.storeTelefono2 = data.telefono2;
              this.storeCorreo = data.correo;
              this.storeCodigoPais = data.codigopais.codigopais;
              this.storeCodigoCiudad = data.codigociudad.codigociudad;
              this.storeCodigoComuna = data.codigocomuna.codigocomuna;
              // alert('this.storeCodigoPais=' + this.storeCodigoPais + ' this.storeCodigoCiudad=' + this.storeCodigoCiudad + ' this.storeCodigoComuna=' +this.storeCodigoComuna );
              if(data.actividadempresapropietaria==0)
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
//=====================================================
//                   LISTAR PAISES                           
//=====================================================       
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
            this.storeArrayPaises.codpais = data.map(pais1 => pais1.codigopais);
            this.storeArrayPaises.nompais = data.map(pais2 => pais2.nombrepais);
        }

    }catch (error){ 
      alert("Error en pais en LISTAR :   " + error )
      console.error();
    }
//=====================================================
//    LISTAR CIUDAD - PAIS DE EMPRESA PROPIETARIA                         
//=====================================================       
        try{
            const pars = '&codpais=' + this.storeCodigoPais;
            // alert('leerEmpresaPropietaria   &codpais=' + this.storeCodigoPais)
            const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarciudadpais?'+pars,{
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
             if((res.status == 500) ){
               alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
             return;
        }        
        const data = await res.json();
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            this.storeArrayCiudades.codciudad = data.map(ciudad1 => ciudad1.codigociudad);
            this.storeArrayCiudades.nomciudad = data.map(ciudad2 => ciudad2.nombreciudad);
        }
        }catch (ex){ 
          alert("Error en ciudad en leerEmpresaPropietaria :   ex= " + ex );
        }
//=====================================================
//                  LISTAR COMUNA - CIUDAD - PAIS                          
//=====================================================       
       try{
           const pars = '&codpais=' + this.storeCodigoPais + '&codciudad=' + this.storeCodigoCiudad;
          //  alert('leerEmpresaPropietaria   &codpais=' + this.storeCodigoPais + '  &codciudad=' + this.storeCodigoCiudad)
           const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomunaciudadpais?' + pars,{
               method: 'GET',
               mode: 'cors',
               headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        if((res.status == 500) ){
           alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
          return;
        }        
        const data = await res.json();
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            this.storeArrayComunas.codcomuna = data.map(comuna1 => comuna1.codigocomuna);
            this.storeArrayComunas.nomcomuna = data.map(comuna2 => comuna2.nombrecomuna);
        }
       }catch (ex){ 
           alert("Error en comuna en leerEmpresaPropietaria :   ex= " + ex );
       }
     }, 
//=====================================================
//             GRABAR EMPRESA PROPIETARIA                            
//=====================================================      
        async grabarEmpresaPropietaria(codigoempresapropietaria, rut, razonsocial, direccion, girocomercial, telefono1, telefono2, correo, actividadempresapropietaria, codusuario, codigopais, codigociudad, codigocomuna){
            alert("http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietaria?" + '&codigoempresapropietaria=' + codigoempresapropietaria + '&rut=' + rut + '&razonsocial='+ razonsocial + '&direccion='+ direccion + '&girocomercial=' + girocomercial + '&telefono1=' + telefono1 + '&telefono2=' + telefono2 + '&correo=' + correo + '&actividadempresapropietaria=' + actividadempresapropietaria +  '&codusuario=' + codusuario + '&codigopais=' + codigopais + '&codigociudad=' + codigociudad + '&codigocomuna=' + codigocomuna)
            if(codigoempresapropietaria =='' || codigopais =='' || razonsocial ==''){
              swal({
                title: 'Advertencia',
                text: 'Código, nombre o pais no debe ser espacios...',
                icon: 'warning',
                button: 'Aceptar',
                className: "red-bg",
                // dangerMode: true,
              });
              return;
            }
            try{
                const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&rut=' + rut + '&razonsocial=' + razonsocial + '&direccion=' + direccion + '&girocomercial=' + girocomercial + '&telefono1=' + telefono1 + '&telefono2=' + telefono2 + '&correo=' + correo + '&actividadempresapropietaria=' + actividadempresapropietaria + '&codusuario=' + codusuario + '&codigopais=' + codigopais +'&codigociudad=' + codigociudad + '&codigocomuna=' + codigocomuna;
                console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietaria?'+pars)
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietaria?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarpais??&codpais=CHILE',{                
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              })
              const data = await res.json();

              if(res.status == 200 || res.ok == true){
                swal({
                  title: 'Grabación',
                  text: `Empresa ${razonsocial} fue grabada con exito ...`,
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
              text: 'Pais no fue grabado...',
              text: `Empresa ${razonsocial} no fue grabado...` + error,
              icon: 'error',
              button: 'Aceptar',
              className : "red-bg",
              dangerMode: true, 
            });
            return;
          }
        },
//=====================================================
//              LISTAR EMPRESA PROPIETARIA                           
//=====================================================       
async listarEmpresaPropietaria(){
  try{
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarempresapropietaria',{
          method: 'GET',
          mode: 'cors',
          headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        const data = await res.json();
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            this.storeArrayEmpresa.codempresa = data.map(propietaria0 => propietaria0.codigoempresaduena);
            this.storeArrayEmpresa.nomempresa = data.map(propietaria1 => propietaria1.razonsocial);
        }

    }catch (error){ 
      alert("Error en listarEmpresaPropietaria en LISTAR :   " + error )
      console.error();
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
            this.storeArrayPaises.codpais = data.map(pais1 => pais1.codigopais);
            this.storeArrayPaises.nompais = data.map(pais2 => pais2.nombrepais);
        }

    }catch (error){ 
      alert("Error en pais en LISTAR :   " + error )
      console.error();
    }
  }, 
//=====================================================
//                  LISTAR CIUDAD - PAIS                          
//=====================================================       
async listarCiudadPais(codpais){
  try{
    const pars = '&codpais=' + codpais;
    // alert('&codpais=' + codpais)
    const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarciudadpais?'+pars,{
          method: 'GET',
          mode: 'cors',
          headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        if((res.status == 500) ){
           alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
          return;
        }        
        const data = await res.json();
        if (data.length === 'undefined'){
          alert ("es uno solo");
        }else{
            this.storeArrayCiudades.codpais = data.map(ciudad0 => ciudad0.codigopais);
            this.storeArrayCiudades.codciudad = data.map(ciudad1 => ciudad1.codigociudad);
            this.storeArrayCiudades.nomciudad = data.map(ciudad2 => ciudad2.nombreciudad);
            this.storeCodigoCiudad = '';
            this.storeCodigoComuna = '';
        }
    }catch (ex){ 
         swal({
            title: 'Advertencia',
            text: `${codpais} no tiene asociadas ciudades`,
            icon: 'warning',
            button: 'Aceptar',
            className : "red-bg",
            // dangerMode: true, 
           });
            this.storeCodigoCiudad = '';
            this.storeCodigoComuna = '';
            this.storeArrayCiudades.codciudad = '';
            this.storeArrayCiudades.nomciudad = '';
            this.storeArrayComunas.codcomuna = '';
            this.storeArrayComunas.nomcomuna = '';            
            return;
      // alert("Error en ciudad en listarCiudadPais :   ex= " + ex );
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
        if((res.status == 500) ){
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
      this.storeCodigoComuna = '';
      this.storeArrayComunas.codciudad = '';
      this.storeArrayComunas.codcomuna = '';
      // alert("Error en comuna en listarComunaCiudad ACA VOY :   ex= " + ex );
    }
  },     
     }   
})