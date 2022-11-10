import { defineStore} from "pinia";
import swal from "sweetalert";

import { jsPDF } from "jspdf";
import 'jspdf-autotable'; 

export const useLibroMayorStore = defineStore('libromayorStore',{
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

      storeArregloLibroMayor:[],
      storeArrayPeriodos: {
        codigosistema:[],
        codigoperiodo:[],
      },     
        storeArrayLibroMayor: {
          foliocomprobante:[],
          codigoctacontable:[],
          item:[],
          fechacomprobante:[], 
          tipocomprobante:[],
          estadocomprobante:[],
          glosacomprobante:[],         
          nombrecuenta:[],
          debe:[],
          haber:[],
          glosadetalle:[],
        },  
        storeAnhoContable: '',
        storeMesDesde: '',
        storeMesHasta: '',
        store: '',
        storeCuentaAuxiliar: false,
        // storeInactividad: false,
        storeLibroOficial: false,
        storePaginaPorHoja: false,
        storeExiste: false,
        storeValidarCuentaContable:false,
        storeTipoCuenta: '',
        storeFechaCreacion: '',
        storeFechaModificacion: '',
        storeUsuarioCreacion: '',
        storeUsuarioModificacion: '',
    }),
    actions: {
//=====================================================
//                  LISTAR LIBRO MAYOR                           
//=====================================================       
async listarLibroMayor(codigoempresapropietaria, codigoempresacliente, periodo_anual, mes_inicio, mes_termino, nombreMes, modalidad, libroOficial, nombreEmpresaPropietaria, nombreEmpresaCliente, rutEmpresaCliente, direccionEmpresaCliente, comunaEmpresaCliente, girocomerialEmpresaCliente){
  try{
        this.storeArregloLibroMayor.length = 0;
        const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresacliente=' + codigoempresacliente + '&periodo_anual=' + periodo_anual + '&mes_inicio=' + mes_inicio  + '&mes_termino=' + mes_termino  + '&modalidad=' + modalidad;      
        console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarlibromayor?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarlibromayor?' + pars,{
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
        // for(var i in data) {
          let i=0;
          for( i in data) {
          // console.log('i=' + i + '     data('+ i +')='+ data[i])
          this.storeArregloLibroMayor.push(data[i]);
        }
//=========================================================

     const doc = new jsPDF( 'r', 'mm', [216, 279]);
     const jcDecimales = 0
     var hoy = new Date();
    //  var fechaActual = new Date();
     var dd =String(hoy.getDate()).padStart(2,'0');
     var mm =String(hoy.getMonth()+1).padStart(2,'0');//January is 0!var yyyy = today.getFullYear();
     var yyyy = hoy.getFullYear() 
     var fechaActual = dd +'/'+ mm +'/'+ yyyy;
     var horaActual = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

     let pageWidth = doc.internal.pageSize.getWidth();
     var textoAgrupacion =    'Agrupación '
     var textoNombreEmpresa = 'Empresa    '
     var textoRut =           'R.U.T.     ' 
     var textoDireccion =     'Dirección  ' 
     var textoComuna =        'Comuna     ' 
     var textoGiro =          'Giro       '
     var numeroPagina = 0;
     var textoFecha =  'Fecha Reporte :  ' + fechaActual; 
     var textoHora =   'Hora  Reporte :  ' + horaActual; 
     var textoPagina = 'Página :  ';
     var textoTitulo = "LIBRO MAYOR ";  
     //
     var primerComprobante = true;
     var comprobanteAnterior = 0;
     var totalDebe = 0;
     var totalHaber = 0;
     var acumuladoDebe = 0;
     var acumuladoHaber = 0;    

//===============================================
     let  linea = 40;
     let contador = 61;
     let item = 1;

 //  -------    RECORRER EL ARREGLO    -------
    for (let i = 0 ; i < this.storeArregloLibroMayor.length ; i++){ 

// -------  CONTROLAR SALTO DE PAGINA  -------        
if (contador > 56){
  if (primerComprobante == false){
      doc.addPage(); 
  }
  if(libroOficial == false){
     numeroPagina = numeroPagina + 1;
     doc.setFont("Arial", "Normal");
     doc.setFontSize(8);
     doc.text(textoAgrupacion, 5, 5);
     doc.text(nombreEmpresaPropietaria, 25, 5);
     doc.text(textoFecha, 180 , 9); 
     doc.text(textoNombreEmpresa, 5, 9);
     doc.text(nombreEmpresaCliente, 25, 9);

     doc.text(textoRut, 5, 13);
     doc.text(rutEmpresaCliente, 25, 13);
     doc.text(textoHora, 180 , 13);

     doc.text(textoDireccion, 5, 17);
     doc.text(direccionEmpresaCliente, 25, 17);
     doc.text(textoPagina  + numeroPagina, 188 , 17);

     doc.text(textoComuna, 5, 21);
     doc.text(comunaEmpresaCliente, 25, 21);
     doc.text(textoGiro, 5, 25); 
     doc.text('girocomerialEmpresaCliente', 25, 25);      
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text(textoTitulo, pageWidth / 2, 15, 'center');
     doc.setFontSize(8);  
     doc.text(nombreMes + ' del ' + periodo_anual, 185, 25);               
     doc.line(210, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("CODIGO",5, 32);
     doc.text("NOMBRE DE LA CUENTA",20, 32);
     doc.text("DEBE",93, 32);
     doc.text("HABER",112, 32);
     doc.text("GLOSA",125, 32);
     doc.line(210, 35, 5,35);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");
     linea = 40;
     contador = 1;
  }else{
    doc.setFont("Arial", "Normal");
    doc.setFontSize(8); 
    linea = 40;
    contador = 1;   
  }
}  // ----------  FIN CONTROLAR SALTO DE PAGINA  ----------

//  -------   VALIDAR SI ES EL PRIMER REGISTRO   -------   
if (primerComprobante == true){  // Si es el primer comprobante 
  comprobanteAnterior = this.storeArregloLibroMayor[i] [0]
  primerComprobante = false;
  var estado = "No definido"
  if (this.storeArregloLibroMayor[i] [4] == "C"){
    estado = "CERRADO"
  } if (this.storeArregloLibroMayor[i] [4] == "A"){
    estado = "ABIERTO"
  }
  var ddComprobante = this.storeArregloLibroMayor[i] [2].substring(8, 10);
  var mmComprobante = this.storeArregloLibroMayor[i] [2].substring(5, 7);
  var aaComprobante = this.storeArregloLibroMayor[i] [2].substring(0, 4);
  doc.text("Comprobante    " + this.storeArregloLibroMayor[i] [3] + "    " + this.storeArregloLibroMayor[i] [0] + "     Fecha   " + ddComprobante +'/' + mmComprobante  +'/' + aaComprobante + "         Estado   " + estado + "           "+ this.storeArregloLibroMayor[i] [5] ,5, linea, { align: 'left' });
  linea = linea + 4;
} //  ------- FIN VALIDAR SI ES EL PRIMER REGISTRO   ------- 



//  -------   IMPRIMIR TOTALES DEL COMPROBANTE   -------         
if(comprobanteAnterior != this.storeArregloLibroMayor[i] [0]){
  if (jcDecimales == 0){  
       var textoDebe =  Intl.NumberFormat('es-ES').format(totalDebe);
       var textoHaber = Intl.NumberFormat('es-ES').format(totalHaber);
  }else{
       var textoDebe = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
           }).format(totalDebe); 
       var textoHaber = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
           }).format(totalHaber);             
  }   
  doc.text("____________", 83, linea - 3);  // X - Y
  doc.text("____________", 105, linea - 3);  
  linea = linea + 1;

  doc.text("TOTAL COMPROBANTE",20, linea, { align: 'left' });
  doc.text(textoDebe, 100, linea, { align: 'right' });
  doc.text(textoHaber, 122, linea, { align: 'right' });  
  linea = linea + 2;

  doc.line(205, linea, 5,linea);  // eje x final, eje y inicial, eje x inicial, eje y final                 
  linea = linea + 4;
  var estado = "No definido"
  if (this.storeArregloLibroMayor[i] [4] == "C"){
    estado = "CERRADO"
  } else if (this.storeArregloLibroMayor[i] [4] == "A"){
    estado = "ABIERTO"
  }
  var ddComprobante = this.storeArregloLibroMayor[i] [2].substring(8, 10);
  var mmComprobante = this.storeArregloLibroMayor[i] [2].substring(5, 7);
  var aaComprobante = this.storeArregloLibroMayor[i] [2].substring(0, 4);
  doc.text("Comprobante    " + this.storeArregloLibroMayor[i] [3] + "    " + this.storeArregloLibroMayor[i] [0] + "     Fecha   " + ddComprobante +'/' + mmComprobante  +'/' + aaComprobante + "         Estado   " + estado + "           "+ this.storeArregloLibroMayor[i] [5] ,5, linea, { align: 'left' });

  linea = linea + 3;
  
  contador = contador + 3;
  totalDebe = 0;
  totalHaber = 0;
  comprobanteAnterior = this.storeArregloLibroMayor[i] [0] 
  
 
  // doc.text(textoDebe, 100, linea, { align: 'right' });
  // doc.text(textoHaber, 122, linea, { align: 'right' });  
  linea = linea + 2;  

} //  -------   FIN IMPRIMIR TOTALES DEL COMPROBANTE   -------

//      -------    IMPRIMIR DETALLE DEL COMPROBANTE    -------
        doc.text("" + this.storeArregloLibroMayor[i] [6], 5, linea); // Cuenta Contable  cadena.substring(0, 9);  
        doc.text("" + this.storeArregloLibroMayor[i] [7], 20, linea); // Nombre  
 //       doc.text("" + this.storeArregloLibroMayor[i] [1], 15, linea);  // item comprobante  
 //       doc.text("" + this.storeArregloLibroMayor[i] [2], 25, linea);  // Fecha comprobante
 //       doc.text("" + this.storeArregloLibroMayor[i] [3], 45, linea);  // Tipo comprobante
//        doc.text("" + this.storeArregloLibroMayor[i] [4], 50, linea);  // Estado Comprobante
        if (jcDecimales == 0){  
           var textoDebe = Intl.NumberFormat('es-ES').format(this.storeArregloLibroMayor[i] [8]);
           var textoHaber = Intl.NumberFormat('es-ES').format(this.storeArregloLibroMayor[i] [9]);
        }else{
           var textoDebe = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
            }).format(this.storeArregloLibroMayor[i] [8]); 
           var textoHaber = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
            }).format(this.storeArregloLibroMayor[i] [9]);             
        }
        totalDebe = totalDebe + this.storeArregloLibroMayor[i] [8];
        totalHaber = totalHaber + this.storeArregloLibroMayor[i] [9];
        acumuladoDebe = acumuladoDebe + this.storeArregloLibroMayor[i] [8]; 
        acumuladoHaber = acumuladoHaber + this.storeArregloLibroMayor[i] [9];
 
        doc.text("" + textoDebe, 100, linea, { align: 'right' }); // Debe
        doc.text("" + textoHaber, 122, linea, { align: 'right' }); // Haber
        doc.text("" + this.storeArregloLibroMayor[i] [10], 125, linea);  //Glosa Comprobante        
        doc.text("" + this.storeArregloLibroMayor[i] [0], 200, linea);   // Numero Folio

        linea = linea + 4;
        contador = contador + 1;
        item = item + 1;
