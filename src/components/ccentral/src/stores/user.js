import { defineStore} from "pinia";

export const useUserStore = defineStore('userStore',{
    state: () => ({
        arreglo:[],
        identificadorUsuario: ' ',
        passwordUsuario: ' ',
        nombreUsuario: ' ',
        identificadorEmpresa: ' ',
        nombreEmpresa: ' ',
        direccionEmpresa: ' ',
        comunaEmpresa: ' ',
        ciudadEmpresa: ' ',
        paisEmpresa: ' ',
        monedaEmpresa: ' ',
    }),
    actions: {
      async registerUsuario(usuario,clave){
        
          try{
              const pars = '&codusuario='+usuario;
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/entrada?'+pars,{
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
              }     
              )
              const data = await res.json();
              if(clave!=data.contrasena)
                {
                  alert("ERROR DATOS NO CORRESPONDEN")
                  return;
                }
              this.identificadorUsuario = data.codigousuario;
              this.passwordUsuario = data.contrasena;
              this.nombreUsuario = data.nombreusuario;
              
          }catch (error){ 
            alert("ERROR EN AUTENTICACION")
            console.error();
          }

         try{
          const pars = '&codusuario='+this.identificadorUsuario;
          const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/empprop?'+pars,{
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
          }     
          )
          const data = await res.json();
          this.identificadorEmpresa = data.codigoempresaduena;
          this.nombreEmpresa = data.razonsocial;
          this.direccionEmpresa = data.direccion;
          this.comunaEmpresa = data.codigocomuna.nombrecomuna;
          this.ciudadEmpresa = data.codigocomuna.codigociudad.nombreciudad;
          this.monedaEmpresa = data.codigocomuna.codigociudad.codigopais.codigomoneda.nombremoneda;
          this.paisEmpresa = data.codigocomuna.codigociudad.codigopais.nombrepais;
          alert(this.ciudadEmpresa);

         }catch(error){
           alert("ERROR: USUARIO SIN EMPRESA ASIGNADA")
           console.error();
         }

        },
     }   
})
