import { Component, OnInit ,  ElementRef ,ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { BsModalService,ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute , Event, NavigationCancel,NavigationEnd,NavigationError,NavigationStart,Router } from '@angular/router';
import { EvaluadorService } from '../../services/evaluador.service';
import { Select2OptionData } from 'ng2-select2';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
declare var $:any;


@Component({
  selector: 'app-detalle-registro-obstaculo',
  templateUrl: './detalle-registro-obstaculo.component.html',
  styleUrls: ['./detalle-registro-obstaculo.component.css']
})
export class DetalleRegistroObstaculoComponent implements OnInit {

  public codigoregistro:String;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
  public registroAceptado:Boolean;
  public tramitedatanueva:String;
  public isDisabledOptions:Boolean;
  public regionData:String;
  public provinciaData:String;
  public esEditableEvaluador:Boolean;
  public distritoData:String;
  public aceptacion:String;
  public requiereData:String;
  public isRequerido:Boolean;
  public responderData:String;
  public isReponder:Boolean;
  public existebarrera:String;
  public isExisteBarrera:Boolean;
  public mojerarData:String;
  public isMejoraData:Boolean;
  public noaceptaDerivacion:Boolean;
  public entidadDatanueva:String;
  public respuestaUsuarioFinal: String;
  public consultasRegistradas: Object[];

  public regiones: Array<Select2OptionData>;
  public optionsSelect2Region: Select2Options;
  public selectedRegion: string;
  public textoRegion: string ;

  public entidades: Array<Select2OptionData>;
  public optionsSelect2Entidades: Select2Options;
  public selectedEntidades: string;
  public textoEntidad: string ;

  public organos: Array<Select2OptionData>;
  public optionsSelect2Organos: Select2Options;
  public selectedOrganos: string;
  public textoOrganos: string ;

  public provincias: Array<Select2OptionData>;
  public optionsSelect2Provincia: Select2Options;
  public selectedProvincia: string;
  
  public distritos: Array<Select2OptionData>;
  public optionsSelect2Distrito: Select2Options;
  public selectedDistrito: string;

  public actividadeconomica: Array<Select2OptionData>;
  public optionsSelect2ActividadEconomica: Select2Options;
  public textoActividadEconomica: string;


  public disabledCodigo:Boolean;
  public listaDetalleObstaculo:any[];
  public nombreTramite: String;
  public nombreObstaculo: String;
  public codigoObstaculo: String;
  public idDistritoEntidadSelected: any;
  public selectedActividadEconomica: any;
  public ilegal: String;
  public barreraAdministrativa: String;
  public razonabilidad: String;
  public sustentocondicion: String;
  public actoEntidad: String;
  public transgresion: String;
  public limitalibertad: String;
  public perjuicio: String;
  public idbarrera: any;
  public fileEvidencia: any;
  public resumenUsuario: String;
  public solucionUsuario: String;
  public tiempocompromiso: any;
  public aceptarBarreraAdmin: any ;
  public aceptarBarreraBuro: any ;
  public condicionBA:any;
  public sustento: String;
  public listaCondicionBA:any[];
  public comentarioDependencia: String;
  public respuestaDependencia: String;
  public estadoDependencia : Boolean;
  public codigoBarrera: any;
  public isProduceRegistro: Boolean;
  public id_obstaculo: any;
  public isEntidad: Boolean;
  public botonInternos: Boolean;
  public botonExternos: Boolean;
  public textoBarreraAdmin: string;
  public textoBarreraBuro: string;
  public textoCondicionBarrera: string;
  public detalleRegistro:any[];
  public tramiteusuario:String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;
  public SoloFase26: Boolean;
  public idconsulta: number;
  public bandera: number;
  public region: String;
  public nombre_organismo: String;
  public categoriaBA: String;
  public faseDistinta: Boolean;
  public regionSeteado: String;
  public actividadeconomicaSeteado: String;
  public nombre_organismoSeteado: String;
  public regionNueva: Object;
  public actividadNueva: Object;
  public entidadNueva: Object;
  public organoNueva: Object;
  public disabledComentario: Boolean;
  public idconsultaFase27 : number;
  public idfase: number;
  public sustentoEva2: String;
  public direccion: number;
  public disabledFase25: Boolean;
  public interna_externa: string;
  public comentario: String;
  public isComentario: Boolean;
  public isConsulta: Boolean;
  public identidad: any;
  public disabledDias:  Boolean;

  public loading1: boolean;
 


  constructor(private modalService: BsModalService,private evaluadorService:EvaluadorService,private activeRoute: ActivatedRoute,private router: Router) {
    this.loading1 = true;
    const routeParams = this.activeRoute.snapshot.params;
    this.consultasRegistradas = [];
    this.id_obstaculo = routeParams.id;
    this.isDisabledOptionsOrgano = true;
    this.registroAceptado = false;
    this.requiereData = "0";
    this.responderData = "0";
    this.existebarrera = "0";
    this.mojerarData = "0";
    this.noaceptaDerivacion=  false;
    this.isRequerido = false;
    this.isReponder = false;
    this.isExisteBarrera = false;
    this.isMejoraData = false;
    this.disabledCodigo= true;
    this.isDisabledOptions = true;
    this.actoEntidad="";
    this.transgresion="";
    this.limitalibertad="";
    this.perjuicio="";
    this.ilegal="";
    this.razonabilidad="";
    this.fileEvidencia = "";
    this.resumenUsuario = "";
    this.solucionUsuario = "";
    this.sustento = "";
    this.tiempocompromiso = "";
    this.aceptarBarreraAdmin =0;
    this.aceptarBarreraBuro =0;
    this.condicionBA =0;
    this.estadoDependencia = true;
    this.comentarioDependencia = "";
    this.disabledDias = true;
    this.sustentocondicion = "";


    this.optionsSelect2Region = {
      placeholder: "[ Seleccione una región ]",
      width: "100%"
    }
    this.optionsSelect2Provincia = {
      placeholder: "[ Seleccione una provincia ]",
      width: "100%"
    }
    this.optionsSelect2Distrito = {
      placeholder: "[ Seleccione un distrito ]",
      width: "100%"
    }

    this.evaluadorService.obtenerRegiones().subscribe(response => {
      
      
      var arrayAuxRegEditableRegion = [];
          arrayAuxRegEditableRegion.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
               arrayAuxRegEditableRegion.push({id: response[index]['id_region'],text: response[index]['nombre_region']});
        }
        this.regiones = arrayAuxRegEditableRegion; 
    }); 

    this.optionsSelect2Entidades = { placeholder: "[ Seleccione la Entidad ]", width: "100%"};

    this.evaluadorService.obtenerEntidades().subscribe(response =>{
      var arrayAuxEntidad = [];
          arrayAuxEntidad.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
              arrayAuxEntidad.push({id: response[index]['id_entidad'],text: response[index]['nombre_entidad']});
        }
        this.entidades = arrayAuxEntidad;
  }); 

    
    this.optionsSelect2ActividadEconomica = { placeholder: "[ Seleccione la actividad económica]", width: "100%"};
    this.evaluadorService.obtenerActividadEconomica().subscribe(response => {
      var arrayAuxReg3 = [];
          arrayAuxReg3.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
               arrayAuxReg3.push({id: response[index]['id_activ_econ'],text: response[index]['nombre_actividad']});
        }       
        this.actividadeconomica = arrayAuxReg3;
  });

    this.evaluadorService.obtenerDetalleRegistro(this.id_obstaculo).subscribe(response => {
       this.detalleRegistro = response;
       this.codigoregistro =  this.detalleRegistro[0]["codigo_registro"];
       this.tramiteusuario = this.detalleRegistro[0]["nombre_tramite"];
       this.explicaciondata = this.detalleRegistro[0]["detalle_registro"];
       this.identidad = this.detalleRegistro[0]["id_entidad"];
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

       if(this.detalleRegistro[0]["destinatario"] == 1){
        this.consultaPrincipal = this.detalleRegistro[0]["consulta"];
        this.respuestaPrincipal = this.detalleRegistro[0]["respuesta"];

      }else{
        this.consultaPrincipal= "";
        this.respuestaPrincipal= "";
      }
  });

    this.evaluadorService.obtenerDetalleObstaculo(this.id_obstaculo).subscribe(response => {

       this.listaDetalleObstaculo = response;
       this.codigoObstaculo =  this.listaDetalleObstaculo[0]["codigo_obstaculo"];
       this.nombreTramite = this.listaDetalleObstaculo[0]["nombre_tramite"];
       this.barreraAdministrativa = this.listaDetalleObstaculo[0]["nombre_atributo"];
       this.nombreObstaculo = this.listaDetalleObstaculo[0]["nombre_tipo_atrib"];
       this.idbarrera = this.listaDetalleObstaculo[0]["id_barrera"];
       this.idconsulta = this.listaDetalleObstaculo[0]["id_consulta"];
       this.respuestaDependencia = this.listaDetalleObstaculo[0]["sustento_eva1"];
       this.idfase = this.listaDetalleObstaculo[0]["id_fase"];
       this.interna_externa =  this.listaDetalleObstaculo[0]["interna_externa"];
       this.comentario =  this.listaDetalleObstaculo[0]["comentario"];

       if(this.idfase == 22){
         this.loading1 = false;
       }

    
      if(this.interna_externa== "E"){
        this.isProduceRegistro = false;
        this.isEntidad = true;
        this.botonExternos = true;
        this.botonInternos = false;
        this.SoloFase26 = true;
        this.isComentario= true;
        this.isConsulta = false;
      }else{
        this.isProduceRegistro = true;
        this.isEntidad = false;
        this.botonInternos = true;
        this.botonExternos = false;
        this.SoloFase26 = false;
        this.isComentario = false;
        this.isConsulta = true;
      }


      this.optionsSelect2Organos = { placeholder: "[ Seleccione el Órgano/Unidad orgánica/Organismo/Programa ]", width: "100%"};
      if(this.listaDetalleObstaculo[0]["direccion"] == 1){
        this.evaluadorService.obtenerOrganismosBarreras(1960 , 1).subscribe(response =>{
          var arrayAuxReg2 = [];
              arrayAuxReg2.push({id: '',text: ""});
              for (let index = 0; index < response['length']; index++) {
                  arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
            }
            this.organos = arrayAuxReg2;
      });

      }else{
        this.evaluadorService.obtenerOrganismosBarreras(1960 , 0).subscribe(response =>{
          var arrayAuxReg2 = [];
              arrayAuxReg2.push({id: '',text: ""});
              for (let index = 0; index < response['length']; index++) {
                  arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
            }
            this.organos = arrayAuxReg2;
      });

      }

      if(this.interna_externa == "E"){
        this.disabledComentario = true;
      }

      if(this.idfase == 25 && this.interna_externa == "E"){
        this.disabledFase25 = false ;
        this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
        this.regionSeteado = this.listaDetalleObstaculo[0]["nombre_region"];
        this.nombre_organismoSeteado = this.listaDetalleObstaculo[0]["nombre_org"];
        this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
        this.transgresion = this.listaDetalleObstaculo[0]["pregunta_dos"];
        this.limitalibertad = this.listaDetalleObstaculo[0]["pregunta_tres"];
        this.perjuicio = this.listaDetalleObstaculo[0]["pregunta_cuatro"];
        this.ilegal = this.listaDetalleObstaculo[0]["ilegal"];
        this.razonabilidad = this.listaDetalleObstaculo[0]["razonabilidad"];
        this.sustentoEva2 = this.listaDetalleObstaculo[0]["sustento_eva2"];
        this.respuestaDependencia = this.listaDetalleObstaculo[0]["respuesta"];
        this.barreraAdministrativa = this.listaDetalleObstaculo[0]["nombre_atributo"];
        this.categoriaBA = this.listaDetalleObstaculo[0]["nombre_tipo_atrib"];
        this.idbarrera = this.listaDetalleObstaculo[0]["id_barrera"];
        
                setTimeout(() => {    
                  this.loading1 = false;
                  this.regionNueva = String(this.listaDetalleObstaculo[0]["id_region"]);
                  this.actividadNueva = String(this.listaDetalleObstaculo[0]["id_activ_econ"]);
                  this.organoNueva = String(this.listaDetalleObstaculo[0]["id_organismo"]);
                  this.entidadNueva = String(this.listaDetalleObstaculo[0]["id_entidad"]);
                }, 1000);
                this.SoloFase26 = true;
              
                if(this.listaDetalleObstaculo[0]["barrera_admin"] == true){
                  this.aceptarBarreraAdmin = "1";
                }else{
                  this.aceptarBarreraAdmin = "0";

                }
                if(this.listaDetalleObstaculo[0]["barrera_buro"] == true){
                  this.aceptarBarreraBuro = "1";
                }else{
                  this.aceptarBarreraBuro = "0";
                }
                this.sustento = this.listaDetalleObstaculo[0]["sustento_barrera"];
                this.resumenUsuario = this.listaDetalleObstaculo[0]["resumen"];
                this.solucionUsuario = this.listaDetalleObstaculo[0]["solucion"];
                if(this.listaDetalleObstaculo[0]["id_condicion"]== 1){
                  this.condicionBA ="1";
                }else if(this.listaDetalleObstaculo[0]["id_condicion"]== 2){
                  this.condicionBA ="2";
                }else if (this.listaDetalleObstaculo[0]["id_condicion"]== 3){
                  this.condicionBA ="3";
                }else if(this.listaDetalleObstaculo[0]["id_condicion"]== 4){
                  this.condicionBA ="4";
                }else{
                 this.condicionBA = "6";
                }
                this.sustentocondicion = this.listaDetalleObstaculo[0]["sustento_condicion"];
                this.tiempocompromiso = this.listaDetalleObstaculo[0]["tiempo_compromiso"];
                this.comentarioDependencia = this.listaDetalleObstaculo[0]["consulta"];

      }
  

      if(this.idfase == 25 && this.interna_externa == "P"){

        this.disabledFase25 = true;
        
        this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
        this.regionSeteado = this.listaDetalleObstaculo[0]["nombre_region"];
        this.nombre_organismoSeteado = this.listaDetalleObstaculo[0]["nombre_org"];
        this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
        this.transgresion = this.listaDetalleObstaculo[0]["pregunta_dos"];
        this.limitalibertad = this.listaDetalleObstaculo[0]["pregunta_tres"];
        this.perjuicio = this.listaDetalleObstaculo[0]["pregunta_cuatro"];
        this.ilegal = this.listaDetalleObstaculo[0]["ilegal"];
          this.razonabilidad = this.listaDetalleObstaculo[0]["razonabilidad"];
          this.sustentoEva2 = this.listaDetalleObstaculo[0]["sustento_eva2"];
          this.respuestaDependencia = this.listaDetalleObstaculo[0]["respuesta"];
                this.barreraAdministrativa = this.listaDetalleObstaculo[0]["nombre_atributo"];
                this.categoriaBA = this.listaDetalleObstaculo[0]["nombre_tipo_atrib"];
                this.idbarrera = this.listaDetalleObstaculo[0]["id_barrera"];
        
                setTimeout(() => {    
                  this.loading1 = false;
                  this.regionNueva = String(this.listaDetalleObstaculo[0]["id_region"]);
                  this.actividadNueva = String(this.listaDetalleObstaculo[0]["id_activ_econ"]);
                  this.organoNueva = String(this.listaDetalleObstaculo[0]["id_organismo"]);
                  this.entidadNueva = String(this.listaDetalleObstaculo[0]["id_entidad"]);
        
                }, 1000);
                this.SoloFase26 = true;
                this.disabledComentario = true;
                if(this.listaDetalleObstaculo[0]["barrera_admin"] == true){
                  this.aceptarBarreraAdmin = "1";
                }else{
                  this.aceptarBarreraAdmin = "0";

                }
                if(this.listaDetalleObstaculo[0]["barrera_buro"] == true){
                  this.aceptarBarreraBuro = "1";
                }else{
                  this.aceptarBarreraBuro = "0";
                }
                this.sustento = this.listaDetalleObstaculo[0]["sustento_barrera"];
                this.resumenUsuario = this.listaDetalleObstaculo[0]["resumen"];
                this.solucionUsuario = this.listaDetalleObstaculo[0]["solucion"];
                if(this.listaDetalleObstaculo[0]["id_condicion"]== 1){
                  this.condicionBA ="1";
                }else if(this.listaDetalleObstaculo[0]["id_condicion"]== 2){
                  this.condicionBA ="2";
                }else if (this.listaDetalleObstaculo[0]["id_condicion"]== 3){
                  this.condicionBA ="3";
                }else if(this.listaDetalleObstaculo[0]["id_condicion"]== 4){
                  this.condicionBA ="4";
                }else{
                 this.condicionBA = "6";
                }
                this.sustentocondicion = this.listaDetalleObstaculo[0]["sustento_condicion"];
                this.tiempocompromiso = this.listaDetalleObstaculo[0]["tiempo_compromiso"];
                this.comentarioDependencia = this.listaDetalleObstaculo[0]["consulta"];

              }

      if(this.idfase == 26 || this.idfase == 27){

        this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
        this.regionSeteado = this.listaDetalleObstaculo[0]["nombre_region"];
        this.nombre_organismoSeteado = this.listaDetalleObstaculo[0]["nombre_org"];
        this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
        this.transgresion = this.listaDetalleObstaculo[0]["pregunta_dos"];
        this.limitalibertad = this.listaDetalleObstaculo[0]["pregunta_tres"];
        this.perjuicio = this.listaDetalleObstaculo[0]["pregunta_cuatro"];
        this.ilegal = this.listaDetalleObstaculo[0]["ilegal"];
        this.razonabilidad = this.listaDetalleObstaculo[0]["razonabilidad"];
        this.barreraAdministrativa = this.listaDetalleObstaculo[0]["nombre_atributo"];
        this.categoriaBA = this.listaDetalleObstaculo[0]["nombre_tipo_atrib"];
        this.idbarrera = this.listaDetalleObstaculo[0]["id_barrera"];
        
        setTimeout(() => {    
          this.loading1 = false;
          this.regionNueva = String(this.listaDetalleObstaculo[0]["id_region"]);
          this.actividadNueva = String(this.listaDetalleObstaculo[0]["id_activ_econ"]);
          this.organoNueva = String(this.listaDetalleObstaculo[0]["id_organismo"]);
          this.entidadNueva = String(this.listaDetalleObstaculo[0]["id_entidad"]);

        }, 1000);
      }
      if(this.idfase== 27){
        this.comentarioDependencia =  this.listaDetalleObstaculo[0]["consulta"];
        this.idconsultaFase27 = this.listaDetalleObstaculo[0]["id_consulta"];
        

      
      }

      if(this.idfase == 26){
        this.SoloFase26 = true;
        
      }

      if(this.idfase == 26 && this.interna_externa == "P"){
        this.disabledFase25 = true;
      }
       
  });

       

}

  ngOnInit() { 
  this.router.routeReuseStrategy.shouldReuseRoute = function(){
    return false;
};

this.router.events.subscribe((evt) => {
    if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
    }
});

     
      }




  public changeOfRegion(e: any) : void{
      this.selectedRegion = e.value;
  } 
    
  public changeOfEntidad(e: any): void {
      this.selectedEntidades = e.value;
  }
    
  public changeOfOrganos(e: any): void {
      this.selectedOrganos = e.value;
  }

  public changeOfActividadEconomica(e:any) : void {
      this.selectedActividadEconomica = e.value;
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

public enviarAConsultado(){


    if(this.comentarioDependencia === null || this.comentarioDependencia == ""){

      this.comentarioDependencia = "";

        this.bandera = 0;

      }else{
        this.bandera = 1;
      }

      if(this.idconsulta == null){
        this.idconsulta = 0;
      }else{
        this.idconsulta = this.idconsultaFase27;
      }

     

        let registro ={destinatario: 0 , codigo_registro: this.codigoregistro , consulta: this.comentarioDependencia  ,
          id_organismo: Number(this.selectedOrganos),id_barrera: this.idbarrera ,id_region: Number(this.selectedRegion), 
          id_activ_econ: Number(this.selectedActividadEconomica),pregunta_uno: this.actoEntidad,
          pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,ilegal: this.ilegal , razonabilidad: this.razonabilidad , bandera: this.bandera , id_consulta: this.idconsulta} ;


       if(this.selectedRegion == ''){
        Swal({
          type: 'error',
          title: 'Seleccione una Region'
        })
        return false;

      }else if(Number(this.selectedOrganos) == 0){
        Swal({
          type: 'error',
          title: 'Seleccione un organismo'
        })
        return false;


        }else{ 

 

        Swal({
          title: 'Desea registrar los datos ?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, registrar'
        }).then((result) => {
  
  
            if (result.value) {
              this.evaluadorService.registrarFormulario1(registro).subscribe(response =>{
                Swal(
                     'Hecho!',
                     'Se envió la 2da evaluación al coordinador para su revisión',
                     'success'
                    ).then(()=>{
                      this.router.navigate(['/evaluador']);
                 }); 
                })
           
          }
  
        })
  }
  
}

public enviarSolucionExterno(){

  if(this.comentario === null){
    this.comentario = "";
  }

  
      let registro =   {codigo_registro: this.codigoregistro,id_activ_econ: Number(this.selectedActividadEconomica), pregunta_uno: this.actoEntidad,
        pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,
        ilegal: this.ilegal, razonabilidad: this.razonabilidad, informe_final_barrera: this.fileEvidencia,
        resumen: this.resumenUsuario,solucion: this.solucionUsuario,id_barrera: this.idbarrera,
        sustento_condicion: this.sustentocondicion ,tiempo_compromiso: Number(this.tiempocompromiso),
        barrera_admin: Number(this.aceptarBarreraAdmin), barrera_buro: Number(this.aceptarBarreraBuro), id_condicion: Number(this.condicionBA), sustento_barrera: this.sustento,
        id_region: Number(this.selectedRegion) , comentario: this.comentario , id_entidad: Number(this.selectedEntidades)
    }

    if (registro.barrera_admin == 1){
      this.textoBarreraAdmin = "Si";   
    }else{
      this.textoBarreraAdmin = "No";
    }
    if (registro.barrera_buro == 1){
      this.textoBarreraBuro = "Si";
    }else{
      this.textoBarreraBuro = "No";
    }
    
              if(this.selectedRegion == ''){

              Swal({
              type: 'error',
              title: 'Seleccione una Region'
              })

              return false;

              }else if(Number(this.condicionBA)=== 0){

              Swal({
              type: 'error',
              title: 'Seleccione una condicion de BA'
              })

              return false;

              }else{

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

               return true;
             }



    }






public enviarSolucion(){

      let registro =   {id_activ_econ: Number(this.selectedActividadEconomica),id_organismo: Number(this.selectedOrganos), pregunta_uno: this.actoEntidad,
                        pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,
                        ilegal: this.ilegal, razonabilidad: this.razonabilidad, informe_final_barrera: this.fileEvidencia,
                        resumen: this.resumenUsuario,solucion: this.solucionUsuario,id_barrera: this.idbarrera,
                        sustento_condicion: this.sustentocondicion ,tiempo_compromiso: Number(this.tiempocompromiso),
                        barrera_admin: Number(this.aceptarBarreraAdmin), barrera_buro: Number(this.aceptarBarreraBuro), id_condicion: Number(this.condicionBA), sustento_barrera: this.sustento,
                        id_region: Number(this.selectedRegion)
                }


    
 
    if (registro.barrera_admin == 1){
      
      this.textoBarreraAdmin = "Si";
            
    }else{
      this.textoBarreraAdmin = "No";
    }


    if (registro.barrera_buro == 1){
      
      this.textoBarreraBuro = "Si";
    }else{
      this.textoBarreraBuro = "No";
    }


  



  if(this.selectedRegion == ''){
    
        Swal({
          type: 'error',
          title: 'Seleccione una Region'
        })
    
        return false;

      }else if(Number(this.selectedOrganos) == 0){
        
            Swal({
              type: 'error',
              title: 'Seleccione un organismo'
            })

          }else if(Number(this.condicionBA)=== 0){
            
                          Swal({
                          type: 'error',
                          title: 'Seleccione una condicion de BA'
                          })
            
                          return false;
            
  
    
       }else{


    
      
       Swal({
          title: 'Desea registrar la solución ?',
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
                  'Se ha registrado la solución',
                  'success'
                ).then(()=>{
                  this.router.navigate(['/evaluador']);
                }); 

                
                });
           
          }
  
        })
    
        return true;
    }

  





}


}
