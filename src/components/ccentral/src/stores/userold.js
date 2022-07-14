import { defineStore} from "pinia";

export const useUserStore = defineStore('userStore',{
    state: () => ({
        arreglo:[],
        identificadorUsuario: ' ',
        passwordUsuario: ' ',
        nombreUsuario: ' ',
    }),
    actions: {
      async  registerUsuario(usuario,clave){
            this.identificadorUsuario = usuario;
            this.passwordUsuario = clave;
            const paramdata = new URLSearchParams("usuario=jsoto@vallesunidos.cl&contrasena=123456");
                try{
                  const res = await fetch('https://192.168.0.122:8443/MazelHazana/mztv/tov/entrada',{
                    method: 'GET',
                    mode: 'cors',
                    body: paramdata,
                    headers: {"Access-Control-Request-Method": "*"}
                  }     
                  )
                  const data = await res.json();
                  this.NombreUser(data)
                this.identificadorUsuario=data  
              }catch (error){ 
                console.error();
              }
        },
     NombreUser(valor){
        state.arreglo=valor 
        valor.forEach(function(ussr) {
        state.nombreUsuario=ussr.nombreusuario
      })
     }  
    }
})
