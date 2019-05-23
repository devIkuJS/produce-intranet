import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsModalService,ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluadorService } from '../../services/evaluador.service';
import { Select2OptionData } from 'ng2-select2';
import {Barrera} from '../../models/barrera';
import {caracteristicaTramite} from '../../models/caracteristicaTramite';

import {Observable} from 'rxjs';

import {of} from 'rxjs/observable/of';

declare var $:any;


@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {

  public tramites: Array<Select2OptionData>;
  public optionsSelect2Tramites: Select2Options;
  public selectedTramite: string = null;
  public textoTramite: string = null;

  public gobiernos: Array<Select2OptionData>;
  public optionsSelect2Entidades: Select2Options;
  public selectedGobierno:string;

  public organos: Array<Select2OptionData>;
  public optionsSelect2Organos: Select2Options;
  public selectedOrganos: string;
  public isVisibleOrganos: Boolean;

  public condicionTramite: Array<Select2OptionData>;
  public optionsSelect2CondicionTramite: Select2Options;
  public selectedCondicionTramite:string = "";
  public textoCondicionTramite: string = "";

  public tiempoTramite: Array<Select2OptionData>;
  public optionsSelect2TiempoTramite: Select2Options;
  public selectedTiempoTramite:string = null;
  public textoTiempoTramite: string = null;

  public costoTramite: Array<Select2OptionData>;
  public optionsSelect2CostoTramite: Select2Options;
  public selectedCostoTramite:string = null;
  public textoCostoTramite: string = null;

  public requisitoTramite: Array<Select2OptionData>;
  public optionsSelect2RequisitoTramite: Select2Options;
  public selectedRequisitoTramite:string = null;
  public textoRequisitoTramite: caracteristicaTramite[] = [];


  public gestionTramite: Array<Select2OptionData>;
  public optionsSelect2GestionTramite: Select2Options;
  public selectedGestionTramite:string = null;
  public textoGestionTramite:  caracteristicaTramite[] = [];


  public otrosTramite: Array<Select2OptionData>;
  public optionsSelect2otrosTramite: Select2Options;
  public selectedOtrosTramite:string = null;
  public textoOtrosTramite:  caracteristicaTramite[] = [];


  public regiones: Array<Select2OptionData>;
  public optionsSelect2Region: Select2Options;
  public selectedRegion: string;

  public provincias: Array<Select2OptionData>;
  public optionsSelect2Provincia: Select2Options;
  public selectedProvincia: string;
  
  public distritos: Array<Select2OptionData>;
  public optionsSelect2Distrito: Select2Options;
  public selectedDistrito: string;

  public isDisabledLocation:boolean;
  public codigoregistro:String;
  public explicaciondata:String;
  public isProduceRegistro:Boolean;
  public registroAceptadoInterno:Boolean;
  public registroAceptadoExterno:Boolean;
  public isDisabledOptionsEntidad:Boolean;
  public isDisabledOptionsOrgano:Boolean;
  public isDisabledOptions:Boolean;
  public isDisabledproduce:Boolean;
  public aceptacion:String;
  public requiereData:String;
  public isRequerido:Boolean;
  public responderData:String;
  public isReponder:Boolean;
  public isExisteBarrera:Boolean;
  public mojerarData:String;
  public isMejoraData:Boolean;
  public noaceptaValidacion:Boolean;
  public isValido: Boolean;
  public noaceptaDerivacion:Boolean;
  public entidadDatanueva:String;
  public sustentonegacion:String;
  public resumenUsuarioFinal: String;
  public solucionUsuarioFinal: String;
  public consultasRegistradas: Object[];
  public campoactividadeco: string;
  public actividadeconomica: string[];
  public tipousuario: any ;
  public tipoEntidad: Boolean;
  public detalleobstaculo:any[];
  public disabled1:Boolean;
  public disabledValidacion: Boolean;
  public tramiteusuario: String;
  public entidadusuario: String;
  public organousuario:String;
  public regionusuario: String;
  public provinciausuario: String;
  public distritousuario: String;
  public disabledTramite: Boolean;
  public listaMotivosInvalidez: any[];
  public obstaculoconsulta: String;
  public derivacion:Boolean;
  public validacionnegacion: String;
  public motivosInvalidezChecked: any[];
  public idorganismodetalle: any;
  public respuestausuario:any;
  public BarreraItems: Barrera[] = [];
  public mostrarbotonGuardar: Boolean;
  public listaBarrerasAGuardar:any;
  public verEvaluacion: Boolean;
  public agregarBarrera: Boolean;
  public TablaAntesDeGuardar:Boolean;
  public TablaDespuesDeGuardar: Boolean;
  public registroSecond: any[] = [];
  public listaRespuestaFinal: any[];
  public caracteristicasTramite:Boolean;
  public cajitaDerivacion: Boolean;
  public cajitaValidez: Boolean;

  public loading1: boolean;


  constructor(private modalService: BsModalService,private evaluadorService:EvaluadorService,private activeRoute: ActivatedRoute,private router: Router) {

    this.loading1 = true;

        const routeParams = this.activeRoute.snapshot.params;
        this.isProduceRegistro = false ;
        this.consultasRegistradas = [];
        this.codigoregistro = routeParams.id;
        this.isDisabledproduce = true;
        this.tipousuario= "1";
        this.tipoEntidad = false;
        this.sustentonegacion="";
        this.disabled1 = false;
        this.isDisabledOptionsOrgano = true;
        this.requiereData = "0";
        this.obstaculoconsulta = "";
         this.derivacion = true;
        this.validacionnegacion="";
        this.motivosInvalidezChecked = [];
        this.respuestausuario = "";
        this.verEvaluacion = true;
        this.TablaAntesDeGuardar= true;
        this.agregarBarrera = true;
        this.caracteristicasTramite= true;


                          this.evaluadorService.obtenerDetalleObstaculoEvaluador(this.codigoregistro).subscribe(response =>{
                            this.loading1 = false;
                            
                                  this.detalleobstaculo = response;
                   
                            
                                  this.tramiteusuario = this.detalleobstaculo[0]['nombre_tramite'];
                                  this.explicaciondata = this.detalleobstaculo[0]['detalle_registro'];
                                  this.entidadusuario = this.detalleobstaculo[0]['nombre_entidad'];
                                  this.organousuario = this.detalleobstaculo[0]['entidad_organismo'];
                                  this.regionusuario = this.detalleobstaculo[0]['nombre_region'];
                                  this.provinciausuario = this.detalleobstaculo[0]['nombre_provincia'];
                                  this.distritousuario = this.detalleobstaculo[0]['nombre_distrito'];
                                  this.idorganismodetalle = this.detalleobstaculo[0]['id_organismo'];

                                  this.cajitaDerivacion = this.detalleobstaculo[0]["derivacion"];
                                  this.cajitaValidez =  this.detalleobstaculo[0]["validez"];
                 
                            
                                  this.isDisabledOptions = true;
                                  this.isDisabledOptionsEntidad = true;
                                  this.isDisabledLocation = true;
                                  if(this.detalleobstaculo[0]['interna_externa'] == "E"){
                                    this.isProduceRegistro = false;
                                  }else{
                                    this.isProduceRegistro = true;
                                  }

                                  if(this.cajitaValidez == true){
                                    
                                    this.derivacion=false;
                                    this.disabled1= true;
                                    this.registroAceptadoExterno = true;
                                    this.isValido= false;
                                    this.disabledValidacion= true;
                                    this.registroAceptadoInterno = true; 
                                     this.caracteristicasTramite = true;
                                    
                                  }else{

                                  }
                                                              
                              });


                              this.evaluadorService.obtenerListaMotivoInvalidez().subscribe(response =>{
                                
                                      this.listaMotivosInvalidez = response;
                                
                                    })


                                    this.optionsSelect2Tramites = { placeholder: "[ Seleccione Trámite]", width: "100%"};
                                    this.evaluadorService.obtenerTramites().subscribe( response => {
                                      var nuevoarreglotramites = [];
                                        nuevoarreglotramites.push({id: '',text: ""});
                                          for (let i = 0; i< response['length']; i++) {
                                              nuevoarreglotramites.push({id: response[i]['id_tramite'],text: response[i]['nombre_tramite']});
                                          }
                                        this.tramites = nuevoarreglotramites;
                                      });

                                      this.optionsSelect2GestionTramite = { placeholder: "[ Seleccione Gestión de Tramite]", multiple: true , width: "100%"}
                                      
                                          this.evaluadorService.obtenerListaGestionTramite().subscribe( response => {
                                            var arrayPrueba5 = [];
                                            arrayPrueba5.push({id: '',text: ""});
                                            for (let i = 0; i< response['length']; i++) {
                                              arrayPrueba5.push({
                                                                        id: response[i]['id_atributo'],
                                                                        text: response[i]['nombre_atributo']
                                                                        }); 
                                            }
                                            this.gestionTramite = arrayPrueba5;
                                          });

                                      this.optionsSelect2TiempoTramite = { placeholder: "[ Seleccione el tiempo de trámite ]", width: "100%"};
                                      
                                          this.evaluadorService.obtenerListaTiempoTramite().subscribe( response => {
                                            var arrayPrueba2 = [];
                                            arrayPrueba2.push({id: '',text: ""});
                                            for (let i = 0; i< response['length']; i++) {
                                              arrayPrueba2.push({
                                                                        id: response[i]['id_atributo'],
                                                                        text: response[i]['nombre_atributo']
                                                                        }); 
                                            }
                                            this.tiempoTramite = arrayPrueba2;
                                          });
   

                            this.optionsSelect2CondicionTramite = { placeholder: "[ Seleccione una condición de trámite ]", width: "100%"};

                            this.evaluadorService.obtenerListaCondicionTramite().subscribe( response => {
                              var arrayPrueba1 = [];
                              arrayPrueba1.push({id: '',text: ""});
                              for (let i = 0; i< response['length']; i++) {
                                arrayPrueba1.push({
                                                          id: response[i]['id_atributo'],
                                                          text: response[i]['nombre_atributo']
                                                          }); 
                              }
                              this.condicionTramite = arrayPrueba1;
                            });


                              

    
                              this.optionsSelect2CostoTramite = { placeholder: "[ Seleccione el costo de trámite ]", width: "100%"};

                              this.evaluadorService.obtenerListaCostoTramite().subscribe( response => {
                                var arrayPrueba3 = [];
                                arrayPrueba3.push({id: '',text: ""});
                                for (let i = 0; i< response['length']; i++) {
                                  arrayPrueba3.push({
                                                            id: response[i]['id_atributo'],
                                                            text: response[i]['nombre_atributo']
                                                            }); 
                                }
                                this.costoTramite = arrayPrueba3;
                              });


                              this.optionsSelect2RequisitoTramite = { placeholder: "[ Seleccione el requisito del trámite]", multiple: true , width: "100%"}


                              this.evaluadorService.obtenerListaRequisitoTramite().subscribe( response => {
                                var arrayPrueba4 = [];
                                arrayPrueba4.push({id: '',text: ""});
                                for (let i = 0; i< response['length']; i++) {
                                  arrayPrueba4.push({
                                                            id: response[i]['id_atributo'],
                                                            text: response[i]['nombre_atributo']
                                                            }); 
                                }
                                this.requisitoTramite = arrayPrueba4;
                              });


                                
                                

                                    this.optionsSelect2otrosTramite = { placeholder: "[ Seleccione Otros]", multiple: true , width: "100%"}

                                    this.evaluadorService.obtenerListaOtrosTramite().subscribe( response => {
                                      var arrayPrueba6 = [];
                                      arrayPrueba6.push({id: '',text: ""});
                                      for (let i = 0; i< response['length']; i++) {
                                        arrayPrueba6.push({
                                                                  id: response[i]['id_atributo'],
                                                                  text: response[i]['nombre_atributo']
                                                                  }); 
                                      }
                                      this.otrosTramite = arrayPrueba6;
                                    });

    
                                  
                                      this.evaluadorService.obtenerActividadEconomica().subscribe( response => {
                                        var arreconomica = [];
                                            for (let i = 0; i< response['length']; i++) {
                                            arreconomica.push(response[i]['nombre_actividad']);
                                            }
                                          this.actividadeconomica = arreconomica;
                                        });


                                      this.evaluadorService.obtenerEntidades().subscribe(response =>{
                                        var arrayAuxReg = [];
                                          arrayAuxReg.push({id: '',text: ""});
                                          for (let index = 0; index < response['length']; index++) {
                                                          arrayAuxReg.push({
                                                                      id: response[index]['id_entidad'],
                                                                    text: response[index]['nombre_entidad']
                                                        });
                                                if(arrayAuxReg[index].id == 1694){
                                                      arrayAuxReg.splice(index,1);
                                                }
                                          }
                                              this.gobiernos = arrayAuxReg;
                                      }); 




                     

}

ngOnInit() { 
 

}

            public isString (value) {
              return typeof value === 'string' || value instanceof String;
              }

              public listaTiempoTramite

            public changeOfEntidad(e: any): void {
              this.selectedGobierno = e.value; 
            }


            public changeOfTramites(e: any): void {
                this.selectedTramite = e.value;
                this.textoTramite = e.data[0].text;

            }

 /******************************NO ACEPTA OBSTACULO *****************************************/

              enviarDerivacionCancelada(){
            
                if(this.sustentonegacion.length == 0){
                        
                      Swal({
                            type: 'error',
                            title: 'Ingrese el sustento por la cual no acepto la derivación '
                            })
                            
                        return false;
                        
                  }else{
                
                        Swal({
                        title: 'Desea confirmar estos datos?',
                        text: "Esta operación no se podra revertir",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, enviar'
                        }).then((result) => {
                      
                            if (result.value) {
                            this.evaluadorService.obtenerCambioNegacionEvaluador(this.sustentonegacion,this.codigoregistro).subscribe(response =>{
                      
                                  Swal(
                                    'Hecho!',
                                    'Se envió la respuesta',
                                    'success'
                                  ).then(()=>{
                                    this.router.navigate(['/evaluador']);
                                  });
                                        
                              });
                                
                            }
                      
                        })
                
                  return true
                }

            }
  /******************************ACEPTA OBSTACULO *****************************************/

              onChangeRadioConfirmar(data){

                            if(data == "1"){
                              this.noaceptaDerivacion = false;
                                  Swal({
                                      title: 'Desea aceptar la derivacion del registro?',
                                      text: "Esta operación no se podra revertir",
                                      type: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Si, aceptar'
                                    }).then((result) => {
                                                if (result.value) {
                                                Swal(
                                                    'Hecho!',
                                                    'Se ha aceptado el registro',
                                                    'success'
                                                  ).then(()=>{
                                                    this.derivacion=false;
                                                    this.disabled1= true;
                                                    this.registroAceptadoExterno = true;
                                                    this.isValido= true;
                                                    
                                                  });  
                                                }else {
                                                  this.aceptacion = null;
                                                }
                                          })  

                                    }
                            if(data == "0"){
                              this.isRequerido=false;
                              this.isExisteBarrera=false;
                              this.isMejoraData= false;
                              this.isReponder=false;
                              this.noaceptaDerivacion = true;
                              this.isValido=false;

                              
                            }
  
              }

              onChangeRadioValidar(data){

                            if(data == "1"){
                
                                  this.noaceptaValidacion = false;

                                    Swal({
                                      title: 'El registro es válido?',
                                      text: "Esta acción no se podra revertir",
                                      type: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Si'
                                    }).then((result) => {
                                                if (result.value) {
                                                  this.disabledValidacion= true;
                                                  this.registroAceptadoInterno = true; 
                                                  this.evaluadorService.aceptarValidez(this.codigoregistro).subscribe(response =>{
                                                 

                                                    });
                                                }else {
                                                  this.aceptacion = null;
                                                }
                                          })  
                                        }
                                if(data == "0"){
                                  this.noaceptaValidacion = true;
                                this.registroAceptadoInterno = false;
                                } 
                  }

                  onChangerequiere(data){
                      if(data == "1"){
                        this.isRequerido = true;
                        this.caracteristicasTramite = false;
                      }

                      if(data == "0"){
                        this.isRequerido = false;
                        this.caracteristicasTramite = true;
                      }
                  }

   /**enviar INFO de REQUIERE MAYOR INFORMACION */

                public changeOfOrganos(e: any): void {
    
                  this.selectedOrganos = e.value;

                }

                enviarINFOMayorInformacion(){

                  let resultado;

                  if(this.idorganismodetalle === null){
                    this.idorganismodetalle = 0;
                  }

                  if(this.detalleobstaculo[0]['interna_externa'] == "E"){
                    resultado = {destinatario:Number(this.tipousuario) , codigo_registro:this.codigoregistro , 
                     consulta: this.obstaculoconsulta , id_organismo: 0 , id_barrera: 0 ,
                     id_region: 0 , id_activ_econ: 0 , pregunta_uno: "" , pregunta_dos: "" , pregunta_tres:"" , pregunta_cuatro: "",
                     ilegal: "" , razonabilidad: "" , bandera: 0,
                     id_consulta: 0};
                 }else{
                   resultado = {destinatario:Number(this.tipousuario) , codigo_registro:this.codigoregistro , 
                     consulta: this.obstaculoconsulta , id_organismo: this.idorganismodetalle , id_barrera: 0 ,
                     id_region: 0 , id_activ_econ: 0 , pregunta_uno: "" , pregunta_dos: "" , pregunta_tres:"" , pregunta_cuatro: "",
                     ilegal: "" , razonabilidad: "" , bandera: 0,
                     id_consulta: 0};
                 }
                 
             
                  if(this.obstaculoconsulta.length ==0){

                    Swal({
                      type: 'error',
                      title: 'Ingrese la consulta al usuario '
                      })
                      
                  return false;

                  }else{

                    Swal({
                      title: 'Desea registrar esta acción?',
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Si, enviar'
                    }).then((result) => {


                  if (result.value) {

                           this.evaluadorService.registrarFormulario1(resultado).subscribe(response => {
                                  Swal(
                                    'Hecho!',
                                    ' ',
                                    'success'
                                  ).then(()=>{
                                    this.router.navigate(['/evaluador']);
                                  });
                            
                                });
                            
                          
                             
                
                      }

                })

                  }

                      
        }

                  onCheckboxChange(option, event) {
                          var index = this.motivosInvalidezChecked.indexOf(option);
                          if(event.target.checked) {
                            if(index === -1) {
                              this.motivosInvalidezChecked.push(option);
                            }
                          } else {
                            if(index !== -1) {
                              this.motivosInvalidezChecked.splice(index, 1);
                            }
                          }
                  }

                      enviarValidacionCancelada(){

                            if(this.validacionnegacion.length == 0){
                              
                              Swal({
                                    type: 'error',
                                    title: 'Ingrese el sustento por la cual no es válido el registro '
                                    })
                                    
                                return false;
                              
                        }else{


                              Swal({
                                title: 'Desea registrar esta acción?',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, enviar'
                              }).then((result) => {


                            if (result.value) {
                                  for( var i=0; i<this.motivosInvalidezChecked.length;i++){

                               
                                    
                                      
                                          let resultado = {dato_sustento: this.validacionnegacion , cod_registro:this.codigoregistro, id_invalido : this.motivosInvalidezChecked[i]['id_invalido'] , solucion: this.respuestausuario};
                                          this.evaluadorService.obtenerNegacionValidezEvaluador(resultado).subscribe(response =>{
                                            Swal(
                                              'Hecho!',
                                              ' ',
                                              'success'
                                            ).then(()=>{
                                              this.router.navigate(['/evaluador']);
                                            });
                                      
                                          });
                                      
                                    
                                        }
                          
                                }

                          })

                      }

                  }

                  public changeOfCondicionTramite(e: any): void {
                    
                    this.selectedCondicionTramite = e.value;

                    this.textoCondicionTramite =  e.data[0]["text"];

                  }

                  public changeOfTiempoTramite(e: any): void {

                    this.selectedTiempoTramite = e.value;

                    this.textoTiempoTramite =  e.data[0]["text"];

                  }

                  public changeOfCostoTramite(e: any): void {
                    
                    this.selectedCostoTramite = e.value;

                    this.textoCostoTramite =  e.data[0]["text"];
                  }

                  public changeOfRequisitoTramite(e: any): void {
                    
                    this.selectedRequisitoTramite = e.value;


                    var arrayRequisitoTramite = [];
                    for (let i = 0; i< e.data['length']; i++) {

                             if(e.data[i]['text'] !== undefined || e.data[i]['text'] !== "" ){
                                  
                              arrayRequisitoTramite.push({
                                text: e.data[i]['text']
                                });

                             }
                                               

                    }
                    this.textoRequisitoTramite = arrayRequisitoTramite;
                    
                  }

                  public changeOfGestionTramite(e: any): void {

                    this.selectedGestionTramite = e.value;


                    var arrayGestionTramite = [];
                    for (let i = 0; i< e.data['length']; i++) {

                      if(e.data[i]['text'] !== undefined || e.data[i]['text'] !== "" ){

                        arrayGestionTramite.push({
                          text: e.data[i]['text']
                          });

                      }

                                                
                                                  

                    }
                    this.textoGestionTramite = arrayGestionTramite;
                  }

                  public changeOfOtrosTramite(e: any): void {
                    
                    this.selectedOtrosTramite = e.value;

                    var arrayOtrosTramite = [];
                    for (let i = 0; i< e.data['length']; i++) {

                      if(e.data[i]['text'] !== undefined || e.data[i]['text'] !== "" ){

                        arrayOtrosTramite.push({
                          text: e.data[i]['text']
                          });

                      }

                                               

                    }
                    this.textoOtrosTramite = arrayOtrosTramite;
                  }
               
                public addToBarrera(barrera:Barrera){

                  let nuevoArreglo = [];

                 
                                
                  if(this.selectedTramite == ''){

                    Swal({
                      title: "Alerta",
                      text: "Seleccione un trámite",
                      type: "warning"
                    })
  
                    return false;

        


                 }else if((this.selectedCondicionTramite != null || this.selectedCondicionTramite != '') && (this.selectedTiempoTramite == null || this.selectedTiempoTramite == '') && (this.selectedCostoTramite == null || this.selectedCostoTramite == '')  && (this.selectedRequisitoTramite == null || this.selectedRequisitoTramite["length"] == 0) && (this.selectedGestionTramite == null || this.selectedGestionTramite["length"] == 0) && (this.selectedOtrosTramite == null || this.selectedOtrosTramite["length"] == 0) ){

                  Swal({
                    title: "Alerta",
                    text: "Seleccione una característica de tramite",
                    type: "warning"
                  })

                  return false; 

                  

                 }else{

                  this.mostrarbotonGuardar = true;

                if(this.textoTiempoTramite != null && this.textoTiempoTramite.trim().length > 0){
                    nuevoArreglo.push({count: nuevoArreglo.length+1,id:this.selectedTiempoTramite , tramite : this.textoTiempoTramite + " " + this.textoCondicionTramite  });
                }

                if(this.textoCostoTramite != null && this.textoCostoTramite.trim().length > 0 ){
                    nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedCostoTramite , tramite : this.textoCostoTramite + " " + this.textoCondicionTramite });
                }
                
                if(this.textoRequisitoTramite != null){

                  for(var i=0; i<this.textoRequisitoTramite.length;i++){
                    nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedRequisitoTramite[i] , tramite : this.textoRequisitoTramite[i]["text"]  + " " + this.textoCondicionTramite });
                  }
                }
                if(this.textoGestionTramite != null){
                  for(var i=0; i<this.textoGestionTramite.length;i++){
                    nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedGestionTramite[i] , tramite : this.textoGestionTramite[i]["text"] + " " + this.textoCondicionTramite });
                  }
                }
                if(this.textoOtrosTramite != null){
                  for(var i=0; i<this.textoOtrosTramite.length;i++){
                    nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedOtrosTramite[i] , tramite : this.textoOtrosTramite[i]["text"] + " " + this.textoCondicionTramite });
                  }
                }
              

                barrera = {idtramite: this.selectedTramite , descripcionTramite: this.textoTramite,
               obstaculoTramite: nuevoArreglo
                };

                this.registroSecond.push(barrera);

                this.evaluadorService.agregarBarrera(barrera);


                this.selectedTramite = '';
                this.tramites = [];

                this.optionsSelect2Tramites = { placeholder: "[ Seleccione Trámite]", width: "100%"};
                this.evaluadorService.obtenerTramites().subscribe( response => {
                  var nuevoarreglotramites = [];
                    nuevoarreglotramites.push({id: '',text: ""});
                      for (let i = 0; i< response['length']; i++) {
                          nuevoarreglotramites.push({id: response[i]['id_tramite'],text: response[i]['nombre_tramite']});
                      }
                    this.tramites = nuevoarreglotramites;
                  });



                  this.selectedCondicionTramite = '';
                  this.condicionTramite = [];

                  this.optionsSelect2CondicionTramite = { placeholder: "[ Seleccione una condición de trámite ]", width: "100%"};
  
      this.evaluadorService.obtenerListaCondicionTramite().subscribe( response => {
        var arrayPrueba1 = [];
        arrayPrueba1.push({id: '',text: ""});
        for (let i = 0; i< response['length']; i++) {
          arrayPrueba1.push({
                                    id: response[i]['id_atributo'],
                                    text: response[i]['nombre_atributo']
                                    }); 
        }
        this.condicionTramite = arrayPrueba1;
      });
  
                      this.selectedTiempoTramite = '';
                      this.tiempoTramite = [];

                      this.optionsSelect2TiempoTramite = { placeholder: "[ Seleccione el tiempo de trámite ]", width: "100%"};
                      
                          this.evaluadorService.obtenerListaTiempoTramite().subscribe( response => {
                            var arrayPrueba2 = [];
                            arrayPrueba2.push({id: '',text: ""});
                            for (let i = 0; i< response['length']; i++) {
                              arrayPrueba2.push({
                                                        id: response[i]['id_atributo'],
                                                        text: response[i]['nombre_atributo']
                                                        }); 
                            }
                            this.tiempoTramite = arrayPrueba2;
                          });

                          this.selectedCostoTramite = '';
                          this.costoTramite = [];

                          this.optionsSelect2CostoTramite = { placeholder: "[ Seleccione el costo de trámite ]", width: "100%"};
                          
                           this.evaluadorService.obtenerListaCostoTramite().subscribe( response => {
                              var arrayPrueba3 = [];
                              arrayPrueba3.push({id: '',text: ""});
                              for (let i = 0; i< response['length']; i++) {
                                 arrayPrueba3.push({
                                                      id: response[i]['id_atributo'],
                                                      text: response[i]['nombre_atributo']
                                                      }); 
                               }
                               this.costoTramite = arrayPrueba3;
                          });

                          this.selectedRequisitoTramite = '';
                          this.requisitoTramite = [];

                          this.optionsSelect2RequisitoTramite = { placeholder: "[ Seleccione el requisito del trámite]", multiple: true , width: "100%"}
                          
                          
                             this.evaluadorService.obtenerListaRequisitoTramite().subscribe( response => {
                                var arrayPrueba4 = [];
                                 arrayPrueba4.push({id: '',text: ""});
                                 for (let i = 0; i< response['length']; i++) {
                                  arrayPrueba4.push({
                                                     id: response[i]['id_atributo'],
                                                     text: response[i]['nombre_atributo']
                                  }); 
                               }
                             this.requisitoTramite = arrayPrueba4;
                            });

                            this.selectedGestionTramite = '';
                            this.gestionTramite = []; 

                            this.optionsSelect2GestionTramite = { placeholder: "[ Seleccione Gestión de Tramite]", multiple: true , width: "100%"}
                            
                                this.evaluadorService.obtenerListaGestionTramite().subscribe( response => {
                                  var arrayPrueba5 = [];
                                  arrayPrueba5.push({id: '',text: ""});
                                  for (let i = 0; i< response['length']; i++) {
                                    arrayPrueba5.push({
                                                              id: response[i]['id_atributo'],
                                                              text: response[i]['nombre_atributo']
                                                              }); 
                                  }
                                  this.gestionTramite = arrayPrueba5;
                                });

                                this.selectedOtrosTramite = '';
                                this.otrosTramite = [];


                                this.optionsSelect2otrosTramite = { placeholder: "[ Seleccione Otros]", multiple: true , width: "100%"}
                                
                                    this.evaluadorService.obtenerListaOtrosTramite().subscribe( response => {
                                      var arrayPrueba6 = [];
                                     arrayPrueba6.push({id: '',text: ""});
                                      for (let i = 0; i< response['length']; i++) {
                                           arrayPrueba6.push({
                                                              id: response[i]['id_atributo'],
                                                             text: response[i]['nombre_atributo']
                                         }); 
                                       }
                                       this.otrosTramite = arrayPrueba6;
                                      });



                  
                   return true;
                  

                 }
                 
                }

                    eliminarCelda(idtramite , idobstaculo){

                      for(var i=0; i<this.registroSecond.length;i++){

                        if(typeof(this.registroSecond[i]["obstaculoTramite"]) !== undefined){

                        for(var j=0; j< this.registroSecond[i]["obstaculoTramite"].length;j++){
                          if(this.registroSecond[i]["obstaculoTramite"][j].id == idobstaculo && this.registroSecond[i]["idtramite"] == idtramite){

                            this.registroSecond[i]["obstaculoTramite"].splice(j , 1);

                            if(this.registroSecond[i]["obstaculoTramite"].length == 0){


                              this.registroSecond.splice(i,1);

                            }
                            

                          }

                        }
                      }

                      }

                    }

                registrarBarreras(){
                 
                     this.listaBarrerasAGuardar = this.registroSecond;

                          this.agregarBarrera= false;
                  
                          this.mostrarbotonGuardar= false;

                          let codigoCorrelativo = "";
                  
                          let codigoAtributo = [];
                  
                          let listaDeAtributos={};
                  
                          let registroBarreraFinal = {};

                          let nombreObstaculo = "";

                          Swal({
                            title: 'Desea guardar estos datos?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, confirmar'
                          }).then((result) => {


                          for(var i=0;i<this.listaBarrerasAGuardar.length;i++){

                            var obstaculoTramite = this.listaBarrerasAGuardar[i]["obstaculoTramite"];

                            for(var j=0;j<obstaculoTramite.length;j++){
                              codigoCorrelativo = this.codigoregistro + '' +(i+1) + obstaculoTramite[j]["count"];
                              codigoAtributo =  obstaculoTramite[j]["id"];
                              nombreObstaculo =  obstaculoTramite[j]["tramite"] + " "+ this.listaBarrerasAGuardar[i]["descripcionTramite"];

                              registroBarreraFinal = {id_atributo : Number(codigoAtributo) , codigo_registro: this.codigoregistro ,
                              correlativo_tramite: Number(i+1), codigo_obstaculo: codigoCorrelativo,
                               id_tramite: Number(this.listaBarrerasAGuardar[i]["idtramite"]) , nombre_obs: nombreObstaculo }


                               if (result.value) {
                                this.evaluadorService.registrarBarrera(registroBarreraFinal).subscribe(response =>{
                                this.listaRespuestaFinal = JSON.parse(response);
            
                                Swal(
                                  'Hecho!',
                                  'Se guardo los datos',
                                  'success'
                                ).then(()=>{
                                  this.TablaDespuesDeGuardar = true;
                                  this.TablaAntesDeGuardar = false;
                                  this.caracteristicasTramite=false;

                                 this.router.navigate(['/evaluador']);

                                });
                              });
                            }else if (result.dismiss === Swal.DismissReason.cancel) {
                            
                              this.mostrarbotonGuardar= true;
                              return false;
                            }

                              
                            }
                            
                          }

                        });
                      }
                    }
                  
                        
                      
                       

