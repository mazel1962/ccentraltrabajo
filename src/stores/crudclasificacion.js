import { defineStore} from "pinia";
import swal from "sweetalert";
import exportFromJSON  from "export-from-json"

export const useClasificacionStore = defineStore('clasificacionStore',{
    state: () => ({       
        storeArrayClasificacion: {
          codclasificacion:[],
          nomclasificacion:[],
          inactividad:[],
        },        
        storeCodigoClasificacion: '',
        storeNombreClasificacion: '',
        storeInactividad: false,
        storeExiste: false,
        storeFechaCreacion: '',
        storeFechaModificacion: '',
        storeUsuarioCreacion: '',
        storeUsuarioModificacion: '',
    }),
    actions: {
//==================================================
//                LEER CLASIFICACION                          
//==================================================       
     async leerClasificacion(codigoempresapropietaria, codigoclasificacion){
         try{
              const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoclasificacion=' + codigoclasificacion ;
              // alert('pars= ' + pars)
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerclasificacion?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerclasificacion?&codigoempresapropietaria=76817539&codigoclasificacion=10',{                
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

              this.storeCodigoClasificacion = data.codigoclasificacion;
              this.storeNombreClasificacion = data.nombreclasificacion;

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
              this.storeExiste=true
        }catch (error){ 
            alert("Revisar conexión a Internet   -   " + " Descipción del error:   " + error )
            console.error();
        }
      },
//=====================================================
//                GRABAR CLASIFICACION                           
//=====================================================      
        async grabarClasificacion(codigoclasificacion, nombreclasificacion, codigoempresapropietaria, actividadclasificacion, codigousuario){
              if(codigoclasificacion =='' || nombreclasificacion =='' || codigoempresapropietaria ==''){
                swal({
                  title: 'Advertencia',
                  text: 'Código, nombre o empresa propietaria no debe ser espacios...',
                  icon: 'warning',
                  button: 'Aceptar',
                  className: "red-bg",
                  // dangerMode: true,
                });
                return;
              }
              try{
                  const pars = '&codigoclasificacion=' + codigoclasificacion + '&nombreclasificacion=' + nombreclasificacion + '&codigoempresapropietaria=' + codigoempresapropietaria + '&actividadclasificacion=' + actividadclasificacion + '&codigousuario=' + codigousuario;
                  const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarclasificacion?'+pars,{
                  method: 'GET',
                  mode: 'cors',
                  headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
                })
                const data = await res.json();
  
                if(res.status == 200 || res.ok == true){
                  swal({
                    title: 'Grabación',
                    text: ` ${nombreclasificacion} fue grabado con exito...`,
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
                text: ` ${nombreclasificacion} no fue grabado...`,
                icon: 'error',
                button: 'Aceptar',
                className : "red-bg",
                dangerMode: true, 
              });
              return;
            }
          },
//=====================================================
//                   LISTAR CLASIFICACION                           
//=====================================================       
async listarClasificacion(codigoempresaduena){
  try{
        const pars = '&codigoempresaduena=' + codigoempresaduena
        // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarclasificacion?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarclasificacion?' + pars,{
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
        this.storeArrayClasificacion.codclasificacion.splice(0,this.storeArrayClasificacion.codclasificacion.length)
        this.storeArrayClasificacion.nomclasificacion.splice(0,this.storeArrayClasificacion.nomclasificacion.length)
        this.storeArrayClasificacion.inactividad.splice(0,this.storeArrayClasificacion.inactividad.length)
        if (typeof data.length === 'undefined'){
            this.storeArrayClasificacion.codclasificacion.push(data.codigoclasificacion);
            this.storeArrayClasificacion.nomclasificacion.push(data.nombreclasificacion);
            this.storeArrayClasificacion.inactividad.push(data.inactividad);
        }else{
            this.storeArrayClasificacion.codclasificacion = data.map(clasificacion0 => clasificacion0.codigoclasificacion);
            this.storeArrayClasificacion.nomclasificacion = data.map(clasificacion1 => clasificacion1.nombreclasificacion);
            this.storeArrayClasificacion.inactividad = data.map(clasificacion2 => clasificacion2.inactividad);
        }
    }catch (error){ 
      alert("Error en Clasificacion en LISTAR :   " + error )
      console.error();
    }
  },
  //=====================================================
  //            EXPORTAR A EXCEL CLASIFICACION                           
  //=====================================================       
  async exportarClasificacion(codigoempresaduena){
    try{
          const pars = '&codigoempresaduena=' + codigoempresaduena
          // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarclasificacion?' + pars)
          const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarclasificacion?' + pars,{
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
          const exportType = exportFromJSON.types.xls;
          const fileName = "clasificacion";
          exportFromJSON ({data, fileName, exportType})
      }catch (error){ 
        alert("Error al exportar Clasificación :   " + error )
        console.error();
      }
    },  
     }   
})