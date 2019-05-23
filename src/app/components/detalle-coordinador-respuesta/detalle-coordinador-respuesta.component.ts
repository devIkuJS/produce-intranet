import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordinadorService } from '../../services/coordinador.service';
import { IfStmt } from '@angular/compiler';
import { Select2OptionData } from 'ng2-select2';

import { CookieService } from 'ngx-cookie-service';
import * as jsPDF from 'jspdf'; 

declare var $:any;

@Component({
  selector: 'app-detalle-coordinador-respuesta',
  templateUrl: './detalle-coordinador-respuesta.component.html',
  styleUrls: ['./detalle-coordinador-respuesta.component.css']
})
export class DetalleCoordinadorRespuestaComponent implements OnInit {

  public actividadeconomica: Array<Select2OptionData>;
  public optionsSelect2ActividadEconomica: Select2Options;
  public textoActividadEconomica: string;

  public regiones: Array<Select2OptionData>;
  public optionsSelect2Region: Select2Options;
  public selectedRegion: string;
  public textoRegion: string ;

  public entidades: Array<Select2OptionData>;
  public optionsSelect2Entidades: Select2Options;
  public selectedEntidades: string;
  public textoEntidad: string ;

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

  public idfase: any;

  public isExterno: any;
  public fileEvidencia: any;

  public botonInternos: Boolean;
  public botonExternos: Boolean;
  public id_obstaculo: any;
  public detalleRegistro: any[];
  public tramiteusuario: String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;

  public textoBarreraAdmin: string;
  public textoBarreraBuro: string;
  public textoCondicionBarrera: string;
  public nombre_region: string;
  public mostrarPrimeraEvaluacion: Boolean;
  public seleccionar: String;
  public seleccionarExterno: String;
  public enviaConsulta: Boolean;
  public enviarRespuesta: Boolean;
  public isBotonUno: Boolean;
  public sustentoevaluacion: String;
  public sustentoevaluacionExterno: String;
  public identidad: any;
  public nombrentidad: string;
  public nombreObstaculo : string;
  public loading1: boolean;
  public interna_externa : string;
  public disabledExterna: boolean;
  public selectedActividadEconomica: any;
  public regionNueva: Object;
  public actividadNueva: Object;
  public entidadNueva: Object;
  public enviaConsultaExterno: Boolean;
  public isBotonUnoExterno: Boolean;
  public enviarRespuestaExterno: Boolean;



