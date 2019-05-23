import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportesService} from '../../services/reportes.service';
import {ExcelService} from '../../services/excel.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public jsonAuxiliar = [];



  constructor(private reporteService : ReportesService , private excelService:ExcelService) {

  }


  ngOnInit() { }

  descargarExcel1():void {
    
    
    this.reporteService.obtenerRemisionOtrasEntidades().subscribe(response1 => {

     if(response1["length"] == 0){
        Swal({
          title: "Alerta",
          text: "No existen datos en este reporte",
          type: "warning"
        })

      }else{ 

    for(var i=0;i <response1.length;i++){
      this.jsonAuxiliar.push({"Número de BA": response1[i]["Numero_BA"] , "Código de registro (del usuario)": response1[i]["codigo_registro"],
      "Entidad": response1[i]["nombre_entidad"],
       "Fecha de ingreso del caso": response1[i]["fecha_registro"] , "Caso o explicación (usuario)":response1[i]["detalle_registro"] , 
       "Materia , tema , tupa": response1[i]["nombre_tramite"] ,  "Posible barrera administrativa": response1[i]["Posible_Barrera_Administrativa"] ,
       "Existe indicio de barrera burocrática": response1[i]["barrera_buro"] ,
        "Sustento  de calificación final de presencia de barrera administrativa": response1[i]["sustento_barrera"] ,
       "Si existe indicio de barrera burócratica (sustento y señalado en ilegalidad y carente de razonabilidad": response1[i]["Indicio_de_Barrera_Burocrática"] ,
       "Fecha del flujo final del coordinador": response1[i]["fecha_historial"]
      });
    }  

        this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-REMISION-ENTID-');

    }

  });
}

 descargarExcel2():void {

    this.reporteService.obtenerEntidadesRecurrencia().subscribe(response2 => {
      if(response2["length"] == 0){
        Swal({
          title: "Alerta",
          text: "No existen datos en este reporte",
          type: "warning"
        })

      }else{ 

        this.jsonAuxiliar=[];

        for(var i=0;i <response2.length;i++){
          this.jsonAuxiliar.push({"Número de BA": i+1 , "Entidad": response2[i]["nombre_entidad"],"Posible barrera administrativa": response2[i]["Posible_Barrera_Administrativa"],
          "Recurrencia de la BA": response2[i]["Recurrencia_BA"]
});
        } 
        this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-REMISION-ENTID-RECURR-');

      
    }
  });
}
  
  descargarExcel3():void {
    
        this.reporteService.obtenerSectorProduccionSinRespuesta().subscribe(response3 => {

          if(response3["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{
            this.jsonAuxiliar=[];
            
            for(var i=0;i <response3.length;i++){
              this.jsonAuxiliar.push({"Número de BA": response3[i]["Numero_BA"] , "Código de registro": response3[i]["codigo_registro"],
              "Código de barrera": response3[i]["codigo_obstaculo"],
                "Fecha de ingreso del caso": response3[i]["fecha_registro"] , "Materia , tema , tupa": response3[i]["nombre_tramite"],
                "Barrera administrativa": response3[i]["Posible_Barrera_Administrativa"] ,
                 "Fecha de aviso de la BA por medio de la plataforma (primer comentario": response3[i]["fecha_envio"],
                 "Organismo": response3[i]["nombre_org"],
                 "Cantidad de dias": response3[i]["cantidad_dia"]
                      });
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-BA-PRODUCE-SUPERADA-');

          }
         
        });
  }

  descargarExcel4():void {
    
        this.reporteService.obtenerSectorProduccionSinRecurrencia().subscribe(response4 => {

          if(response4["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response4.length;i++){
              this.jsonAuxiliar.push({"Número de BA": i+1, "Organismo": response4[i]["nombre_org"], 
              "Barrera administrativa": response4[i]["Posible_Barrera_Administrativa"] ,
                 "Recurrencia de la BA": response4[i]["Recurrencia_de_la_BA"]
                      });
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-BA-PRODUCE-SUPERADA-RECURR-');

          }
         
        });
  }

  descargarExcel5():void {
    
        this.reporteService.obtenerDependenciasSectorProduccion().subscribe(response5 => {

          if(response5["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response5.length;i++){
              this.jsonAuxiliar.push({"Número de BA": i+1 , "Código de registro": response5[i]["codigo_registro"],
              "Fecha de ingreso del caso": response5[i]["fecha_registro"] , "Materia , tema , tupa": response5[i]["nombre_tramite"],
              "Barrera administrativa": response5[i]["Posible_Barrera_Administrativa"] , "Barrera burocrática": response5[i]["barrera_buro"] ,
               "Fecha de aviso de la BA por medio de la plataforma (primer comentario)": response5[i]["fecha_historial"],
               "Nombre de la condición": response5[i]["nombre_condicion"] , "Sustento de la condición": response5[i]["sustento_condicion"],
               "Organismo": response5[i]["nombre_org"] , "Dias restantes": response5[i]["Dias_Restantes"]});
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-BA-PRODUCE-PROC-SUP-');

          }
         
        });
  }

  descargarExcel6():void {
    
        this.reporteService.obtenerDependenciasSectorProduccionRecurrencia().subscribe(response6 => {

          if(response6["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response6.length;i++){
              this.jsonAuxiliar.push({"Número de BA": i+1 , "Barrera administrativa": response6[i]["Posible_Barrera_Administrativa"] ,
              "Organismo": response6[i]["nombre_org"],
              "Recurrencia de la BA": response6[i]["Recurrencia_de_la_BA"]
                   });
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-BA-PRODUCE-PROC-SUP-RECURR-');

          }
         
        });
  }

  descargarExcel7():void {
    
        this.reporteService.obtenerRemisionIndecopi().subscribe(response7 => {

          if(response7["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response7.length;i++){
              this.jsonAuxiliar.push({"Número de BA": i+1 , "Código de registro": response7[i]["codigo_registro"],
              "Caso o explicación del administrado": response7[i]["detalle_registro"] , "Materia , tema , tupa": response7[i]["nombre_tramite"],
              "Posible Barrera Administrativa": response7[i]["Posible_Barrera_Administrativa"] , "Nombre de la entidad": response7[i]["nombre_entidad"] ,
               "Sustento señalado en ilegal y carente de razonabilidad": response7[i]["Indicio_Barrera_Burocrática"] , "Fecha": response7[i]["fecha_historial"]
                });
              } 

            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-BA-INDECOPI-');

          }
         
        });
  }

  descargarExcel8():void {
    
        this.reporteService.obtenerRemisionIndecopiRecurrencia().subscribe(response8 => {

          if(response8["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response8.length;i++){
              this.jsonAuxiliar.push({"Número de BA": i+1 , "Barrera administrativa": response8[i]["Posible_Barrera_Administrativa"] ,
              "Recurrencia de la BA": response8[i]["Recurrencia_de_la_BA"]
                   });
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-BA-INDECOPI-RECURR-');

          }
         
        });
  }

  descargarExcel9():void {
    
        this.reporteService.obtenerRemisionRegistro().subscribe(response8 => {

          if(response8["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response8.length;i++){
              this.jsonAuxiliar.push({"Número de BA": i+1, "Número de registro": response8[i]["id_registro"] ,
              "Codigo de registro (del administrado)": response8[i]["codigo_registro"] , "Fecha de ingreso al sistema": response8[i]["fecha_registro"],
              "Válido o inválido": response8[i]["validez"] , "Motivos de invalidez": response8[i]["motivo_validez"] , 
              "Nombre de la entidad": response8[i]["nombre_entidad"],
              "Fecha de comunicacion al usuario": response8[i]["fecha_historial"]
                   });
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-REGISTROS-ADMINISTR-');

          }
         
        });
  }

  descargarExcel10():void {
    
        this.reporteService.obtenerRemisionRegistroValidos().subscribe(response9 => {

          if(response9["length"] == 0){
            Swal({
              title: "Alerta",
              text: "No existen datos en este reporte",
              type: "warning"
            })
    
          }else{

            this.jsonAuxiliar=[];
            
            for(var i=0;i <response9.length;i++){
              this.jsonAuxiliar.push({"Codigo de registro": response9[i]["codigo_registro"] , 
              "Número de barreras administrativas encontradas en el caso": response9[i]["Cantidad_Tramites"] ,
              "Nombre de la materia": response9[i]["Nombre_Tramite"] , "Cuántas barreras válidas se encontraron en la materia del registro ": response9[i]["Barreras_Validas"],
              "Cuántas barreras inválidas se encontraron en la materia del registro ": response9[i]["Barreras_Invalidas"],
              "Barrera evaluación": response9[i]["barrera_evaluacion"],
              "Barreras administrativas con indicio de barrera burocrática ": response9[i]["Barreras_Burocratica"],
              "Nombre del evaluador ": response9[i]["Nombre_Evaluador"] , "Fecha": response9[i]["fecha_historial"] 
                   });
              } 
            this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-REGISTROS-ADMINISTR-');

          }
         
        });
  }



  descargarExcel11():void {
    this.reporteService.obtenerDependenciasEntidadesPublicas().subscribe(response10 => {
      
                if(response10["length"] == 0){
                  Swal({
                    title: "Alerta",
                    text: "No existen datos en este reporte",
                    type: "warning"
                  })
          
                }else{

                  this.jsonAuxiliar=[];
                  
                  for(var i=0;i <response10.length;i++){
                    this.jsonAuxiliar.push({"Fecha de remisión de comunicado": response10[i]["fecha_envio"] , "Número de comunicado": response10[i]["cod_doc_remision"] ,
                    "Tipo de comunicado": response10[i]["nombre_tipo_doc"] , "Número  de barrera remitidas a la entidad en el comunicado": response10[i]["cantidad_documento"],
                     "Ubicación": response10[i]["nombre_region"] , "Respuesta a comunicado remitido": response10[i]["Respuesta_a_comunicado"]
                         });
                    } 
                  this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-NUM-COMUN-SP-Y-ENTID-');
      
                }
               
              });
  }

  descargarExcel12(): void{

    this.reporteService.obtenerReporteGeneral().subscribe(response11 => {
      
                if(response11["length"] == 0){
                  Swal({
                    title: "Alerta",
                    text: "No existen datos en este reporte",
                    type: "warning"
                  })
          
                }else{

                  this.jsonAuxiliar=[];
                  
                  for(var i=0;i <response11.length;i++){
                    this.jsonAuxiliar.push({"Número de BA": i+1 , "Codigo de registro": response11[i]["codigo_registro"] ,
                    "Codigo de registro del sistema": response11[i]["codigo_obstaculo"] , "Caso o explicación (usuario)": response11[i]["detalle_registro"],
                     "Consultas a usuario": response11[i]["consulta"] , "Respuesta a usuario": response11[i]["respuesta"],
                     "Materia , tema , tupa": response11[i]["nombre_tramite"] , "Barrera administrativa": response11[i]["Nombre_Barrera"] , "Categoria" : response11[i]["Condicion"],
                     "Ubicación": response11[i]["nombre_region"] , "Actividad económica": response11[i]["nombre_actividad"] , "Si acepta que barrera administrativa o no acepta que es barrera administrativa": response11[i]["Posible_Barrera_Administrativa"],
                     "Sustento de válido o inválido ( evaluación final aprobada por coordinador)": response11[i]["sustento_barrera"] , "Con indicio de barrera burócratica": response11[i]["Barrera_Burocratica"],
                     "Sustento de BA con indicio de barrera burocratica(ilegal)": response11[i]["ilegal"] , "Sustento de BA con indicio de barrera burocratica(razonabilidad)": response11[i]["razonabilidad"],
                     "Nombre de las entidades públicas o dependencias del sector Produccion": response11[i]["id_entidad"] , "Pertenece al SP Produccion": response11[i]["Pertence_SP"] , 
                     "Respuesta a los usuarios": response11[i]["respuesta_final"] , "Fecha de respuesta a los usuarios": response11[i]["FechaRptaAdministrados"] , "Tiempo que se demora el usuario en responder la consulta del evaluador": response11[i]["Tiempo_Demora_Responder"],
                     "Fecha de remision o aviso a otras entidades publicas de deteccion de la BA": response11[i]["FechaRptaPublico"] , "Fecha de respuesta de las dependencias de SP respecto  al aviso de deteccion de la BA": response11[i]["fecha_envio"],
                     "Condicion de la BA ( Entidad)": response11[i]["CondicionBA"] , "Tipo de comunicado con que se remitio la BA a la entidad": response11[i]["nombre_tipo_doc"], 
                     "Nombre del evaluador": response11[i]["nombres"]
                         });
                    } 
                  this.excelService.exportAsExcelFile(this.jsonAuxiliar, 'Reporte-NUM-COMUN-SP-Y-ENTID-');
      
                }
               
              });

  }
 
}
