import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordinadorService } from '../../services/coordinador.service';
import { IfStmt } from '@angular/compiler';

import { CookieService } from 'ngx-cookie-service';

import * as jsPDF from 'jspdf'; 

@Component({
  selector: 'app-detalle-respuesta-enviado-coordinador',
  templateUrl: './detalle-respuesta-enviado-coordinador.component.html',
  styleUrls: ['./detalle-respuesta-enviado-coordinador.component.css']
})
export class DetalleRespuestaEnviadoCoordinadorComponent implements OnInit {

  public idobstaculo: number;
  public codigoregistro:String;
  public idbarrera: any;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
  public resumenFinal:String;
  public solucionFinal:String;
  public evaluador: String;
  public regionData:String;
  public provinciaData:String;
  public distritoData:String;
  public esEditableEvaluador:Boolean;
  public consultasRegistradas: Object[];
  public isDisabledOptions:Boolean;
  public isRequerido:Boolean;
  public isReponder:Boolean;
  public habilitarAprobacion:Boolean;
  public detalleobstaculoConsultado:any[];
  public listaevaluadores:any[];
  public selectEvaluador: any;
  public documentoLegal:string;
  public tipodocumento: string;
  public codigoObstaculo: String;
  public region: String;
  public actividadeconomica: String;
  public nombre_organismo: String;
  public actoEntidad: String;
  public transgresion: String;
  public limitalibertad: String;
  public perjuicio: String;
  public categoriaBA: String;
  public ilegal: String;
  public razonabilidad: String;
  public aceptarBarreraAdmin: any;
  public aceptarBarreraBuro: any;
  public sustento: String;
  public resumenUsuario : String;
  public solucionUsuario: String;
  public comentarioDependencia: String;
  public respuestaDependencia: String;
  public sustentocondicion: String;
  public tiempocompromiso: any;
  public listaCondicionBA:any[];
  public condicionBA:any;
  public nombre_region: String;
  public idfase: any;
  public isExterno: any;
  public fileEvidencia: any;
  public botonInternos: Boolean;
  public botonExternos: Boolean;
  public disabledRadio : Boolean;
  public disabledCampos : Boolean;
  public detalleRegistro:any[];
  public tramiteusuario:String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;
  public textoBarreraAdmin: String;
  public textoBarreraBuro: String;
  public textoCondicionBarrera: String;
  public identidad: any;
  public nombreObstaculo: string;

  public loading1: boolean;
  public nombrentidad: string;



  constructor(private coordinadorService:CoordinadorService,private activeRoute: ActivatedRoute,private router: Router , private cookieService: CookieService) {

    this.loading1 = true;

    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.idobstaculo = routeParams.id;
    this.consultasRegistradas = [];
    this.isReponder = false;
    this.isRequerido = false;
    this.habilitarAprobacion = true;
    this.resumenFinal = "";
    this.solucionFinal = "";
    this.documentoLegal= "";
    this.tipodocumento = "";
    this.fileEvidencia = "";
    this.disabledRadio = true;
    this.disabledCampos  = true;

    

    

    this.coordinadorService.DetalleListaRespuestasEnviadas(this.idobstaculo).subscribe(response =>{
      this.loading1 = false;
      this.detalleobstaculoConsultado= response;

      this.coordinadorService.obtenerDetalleRegistro(this.idobstaculo).subscribe(response => {
        this.detalleRegistro = response;
        this.tramiteusuario = this.detalleRegistro[0]["nombre_tramite"];
        this.explicaciondata = this.detalleRegistro[0]["detalle_registro"];
        if(this.detalleRegistro[0]["destinatario"] == 1){
          this.consultaPrincipal = this.detalleRegistro[0]["consulta"];
          this.respuestaPrincipal = this.detalleRegistro[0]["respuesta"];
  
        }else{
          this.consultaPrincipal= "";
          this.respuestaPrincipal= "";
        }
      });
 
      this.codigoObstaculo = this.detalleobstaculoConsultado[0]["codigo_obstaculo" ];
      
      this.codigoregistro = this.detalleobstaculoConsultado[0]["codigo_registro"];
      this.region = this.detalleobstaculoConsultado[0]['id_region'];
      this.nombre_region = this.detalleobstaculoConsultado [0]['nombre_region'];
      this.actividadeconomica = this.detalleobstaculoConsultado[0]['nombre_actividad'];
      this.nombre_organismo = this.detalleobstaculoConsultado[0]['nombre_org'];
      this.actoEntidad = this.detalleobstaculoConsultado[0]['pregunta_uno'];
      this.transgresion = this.detalleobstaculoConsultado[0]['pregunta_dos'];
      this.limitalibertad = this.detalleobstaculoConsultado[0]['pregunta_tres'];
      this.perjuicio = this.detalleobstaculoConsultado[0]['pregunta_cuatro'];
      this.categoriaBA= this.detalleobstaculoConsultado[0]['nombre_tipo_atrib'];
      this.ilegal = this.detalleobstaculoConsultado[0]['ilegal'];
      this.razonabilidad = this.detalleobstaculoConsultado[0]['razonabilidad'];
      this.isExterno = this.detalleobstaculoConsultado[0]['interna_externa'];
      this.identidad = this.detalleobstaculoConsultado[0]['id_entidad'];
      this.nombreObstaculo = this.detalleobstaculoConsultado[0]['obstaculo'];
      this.nombrentidad = this.detalleobstaculoConsultado[0]['nombre_entidad'];

      if(this.identidad == null){
        var nuevoidentidad = 1960;
        this.coordinadorService.obtenerlistaCondicionBA(nuevoidentidad).subscribe(response => {
          this.listaCondicionBA = response;
     });

      }else{
       
        this.coordinadorService.obtenerlistaCondicionBA(this.identidad).subscribe(response => {
          this.listaCondicionBA = response;
     });

      }

      
      
      this.respuestaDependencia = this.detalleobstaculoConsultado[0]['respuesta'];

      if(this.detalleobstaculoConsultado[0]['interna_externa'] == "E"){

        this.comentarioDependencia = this.detalleobstaculoConsultado[0]['comentario'];
        this.isProduceRegistro = false;
        this.botonInternos = false;
        this.botonExternos = true;
      }else{
        this.comentarioDependencia = this.detalleobstaculoConsultado[0]['consulta'];
        this.isProduceRegistro = true;
        this.botonInternos = true;
        this.botonExternos = false;
      }

      if(this.detalleobstaculoConsultado[0]['barrera_admin'] == true){
         this.aceptarBarreraAdmin = "1";
      }else{
        this.aceptarBarreraAdmin = "0";

      }

      if(this.detalleobstaculoConsultado[0]['barrera_buro'] == true){
        this.aceptarBarreraBuro = "1";

     }else{
       this.aceptarBarreraBuro = "0";

     }
      this.sustento = this.detalleobstaculoConsultado[0]['sustento_barrera'];
      this.resumenUsuario = this.detalleobstaculoConsultado[0]['resumen'];
      this.solucionUsuario = this.detalleobstaculoConsultado[0]['solucion'];
      this.sustentocondicion = this.detalleobstaculoConsultado[0]['sustento_condicion'];
      this.tiempocompromiso = this.detalleobstaculoConsultado[0]['tiempo_compromiso'];
      this.idfase = this.detalleobstaculoConsultado[0]['id_fase'];

     if(this.detalleobstaculoConsultado[0]['id_condicion'] == 1){
      this.condicionBA  = "1";

   }else if (this.detalleobstaculoConsultado[0]['id_condicion'] == 2){
     this.condicionBA = "2";

   }else if (this.detalleobstaculoConsultado[0]['id_condicion'] == 3){
    this.condicionBA = "3";

   }else if(this.detalleobstaculoConsultado[0]['id_condicion'] == 4){
    this.condicionBA = "4";

   }else{
     this.condicionBA = "6";
   }
    
    });

   }

