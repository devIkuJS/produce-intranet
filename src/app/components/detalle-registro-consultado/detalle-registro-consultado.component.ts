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
  selector: 'app-detalle-registro-consultado',
  templateUrl: './detalle-registro-consultado.component.html',
  styleUrls: ['./detalle-registro-consultado.component.css']
})
export class DetalleRegistroConsultadoComponent implements OnInit {

  public tramites1: Array<Select2OptionData>;
  public optionsSelect2Tramites1: Select2Options;
  public selectedTramite1:  string = null;
  public textoTramite1: string = null;

  public gobiernos: Array<Select2OptionData>;
  public optionsSelect2Entidades: Select2Options;
  public selectedGobierno:string;

  public organos: Array<Select2OptionData>;
  public optionsSelect2Organos: Select2Options;
  public selectedOrganos: string;
  public isVisibleOrganos: Boolean;

  public condicionTramite1: Array<Select2OptionData>;
  public optionsSelect2CondicionTramite1: Select2Options;
  public selectedCondicionTramite1:string = "";
  public textoCondicionTramite1: string = "";

  public tiempoTramite1: Array<Select2OptionData>;
  public optionsSelect2TiempoTramite1: Select2Options;
  public selectedTiempoTramite1:string = null;
  public textoTiempoTramite1: string = null;

  public costoTramite1: Array<Select2OptionData>;
  public optionsSelect2CostoTramite1: Select2Options;
  public selectedCostoTramite1:string = null;
  public textoCostoTramite1: string = null;

  public requisitoTramite1: Array<Select2OptionData>;
  public optionsSelect2RequisitoTramite1: Select2Options;
  public selectedRequisitoTramite1:string = null;
  public textoRequisitoTramite1: caracteristicaTramite[]= [];

  public gestionTramite1: Array<Select2OptionData>;
  public optionsSelect2GestionTramite1: Select2Options;
  public selectedGestionTramite1:string = null;
  public textoGestionTramite1:  caracteristicaTramite[] = [];

  public otrosTramite1: Array<Select2OptionData>;
  public optionsSelect2otrosTramite1: Select2Options;
  public selectedOtrosTramite1:string = null;
  public textoOtrosTramite1:  caracteristicaTramite[] = [];

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
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public organoData:String;
  
  public registroAceptadoInterno:Boolean;
  public registroAceptadoExterno:Boolean;
  public tramitedatanueva:String;

  public isDisabledOptionsEntidad:Boolean;
  public isDisabledOptionsOrgano:Boolean;
  public isDisabledOptions:Boolean;
  public isDisabledproduce:Boolean;

  public regionData:String;
  public provinciaData:String;

  public aceptacion:String;
  public requiereData:String;
  public isRequerido:Boolean;
  public responderData:String;
  public isReponder:Boolean;
  public existebarrera:String;
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
  public arregloproduce: any[];
  public tipousuario: any ;
  public tipoEntidad: Boolean;
  public detalleobstaculo:any[];
  public arregloMayorInfo: any[];
  public disabled1:Boolean;
  public ubigeoSelected: Boolean;
  public idDistritoEntidadSelected: String;
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
  public mostrarbotonGuardar: Boolean;
  public listaBarrerasAGuardar:any;
  public verEvaluacion: Boolean;
  public agregarBarrera: Boolean;
  public TablaAntesDeGuardar:Boolean;
  public TablaDespuesDeGuardar: Boolean;
  public detalleobstaculoConsultado: any[];
  public nombreEntidad: String;
  public region: String;
  public provincia: String;
  public distrito: String;
  public consultaUsuario: any;
  public respuestaUsuario: any;
  public registroSecond: any[] = [];
  public listaRespuestaFinal: any[];
  public caracteristicasTramite:Boolean;

  public loading1: boolean;
    