  constructor(private coordinadorService:CoordinadorService,private activeRoute: ActivatedRoute,private router: Router , private cookieService: CookieService) {
    this.loading1 = true; 

    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.id_obstaculo = routeParams.id;
    this.consultasRegistradas = [];
    this.isReponder = false;
    this.isRequerido = false;
    this.habilitarAprobacion = true;
    this.resumenFinal = "";
    this.solucionFinal = "";
    this.documentoLegal= "";
    this.tipodocumento = "";
    this.fileEvidencia = "";
    this.seleccionar = "1";
    this.seleccionarExterno = "1";
    this.enviaConsulta = true;

   

    
     this.coordinadorService.obtenerDetalleRespuesta(this.id_obstaculo).subscribe(response =>{
      
      this.detalleobstaculoConsultado= response;

      this.optionsSelect2ActividadEconomica = { placeholder: "[ Seleccione la actividad económica]", width: "100%"};
      this.coordinadorService.obtenerActividadEconomica().subscribe(response => {
        var arrayAuxReg3 = [];
            arrayAuxReg3.push({id: '',text: ""});
            for (let index = 0; index < response['length']; index++) {
                 arrayAuxReg3.push({id: response[index]['id_activ_econ'],text: response[index]['nombre_actividad']});
          }       
          this.actividadeconomica = arrayAuxReg3;
    });
  
  
      this.optionsSelect2Region = { placeholder: "[ Seleccione la región]", width: "100%"};
      this.coordinadorService.obtenerRegiones().subscribe(response => {
        var arrayAuxRegEditableRegion = [];
            arrayAuxRegEditableRegion.push({id: '',text: ""});
            for (let index = 0; index < response['length']; index++) {
                 arrayAuxRegEditableRegion.push({id: response[index]['id_region'],text: response[index]['nombre_region']});
          }
          this.regiones = arrayAuxRegEditableRegion; 
      }); 
  
  
      this.optionsSelect2Entidades = { placeholder: "[ Seleccione la Entidad ]", width: "100%"};
      
          this.coordinadorService.obtenerEntidades().subscribe(response =>{
            var arrayAuxEntidad = [];
                arrayAuxEntidad.push({id: '',text: ""});
                for (let index = 0; index < response['length']; index++) {
                    arrayAuxEntidad.push({id: response[index]['id_entidad'],text: response[index]['nombre_entidad']});
              }
              this.entidades = arrayAuxEntidad;
        }); 

    
      this.codigoObstaculo = this.detalleobstaculoConsultado[0]["codigo_obstaculo" ];
      this.codigoregistro = this.detalleobstaculoConsultado[0]["codigo_registro"];
      this.region = this.detalleobstaculoConsultado[0]['id_region'];
      this.nombre_organismo = this.detalleobstaculoConsultado[0]['nombre_org'];
      this.idbarrera = this.detalleobstaculoConsultado[0]['id_barrera'];
      this.actoEntidad = this.detalleobstaculoConsultado[0]['pregunta_uno'];
      this.transgresion = this.detalleobstaculoConsultado[0]['pregunta_dos'];
      this.limitalibertad = this.detalleobstaculoConsultado[0]['pregunta_tres'];
      this.perjuicio = this.detalleobstaculoConsultado[0]['pregunta_cuatro'];
      this.categoriaBA= this.detalleobstaculoConsultado[0]['obstaculo'];
      this.ilegal = this.detalleobstaculoConsultado[0]['ilegal'];
      this.razonabilidad = this.detalleobstaculoConsultado[0]['razonabilidad'];
      this.isExterno = this.detalleobstaculoConsultado[0]['interna_externa'];
      this.nombreObstaculo = this.detalleobstaculoConsultado[0]['nombre_obstaculo'];
      this.interna_externa = this.detalleobstaculoConsultado[0]['interna_externa'];

      if(this.interna_externa == "E"){
        this.disabledExterna = false;
      }else{
        this.disabledExterna = true;
      }

      setTimeout(() => {    
        this.loading1 = false;
          this.regionNueva = String(this.detalleobstaculoConsultado[0]["id_region"]);
          this.actividadNueva = String(this.detalleobstaculoConsultado[0]["id_activ_econ"]);
          this.entidadNueva = String(this.detalleobstaculoConsultado[0]["id_entidad"]);
        }, 1500);
      
    
      this.coordinadorService.obtenerDetalleRegistro(this.id_obstaculo).subscribe(response => {
        
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

        if(this.identidad === null){
          var nuevoidentidad = 1960;
          this.coordinadorService.obtenerlistaCondicionBA(nuevoidentidad).subscribe(response => {
            this.listaCondicionBA = response;
       });
  
        }else{
         
          this.coordinadorService.obtenerlistaCondicionBA(this.identidad).subscribe(response => {
            this.listaCondicionBA = response;
       });
  
        }
        
        
   }); 
      
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
   }else if (this.detalleobstaculoConsultado[0]['id_condicion'] == 4){
    this.condicionBA = "4";
   }else{
    this.condicionBA = "6";
   }
    
    });

}


  ngOnInit() {}

  onChangeEnviar(data){
    
        if(data == "1"){
          this.enviaConsulta = false;
          this.enviarRespuesta = true;
          this.isBotonUno = false;
        }
    
        if(data == "0"){
          this.enviaConsulta = true;
          this.isBotonUno = true;
          this.enviarRespuesta = false;
        }
    
      
      }

      onChangeEnviarExterno(data){
        
            if(data == "1"){
              this.enviaConsultaExterno = false;
              this.enviarRespuestaExterno = true;
              this.isBotonUnoExterno = false;
            }
        
            if(data == "0"){
              this.enviaConsultaExterno = true;
              this.isBotonUnoExterno = true;
              this.enviarRespuestaExterno = false;
            }
        
          
          }


      public changeOfRegion(e: any) : void{
          this.selectedRegion = e.value;
    
      } 
        
      public changeOfEntidad(e: any): void {
    
          this.selectedEntidades = e.value;
    
      }
        
  
    
      public changeOfActividadEconomica(e:any) : void {
    
          this.selectedActividadEconomica = e.value;
    
      }



