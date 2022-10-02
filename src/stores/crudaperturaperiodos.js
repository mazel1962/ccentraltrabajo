import { defineStore} from "pinia";
import swal from "sweetalert";

export const useAperturaPeriodosStore = defineStore('aperturaperiodosStore',{
    state: () => ({   
      storeArraySistemas: {
        codigosistema:[],
        codigoperiodo:[],
      },            
        storeArrayPeriodos: {
          codigosistema:[],
          codigoperiodo:[],
        },  
        storeCodigoSistema: '',
        storePeriodo: '',
        storeEnero:false,
        storeFebrero:false,
        storeMarzo:false,
        storeAbril:false,
        storeMayo:false,
        storeJunio:false,
        storeJulio:false,
        storeAgosto:false,
        storeSeptiembre:false,
        storeOctubre:false,
        storeNoviembre:false,
        storeDiciembre:false,
        storeInactividad: false,
        storeExiste: false,
        storeFechaCreacion: '',
        storeFechaModificacion: '',
        storeUsuarioCreacion: '',
        storeUsuarioModificacion: '',
    }),
    actions: {
//==================================================
//                LEER SISTEMA - PERIODO                          
//==================================================       
     async leerPeriodos(codigoempresapropietaria, codigoempresapropietariacliente, codigosistema, anho){
         try{
              const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente + '&codigosistema=' + codigosistema + '&periodo_anual=' + anho;
              console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerperiodo?' + pars)
              const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerperiodo?' + pars,{
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

              this.storeCodigoSistema = data.codigosistema;
              this.storeCodigoPeriodo = data.periodo_anual;
              this.storeEnero = data.enero;
              this.storeFebrero = data.febrero;
              this.storeMarzo = data.marzo;
              this.storeAbril = data.abril;
              this.storeMayo = data.mayo;
              this.storeJunio = data.junio;
              this.storeJulio = data.julio;
              this.storeAgosto = data.agosto;
              this.storeSeptiembre = data.septiembre;
              this.storeOctubre = data.octubre;
              this.storeNoviembre = data.noviembre;
              this.storeDiciembre = data.diciembre;
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
//                GRABAR SISTEMA - PERIODO                           
//=====================================================  
        async grabarPeriodos(codigoempresapropietaria, codigoempresapropietariacliente, codigosistema, codigoperiodo, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, codigousuario){
          if(codigosistema =='' || codigoperiodo ==''){
                swal({
                  title: 'Advertencia',
                  text: 'Sistema o periodo no debe ser espacios...',
                  icon: 'warning',
                  button: 'Aceptar',
                  className: "red-bg",
                  // dangerMode: true,
                });
                return;
              }
              try{
                  const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente + '&codigosistema=' + codigosistema + '&periodo_anual=' + codigoperiodo + '&enero=' +  enero + '&febrero=' + febrero + '&marzo=' + marzo + '&abril=' + abril + '&mayo=' + mayo + '&junio=' + junio + '&julio=' + julio + '&agosto=' + agosto  + '&septiembre=' + septiembre + '&octubre=' + octubre + '&noviembre=' + noviembre + '&diciembre=' + diciembre +  '&codigousuario=' + codigousuario;
                  console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizacionperiodo?' + pars)
                  const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/actualizacionperiodo?' + pars,{
                  method: 'GET',
                  mode: 'cors',
                  headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
                })
                const data = await res.json();
  
                if(res.status == 200 || res.ok == true){
                  swal({
                    title: 'Grabación',
                    text: ` ${codigosistema} de ${codigoperiodo} fue grabado con exito...`,
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
                text: ` ${codigosistema} de ${codigoperiodo}  no fue grabado...`,
                icon: 'error',
                button: 'Aceptar',
                className : "red-bg",
                dangerMode: true, 
              });
              return;
            }
          },
//=====================================================
//                  LISTAR SISTEMA - PERIODO                           
//=====================================================       
async listarperiodos(codigoempresapropietaria, codigoempresapropietariacliente){
  try{
        const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente;      
        // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoperiodoanual?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoperiodoanual?' + pars,{
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
        this.storeArrayPeriodos.codigosistema.splice(0,this.storeArrayPeriodos.codigosistema.length)
        this.storeArrayPeriodos.codigoperiodo.splice(0,this.storeArrayPeriodos.codigoperiodo.length)
        this.storeArrayPeriodos.enero.splice(0,this.storeArrayPeriodos.enero.length)
        this.storeArrayPeriodos.febrero.splice(0,this.storeArrayPeriodos.febrero.length)
        this.storeArrayPeriodos.marzo.splice(0,this.storeArrayPeriodos.marzo.length)
        this.storeArrayPeriodos.abril.splice(0,this.storeArrayPeriodos.abril.length)
        this.storeArrayPeriodos.mayo.splice(0,this.storeArrayPeriodos.mayo.length)
        this.storeArrayPeriodos.junio.splice(0,this.storeArrayPeriodos.junio.length)
        this.storeArrayPeriodos.julio.splice(0,this.storeArrayPeriodos.julio.length)
        this.storeArrayPeriodos.agosto.splice(0,this.storeArrayPeriodos.agosto.length)
        this.storeArrayPeriodos.septiembre.splice(0,this.storeArrayPeriodos.septiembre.length)
        this.storeArrayPeriodos.octubre.splice(0,this.storeArrayPeriodos.octubre.length)
        this.storeArrayPeriodos.noviembre.splice(0,this.storeArrayPeriodos.noviembre.length)
        this.storeArrayPeriodos.diciembre.splice(0,this.storeArrayPeriodos.diciembre.length)
        if (typeof data.length === 'undefined'){
            this.storeArrayPeriodos.codigosistema.push(data.codigosistema);
            this.storeArrayPeriodos.codigoperiodo.push(data.codigoperiodo);
            this.storeArrayPeriodos.enero.push(data.enero);
            this.storeArrayPeriodos.febrero.push(data.febrero);
            this.storeArrayPeriodos.marzo.push(data.marzo);
            this.storeArrayPeriodos.abril.push(data.abril);
            this.storeArrayPeriodos.mayo.push(data.mayo);
            this.storeArrayPeriodos.junio.push(data.junio);
            this.storeArrayPeriodos.julio.push(data.julio);
            this.storeArrayPeriodos.agosto.push(data.agosto);
            this.storeArrayPeriodos.septiembre.push(data.septiembre);
            this.storeArrayPeriodos.octubre.push(data.octubre);
            this.storeArrayPeriodos.noviembre.push(data.noviembre);
            this.storeArrayPeriodos.diciembre.push(data.diciembre);
        }else{
            this.storeArrayPeriodos.codigosistema = data.map(periodos0 => periodos0.codigoctacontable);
            this.storeArrayPeriodos.codigoperiodo = data.map(periodos1 => periodos1.nombrecuenta);
            this.storeArrayPeriodos.enero = data.map(periodos2 => periodos2.enero);
            this.storeArrayPeriodos.febrero = data.map(periodos3 => periodos3.febrero);
            this.storeArrayPeriodos.marzo = data.map(periodos4 => periodos4.marzo);
            this.storeArrayPeriodos.abril = data.map(periodos5 => periodos5.abril);
            this.storeArrayPeriodos.mayo = data.map(periodos6 => periodos6.mayo);
            this.storeArrayPeriodos.junio = data.map(periodos7 => periodos7.junio);
            this.storeArrayPeriodos.junio = data.map(periodos8 => periodos8.junio);
            this.storeArrayPeriodos.julio = data.map(periodos9 => periodos9.julio);
            this.storeArrayPeriodos.agosto = data.map(periodos10 => periodos10.agosto);
            this.storeArrayPeriodos.septiembre = data.map(periodos11 => periodos11.septiembre);
            this.storeArrayPeriodos.octubre = data.map(periodos12 => periodos12.octubre);
            this.storeArrayPeriodos.noviembre = data.map(periodos13 => periodos13.noviembre);
            this.storeArrayPeriodos.diciembre = data.map(periodos14 => periodos14.diciembre);
        }
    }catch (error){ 
      alert("Error en Sistemas Periodos :   " + error )
      console.error();
    }
  },

//=====================================================
//        RESCATAR AÑOS DE UN SISTEMAS EXISTENTES                           
//=====================================================       
async listarperiodosistema(codigoempresapropietaria, codigoempresapropietariacliente, codigosistema){
  try{
        const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente  + '&codigosistema=' + codigosistema;      
        // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoperiodosistema?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoperiodosistema?' + pars,{
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
        this.storeArrayPeriodos.codigosistema.splice(0,this.storeArrayPeriodos.codigosistema.length)
        this.storeArrayPeriodos.codigoperiodo.splice(0,this.storeArrayPeriodos.codigoperiodo.length)
        if (typeof data.length === 'undefined'){
            this.storeArrayPeriodos.codigosistema.push(data.codigosistema);
            this.storeArrayPeriodos.codigoperiodo.push(data.ano);
        }else{
            this.storeArrayPeriodos.codigosistema = data.map(periodos0 => periodos0.codigosistema);
            this.storeArrayPeriodos.codigoperiodo = data.map(periodos1 => periodos1.ano);
        }
    }catch (error){ 
      alert("Error en Sistemas Periodos :   " + error )
      console.error();
    }
  },  
//=====================================================
//                  LISTAR SISTEMA - PERIODO                           
//=====================================================       
async listarperiodoanual(codigoempresapropietaria, codigoempresapropietariacliente){
  try{
        const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresapropietariacliente=' + codigoempresapropietariacliente;      
        // alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoperiodosistema?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listadoperiodosistema?' + pars,{
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
        this.storeArrayPeriodos.codigosistema.splice(0,this.storeArrayPeriodos.codigosistema.length)
        this.storeArrayPeriodos.codigoperiodo.splice(0,this.storeArrayPeriodos.codigoperiodo.length)
        if (typeof data.length === 'undefined'){
            this.storeArrayPeriodos.codigosistema.push(data.codigosistema);
            this.storeArrayPeriodos.codigoperiodo.push(data.ano);
        }else{
            this.storeArrayPeriodos.codigosistema = data.map(periodos0 => periodos0.codigosistema);
            this.storeArrayPeriodos.codigoperiodo = data.map(periodos1 => periodos1.ano);
        }
    }catch (error){ 
      alert("Error en Sistemas Periodos :   " + error )
      console.error();
    }
  },

}  
})