import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordinadorService} from '../../services/coordinador.service';
import { AdministradoService} from '../../services/administrado.service';

@Component({
  selector: 'app-detalle-consultado-administrado',
  templateUrl: './detalle-consultado-administrado.component.html',
  styleUrls: ['./detalle-consultado-administrado.component.css']
})
export class DetalleConsultadoAdministradoComponent implements OnInit {


  public codigoregistro:String;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
  public resumenFinal:String;
  public solucionFinal:String;
  public isDisabledOptions:Boolean;
  public regionData:String;
  public provinciaData:String;
  public esEditableEvaluador:Boolean;
  public distritoData:String;
  public detalleobstaculo:any[];
  public consultaDisabled: Boolean;
  public consultaAdministrado: String;
  public correo_persona: string;
  public hash_registro: string;
  public respuestaAdministrado: string;
  public isUsuarioRespondio: Boolean;
  public idfase: Number;
  public botonAdministrado: Boolean;
  public botonEvaluador: Boolean;
  public idconsulta: number;
  public loading1: boolean;
  public disabledConsultaUsuario : Boolean;
  public botonFase9: Boolean;

  constructor(private coordinadorService:CoordinadorService, private administradoService: AdministradoService ,private activeRoute: ActivatedRoute,private router: Router) { 
    this.loading1 = true;
    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.codigoregistro = routeParams.id;
    this.isDisabledOptionsOrgano = true;
    this.consultaDisabled = true;
    this.disabledConsultaUsuario = true;
    

    this.coordinadorService.obtenerDetalleCoordinadorAdministrado(this.codigoregistro).subscribe(response =>{
      this.loading1 = false;
      this.detalleobstaculo = response;
      console.log(response);

            if(this.detalleobstaculo[0]['interna_externa'] == "P"){
              
              this.tramitedata = this.detalleobstaculo[0]['nombre_tramite'];
              this.explicaciondata = this.detalleobstaculo[0]['detalle_registro'];
              this.entidaddata = this.detalleobstaculo[0]['nombre_entidad'];
              this.organoData = this.detalleobstaculo[0]['nombre_org'];
              this.regionData = this.detalleobstaculo[0]['nombre_region'];
              this.provinciaData = this.detalleobstaculo[0]['nombre_provincia'];
              this.distritoData = this.detalleobstaculo[0]['nombre_distrito'];
            }else{
              this.isProduceRegistro = true;
              this.tramitedata = this.detalleobstaculo[0]['nombre_tramite'];
              this.explicaciondata = this.detalleobstaculo[0]['detalle_registro'];
              this.entidaddata = this.detalleobstaculo[0]['nombre_entidad'];
              this.organoData = this.detalleobstaculo[0]['nombre_org'];
              this.regionData = this.detalleobstaculo[0]['nombre_region'];
              this.provinciaData = this.detalleobstaculo[0]['nombre_provincia'];
              this.distritoData = this.detalleobstaculo[0]['nombre_distrito'];
            }

            if(this.detalleobstaculo[0]['id_fase'] == 11 || this.detalleobstaculo[0]['id_fase'] == 9 ){
              this.disabledConsultaUsuario = true;

            }else{
              this.disabledConsultaUsuario = false;

            }
            this.consultaAdministrado = this.detalleobstaculo[0]['consulta'];
            this.respuestaAdministrado = this.detalleobstaculo[0]['respuesta'];
            this.idfase = this.detalleobstaculo[0]['id_fase'];
            this.correo_persona =  this.detalleobstaculo[0]['correo_persona'];
            this.hash_registro =  this.detalleobstaculo[0]['hash_registro'];
            this.idconsulta =  this.detalleobstaculo[0]['id_consulta'];

            if(this.idfase == 11){
              this.isUsuarioRespondio = true;
            }else{
              this.isUsuarioRespondio = false;
            } 

            if(this.idfase == 5){
              this.botonAdministrado = true;
              this.botonEvaluador = false;
            }else{
              this.botonAdministrado = false;
              this.botonEvaluador = true;

            }

            if(this.idfase == 9){
              this.botonAdministrado = false;
              this.botonEvaluador = false;
              this.botonFase9 = true;
              
              
            }

    });





  }

  ngOnInit() {}

  enviarConsultaUsuario(){

    let codigo_registro  = {codigo_registro: this.codigoregistro , id_barrera : 0 , bandera: 0 , 
      consulta: this.consultaAdministrado, id_organismo: 0,
       id_region: 0 , id_activ_econ: 0,
        pregunta_uno: "" , pregunta_dos: "", pregunta_tres: "", pregunta_cuatro: "",
         ilegal: "", razonabilidad: "", id_consulta: this.idconsulta}; 
         

    this.coordinadorService.enviarConsultaAdministrado(codigo_registro).subscribe(response => {


    this.administradoService.envioCorreoAdministrado(this.correo_persona , this.hash_registro).subscribe(respuesta1 => {

      
    });
        
            Swal({
              title: 'Desea enviar estos datos?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, confirmar'
            }).then((result) => {

              if (result.value) {

                Swal(
                  'Hecho!',
                  'Se envió la respuesta al Usuario',
                  'success'
                ).then(()=>{
                  this.router.navigate(['/coordinador']);
                });

              }
        });
      

  })

}

  enviarEvaluador(){

            Swal({
              title: 'Desea enviar estos datos?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, confirmar'
            }).then((result) => {
        
              if (result.value) {
      
                this.coordinadorService.enviarRespuestaAdministradoCoordinadorToEvaluador(this.codigoregistro).subscribe(response => {
      
                  Swal(
                    'Hecho!',
                    'Se envió la respuesta al Evaluador',
                    'success'
                  ).then(()=>{
                    this.router.navigate(['/coordinador']);
                  });
      
                });
              }
        });
          
  }


  enviarNoRespondio(){
    
       let registro = { codigo_registro: this.codigoregistro, rptausuario: "No respondió",url_archivo: "",id_consulta: this.idconsulta};
    
        Swal({
          title: 'Esta seguro que desea realizar esta acción?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, confirmar'
        }).then((result) => {
    
          if (result.value) {
    
            this.coordinadorService.enviarRespuestaAdministrado(registro).subscribe(response => {
    
              Swal(
                'Hecho!',
                'Se envió la acción',
                'success'
              ).then(()=>{
                this.router.navigate(['/coordinador']);
              });
    
    
            });
    
    
          }
    });
    
      }

}
