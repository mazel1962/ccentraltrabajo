// import { Alert } from "ant-design-vue";
import { defineStore} from "pinia";
import swal from "sweetalert";

export const useEmpresaClienteStore = defineStore('empresaclienteStore',{
    state: () => ({
      storeArrayEmpresaCliente: {
          codempresa:[],
          nomempresa:[],
          dirempresa:[],
          ciuempresa:[],
          comempresa:[],
          monempresa:[],
          inactividad:[],
      },
        storeArrayPaises: {
          codpais:[],
          nompais:[],
        },        
        storeArrayCiudades: {
          codciudad:[],
          nomciudad:[],
        },        
        storeArrayComunas: {
          codcomuna:[],
          nomcomuna:[],
        }, 
        storeArrayMonedas: {
          codmoneda:[],
          nommoneda:[],
        },               

        storeCodigoEmpresa: '',
        storeNombreEmpresa: '',
        storeRutEmpresa: '',
        storeDireccion: '',
        storeGiroComercial: '',
        storeTelefono1: '',
        storeTelefono2: '',
        storeContacto: '',
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
        storeCodigoMoneda: '',
        storeDecimalesMoneda: '',
    }),
    actions: {
//=====================================================
//                LEER EMPRESA CLIENTE                           
//=====================================================       
     async leerEmpresaCliente(codigoempresapropietariacliente,codigoempresapropietaria){
         try{
              const pars = '&codigoempresapropietariacliente=' + codigoempresapropietariacliente + '&codigoempresapropietaria=' + codigoempresapropietaria;
              alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerempresapropietariacliente?'+pars)
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerempresapropietariacliente?'+pars,{
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

              this.storeCodigoEmpresa = data.codigoempresa;
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
              this.storeCodigoMoneda = data.codigomoneda.codigomoneda;
              this.storeDecimalesMoneda = data.codigomoneda.decimalesmoneda;
              this.storeContacto = data.contacto;
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
              this.storeExiste = true;
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
        if(res.ok==false || res.status!=200){
          alert("ERROR REPOSITORIO DE DATOS")
          return;
        }
        const data = await res.json();
        this.storeArrayPaises.codpais.splice(0,this.storeArrayPaises.codpais.length)
        this.storeArrayPaises.nompais.splice(0,this.storeArrayPaises.nompais.length)
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
//       LISTAR CIUDAD - PAIS DE EMPRESA CLIENTE                         
//=====================================================       
        try{
            const pars = '&codpais=' + this.storeCodigoPais;
            // alert('leerEmpresaCliente   &codpais=' + this.storeCodigoPais)
            const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarciudadpais?'+pars,{
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
              if((res.ok == false || res.status != 200 ) ){
                alert("dio un error -->" + "<--res.status -->" + res.status + "<--")
               return;
             }        
             const data = await res.json();
             this.storeArrayCiudades.codciudad.splice(0,this.storeArrayCiudades.codciudad.length)
             this.storeArrayCiudades.nomciudad.splice(0,this.storeArrayCiudades.nomciudad.length)
             if (typeof data.length === 'undefined'){
                this.storeArrayCiudades.codciudad.push(data.codigociudad);
                this.storeArrayCiudades.nomciudad.push(data.nombreciudad);
            }else{
                this.storeArrayCiudades.codciudad = data.map(ciudad1 => ciudad1.codigociudad);
                this.storeArrayCiudades.nomciudad = data.map(ciudad2 => ciudad2.nombreciudad);
            }
        }catch (ex){ 
          alert("Error en ciudad en leerEmpresaCliente :   ex= " + ex );
        }
//=====================================================
//                  LISTAR COMUNA - CIUDAD - PAIS                          
//=====================================================       
       try{
           const pars = '&codpais=' + this.storeCodigoPais + '&codciudad=' + this.storeCodigoCiudad;
          //  alert('leerEmpresaCliente  &codpais=' + this.storeCodigoPais + '  &codciudad=' + this.storeCodigoCiudad)
           const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarcomunaciudadpais?' + pars,{
               method: 'GET',
               mode: 'cors',
               headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
        if(res.ok==false || res.status!=200){
          alert("ERROR REPOSITORIO DE DATOS")
          return;
        }
        const data = await res.json();
        this.storeArrayComunas.codcomuna.splice(0,this.storeArrayComunas.codcomuna.length)
        this.storeArrayComunas.nomcomuna.splice(0,this.storeArrayComunas.nomcomuna.length)
        if (typeof data.length === 'undefined'){
           this.storeArrayComunas.codcomuna.push(data.codigocomuna);
           this.storeArrayComunas.nomcomuna.push(data.nombrecomuna);
        }else{
           this.storeArrayComunas.codcomuna = data.map(comuna0 => comuna0.codigocomuna);
           this.storeArrayComunas.nomcomuna = data.map(comuna1 => comuna1.nombrecomuna);
        }
       }catch (ex){ 
           alert("Error en comuna en leerEmpresaCliente :   ex= " + ex );
       }
     }, 
//=====================================================
//             GRABAR EMPRESA CLIENTE                            
//=====================================================      
        async grabarEmpresaCliente(codigoempresapropietaria, codigoempresapropietariacliente, rut, razonsocial, direccion, girocomercial, telefono1, telefono2, contacto, correo, actividadempresapropietariacliente, codusuario, codigopais, codigociudad, codigocomuna, codigomoneda){
            // alert("http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietariacliente?" + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente + '&codigoempresapropietaria=' + codigoempresapropietaria + '&rut=' + rut + '&razonsocial='+ razonsocial + '&direccion='+ direccion + '&girocomercial=' + girocomercial + '&telefono1=' + telefono1 + '&telefono2=' + telefono2 + '&contacto=' + contacto + '&correo=' + correo + '&actividadempresacliente=' + actividadempresacliente +  '&codusuario=' + codusuario + '&codigopais=' + codigopais + '&codigociudad=' + codigociudad + '&codigocomuna=' + codigocomuna + '&codigomoneda=' + codigomoneda)
            if(codigoempresapropietariacliente =='' || codigopais =='' || razonsocial ==''){
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
                const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente + '&rut=' + rut + '&razonsocial='+ razonsocial + '&direccion='+ direccion + '&girocomercial=' + girocomercial + '&telefono1=' + telefono1 + '&telefono2=' + telefono2 + '&contacto=' + contacto + '&correo=' + correo + '&actividadempresapropietariacliente=' + actividadempresapropietariacliente +  '&codusuario=' + codusuario + '&codigopais=' + codigopais + '&codigociudad=' + codigociudad + '&codigocomuna=' + codigocomuna + '&codigomoneda=' + codigomoneda;
                console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietariacliente?'+pars)
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarempresapropietariacliente?'+ pars,{
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
//              LISTAR EMPRESA CLIENTE                           
//=====================================================       
async listarEmpresaCliente(codigoempresapropietaria){
  // alert('codigoempresapropietaria'+ codigoempresapropietaria)
  try{
       const pars = '&codigoempresapropietaria=' + codigoempresapropietaria;
      //  alert('listarEmpresaCliente-->'+ 'http://192.168.0.122:40280/MazelHazana/mztv/tov/listarempresapropietariacliente?'+pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarempresapropietariacliente?' + pars,{
          method: 'GET',
          mode: 'cors',
          headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
        }     
        )
       const data = await res.json();
       this.storeArrayEmpresaCliente.codempresa.splice(0,this.storeArrayEmpresaCliente.codempresa.length)
       this.storeArrayEmpresaCliente.nomempresa.splice(0,this.storeArrayEmpresaCliente.nomempresa.length)
       this.storeArrayEmpresaCliente.dirempresa.splice(0,this.storeArrayEmpresaCliente.dirempresa.length)
       this.storeArrayEmpresaCliente.ciuempresa.splice(0,this.storeArrayEmpresaCliente.ciuempresa.length)
       this.storeArrayEmpresaCliente.comempresa.splice(0,this.storeArrayEmpresaCliente.comempresa.length)
       this.storeArrayEmpresaCliente.monempresa.splice(0,this.storeArrayEmpresaCliente.monempresa.length)
       this.storeArrayEmpresaCliente.inactividad.splice(0,this.storeArrayEmpresaCliente.inactividad.length)
       if (typeof data.length === 'undefined'){
           this.storeArrayEmpresaCliente.codempresa.push(data.codigoempresa);
           this.storeArrayEmpresaCliente.nomempresa.push(data.razonsocial);
           this.storeArrayEmpresaCliente.dirempresa.push(data.direccion);
           this.storeArrayEmpresaCliente.ciuempresa.push(data.codigociudad);
           this.storeArrayEmpresaCliente.comempresa.push(data.codigocomuna);          
           this.storeArrayEmpresaCliente.monempresa.push(data.codigomoneda.codigomoneda);
           this.storeArrayEmpresaCliente.inactividad.push(data.inactividad);
       }else{
           this.storeArrayEmpresaCliente.codempresa = data.map(cliente0 => cliente0.codigoempresa);
           this.storeArrayEmpresaCliente.nomempresa = data.map(cliente1 => cliente1.razonsocial);
           this.storeArrayEmpresaCliente.dirempresa = data.map(cliente2 => cliente2.direccion);
           this.storeArrayEmpresaCliente.ciuempresa = data.map(cliente3 => cliente3.codigociudad);
           this.storeArrayEmpresaCliente.comempresa = data.map(cliente4 => cliente4.codigocomuna);
           this.storeArrayEmpresaCliente.monempresa = data.map(cliente5 => cliente5.codigomoneda.codigomoneda);
           this.storeArrayEmpresaCliente.inactividad = data.map(cliente6 => cliente6.inactividad);
       }  
    }catch (error){ 
      alert("Error en listarEmpresaCliente en LISTAR :   " + error )
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
            this.storeArrayComunas.codcomuna = data.map(comuna1 => comuna1.codigocomuna);
            this.storeArrayComunas.nomcomuna = data.map(comuna2 => comuna2.nombrecomuna);
        }
    }catch (ex){ 
      this.storeCodigoComuna = '';
      this.storeArrayComunas.codciudad = '';
      this.storeArrayComunas.codcomuna = '';
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
        if (typeof data.length === 'undefined'){
            this.storeArrayMonedas.codmoneda.push(data.codigomoneda);
            this.storeArrayMonedas.nommoneda.push(data.nombremoneda);
        }else{
            this.storeArrayMonedas.codmoneda = data.map(moneda0 => moneda0.codigomoneda);
            this.storeArrayMonedas.nommoneda = data.map(moneda1 => moneda1.nombremoneda);
        }

    }catch (error){ 
      alert("Error en moneda en LISTAR :   " + error + "<---" )
      console.error();
    }
  },       
     }   
})