 constructor(private modalService: BsModalService,private evaluadorService:EvaluadorService,private activeRoute: ActivatedRoute,private router: Router) { 

  this.loading1 = true;

  const routeParams = this.activeRoute.snapshot.params;
  this.isProduceRegistro = false ;
  this.consultasRegistradas = [];
  this.codigoregistro = routeParams.id;

  this.arregloproduce = [];
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


  this.optionsSelect2CondicionTramite1 = { placeholder: "[ Seleccione una condición de trámite ]", width: "100%"};
  
      this.evaluadorService.obtenerListaCondicionTramite().subscribe( response => {
        var arrayPrueba1 = [];
        arrayPrueba1.push({id: '',text: ""});
        for (let i = 0; i< response['length']; i++) {
          arrayPrueba1.push({
                                    id: response[i]['id_atributo'],
                                    text: response[i]['nombre_atributo']
                                    }); 
        }
        this.condicionTramite1 = arrayPrueba1;
      });
  
  
      this.optionsSelect2TiempoTramite1 = { placeholder: "[ Seleccione el tiempo de trámite ]", width: "100%"};
  
      this.evaluadorService.obtenerListaTiempoTramite().subscribe( response => {
        var arrayPrueba2 = [];
        arrayPrueba2.push({id: '',text: ""});
        for (let i = 0; i< response['length']; i++) {
          arrayPrueba2.push({
                                    id: response[i]['id_atributo'],
                                    text: response[i]['nombre_atributo']
                                    }); 
        }
        this.tiempoTramite1 = arrayPrueba2;
      });
  
      
      this.optionsSelect2CostoTramite1 = { placeholder: "[ Seleccione el costo de trámite ]", width: "100%"};
  
      this.evaluadorService.obtenerListaCostoTramite().subscribe( response => {
        var arrayPrueba3 = [];
        arrayPrueba3.push({id: '',text: ""});
        for (let i = 0; i< response['length']; i++) {
          arrayPrueba3.push({
                                    id: response[i]['id_atributo'],
                                    text: response[i]['nombre_atributo']
                                    }); 
        }
        this.costoTramite1 = arrayPrueba3;
      });
  
  
      this.optionsSelect2RequisitoTramite1 = { placeholder: "[ Seleccione el requisito del trámite]", multiple: true , width: "100%"}
  
  
      this.evaluadorService.obtenerListaRequisitoTramite().subscribe( response => {
        var arrayPrueba4 = [];
        arrayPrueba4.push({id: '',text: ""});
        for (let i = 0; i< response['length']; i++) {
          arrayPrueba4.push({
                                    id: response[i]['id_atributo'],
                                    text: response[i]['nombre_atributo']
                                    }); 
        }
        this.requisitoTramite1 = arrayPrueba4;
      });
  
  
      this.optionsSelect2GestionTramite1 = { placeholder: "[ Seleccione Gestión de Tramite]", multiple: true , width: "100%"}
      
          this.evaluadorService.obtenerListaGestionTramite().subscribe( response => {
            var arrayPrueba5 = [];
            arrayPrueba5.push({id: '',text: ""});
            for (let i = 0; i< response['length']; i++) {
              arrayPrueba5.push({
                                        id: response[i]['id_atributo'],
                                        text: response[i]['nombre_atributo']
                                        }); 
            }
            this.gestionTramite1 = arrayPrueba5;
          });
      
  
      
      this.optionsSelect2otrosTramite1 = { placeholder: "[ Seleccione Otros]", multiple: true , width: "100%"}
  
      this.evaluadorService.obtenerListaOtrosTramite().subscribe( response => {
        var arrayPrueba6 = [];
        arrayPrueba6.push({id: '',text: ""});
        for (let i = 0; i< response['length']; i++) {
          arrayPrueba6.push({
                                    id: response[i]['id_atributo'],
                                    text: response[i]['nombre_atributo']
                                    }); 
        }
        this.otrosTramite1 = arrayPrueba6;
      });
  
      
  
  
  
   this.optionsSelect2Tramites1 = { placeholder: "[ Seleccione Trámite]", width: "100%"};
      this.evaluadorService.obtenerTramites().subscribe( response => {
        var nuevoarreglotramites = [];
          nuevoarreglotramites.push({id: '',text: ""});
            for (let i = 0; i< response['length']; i++) {
                nuevoarreglotramites.push({id: response[i]['id_tramite'],text: response[i]['nombre_tramite']});
            }
          this.tramites1 = nuevoarreglotramites;
        });
  
      
   
      this.evaluadorService.obtenerActividadEconomica().subscribe( response => {
        var arreconomica = [];
            for (let i = 0; i< response['length']; i++) {
             arreconomica.push(response[i]['nombre_actividad']);
            }
          this.actividadeconomica = arreconomica;
        });





this.evaluadorService.obtenerDetalleRegistroEvaluadorFASE3(this.codigoregistro).subscribe(response =>{
  this.loading1 = false;
  this.detalleobstaculoConsultado= response;

  this.codigoregistro = this.detalleobstaculoConsultado[0]["codigo_registro"];
  this.tramiteusuario = this.detalleobstaculoConsultado[0]["nombre_tramite"];
  this.explicaciondata = this.detalleobstaculoConsultado[0]["detalle_registro"];
  this.nombreEntidad = this.detalleobstaculoConsultado[0]["nombre_entidad"];
  this.region = this.detalleobstaculoConsultado[0]["nombre_region"];
  this.provincia = this.detalleobstaculoConsultado[0]["nombre_provincia"];
  this.distrito = this.detalleobstaculoConsultado[0]["nombre_distrito"];
  if(this.detalleobstaculoConsultado[0]["destinatario"] == true){
    this.tipousuario = "1";
  }
  this.consultaUsuario = this.detalleobstaculoConsultado[0]["consulta"];
  this.respuestaUsuario = this.detalleobstaculoConsultado[0]["respuesta"];

  if(this.detalleobstaculoConsultado[0]["id_fase"] == 9 || this.detalleobstaculoConsultado[0]["id_fase"] == 5){
    this.caracteristicasTramite = false;
  }else{
    this.caracteristicasTramite = true;
  }


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
}) 






   }