//      -------    FIN IMPRIMIR DETALLE DEL COMPROBANTE    -------

       } // -------   FIN CICLO FOR   -------

       doc.text("____________", 83, linea - 3);  // X - Y
       doc.text("____________", 105, linea - 3);  
       linea = linea + 1;
       if (jcDecimales == 0){  
        var textoDebe =  Intl.NumberFormat('es-ES').format(totalDebe);
        var textoHaber = Intl.NumberFormat('es-ES').format(totalHaber);
   }else{
        var textoDebe = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
            }).format(totalDebe); 
        var textoHaber = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
            }).format(totalHaber);             
   } 

       doc.text("TOTAL COMPROBANTE",20, linea);
       doc.text(textoDebe, 100, linea, { align: 'right' });
       doc.text(textoHaber, 122, linea, { align: 'right' });  
       linea = linea + 2;

       doc.line(205, linea, 5,linea);  // eje x final, eje y inicial, eje x inicial, eje y final                 
       linea = linea + 4;
//     ----------------  TOTAL ACUMULADO   ---------------------------
       if (jcDecimales == 0){  
          var textoDebe =  Intl.NumberFormat('es-ES').format(acumuladoDebe);
          var textoHaber = Intl.NumberFormat('es-ES').format(acumuladoHaber);
       }else{
          var textoDebe = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
              }).format(acumuladoDebe); 
          var textoHaber = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
              }).format(acumuladoHaber);             
     }        
        doc.text("TOTAL MES",20, linea);
        doc.text(textoDebe, 100, linea, { align: 'right' });
        doc.text(textoHaber, 122, linea, { align: 'right' }); 

   doc.save("LIBRO MAYOR " + nombreMes + " DE " + periodo_anual + ".pdf");