changeEvaluador(event: any) {

    this.selectEvaluador = event.target.value;

  
  }
 

  public validarSoloNumeros(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  
  }

  onFileChange(event) {
    this.fileEvidencia = event.target.files[0]['name'];
  
  }


  registrarRespuestaInterno(){
    
    let registro;

        if(Number(this.seleccionar) == 1){
          registro = {cod_registro: this.codigoregistro , 
            id_barrera: Number(this.idbarrera), 
            solucion: this.solucionUsuario , 
            resumen: this.resumenUsuario ,
            sustento_barrera: this.sustento, 
            sustento_condicion: this.sustentocondicion , 
             barrera_buro: Number(this.aceptarBarreraBuro), 
             barrera_admin: Number(this.aceptarBarreraAdmin) , id_condicion: Number(this.condicionBA) , tiempo_compromiso: this.tiempocompromiso , bandera: 1 , sustento_eva2: ""};
    
        }else{
          registro = {cod_registro: this.codigoregistro , 
            id_barrera: Number(this.idbarrera), 
            solucion: this.solucionUsuario , 
            resumen: this.resumenUsuario ,
            sustento_barrera: this.sustento, 
            sustento_condicion: this.sustentocondicion , 
             barrera_buro: Number(this.aceptarBarreraBuro), 
             barrera_admin: Number(this.aceptarBarreraAdmin) , id_condicion: Number(this.condicionBA)  , tiempo_compromiso: this.tiempocompromiso , bandera: 0 , sustento_eva2: this.sustentoevaluacion};
        }



          Swal({
            title: 'Desea confirmar estos datos?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, confirmar'
          }).then((result) => {

            if (result.value) {
              this.coordinadorService.registrarRegistroRespuestaInterno(registro).subscribe(response =>{

                Swal(
                  'Hecho!',
                  'Se envió la evaluación final',
                  'success'
                ).then(()=>{
                  this.router.navigate(['/coordinador']);
                });
                
              });
          
          }

        })

 
    
   }  


   registrarRespuestaExterno(){
    
    let registro;

        if(Number(this.seleccionarExterno) == 1){
          registro = {
            id_entidad: Number(this.selectedEntidades),
            id_region: Number(this.selectedRegion),
            id_activ_econ: Number(this.selectedActividadEconomica),
            pregunta_uno: this.actoEntidad,
            pregunta_dos: this.transgresion,
            pregunta_tres: this.limitalibertad,
            pregunta_cuatro: this.perjuicio,
            ilegal: this.ilegal,
            razonabilidad: this.razonabilidad,
            comentario: this.comentarioDependencia,
            id_barrera: Number(this.idbarrera), 
            solucion: this.solucionUsuario , 
            resumen: this.resumenUsuario ,
            sustento_barrera: this.sustento, 
            sustento_condicion: this.sustentocondicion , 
             barrera_buro: Number(this.aceptarBarreraBuro), 
             barrera_admin: Number(this.aceptarBarreraAdmin) , id_condicion: Number(this.condicionBA) , tiempo_compromiso: this.tiempocompromiso , bandera: 1 , sustento_eva2: ""};
    
        }else{
          registro = {
            id_entidad: Number(this.selectedEntidades),
            id_region: Number(this.selectedRegion),
            id_activ_econ: Number(this.selectedActividadEconomica),
            pregunta_uno: this.actoEntidad,
            pregunta_dos: this.transgresion,
            pregunta_tres: this.limitalibertad,
            pregunta_cuatro: this.perjuicio,
            ilegal: this.ilegal,
            razonabilidad: this.razonabilidad,
            comentario: this.comentarioDependencia,
            id_barrera: Number(this.idbarrera), 
            solucion: this.solucionUsuario , 
            resumen: this.resumenUsuario ,
            sustento_barrera: this.sustento, 
            sustento_condicion: this.sustentocondicion , 
             barrera_buro: Number(this.aceptarBarreraBuro), 
             barrera_admin: Number(this.aceptarBarreraAdmin) , id_condicion: Number(this.condicionBA) , tiempo_compromiso: this.tiempocompromiso , bandera: 0 , sustento_eva2: this.sustentoevaluacionExterno};
        }


          Swal({
            title: 'Desea confirmar estos datos?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, confirmar'
          }).then((result) => {

            if (result.value) {
              this.coordinadorService.registrarRegistroRespuestaExterno(registro).subscribe(response =>{

                Swal(
                  'Hecho!',
                  'Se envió la evaluación final',
                  'success'
                ).then(()=>{
                  this.router.navigate(['/coordinador']);
                });
                
              });
          
          }

        })

 
    
   }  



}
