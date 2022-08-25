import { defineStore} from "pinia";
import swal from "sweetalert";
import readXlsFile from"read-excel-file"
import exportFromJSON  from "export-from-json"


export const usePlanCuentaStore = defineStore('plancuentaStore',{
    state: () => ({       
        storeArrayPlanCuenta: {
          codcuenta:[],
          nomcuenta:[],
          codclasificaciondeudor:[],
          codclasificacionacreedor:[], 
          tipocuenta:[],
          nivelcuenta:[],
          auxiliar:[],         
          inactividad:[],
        },  
        storeArrayClasificacion: {
          codclasificacion:[],
          nomclasificacion:[],
          inactividad:[],
        },        
        storeCodigoCuenta: '',
        storeNombreCuenta: '',
        storeClasificacionAcreedor: '',
        storeClasificacionDeudor: '',
        storeCuentaAuxiliar: false,
        storeInactividad: false,
        storeExiste: false,
        storeTipoCuenta: '',
        storeFechaCreacion: '',
        storeFechaModificacion: '',
        storeUsuarioCreacion: '',
        storeUsuarioModificacion: '',
    }),
    actions: {
//==================================================
//                LEER PLAN DE CUENTA                          
//==================================================       
     async leerPlanCuenta(codigoempresaduena, codigoempresa, codigocuenta){
         try{
              const pars = '&codigoempresaduena=' + codigoempresaduena + '&codigoempresa=' + codigoempresa + '&codigoctacontable=' + codigocuenta;
              console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerctacontable?' + pars)
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerctacontable?'+pars,{
                // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerctacontable?&(codigoempresaduena=76817539&codigoempresa=9445901&codigoctacontable=5101038',{                
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

              this.storeCodigoCuenta = data.codigoctacontable;
              this.storeNombreCuenta = data.nombrecuenta;
              this.storeClasificacionAcreedor = data.clasificacioncredito;
              this.storeClasificacionDeudor = data.clasificaciondebito;
              this.storeTipoCuenta = data.tipocuenta;

              if(data.auxiliar==0)
                {
                  this.storeCuentaAuxiliar =false
                }else{
                  this.storeCuentaAuxiliar =true 
                }              

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
        async grabarPlanCuenta(codigoempresaduena, codigoempresa, codigoctacontable, nombrecuenta, tipocuenta, analisis, nivel, clasificaciondebito, clasificacioncredito, inactividad, codigousuario, auxiliar){
              if(codigoctacontable =='' || nombrecuenta =='' || codigoempresaduena =='' || codigoempresa ==''){
                swal({
                  title: 'Advertencia',
                  text: 'Código, nombre cuenta o empresa no debe ser espacios...',
                  icon: 'warning',
                  button: 'Aceptar',
                  className: "red-bg",
                  // dangerMode: true,
                });
                return;
              }
              try{
                  const pars = '&codigoempresaduena=' + codigoempresaduena + '&codigoempresa=' + codigoempresa + '&codigoctacontable=' + codigoctacontable + '&nombrecuenta=' + nombrecuenta + '&tipocuenta=' +  tipocuenta + '&analisis=' + analisis + '&nivel=' + nivel + '&clasificaciondebito=' + clasificaciondebito + '&clasificacioncredito=' + clasificacioncredito + '&inactividad=' + inactividad + '&codigousuario=' + codigousuario + '&auxiliar=' + auxiliar;
                  console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarplancuenta?'+pars)
                  const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizarplancuenta?'+pars,{
                  method: 'GET',
                  mode: 'cors',
                  headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
                })
                const data = await res.json();
  
                if(res.status == 200 || res.ok == true){
                  swal({
                    title: 'Grabación',
                    text: ` ${nombrecuenta} fue grabado con exito...`,
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
                text: ` ${nombrecuenta} no fue grabado...`,
                icon: 'error',
                button: 'Aceptar',
                className : "red-bg",
                dangerMode: true, 
              });
              return;
            }
          },
//=====================================================
//                  LISTAR PLAN DE CUENTA                           
//=====================================================       
async listarPlanCuenta(codigoempresaduena, codigoempresa){
  try{
        const pars = '&codigoempresaduena=' + codigoempresaduena + '&codigoempresa=' + codigoempresa;      
        // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoplancuenta?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoplancuenta?' + pars,{
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
        this.storeArrayPlanCuenta.codcuenta.splice(0,this.storeArrayPlanCuenta.codcuenta.length)
        this.storeArrayPlanCuenta.nomcuenta.splice(0,this.storeArrayPlanCuenta.nomcuenta.length)
        this.storeArrayPlanCuenta.inactividad.splice(0,this.storeArrayPlanCuenta.inactividad.length)
        this.storeArrayPlanCuenta.codclasificaciondeudor.splice(0,this.storeArrayPlanCuenta.codclasificaciondeudor.length)
        this.storeArrayPlanCuenta.codclasificacionacreedor.splice(0,this.storeArrayPlanCuenta.codclasificacionacreedor.length)
        this.storeArrayPlanCuenta.tipocuenta.splice(0,this.storeArrayPlanCuenta.tipocuenta.length)
        this.storeArrayPlanCuenta.nivelcuenta.splice(0,this.storeArrayPlanCuenta.nivelcuenta.length)
        this.storeArrayPlanCuenta.auxiliar.splice(0,this.storeArrayPlanCuenta.auxiliar.length)
        if (typeof data.length === 'undefined'){
            this.storeArrayPlanCuenta.codcuenta.push(data.codigoctacontable);
            this.storeArrayPlanCuenta.nomcuenta.push(data.nombrecuenta);
            this.storeArrayPlanCuenta.inactividad.push(data.inactividad);
            this.storeArrayPlanCuenta.codclasificaciondeudor.push(data.clasificaciondebito);
            this.storeArrayPlanCuenta.codclasificacionacreedor.push(data.clasificacioncredito);
            this.storeArrayPlanCuenta.tipocuenta.push(data.tipocuenta);
            this.storeArrayPlanCuenta.nivelcuenta.push(data.nivelcuenta);
            this.storeArrayPlanCuenta.auxiliar.push(data.auxiliar);
        }else{
            this.storeArrayPlanCuenta.codcuenta = data.map(plancuenta0 => plancuenta0.codigoctacontable);
            this.storeArrayPlanCuenta.nomcuenta = data.map(plancuenta1 => plancuenta1.nombrecuenta);
            this.storeArrayPlanCuenta.inactividad = data.map(plancuenta2 => plancuenta2.inactividad);
            this.storeArrayPlanCuenta.codclasificaciondeudor = data.map(plancuenta3 => plancuenta3.clasificaciondebito);
            this.storeArrayPlanCuenta.codclasificacionacreedor = data.map(plancuenta4 => plancuenta4.clasificacioncredito);
            this.storeArrayPlanCuenta.tipocuenta = data.map(plancuenta5 => plancuenta5.tipocuenta);
            this.storeArrayPlanCuenta.nivelcuenta = data.map(plancuenta6 => plancuenta6.nivel);
            this.storeArrayPlanCuenta.auxiliar = data.map(plancuenta7 => plancuenta7.auxiliar);
        }
    }catch (error){ 
      alert("Error en Plan de Cuentas en LISTAR :   " + error )
      console.error();
    }
  },
//================================================================
//                 EXPORTAR A EXCEL PLAN DE CUENTA                           
//================================================================      
async exportarPlanCuenta(codigoempresaduena, codigoempresa){
  try{
       const pars = '&codigoempresaduena=' + codigoempresaduena + '&codigoempresa=' + codigoempresa;      
       // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoplancuenta?' + pars)
       const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoplancuenta?' + pars,{
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
       const fileName = "plandecuenta";
       exportFromJSON ({data, fileName, exportType})

      }catch (error){ 
      alert("Error al exportar Plan de Cuenta en LISTAR :   " + error )
      console.error();
    }
  },  
//=====================================================
//                   LISTAR CLASIFICACION                           
//=====================================================       
async listarClasificacion(){
  try{
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarclasificacion',{
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
      alert("Error en Plan de cuentas en LISTAR :   " + error )
      console.error();
    }
  },
}  
})