import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordinadorService} from '../../services/coordinador.service';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-detalle-consultado-organismo',
  templateUrl: './detalle-consultado-organismo.component.html',
  styleUrls: ['./detalle-consultado-organismo.component.css']
})
export class DetalleConsultadoOrganismoComponent implements OnInit {

  public codigoregistro:String;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public isProduceRegistroRespuesta:Boolean;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
  public registroAceptado:Boolean;
  public respuestaUsuarioFinal:String;

  public isDisabledOptions:Boolean;

  public regionData:String;
  public provinciaData:String;
  public esEditableEvaluador:Boolean;

  public distritoData:String;

  public idObstaculo : any;
  public codigoObstaculo: any;


  public regiones: Array<Select2OptionData>;
  public optionsSelect2Region: Select2Options;
  public selectedRegion: string;
  public textoRegion: string ;

  public actividadeconomica: Array<Select2OptionData>;
  public optionsSelect2ActividadEconomica: Select2Options;
  public selectedActividadEconomica: string;
  public textoActividadEconomica: string;
  

  public organos: Array<Select2OptionData>;
  public optionsSelect2Organos: Select2Options;
  public selectedOrganos: string;
  public textoOrganos: string ;


  public detalleobstaculoConsultado:any[];
  public region: String;
  public nombre_organismo: String;
  public actoEntidad: String;
  public transgresion: String;
  public limitalibertad: String;
  public perjuicio: String;
  public categoriaBA: String;
  public ilegal: String;
  public razonabilidad: String;

  public comentarioDependencia: String;
  public respuestaDependencia: String;

  public idorganismo : Number;
  public idbarrera: Number;
  public idregion: Number;
  public idactividadeconomica: Number;
  public enviaConsulta: Boolean;
  public NoEnviaConsulta: Boolean;
  public enviaRespuesta: Boolean;
  public isBotonUno: Boolean;
  public seleccionar: String;
  public sustentoevaluacion: String;
  public mostrarPrimeraEvaluacion: Boolean;
  public idconsulta: number;

  public regionNueva: Object;
  public actividadNueva: Object;
  public organoNueva: Object;

  public disabledFase12: Boolean;

  public loading1: boolean;

  public nombreObstaculo : string;
  public detalleRegistro: any;
  public tramiteusuario: string;
  public identidad: any;
  public consultaPrincipal: string;
  public respuestaPrincipal: string;
  public mostrarBotonFase9: Boolean;
  


  constructor(private coordinadorService:CoordinadorService,private activeRoute: ActivatedRoute,private router: Router) {

    this.loading1 = true;

    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.idObstaculo = routeParams.id;
    this.isDisabledOptionsOrgano = true;
    this.registroAceptado = false;
    this.seleccionar = "1";
    this.isDisabledOptions = true;
    this.sustentoevaluacion = "";
    this.comentarioDependencia = "";

    this.optionsSelect2Region = {
      placeholder: "[ Seleccione una región ]",
      width: "100%"
    }

    this.coordinadorService.obtenerRegiones().subscribe(response => {
      var arrayAuxRegEditableRegion = [];
          arrayAuxRegEditableRegion.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
               arrayAuxRegEditableRegion.push({id: response[index]['id_region'],text: response[index]['nombre_region']});
        }
        this.regiones = arrayAuxRegEditableRegion; 
    }); 

