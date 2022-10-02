import { defineStore} from "pinia";

export const useClienteStore = defineStore('clientesStore',{
    state: () => ({
        identificadorEmpresaCliente: ' ',
        nombreEmpresaCliente: ' ',
        direccionEmpresaCliente: ' ',
        girocomerialEmpresaCliente: ' ',
        codigoComunaEmpresaCliente: ' ',
        comunaEmpresaCliente: ' ',
        codigoCiudadEmpresaCliente: ' ',
        ciudadEmpresaCliente: ' ',
        codigoPaisEmpresaCliente: ' ',
        paisEmpresaCliente: ' ',
        rutEmpresaCliente: ' ',
        contactoEmpresaCliente: ' ',
    }),
    actions:{

    async defineCliente(identificadorempresapropietaria, identificadorempresacliente){

          try{
              const pars = '&codigoempresapropietariacliente='+identificadorempresacliente+'&codigoempresapropietaria='+identificadorempresapropietaria;
              // alert ('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerempresapropietariacliente?'+pars)
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerempresapropietariacliente?'+pars,{
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
              this.identificadorEmpresaCliente = data.codigoempresa;
              this.nombreEmpresaCliente = data.razonsocial;
              this.direccionEmpresaCliente = data.direccion;
              this.giroComercialCliente = data.girocomercial;
              this.rutEmpresaCliente = data.rut;
              this.contactoEmpresaCliente = data.contacto;
              this.codigoPaisEmpresaCliente = data.codigopais;
              this.codigoCiudadEmpresaCliente = data.codigociudad;
              this.codigoComunaEmpresaCliente = data.codigocomuna;
          }catch (error){ 
            alert("ERROR EN EMPRESA CLIENTE")
            return;
          }

          try{
            const pars = '&codpais='+this.codigoPaisEmpresaCliente;
            const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerpais?'+pars,{
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
            this.paisEmpresaCliente = data.nombrepais;
            }catch (error){ 
                alert("ERROR EN PAIS EMPRESA CLIENTE")
                return;
            }

            try{
                const pars = '&codpais='+this.codigoPaisEmpresaCliente+'&codciudad='+this.codigoCiudadEmpresaCliente
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerciudad?'+pars,{
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
                this.ciudadEmpresaCliente = data.nombreciudad;
                }catch (error){ 
                    alert("ERROR EN CIUDAD EMPRESA CLIENTE")
                    return;
            }

            try{
                const pars = '&codpais='+this.codigoPaisEmpresaCliente+'&codciudad='+this.codigoCiudadEmpresaCliente+'&codcomuna='+this.codigoComunaEmpresaCliente
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenercomuna?'+pars,{
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
                this.comunaEmpresaCliente = data.nombrecomuna;
                }catch (error){ 
                    alert("ERROR EN COMUNA EMPRESA CLIENTE")
                    return;
            }

        },

    }

})