  ngOnInit() {
  }

  descargarPDF(){
    if(this.aceptarBarreraAdmin == "1"){
      this.textoBarreraAdmin = "Si";

    }else{
      this.textoBarreraAdmin = "No";
    }
    if(this.aceptarBarreraBuro == "1"){
      this.textoBarreraBuro = "Si";

    }else{
      this.textoBarreraBuro = "No";
    }

    if(this.condicionBA == "1"){
      this.textoCondicionBarrera = "En proceso de superación";

    }else if(this.condicionBA == "2"){
      this.textoCondicionBarrera = "Superada";
    }else{
      // this.textoCondicionBarrera = "En evaluación";
     this.textoCondicionBarrera = "No barrera administrativa";

    }

    if(this.comentarioDependencia === null){
      this.comentarioDependencia = "Ninguna";
    }
    if(this.respuestaDependencia === null){
      this.respuestaDependencia = "Ninguna";
    }

    if(this.nombre_organismo === null){
      this.nombre_organismo = this.nombrentidad;
    }
    var doc = new jsPDF();
    
                  doc.text('Detalle de la Barrera', 105, 20, null, null, 'center');
                    doc.setFontSize(12);
                    doc.text("Código de la Barrera: " + this.codigoObstaculo, 15,30);
                    doc.text("Región: " + this.nombre_region, 15, 40);
                    doc.text("Barrera Administrativa: " + this.nombreObstaculo, 15, 50);
                    doc.text("Actividad económica: " + this.actividadeconomica, 15, 60);
                    doc.text("Entidad y/o Organismo: " + this.nombre_organismo, 15, 70);
                    doc.text("Existe acto o disposición  de la entidad: " + this.actoEntidad, 15, 80);
                    doc.text("Es una transgresión a los principios \n y normas  de simplificación administrativa: " + this.transgresion, 15, 90 + " \n");
                    doc.text("Limita la libertad de tránsito: " + this.limitalibertad, 15, 110);
                    doc.text("Existe prejuicio: " + this.perjuicio, 15, 120);
                    doc.text("Categoría a la que pertenece la Barrera: " +this.categoriaBA, 15, 130);
                    doc.text("Ilegal: " +this.ilegal, 15, 140);
                    doc.text("Carente de razonabilidad: " +this.razonabilidad, 15, 150);
                    doc.text("Comentario del equipo de la plataforma \n respecto a la barrera detectada para las dependencias del SP: " + this.comentarioDependencia, 15, 160 + " \n");
                    doc.text("Respuesta de la dependencia del SP \n respecto a la detección de la barrera: " + this.respuestaDependencia, 15, 180 + " \n");
                    doc.text("¿Es barrera administrativa?: "+ this.textoBarreraAdmin, 15, 200);
                    doc.text("¿Es Indicio de barrera burocrática?: " + this.textoBarreraBuro, 15, 210);
                    doc.text("Sustento de evaluación: "+this.sustento, 15, 220);
                    doc.text("Respuesta al Usuario: "+ this.resumenUsuario, 15, 230);
                    doc.text("Medidas a tomar: "+ this.solucionUsuario, 15, 240);
                    doc.text("Condición de la Barrera: "+ this.textoCondicionBarrera, 15, 250);
                    doc.text("Sustento  de condición de la Barrera: "+ this.sustentocondicion, 15, 260);
                    doc.text("Compromiso con plazo de tiempo: "+this.tiempocompromiso + " dias", 15, 270);
                    doc.save('Detalle-Barrera-Coordinador-'+this.codigoObstaculo+'.pdf');   
  }

}