    this.optionsSelect2ActividadEconomica = { placeholder: "[ Seleccione la actividad económica]", width: "100%"};
    this.coordinadorService.obtenerActividadEconomica().subscribe(response => {
      var arrayAuxReg3 = [];
          arrayAuxReg3.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
               arrayAuxReg3.push({id: response[index]['id_activ_econ'],text: response[index]['nombre_actividad']});
        }       
        this.actividadeconomica = arrayAuxReg3;
  });


  

  

    this.coordinadorService.obtenerDetalleConsultadoOrganismo(this.idObstaculo).subscribe(response =>{

    
      this.detalleobstaculoConsultado= response;

      console.log(response);
            
            this.codigoObstaculo = this.detalleobstaculoConsultado[0]["codigo_obstaculo"];
            this.region = this.detalleobstaculoConsultado[0]['nombre_region'];
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
            this.idbarrera = this.detalleobstaculoConsultado[0]['id_barrera'];
            this.codigoregistro = this.detalleobstaculoConsultado[0]['codigo_registro'];
            this.idconsulta = this.detalleobstaculoConsultado[0]['id_consulta'];
            this.nombreObstaculo = this.detalleobstaculoConsultado[0]['nombre_obstaculo'];

            setTimeout(() => {    
              this.loading1 = false;
              this.regionNueva = String(this.detalleobstaculoConsultado[0]["id_region"]);
              this.actividadNueva = String(this.detalleobstaculoConsultado[0]["id_activ_econ"]);
              this.organoNueva = String(this.detalleobstaculoConsultado[0]["id_organismo"]);
    
            }, 1000);

            this.optionsSelect2Organos = { placeholder: "[ Seleccione el Órgano/Unidad orgánica/Organismo/Programa ]", width: "100%"};
            if(this.detalleobstaculoConsultado[0]["direccion"] == 1){
      
              this.coordinadorService.obtenerOrganismosBarreras(1960 , 1).subscribe(response =>{
                var arrayAuxReg2 = [];
                    arrayAuxReg2.push({id: '',text: ""});
                    for (let index = 0; index < response['length']; index++) {
                        arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
                  }
                  this.organos = arrayAuxReg2;
            });
      
            }else{
              this.coordinadorService.obtenerOrganismosBarreras(1960 , 0).subscribe(response =>{
                var arrayAuxReg2 = [];
                    arrayAuxReg2.push({id: '',text: ""});
                    for (let index = 0; index < response['length']; index++) {
                        arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
                  }
                  this.organos = arrayAuxReg2;
            });
      
            }


            if(this.detalleobstaculoConsultado[0]['id_fase'] == 5 ){

              this.enviaConsulta = true;
              this.enviaRespuesta = false;
              this.mostrarPrimeraEvaluacion = true;
              this.isDisabledOptions = false;

            }
            if(this.detalleobstaculoConsultado[0]['id_fase'] == 12){

              this.enviaConsulta = false;
              this.enviaRespuesta = true;
              this.disabledFase12 = true;

            }

            if(this.detalleobstaculoConsultado[0]['id_fase'] == 9){

              this.disabledFase12 = true;

              this.mostrarBotonFase9 = true;
              
              }


            if(this.detalleobstaculoConsultado[0]['id_fase'] == 24){
              
               this.mostrarPrimeraEvaluacion = false;
              
              
             } 


             this.coordinadorService.obtenerDetalleRegistro(this.idObstaculo).subscribe(response => {
  
              this.detalleRegistro = response;
              this.tramiteusuario = this.detalleRegistro[0]["nombre_tramite"];
              this.explicaciondata = this.detalleRegistro[0]["detalle_registro"];
              this.identidad = this.detalleRegistro[0]['id_entidad'];
 
      
              if(this.detalleRegistro[0]["destinatario"] == 1){
                this.consultaPrincipal = this.detalleRegistro[0]["consulta"];
                this.respuestaPrincipal = this.detalleRegistro[0]["respuesta"];
      
              }else{
                this.consultaPrincipal= "";
                this.respuestaPrincipal= "";
              }
           
              
         }); 

          });
   }

  ngOnInit() {
  }

  public changeOfRegion(e: any) : void{
      this.selectedRegion = e.value;
  } 
  
  public changeOfOrganos(e: any): void {
  this.selectedOrganos = e.value;
}