  ngOnInit() {
    localStorage.removeItem("lista");
  }

  public changeOfTramites(e: any): void {
    this.selectedTramite1 = e.value;
    this.textoTramite1 = e.data[0].text;

}


public changeOfEntidad(e: any): void {

   this.selectedGobierno = e.value;

         
  }

  public changeOfCondicionTramite(e: any): void {
    
    this.selectedCondicionTramite1 = e.value;

    this.textoCondicionTramite1 = e.data[0]["text"];

  }

  public changeOfTiempoTramite(e: any): void {

    this.selectedTiempoTramite1 = e.value;

    this.textoTiempoTramite1 = e.data[0]["text"];

  }

  public changeOfCostoTramite(e: any): void {
    
    this.selectedCostoTramite1 = e.value;

    this.textoCostoTramite1 = e.data[0]["text"];

    
  }

  public changeOfRequisitoTramite(e: any): void {
    
    this.selectedRequisitoTramite1 = e.value;

    var arrayRequisitoTramite = [];
    for (let i = 0; i< e.data['length']; i++) {

             if(e.data[i]['text'] !== undefined || e.data[i]['text'] !== "" ){
                  
              arrayRequisitoTramite.push({
                text: e.data[i]['text']
                });

             }
                               
    }
    this.textoRequisitoTramite1 = arrayRequisitoTramite;
    
  }

  public changeOfGestionTramite(e: any): void {

    this.selectedGestionTramite1 = e.value;

    var arrayGestionTramite = [];
    for (let i = 0; i< e.data['length']; i++) {

      if(e.data[i]['text'] !== undefined || e.data[i]['text'] !== "" ){

        arrayGestionTramite.push({
          text: e.data[i]['text']
          });

      }

    }
    this.textoGestionTramite1 = arrayGestionTramite;
  }

  public changeOfOtrosTramite(e: any): void {
    
    this.selectedOtrosTramite1 = e.value;

    var arrayOtrosTramite = [];
    for (let i = 0; i< e.data['length']; i++) {

      if(e.data[i]['text'] !== undefined || e.data[i]['text'] !== "" ){

        arrayOtrosTramite.push({
          text: e.data[i]['text']
          });

      }

                               

    }
    this.textoOtrosTramite1 = arrayOtrosTramite;
  }

