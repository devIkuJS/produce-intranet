import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from '../../services/representante.service';
import * as jsPDF from 'jspdf'; 

@Component({
  selector: 'app-detalle-representante-respuesta',
  templateUrl: './detalle-representante-respuesta.component.html',
  styleUrls: ['./detalle-representante-respuesta.component.css']
})
export class DetalleRepresentanteRespuestaComponent implements OnInit {

  public codigoregistro:String;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
  public explicacionFinal:String;
  public sustentoFinal:String;
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
  public nuevoArray:any[];
  public listaevaluadores:any[];
  public idevaluador:Number;
  public consulta:String;
  public idconsulta:Number;
  public codigoObstaculo:any;
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
  public resumenUsuario : String;
  public solucionUsuario: String;
  public comentarioDependencia: String;
  public respuestaDependencia: String;
  public detalleRegistro:any[];
  public tramiteusuario:String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;
  public idobstaculo: any;

  public loading1: boolean;
  public nombreObstaculo: string;

  constructor(private representanteService:RepresentanteService,private activeRoute: ActivatedRoute,private router: Router) { 

    this.loading1 = true;

    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.idobstaculo = routeParams.id;
    this.consultasRegistradas = [];
    this.isReponder = false;
    this.isRequerido = false;
    this.habilitarAprobacion = true;
    this.nuevoArray= [];

    this.representanteService.obtenerDetalleRegistro(this.idobstaculo).subscribe(response => {

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


    this.representanteService.obtenerDetalleFASE2(this.idobstaculo).subscribe(response =>{
      this.loading1 = false;
      this.detalleobstaculoConsultado= response;

      this.detalleobstaculoConsultado= response;
      
            this.codigoObstaculo = this.detalleobstaculoConsultado[0]["codigo_obstaculo"];
            this.codigoregistro = this.detalleobstaculoConsultado[0]["codigo_registro"];
            this.region = this.detalleobstaculoConsultado[0]['nombre_region'];
            this.actividadeconomica = this.detalleobstaculoConsultado[0]['nombre_actividad'];
            this.nombre_organismo = this.detalleobstaculoConsultado[0]['nombre_org'];
            this.actoEntidad = this.detalleobstaculoConsultado[0]['pregunta_uno'];
            this.transgresion = this.detalleobstaculoConsultado[0]['pregunta_dos'];
            this.limitalibertad = this.detalleobstaculoConsultado[0]['pregunta_tres'];
            this.perjuicio = this.detalleobstaculoConsultado[0]['pregunta_cuatro'];
            this.categoriaBA= this.detalleobstaculoConsultado[0]['nombre_tipo_atrib'];
            this.ilegal = this.detalleobstaculoConsultado[0]['ilegal'];
            this.razonabilidad = this.detalleobstaculoConsultado[0]['razonabilidad'];
            this.comentarioDependencia = this.detalleobstaculoConsultado[0]['consulta'];
            this.respuestaDependencia = this.detalleobstaculoConsultado[0]['respuesta'];
            this.idconsulta = this.detalleobstaculoConsultado[0]['id_consulta'];
            this.nombreObstaculo = this.detalleobstaculoConsultado[0]['nombre_obstaculo'];

    });


  }

  ngOnInit() {
  }

  descargarPDF(){
    var doc = new jsPDF();
    
                    doc.text('Detalle de la Barrera', 105, 20, null, null, 'center');
                    doc.setFontSize(12);
                    doc.text("Código de Barrera: " + this.codigoObstaculo, 15,30);
                    doc.text("Region: " + this.region, 15, 40);
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
                    doc.save('Detalle-Barrera-Consultado-'+this.codigoObstaculo+'.pdf');
  }

}