public changeOfActividadEconomica(e:any) : void {
  this.selectedActividadEconomica = e.value;
}

  onChangeEnviar(data){
    
        if(data == "1"){
          this.isBotonUno = false;
          this.enviaConsulta = true;
          this.NoEnviaConsulta = false;
        }
    
        if(data == "0"){
          this.isBotonUno = true;
          this.enviaConsulta = false;
          this.NoEnviaConsulta = true;
        }
    
      
      }



  enviarConsulta(){

   let registro  = {codigo_registro: this.codigoregistro , id_barrera : this.idbarrera , bandera: 1 , 
      consulta: this.comentarioDependencia, id_organismo: Number(this.selectedOrganos),
       id_region: Number(this.selectedRegion) , id_activ_econ: Number(this.selectedActividadEconomica),
        pregunta_uno: this.actoEntidad , pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad, pregunta_cuatro: this.perjuicio,
         ilegal: this.ilegal, razonabilidad: this.razonabilidad, id_consulta: this.idconsulta}; 

              Swal({
                title: 'Desea enviar estos datos?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar'
              }).then((result) => {

                if (result.value) {

                  this.coordinadorService.registrarRegistroConsultado(registro).subscribe(response => {

                    Swal(
                      'Hecho!',
                      'Se envió la consulta',
                      'success'
                    ).then(()=>{
                      this.router.navigate(['/coordinador']);
                    });


                  });


                }
          });
  }


  NoenviarConsulta(){
      let registro;
    
        if(Number(this.seleccionar) == 1){
          registro = {bandera: 1, id_barrera: this.idbarrera, sustento_eva1:"" , id_region: Number(this.selectedRegion) , id_activ_econ : Number (this.selectedActividadEconomica) , id_organismo: Number(this.selectedOrganos) , pregunta_uno:  this.actoEntidad, pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,ilegal: this.ilegal , razonabilidad: this.razonabilidad , 
          id_consulta: this.idconsulta ,
          consulta: this.comentarioDependencia};


          Swal({
            title: 'Desea enviar estos datos?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, confirmar'
          }).then((result) => {
      
            if (result.value) {
      
              this.coordinadorService.enviarPrimeraEvaluacion(registro).subscribe(response =>{
      
                Swal(
                  'Hecho!',
                  'Se envió la evaluación',
                  'success'
                ).then(()=>{
                  this.router.navigate(['/coordinador']);
                });
      
      
              });
      
      
            }
      });

    
        }else{
          registro = {bandera: 0 , id_barrera: this.idbarrera, sustento_eva1: this.sustentoevaluacion , id_region: Number(this.selectedRegion) , id_activ_econ : Number (this.selectedActividadEconomica) , id_organismo: Number(this.selectedOrganos) , pregunta_uno:  this.actoEntidad, pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,ilegal: this.ilegal , razonabilidad: this.razonabilidad , 
            id_consulta: this.idconsulta,
            consulta: this.comentarioDependencia};
        }

        if(this.sustentoevaluacion.length == 0){
          Swal({
            type: 'error',
            title: 'Ingrese la observación de primera evaluación del coordinador'
          })
      
          return false;
        }else{
   
             Swal({
              title: 'Desea enviar estos datos?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, confirmar'
            }).then((result) => {
        
              if (result.value) {
        
                this.coordinadorService.enviarPrimeraEvaluacion(registro).subscribe(response =>{
        
                  Swal(
                    'Hecho!',
                    'Se envió la evaluación',
                    'success'
                  ).then(()=>{
                    this.router.navigate(['/coordinador']);
                  });
        
        
                });
        
        
              }
        });

        }
    
       
      }

 
  enviarRespuesta(){

    Swal({
      title: 'Desea enviar estos datos?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar'
    }).then((result) => {

      if (result.value) {

        this.coordinadorService.enviarRespuestaUsuarioCoordinadorToEvaluador(this.idbarrera).subscribe(response => {

          Swal(
            'Hecho!',
            'Se envió la respuesta',
            'success'
          ).then(()=>{
            this.router.navigate(['/coordinador']);
          });


        });


      }
});


  }


  enviarNoRespondio(){

   let registro = { codigo_registro: this.codigoregistro, rptausuario: "No ha sido respondido", id_consulta: this.idconsulta};

    Swal({
      title: 'Esta seguro que desea realizar esta acción?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar'
    }).then((result) => {

      if (result.value) {

        this.coordinadorService.enviarRespuestFASE1(registro).subscribe(response => {

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
