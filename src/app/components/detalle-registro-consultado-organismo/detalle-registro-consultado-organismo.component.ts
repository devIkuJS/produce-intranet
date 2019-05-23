import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluadorService} from '../../services/evaluador.service';

@Component({
  selector: 'app-detalle-registro-consultado-organismo',
  templateUrl: './detalle-registro-consultado-organismo.component.html',
  styleUrls: ['./detalle-registro-consultado-organismo.component.css']
})
export class DetalleRegistroConsultadoOrganismoComponent implements OnInit {

  public idobstaculo: any;

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
  public detalleobstaculoConsultado:any[];

  public listaCondicionBA:any[];
  public condicionBA:any;
  public isExterno: any;
  public isProduceRegistro: Boolean;
  public idfase:any;
  public codigoObstaculo: any;
  public fileEvidencia: any;
  public codigoregistro:any;
  public idbarrera: any;
  public idregion: any;
  public idactividadeconomica: any;
  public identidad: any;
  public idorganismo : any;
  public botonInternos : Boolean;
  public botonExternos : Boolean;
  public isDisabledOptions: Boolean;
  public detalleRegistro:any[];
  public tramiteusuario:String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;
  public explicaciondata: String;
  public enviaConsulta: Boolean;
  public NoEnviaConsulta: Boolean;
  public ocultarCuandoSeaFase5: Boolean;
  public nombreObstaculo: string;

  public loading1: boolean;

  constructor( private evaluadorService: EvaluadorService , private activeRoute: ActivatedRoute,private router: Router) { 

    this.loading1 = true;

    const routeParams = this.activeRoute.snapshot.params;
    this.idobstaculo = routeParams.id;
    this.fileEvidencia = "";
    this.isDisabledOptions = true;

    


    this.evaluadorService.obtenerDetalleRegistro(this.idobstaculo).subscribe(response => {
      
      this.detalleRegistro = response;
      this.codigoregistro = this.detalleRegistro[0]["codigo_registro"];
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


    this.evaluadorService.obtenerDetalleConsultadoOrganismo(this.idobstaculo).subscribe(response =>{
      this.loading1 = false;
      this.detalleobstaculoConsultado= response;

      this.codigoObstaculo = this.detalleobstaculoConsultado[0]["codigo_obstaculo" ];
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
      this.isExterno = this.detalleobstaculoConsultado[0]['interna_externa'];
      this.idbarrera =  this.detalleobstaculoConsultado[0]['id_barrera'];
      this.idregion = this.detalleobstaculoConsultado[0]['id_region'];
      this.idactividadeconomica = this.detalleobstaculoConsultado[0]['id_activ_econ'];
      this.idorganismo = this.detalleobstaculoConsultado[0]['id_organismo'];
      this.identidad = this.detalleobstaculoConsultado[0]['id_entidad'];
      this.respuestaDependencia = this.detalleobstaculoConsultado[0]['respuesta'];
      this.nombreObstaculo = this.detalleobstaculoConsultado[0]['obstaculo'];

      if(this.identidad == null){
        var nuevoidentidad = 1960;
        this.evaluadorService.obtenerlistaCondicionBA(nuevoidentidad).subscribe(response => {
          this.listaCondicionBA = response;
     });

      }else{
       
        this.evaluadorService.obtenerlistaCondicionBA(this.identidad).subscribe(response => {
          this.listaCondicionBA = response;
     });

      }
      if(this.detalleobstaculoConsultado[0]['id_fase'] == 5){
        this.ocultarCuandoSeaFase5 = false;
      }

      if(this.detalleobstaculoConsultado[0]['id_fase'] == 23){
        this.ocultarCuandoSeaFase5 = true;
      }


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

      



    
    });
  }

  onFileChange(event) {
    this.fileEvidencia = event.target.files[0]['name'];

  }

  public validarSoloNumeros(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  
  }

  ngOnInit() {
  }

  onChangeEnviar(data){
    
        if(data == "1"){
          this.enviaConsulta = true;
          this.NoEnviaConsulta = false;
        }
    
        if(data == "0"){
          this.enviaConsulta = false;
          this.NoEnviaConsulta = true;
        }
    
      
      }

  public enviarSolucionExterno(){
    
      
          let registro =   {codigo_registro: this.codigoregistro,id_activ_econ: this.idactividadeconomica, pregunta_uno: this.actoEntidad,
            pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,
            ilegal: this.ilegal, razonabilidad: this.razonabilidad, informe_final_barrera: this.fileEvidencia,
            resumen: this.resumenUsuario,solucion: this.solucionUsuario,id_barrera: this.idbarrera,
            sustento_condicion: this.sustentocondicion ,tiempo_compromiso: Number(this.tiempocompromiso),
            barrera_admin: Number(this.aceptarBarreraAdmin), barrera_buro: Number(this.aceptarBarreraBuro), id_condicion: Number(this.condicionBA), sustento_barrera: this.sustento,
            id_region: this.idregion , comentario: this.comentarioDependencia , id_entidad: this.identidad
        }
        
                  Swal({
                  title: 'Desea registrar la solución ?',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, registrar'
                  }).then((result) => {
    
    
                  if (result.value) {
                  this.evaluadorService.registrarSolucionExterno(registro).subscribe(response =>{

    
                  Swal(
                  'Hecho!',
                  'Se ha registrado la solución y se ha remitido al coordinador',
                  'success'
                  ).then(()=>{
                  this.router.navigate(['/evaluador']);
                  }); 
    
    
                  });
    
                  }
    
                  })
    
    
        }



        public enviarSolucion(){
          
                let registro =   {id_activ_econ: this.idactividadeconomica,id_organismo: this.idorganismo, pregunta_uno: this.actoEntidad,
                                  pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,
                                  ilegal: this.ilegal, razonabilidad: this.razonabilidad, informe_final_barrera: this.fileEvidencia,
                                  resumen: this.resumenUsuario,solucion: this.solucionUsuario,id_barrera: this.idbarrera,
                                  sustento_condicion: this.sustentocondicion ,tiempo_compromiso: Number(this.tiempocompromiso),
                                  barrera_admin: Number(this.aceptarBarreraAdmin), barrera_buro: Number(this.aceptarBarreraBuro), id_condicion: Number(this.condicionBA), sustento_barrera: this.sustento,
                                  id_region: this.idregion
                          }
                       

                 Swal({
                    title: 'Desea registrar la evaluación final ?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, registrar'
                  }).then((result) => {
            
            
                      if (result.value) {
                        this.evaluadorService.registrarSolucion(registro).subscribe(response =>{
          
                         Swal(
                            'Hecho!',
                            'Se ha registrado la evaluación final',
                            'success'
                          ).then(()=>{
                            this.router.navigate(['/evaluador']);
                          }); 
          
                          
                          });
                     
                    }
            
                  })
              
       
          
            
          
          
          
          
          
          }
 
}
