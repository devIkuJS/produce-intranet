import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from '../../services/representante.service';

declare var $:any;

@Component({
  selector: 'app-detalle-representante',
  templateUrl: './detalle-representante.component.html',
  styleUrls: ['./detalle-representante.component.css']
})
export class DetalleRepresentanteComponent implements OnInit {


  public codigoregistro:String;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
 // public respuestaUsuarioFinal:String;
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
 public barreraAdministrativa: String;

 public loading1: boolean;





  constructor(private representanteService:RepresentanteService,private activeRoute: ActivatedRoute,private router: Router) {

    this.loading1 = true;

  
    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.codigoObstaculo = routeParams.id;
    this.consultasRegistradas = [];
    this.isReponder = false;
    this.isRequerido = false;
    this.habilitarAprobacion = true;
    this.nuevoArray= [];

    this.respuestaDependencia="";
  

    this.representanteService.obtenerDetalleRegistro(this.codigoObstaculo).subscribe(response => {

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


     this.representanteService.obtenerDetalleFASE1(this.codigoObstaculo).subscribe(response =>{
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
            this.idconsulta = this.detalleobstaculoConsultado[0]['id_consulta'];
            this.barreraAdministrativa = this.detalleobstaculoConsultado[0]['obstaculo'];

    });

 
    
  }

  ngOnInit() {}






  registrarRespuesta(){
    
       let registro = {codigo_registro: this.codigoregistro ,rptausuario: this.respuestaDependencia , id_consulta: this.idconsulta};


        if(this.respuestaDependencia ==''){
          
              Swal({
                type: 'error',
                title: 'Ingrese su respuesta'
              })
              return false;
          
             }else{

              Swal({
                title: 'Desea confirmar estos datos?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar'
              }).then((result) => {
                  if (result.value) {
                    this.representanteService.enviarRespuestFASE1(registro).subscribe(response =>{
                    Swal(
                      'Hecho!',
                      'Se envió la respuesta',
                      'success'
                    ).then(()=>{
                      this.router.navigate(['/representante']);
                    });
                  });
                }
              })
      }
  }

}
