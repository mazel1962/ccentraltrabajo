import {defineStore} from "pinia";

export const userMenuStore = defineStore('menuStore',{
    state: () => ({
        usuariomenu:{nombre:[],link:[],tpouser:[],titulo:[],publicacion:[]}
        }
    ),
    actions: {
        
        async fijarsesionmenuUsuario(usuario){
        
            try{
                const pars = '&codusuario='+usuario;
                const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarmenu',{
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
                for(var i in data) {
                    this.usuariomenu.nombre.push(data[i].nombremenu);
                    this.usuariomenu.link.push(data[i].ruta);
                    this.usuariomenu.tpouser.push(data[i].tipousuario);
                    this.usuariomenu.titulo.push(data[i].titulo);
                    this.usuariomenu.publicacion.push(data[i].publicacion);
                  }
            }catch (error){ 
              alert("ERROR EN AUTENTICACION")
              return;
            }
  

    },
}})