  public addToBarrera1(barrera1:Barrera){
    
                      let nuevoArreglo = [];

                      if(this.selectedTramite1 == ''){
                        
                        Swal({
                              title: "Alerta",
                              text: "Seleccione un trámite",
                              type: "warning"
                        })
                          
                         return false;
                        
                        }else if((this.selectedCondicionTramite1 != null || this.selectedCondicionTramite1 != '') && (this.selectedTiempoTramite1 == null || this.selectedTiempoTramite1 == '') && (this.selectedCostoTramite1 == null || this.selectedCostoTramite1 == '')  && (this.selectedRequisitoTramite1 == null || this.selectedRequisitoTramite1["length"] == 0) && (this.selectedGestionTramite1 == null || this.selectedGestionTramite1["length"] == 0) && (this.selectedOtrosTramite1 == null || this.selectedOtrosTramite1["length"] == 0) ){
                        
                         Swal({
                          title: "Alerta",
                           text: "Seleccione una característica de tramite",
                           type: "warning"
                          })
                        
                         return false; 
                        
                                          
                          }else{

                        this.mostrarbotonGuardar = true;
                                          
                                            
                             if(this.textoTiempoTramite1 != null && this.textoTiempoTramite1.trim().length > 0){
                               nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedTiempoTramite1 , tramite : this.textoTiempoTramite1 + " " + this.textoCondicionTramite1});
                              }
                              if(this.textoCostoTramite1 != null && this.textoCostoTramite1.trim().length > 0){
                               nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedCostoTramite1 , tramite :  this.textoCostoTramite1 + " "+ this.textoCondicionTramite1});
                              }
                              if(this.textoRequisitoTramite1 != null){
                                for(var i=0; i<this.textoRequisitoTramite1.length;i++){
                                    nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedRequisitoTramite1[i] , tramite : this.textoRequisitoTramite1[i]["text"] + " " + this.textoCondicionTramite1});
                                  }
                                }
                                 if(this.textoGestionTramite1 != null){
                                  for(var i=0; i<this.textoGestionTramite1.length;i++){
                                  nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedGestionTramite1[i] , tramite : this.textoGestionTramite1[i]["text"] + " " + this.textoCondicionTramite1});
                                   }
                                  }
                                  if(this.textoOtrosTramite1 != null){
                                     for(var i=0; i<this.textoOtrosTramite1.length;i++){
                                    nuevoArreglo.push({count: nuevoArreglo.length+1,id: this.selectedOtrosTramite1[i] , tramite : this.textoOtrosTramite1[i]["text"] + " " + this.textoCondicionTramite1});
                                     }
                                  }
                                          
                                   barrera1 = {idtramite: this.selectedTramite1 , descripcionTramite: this.textoTramite1,obstaculoTramite: nuevoArreglo};
                                              
                                   this.registroSecond.push(barrera1);
                                                  
                                     this.evaluadorService.agregarBarrera1(barrera1);


                                     this.selectedTramite1 = '';
                                     this.tramites1 = [];
                     
                                     this.optionsSelect2Tramites1 = { placeholder: "[ Seleccione Trámite]", width: "100%"};
                                     this.evaluadorService.obtenerTramites().subscribe( response => {
                                       var nuevoarreglotramites = [];
                                         nuevoarreglotramites.push({id: '',text: ""});
                                           for (let i = 0; i< response['length']; i++) {
                                               nuevoarreglotramites.push({id: response[i]['id_tramite'],text: response[i]['nombre_tramite']});
                                           }
                                         this.tramites1 = nuevoarreglotramites;
                                       });
                     
                     
                     
                                       this.selectedCondicionTramite1 = '';
                                       this.condicionTramite1 = [];
                     
                                       this.optionsSelect2CondicionTramite1 = { placeholder: "[ Seleccione una condición de trámite ]", width: "100%"};
                       
                           this.evaluadorService.obtenerListaCondicionTramite().subscribe( response => {
                             var arrayPrueba1 = [];
                             arrayPrueba1.push({id: '',text: ""});
                             for (let i = 0; i< response['length']; i++) {
                               arrayPrueba1.push({
                                                         id: response[i]['id_atributo'],
                                                         text: response[i]['nombre_atributo']
                                                         }); 
                             }
                             this.condicionTramite1 = arrayPrueba1;
                           });
                       
                     
                     
                                           this.selectedTiempoTramite1 = '';
                                           this.tiempoTramite1 = [];
                     
                     
                                           this.optionsSelect2TiempoTramite1 = { placeholder: "[ Seleccione el tiempo de trámite ]", width: "100%"};
                                           
                                               this.evaluadorService.obtenerListaTiempoTramite().subscribe( response => {
                                                 var arrayPrueba2 = [];
                                                 arrayPrueba2.push({id: '',text: ""});
                                                 for (let i = 0; i< response['length']; i++) {
                                                   arrayPrueba2.push({
                                                                             id: response[i]['id_atributo'],
                                                                             text: response[i]['nombre_atributo']
                                                                             }); 
                                                 }
                                                 this.tiempoTramite1 = arrayPrueba2;
                                               });
                     
                                               this.selectedCostoTramite1 = '';
                                               this.costoTramite1 = [];
                     
                                               this.optionsSelect2CostoTramite1 = { placeholder: "[ Seleccione el costo de trámite ]", width: "100%"};
                                               
                                                this.evaluadorService.obtenerListaCostoTramite().subscribe( response => {
                                                   var arrayPrueba3 = [];
                                                   arrayPrueba3.push({id: '',text: ""});
                                                   for (let i = 0; i< response['length']; i++) {
                                                      arrayPrueba3.push({
                                                                           id: response[i]['id_atributo'],
                                                                           text: response[i]['nombre_atributo']
                                                                           }); 
                                                    }
                                                    this.costoTramite1 = arrayPrueba3;
                                               });
                     
                                               this.selectedRequisitoTramite1 = '';
                                               this.requisitoTramite1 = [];
                     
                                               this.optionsSelect2RequisitoTramite1 = { placeholder: "[ Seleccione el requisito del trámite]", multiple: true , width: "100%"}
                                               
                                               
                                                  this.evaluadorService.obtenerListaRequisitoTramite().subscribe( response => {
                                                     var arrayPrueba4 = [];
                                                      arrayPrueba4.push({id: '',text: ""});
                                                      for (let i = 0; i< response['length']; i++) {
                                                       arrayPrueba4.push({
                                                                          id: response[i]['id_atributo'],
                                                                          text: response[i]['nombre_atributo']
                                                       }); 
                                                    }
                                                  this.requisitoTramite1 = arrayPrueba4;
                                                 });
                     
                                                 this.selectedGestionTramite1 = '';
                                                 this.gestionTramite1 = []; 
                     
                                                 this.optionsSelect2GestionTramite1 = { placeholder: "[ Seleccione Gestión de Tramite]", multiple: true , width: "100%"}
                                                 
                                                     this.evaluadorService.obtenerListaGestionTramite().subscribe( response => {
                                                       var arrayPrueba5 = [];
                                                       arrayPrueba5.push({id: '',text: ""});
                                                       for (let i = 0; i< response['length']; i++) {
                                                         arrayPrueba5.push({
                                                                                   id: response[i]['id_atributo'],
                                                                                   text: response[i]['nombre_atributo']
                                                                                   }); 
                                                       }
                                                       this.gestionTramite1 = arrayPrueba5;
                                                     });
                     
                                                     this.selectedOtrosTramite1 = '';
                                                     this.otrosTramite1 = [];
                     
                     
                                                     this.optionsSelect2otrosTramite1 = { placeholder: "[ Seleccione Otros]", multiple: true , width: "100%"}
                                                     
                                                         this.evaluadorService.obtenerListaOtrosTramite().subscribe( response => {
                                                           var arrayPrueba6 = [];
                                                          arrayPrueba6.push({id: '',text: ""});
                                                           for (let i = 0; i< response['length']; i++) {
                                                                arrayPrueba6.push({
                                                                                   id: response[i]['id_atributo'],
                                                                                  text: response[i]['nombre_atributo']
                                                              }); 
                                                            }
                                                            this.otrosTramite1 = arrayPrueba6;
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
                                   id_tramite: Number(this.listaBarrerasAGuardar[i]["idtramite"])  , nombre_obs: nombreObstaculo}
    
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