//=========================================================
    }catch (error){ 
      alert("Error en listar libro mayor... :   " + error )
      console.error();
    }
  },
//=====================================================
//        RESCATAR AÑOS DE UN SISTEMA EXISTENTE                           
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
//==================================================
//                LEER PLAN DE CUENTA                          
//==================================================       
async leerPlanCuenta(codigoempresaduena, codigoempresa, codigocuenta){
  try{
       const pars = '&codigoempresaduena=' + codigoempresaduena + '&codigoempresa=' + codigoempresa + '&codigoctacontable=' + codigocuenta;
      //  console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerctacontable?' + pars)
       const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerctacontable?'+pars,{
         // const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/obtenerctacontable?&(codigoempresaduena=76817539&codigoempresa=9445901&codigoctacontable=5101038',{                
         method: 'GET',
         mode: 'cors',
         headers: {'Content-Type': 'application/json',"Access-Control-Request-Method": "*"},
       }     
       )

       if((res.status != 200) || (res.ok != true)){
         this.storeValidarCuentaContable=false;
         swal({
          title: 'Error',
          text: ' Cuenta Contable  ' + codigocuenta + '  no es valida...',
          icon: 'error',
          button: 'Aceptar',
          className : "red-bg",
          dangerMode: true, 
        });         
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
       this.storeExiste=true;
       this.storeValidarCuentaContable=true;
 }catch (error){ 
     alert("Revisar conexión a Internet   -   " + " Descipción del error:   " + error )
     console.error();
 }
},    
}  
})