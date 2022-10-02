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
        storeInactividad: false,
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
async listarLibroDiario(codigoempresapropietaria, codigoempresacliente, periodo_anual, mes_inicio, mes_termino, modalidad, nombreEmpresaPropietaria, nombreEmpresaCliente){
  try{
        this.storeArregloLibroDiario.length = 0;
        const pars = '&codigoempresapropietaria=' + codigoempresapropietaria + '&codigoempresacliente=' + codigoempresacliente + '&periodo_anual=' + periodo_anual + '&mes_inicio=' + mes_inicio  + '&mes_termino=' + mes_termino  + '&modalidad=' + modalidad;      
        alert('http://192.168.0.122:40280/MazelHazana/mztv/tov/listarlibrodiario?' + pars)
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
     var fechaActual = new Date();
     var dd =String(fechaActual.getDate()).padStart(2,'0');
     var mm =String(fechaActual.getMonth()+1).padStart(2,'0');//January is 0!var yyyy = today.getFullYear();
     var yyyy = fechaActual.getFullYear() 
     fechaActual = dd +'/'+ mm +'/'+ yyyy;

     let pageWidth = doc.internal.pageSize.getWidth();
     var textoAgrupacion =    'Agrupación: ' + nombreEmpresaPropietaria;
     var textoNombreEmpresa = 'Empresa   : ' + nombreEmpresaCliente;
     var textoRut =           'R.U.T.    : '
     var textoDireccion =     'Dirección : '
     var textoComuna =        'Comuna    : '
     var textoGiro =          'Giro      : '
     var numeroPagina = 1;
     var textoFecha =  'Fecha  :  ' + fechaActual; 
     var textoPagina = 'Pagina :  ';
     var textoTitulo = "LIBRO DIARIO ";  

     doc.setFont("Arial", "Normal");
     doc.setFontSize(8);
     doc.text(textoAgrupacion, 5, 5);
     doc.text(textoFecha, 170 , 5); 
     doc.text(textoNombreEmpresa, 5, 8);
     doc.text(textoPagina  + numeroPagina, 170 , 8);
     doc.text(textoRut, 5, 11);
     doc.text(textoDireccion, 5, 14);
     doc.text(textoComuna, 5, 17);
     doc.text(textoGiro, 5, 20);       
     doc.setFontSize(12);
     doc.setFont("Arial", "bold");
     doc.text(textoTitulo, pageWidth / 2, 15, 'center');
     doc.setFontSize(8);                
     doc.line(205, 23, 5,23);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.text("Item",5, 26);
     doc.text("Código",13, 26);
     doc.text("Identificación Clasificación",43, 26);
     doc.text("Estado",190, 26);
     doc.line(205, 29, 5,29);  // eje x final, eje y inicial, eje x inicial, eje y final
     doc.setFont("Arial", "Normal");

     let  linea = 33;
     let contador = 1;
     let item = 1;

    // this.storeArregloLibroDiario.splice(0,this.storeArregloLibroDiario.length)
    // this.storeArregloLibroDiario.splice(0,this.storeArregloLibroDiario.length)
    // this.storeArregloLibroDiario.splice(0,this.storeArregloLibroDiario.length)
    // this.storeArregloLibroDiario='';

    for (let i = 0 ; i < this.storeArregloLibroDiario.length ; i++){      
        doc.text("" + this.storeArregloLibroDiario[i] [0], 1, linea);   // Numero Folio
        doc.text("" + this.storeArregloLibroDiario[i] [1], 15, linea);  // item comprobante  
        doc.text("" + this.storeArregloLibroDiario[i] [2], 25, linea);  // Fecha comprobante
        doc.text("" + this.storeArregloLibroDiario[i] [3], 45, linea);  // Tipo comprobante
        doc.text("" + this.storeArregloLibroDiario[i] [4], 50, linea);  // Estado Comprobante
        doc.text("" + this.storeArregloLibroDiario[i] [5], 55, linea);  //Glosa Comprobante
        doc.text("" + this.storeArregloLibroDiario[i] [6], 115, linea); // Cuanta Contable
        doc.text("" + this.storeArregloLibroDiario[i] [8], 135, linea); // Debe
        doc.text("" + this.storeArregloLibroDiario[i] [9], 155, linea); // Haber
        linea = linea +  5;
        contador = contador + 1;
        item = item + 1;
        if (contador > 45){
            doc.addPage();
            numeroPagina = numeroPagina + 1;
            doc.setFontSize(10);
            doc.text(textoAgrupacion, 5, 5);
            doc.text(textoFecha, 170 , 5); 
            doc.text(textoPagina  + numeroPagina, 170 , 10);      
            doc.setFontSize(12);
            doc.setFont("Arial", "bold");
            doc.text(textoTitulo, pageWidth / 2, 15, 'center');
            doc.setFontSize(8);                
            doc.line(205, 20, 5,20);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.text("Item",5, 25);
            doc.text("Código",13, 25);
            doc.text("Identificación Clasificación",43, 25);
            doc.text("Estado",190, 25);
            doc.line(205, 28, 5,28);  // eje x final, eje y inicial, eje x inicial, eje y final
            doc.setFont("Arial", "Normal");
            contador = 1;
            linea = 33;
         } 
       }
   doc.save("librodiario.pdf");

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