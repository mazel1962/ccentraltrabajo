// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";

export const useEmpresaPropietariaStore = defineStore('empresapropietariaStore',{
    state: () => ({

        storeArrayPaises: {
          codpais:[],
          nompais:[],
        },        
        storeArrayEmpresaPropietaria: {
          codempresapropietaria:[],
          nomempresapropietaria:[],
          inactividad:[],
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
        storeExiste: false,
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
              this.storeCodigoPais = data.codigopais;
              this.storeCodigoCiudad = data.codigociudad;
              this.storeCodigoComuna = data.codigocomuna;
              // alert('this.storeCodigoPais=' + this.storeCodigoPais + ' this.storeCodigoCiudad=' + this.storeCodigoCiudad + ' this.storeCodigoComuna=' +this.storeCodigoComuna );
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
      if (typeof data.length === 'undefined'){
          this.storeArrayPaises.codpais.push(data.codigopais);
          this.storeArrayPaises.nompais.push(data.nombrepais);
      }else{
          this.storeArrayPaises.codpais = data.map(pais0 => pais0.codigopais);
          this.storeArrayPaises.nompais = data.map(pais1 => pais1.nombrepais);
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
        if((res.status != 200) ){
           alert("Error res.status -->" + res.status + "<--")
           return;
        }        
        const data = await res.json();
        if (typeof data.length === 'undefined'){
           this.storeArrayCiudades.codciudad.push(data.codigociudad);
           this.storeArrayCiudades.nomciudad.push(data.nombreciudad);
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
        if((res.status != 200) ){
           alert("dio un error-->" + "<--res.status -->" + res.status + "<--")
          return;
        }        
        const data = await res.json();
        if (typeof data.length === 'undefined'){
           this.storeArrayComunas.codcomuna.push(data.codigocomuna);
           this.storeArrayComunas.nomcomuna.push(data.nombrecomuna);
        }else{
           this.storeArrayComunas.codcomuna = data.map(comuna0 => comuna0.codigocomuna);
           this.storeArrayComunas.nomcomuna = data.map(comuna1 => comuna1.nombrecomuna);
        }        
       }catch (ex){ 
           alert("Error en comuna en leerEmpresaPropietaria :   ex= " + ex );
       }
     }, 
//=====================================================
//             GRABAR EMPRESA PROPIETARIA                            
//=====================================================      
      async grabarEmpresaPropietaria(codigoempresapropietaria, rut, razonsocial, direccion, girocomercial, telefono1, telefono2, correo, actividadempresapropietaria, codusuario, codigopais, codigociudad, codigocomuna){
      // alert("http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietaria?" + '&codigoempresapropietaria=' + codigoempresapropietaria + '&rut=' + rut + '&razonsocial='+ razonsocial + '&direccion='+ direccion + '&girocomercial=' + girocomercial + '&telefono1=' + telefono1 + '&telefono2=' + telefono2 + '&correo=' + correo + '&actividadempresapropietaria=' + actividadempresapropietaria +  '&codusuario=' + codusuario + '&codigopais=' + codigopais + '&codigociudad=' + codigociudad + '&codigocomuna=' + codigocomuna)
      if(codigoempresapropietaria =='' || razonsocial =='' || codigopais =='' || codigociudad =='' || codigocomuna ==''){
         swal({
             title: 'Advertencia',
             text: 'Código, Razón social, País, Ciudad o Comuna no debe ser espacios...',
             icon: 'warning',
             button: 'Aceptar',
             className: "red-bg",
             // dangerMode: true,
             });
             return;
      }
      try{
          const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&rut=' + rut + '&razonsocial=' + razonsocial + '&direccion=' + direccion + '&girocomercial=' + girocomercial + '&telefono1=' + telefono1 + '&telefono2=' + telefono2 + '&correo=' + correo + '&actividadempresapropietaria=' + actividadempresapropietaria + '&codusuario=' + codusuario + '&codigopais=' + codigopais +'&codigociudad=' + codigociudad + '&codigocomuna=' + codigocomuna;
          // console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietaria?'+pars)
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
      this.storeArrayEmpresaPropietaria.codempresapropietaria.splice(0,this.storeArrayEmpresaPropietaria.codempresapropietaria.length)
      this.storeArrayEmpresaPropietaria.nomempresapropietaria.splice(0,this.storeArrayEmpresaPropietaria.nomempresapropietaria.length)
      this.storeArrayEmpresaPropietaria.inactividad.splice(0,this.storeArrayEmpresaPropietaria.inactividad.length)
      if (typeof data.length === 'undefined'){
          this.storeArrayEmpresaPropietaria.codempresapropietaria.push(data.codigoempresaduena);
          this.storeArrayEmpresaPropietaria.nomempresapropietaria.push(data.razonsocial);
          this.storeArrayEmpresaPropietaria.inactividad.push(data.inactividad);
      }else{
          this.storeArrayEmpresaPropietaria.codempresapropietaria = data.map(propietaria0 => propietaria0.codigoempresaduena);
          this.storeArrayEmpresaPropietaria.nomempresapropietaria = data.map(propietaria1 => propietaria1.razonsocial);
          this.storeArrayEmpresaPropietaria.inactividad = data.map(propietaria2 => propietaria2.inactividad);
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
      if (typeof data.length === 'undefined'){
          this.storeArrayPaises.codpais.push(data.codigopais);
          this.storeArrayPaises.nompais.push(data.nombrepais);
      }else{
          this.storeArrayPaises.codpais = data.map(pais0 => pais0.codigopais);
          this.storeArrayPaises.nompais = data.map(pais1 => pais1.nombrepais);
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
      if((res.status != 200) ){
         alert("Error res.status -->" + res.status + "<--")
         return;
      }        
      const data = await res.json();
      if (typeof data.length === 'undefined'){
          this.storeArrayCiudades.codciudad.push(data.codigociudad);
          this.storeArrayCiudades.nomciudad.push(data.nombreciudad);
      }else{
          this.storeArrayCiudades.codciudad = data.map(ciudad1 => ciudad1.codigociudad);
          this.storeArrayCiudades.nomciudad = data.map(ciudad2 => ciudad2.nombreciudad);
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
    const pars = '&codpais=' + codpais + '&codciudad=' + codciudad;
    // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomunaciudadpais?' + pars);
    const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomunaciudadpais?' + pars,{
       method: 'GET',
       mode: 'cors',
       headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
    }     
    )
    if((res.status != 200) ){
       alert("Error res.status -->" + res.status + "<--")
       return;
    }        
       const data = await res.json();
       if (typeof data.length === 'undefined'){
          this.storeArrayComunas.codcomuna.push(data.codigocomuna);
          this.storeArrayComunas.nomcomuna.push(data.nombrecomuna);
       }else{
          this.storeArrayComunas.codcomuna = data.map(comuna0 => comuna0.codigocomuna);
          this.storeArrayComunas.nomcomuna = data.map(comuna1 => comuna1.nombrecomuna);
       }
      }catch (ex){ 
        swal({
           title: 'Advertencia',
           text: `${codciudad} no tiene asociadas comunas`,
           icon: 'warning',
           button: 'Aceptar',
           className : "red-bg",
           // dangerMode: true, 
           });
           this.storeCodigoComuna = '';
           this.storeArrayComunas.codcomuna = '';
           this.storeArrayComunas.nomcomuna = '';            
           return;
    }
  },     
     }   
})