import { defineStore} from "pinia";

export const useUserStore = defineStore('userStore',{
    state: () => ({
        empresacliente:{codigoempresaduena:[],
        direccionempresaduena:[],
        giroempresaduena:[],
        nombrepaisempresaduena:[],
        nombreciudadempresaduena:[],
        nombrecomunaempresaduena:[],
        nombreempresaduena:[],
        rut_empresaduena:[],
        codigoempresacliente:[],
        direccionempresacliente:[],
        giroempresacliente:[],
        nombrepaisempresacliente:[],
        nombreciudadempresacliente:[],
        nombrecomunaempresacliente:[],
        nombreempresacliente:[],
        contactoempresacliente:[],
        rut_empresacliente:[],
        codigousuario:[],
        nombreusuario:[],
        idrelacionusuariooempresa:[],
        },
        identificadorUsuario: ' ',
        passwordUsuario: ' ',
        nombreUsuario: ' ',
        tipousuario:0,
        identificadorEmpresaPropietaria: ' ',
        nombreEmpresaPropietaria: ' ',
        direccionEmpresaPropietaria: ' ',
        girocomerialEmpresaPropietaria: ' ',
        comunaEmpresaPropietaria: ' ',
        ciudadEmpresaPropietaria: ' ',
        paisEmpresaPropietaria: ' ',
        rutEmpresaPropietaria: ' ',
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
              if(res.ok==false || res.status!=200){
                alert("ERROR REPOSITORIO DE DATOS")
                return;
              }
              const data = await res.json();
              if(clave!=data.contrasena)
                {
                  alert("ERROR DATOS NO CORRESPONDEN")
                  return;
                }
              this.identificadorUsuario = data.codigousuario;
              this.passwordUsuario = data.contrasena;
              this.nombreUsuario = data.nombreusuario;
              this.tipousuario = data.tipousuario;
          }catch (error){ 
            alert("ERROR EN AUTENTICACION")
            return;
          }

         try{
          const pars = '&codusuario='+usuario;
          const res1 = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/empprop?'+pars,{
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
          }     
          )
          if(res1.ok==false || res1.status!=200){
            alert("ERROR REPOSITORIO DE DATOS")
            return;
          }
          const datn = await res1.json();
          if(typeof datn.length === 'undefined'){
              this.empresacliente.codigoempresaduena.push(datn.codigoempresaduena);
              this.empresacliente.direccionempresaduena.push(datn.direccionempresaduena);
              this.empresacliente.giroempresaduena.push(datn.girocomercialempresaduena);
              this.empresacliente.nombreciudadempresaduena.push(datn.nombreciudadempresaduena);
              this.empresacliente.nombrecomunaempresaduena.push(datn.nombrecomunaempresaduena);
              this.empresacliente.nombreempresaduena.push(datn.razonsocialempresaduena);
              this.empresacliente.nombrepaisempresaduena.push(datn.nombrepaisempresaduena);
              this.empresacliente.rut_empresaduena.push(datn.rutempresaduena);
              this.empresacliente.direccionempresacliente.push(datn.direccionempresacliente);
              this.empresacliente.giroempresacliente.push(datn.girocomercialempresacliente);
              this.empresacliente.nombrepaisempresacliente.push(datn.nombrepaisempresacliente);
              this.empresacliente.nombreciudadempresacliente.push(datn.nombreciudadempresacliente);
              this.empresacliente.nombrecomunaempresacliente.push(datn.nombrecomunaempresacliente);
              this.empresacliente.rut_empresacliente.push(datn.rutempresacliente);
              this.empresacliente.nombreempresacliente.push(datn.razonsocialempresacliente);
              this.empresacliente.codigoempresacliente.push(datn.codigoempresacliente);
              this.empresacliente.contactoempresacliente.push(datn.contactoempresacliente);
              this.empresacliente.codigousuario.push(datn.codigousuario);
              this.empresacliente.nombreusuario.push(datn.nombreusuario);
              this.empresacliente.idrelacionusuariooempresa.push(datn.id_relacion);
          }else{

              for(var i in datn) {
                this.empresacliente.codigoempresaduena.push(datn[i].codigoempresaduena);
                this.empresacliente.direccionempresaduena.push(datn[i].direccionempresaduena);
                this.empresacliente.giroempresaduena.push(datn[i].girocomercialempresaduena);
                this.empresacliente.nombreciudadempresaduena.push(datn[i].nombreciudadempresaduena);
                this.empresacliente.nombrecomunaempresaduena.push(datn[i].nombrecomunaempresaduena);
                this.empresacliente.nombreempresaduena.push(datn[i].razonsocialempresaduena);
                this.empresacliente.nombrepaisempresaduena.push(datn[i].nombrepaisempresaduena);
                this.empresacliente.rut_empresaduena.push(datn[i].rutempresaduena);
                this.empresacliente.direccionempresacliente.push(datn[i].direccionempresacliente);
                this.empresacliente.giroempresacliente.push(datn[i].girocomercialempresacliente);
                this.empresacliente.nombrepaisempresacliente.push(datn[i].nombrepaisempresacliente);
                this.empresacliente.nombreciudadempresacliente.push(datn[i].nombreciudadempresacliente);
                this.empresacliente.nombrecomunaempresacliente.push(datn[i].nombrecomunaempresacliente);
                this.empresacliente.rut_empresacliente.push(datn[i].rutempresacliente);
                this.empresacliente.nombreempresacliente.push(datn[i].razonsocialempresacliente);
                this.empresacliente.contactoempresacliente.push(datn[i].contactoempresacliente);
                this.empresacliente.codigoempresacliente.push(datn[i].codigoempresa);
                this.empresacliente.codigousuario.push(datn[i].codigousuario);
                this.empresacliente.nombreusuario.push(datn[i].nombreusuario);
                this.empresacliente.idrelacionusuariooempresa.push(datn[i].id_relacion);
              }
        }
        this.identificadorEmpresaPropietaria=this.empresacliente.codigoempresaduena[0];
        this.nombreEmpresaPropietaria=this.empresacliente.nombreempresaduena[0];
        this.direccionEmpresaPropietaria=this.empresacliente.direccionempresaduena[0]
        this.girocomercialEmpresaPropietaria=this.empresacliente.giroempresaduena[0]
        this.comunaEmpresaPropietaria=this.empresacliente.nombrecomunaempresaduena[0];
        this.ciudadEmpresaPropietaria=this.empresacliente.nombreciudadempresaduena[0];
        this.paisEmpresaPropietaria=this.empresacliente.nombrepaisempresaduena[0];
        this.rutEmpresaPropietaria=this.empresacliente.rut_empresaduena[0];

        
         }catch(error){
           alert("ERROR:"+error)
           return
         }

        },
     }   
})