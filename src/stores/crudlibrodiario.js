import { defineStore} from "pinia";
import swal from "sweetalert";

import { jsPDF } from "jspdf";
import 'jspdf-autotable'; 

export const useLibroDiarioStore = defineStore('librodiarioStore',{
    state: () => ({  
      storeArregloLibroDiario:[],
      storeArrayPeriodos: {
        codigosistema:[],
        codigoperiodo:[],
      },     
        storeArrayLibroDiario: {
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
        storeExiste: false,
        storeTipoCuenta: '',
        storeFechaCreacion: '',
        storeFechaModificacion: '',
        storeUsuarioCreacion: '',
        storeUsuarioModificacion: '',
    }),
    actions: {
//=====================================================
//                  LISTAR PLAN DE CUENTA                           
//=====================================================       
async listarLibroDiario(codigoempresapropietaria, codigoempresacliente, periodo_anual, mes_inicio, mes_termino, nombreMes, modalidad, libroOficial, nombreEmpresaPropietaria, nombreEmpresaCliente, rutEmpresaCliente, direccionEmpresaCliente, comunaEmpresaCliente, girocomerialEmpresaCliente){
  try{
        this.storeArregloLibroDiario.length = 0;
        const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresacliente=' + codigoempresacliente + '&periodo_anual=' + periodo_anual + '&mes_inicio=' + mes_inicio  + '&mes_termino=' + mes_termino  + '&modalidad=' + modalidad;      
        console.log('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarlibrodiario?' + pars)
        const res = await fetch('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarlibrodiario?' + pars,{
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
          this.storeArregloLibroDiario.push(data[i]);
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
     var textoTitulo = "LIBRO DIARIO ";  
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
    for (let i = 0 ; i < this.storeArregloLibroDiario.length ; i++){ 

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
  comprobanteAnterior = this.storeArregloLibroDiario[i] [0]
  primerComprobante = false;
  var estado = "No definido"
  if (this.storeArregloLibroDiario[i] [4] == "C"){
    estado = "CERRADO"
  } if (this.storeArregloLibroDiario[i] [4] == "A"){
    estado = "ABIERTO"
  }
  var ddComprobante = this.storeArregloLibroDiario[i] [2].substring(8, 10);
  var mmComprobante = this.storeArregloLibroDiario[i] [2].substring(5, 7);
  var aaComprobante = this.storeArregloLibroDiario[i] [2].substring(0, 4);
  doc.text("Comprobante    " + this.storeArregloLibroDiario[i] [3] + "    " + this.storeArregloLibroDiario[i] [0] + "     Fecha   " + ddComprobante +'/' + mmComprobante  +'/' + aaComprobante + "         Estado   " + estado + "           "+ this.storeArregloLibroDiario[i] [5] ,5, linea, { align: 'left' });
  linea = linea + 4;
} //  ------- FIN VALIDAR SI ES EL PRIMER REGISTRO   ------- 



//  -------   IMPRIMIR TOTALES DEL COMPROBANTE   -------         
if(comprobanteAnterior != this.storeArregloLibroDiario[i] [0]){
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
  if (this.storeArregloLibroDiario[i] [4] == "C"){
    estado = "CERRADO"
  } else if (this.storeArregloLibroDiario[i] [4] == "A"){
    estado = "ABIERTO"
  }
  var ddComprobante = this.storeArregloLibroDiario[i] [2].substring(8, 10);
  var mmComprobante = this.storeArregloLibroDiario[i] [2].substring(5, 7);
  var aaComprobante = this.storeArregloLibroDiario[i] [2].substring(0, 4);
  doc.text("Comprobante    " + this.storeArregloLibroDiario[i] [3] + "    " + this.storeArregloLibroDiario[i] [0] + "     Fecha   " + ddComprobante +'/' + mmComprobante  +'/' + aaComprobante + "         Estado   " + estado + "           "+ this.storeArregloLibroDiario[i] [5] ,5, linea, { align: 'left' });

  linea = linea + 3;
  
  contador = contador + 3;
  totalDebe = 0;
  totalHaber = 0;
  comprobanteAnterior = this.storeArregloLibroDiario[i] [0] 
  
 
  // doc.text(textoDebe, 100, linea, { align: 'right' });
  // doc.text(textoHaber, 122, linea, { align: 'right' });  
  linea = linea + 2;  

} //  -------   FIN IMPRIMIR TOTALES DEL COMPROBANTE   -------

//      -------    IMPRIMIR DETALLE DEL COMPROBANTE    -------
        doc.text("" + this.storeArregloLibroDiario[i] [6], 5, linea); // Cuenta Contable  cadena.substring(0, 9);  
        doc.text("" + this.storeArregloLibroDiario[i] [7], 20, linea); // Nombre  
 //       doc.text("" + this.storeArregloLibroDiario[i] [1], 15, linea);  // item comprobante  
 //       doc.text("" + this.storeArregloLibroDiario[i] [2], 25, linea);  // Fecha comprobante
 //       doc.text("" + this.storeArregloLibroDiario[i] [3], 45, linea);  // Tipo comprobante
//        doc.text("" + this.storeArregloLibroDiario[i] [4], 50, linea);  // Estado Comprobante
        if (jcDecimales == 0){  
           var textoDebe = Intl.NumberFormat('es-ES').format(this.storeArregloLibroDiario[i] [8]);
           var textoHaber = Intl.NumberFormat('es-ES').format(this.storeArregloLibroDiario[i] [9]);
        }else{
           var textoDebe = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
            }).format(this.storeArregloLibroDiario[i] [8]); 
           var textoHaber = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2
            }).format(this.storeArregloLibroDiario[i] [9]);             
        }
        totalDebe = totalDebe + this.storeArregloLibroDiario[i] [8];
        totalHaber = totalHaber + this.storeArregloLibroDiario[i] [9];
        acumuladoDebe = acumuladoDebe + this.storeArregloLibroDiario[i] [8]; 
        acumuladoHaber = acumuladoHaber + this.storeArregloLibroDiario[i] [9];
 
        doc.text("" + textoDebe, 100, linea, { align: 'right' }); // Debe
        doc.text("" + textoHaber, 122, linea, { align: 'right' }); // Haber
        doc.text("" + this.storeArregloLibroDiario[i] [10], 125, linea);  //Glosa Comprobante        
        doc.text("" + this.storeArregloLibroDiario[i] [0], 200, linea);   // Numero Folio

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

   doc.save("LIBRO DIARIO " + nombreMes + " DE " + periodo_anual + ".pdf");

//=========================================================
    }catch (error){ 
      alert("Error en listar libro diario... :   " + error )
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
}  
})