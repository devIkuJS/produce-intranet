import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsModalService,ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluadorService } from '../../services/evaluador.service';
import { Select2OptionData } from 'ng2-select2';

declare var $:any;

@Component({
  selector: 'app-detalle-registro-consultado-obstaculo',
  templateUrl: './detalle-registro-consultado-obstaculo.component.html',
  styleUrls: ['./detalle-registro-consultado-obstaculo.component.css']
})
export class DetalleRegistroConsultadoObstaculoComponent implements OnInit {

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

  public entidades: Array<Select2OptionData>;
  public optionsSelect2Entidades: Select2Options;
  public selectedEntidades: string;

  public organos: Array<Select2OptionData>;
  public optionsSelect2Organos: Select2Options;
  public selectedOrganos: string;

  public provincias: Array<Select2OptionData>;
  public optionsSelect2Provincia: Select2Options;
  public selectedProvincia: string;
  
  public distritos: Array<Select2OptionData>;
  public optionsSelect2Distrito: Select2Options;
  public selectedDistrito: string;

  public actividadeconomica: Array<Select2OptionData>;
  public optionsSelect2ActividadEconomica: Select2Options;

  public disabledCodigo:Boolean;
  public listaDetalleObstaculo:any[];
  public nombreTramite: String;
  public nombreObstaculo: String;
  public codigoObstaculo: String;
  public barreraAdministrativa: String;
  public idDistritoEntidadSelected: any;
  public selectedActividadEconomica: any;
  public ilegal: String;
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
  public id_obstaculo : any;
  public respuestaDependenciaBarrera: Boolean;
  public botonInternos: Boolean;
  public botonExternos: Boolean;
  public isEntidad: Boolean;
  public detalleRegistro:any[];
  public tramiteusuario:String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;
  public identidad: any;

  public loading1: boolean;

  constructor(private modalService: BsModalService,private evaluadorService:EvaluadorService,private activeRoute: ActivatedRoute,private router: Router) { 

    this.loading1 = true;

        const routeParams = this.activeRoute.snapshot.params;
        this.consultasRegistradas = [];
        this.id_obstaculo =  routeParams.id;
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
            
         }) 
    
        this.optionsSelect2Organos = { placeholder: "[ Seleccione el Órgano/Unidad orgánica/Organismo/Programa ]", width: "100%"};
    
    
        this.evaluadorService.obtenerOrganismos(1960).subscribe(response =>{
          
           var arrayAuxReg2 = []
             arrayAuxReg2.push({id: '',text: ""});
           
             for (let index = 0; index < response['length']; index++) {
                   arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
     
             }
               this.organos = arrayAuxReg2;
            
         }) 
    
         
    
         this.optionsSelect2ActividadEconomica = { placeholder: "[ Seleccione la actividad económica]", width: "100%"};
    
         this.evaluadorService.obtenerActividadEconomica().subscribe(response => {
          var arrayAuxReg3 = [];
            arrayAuxReg3.push({id: '',text: ""});
          
            for (let index = 0; index < response['length']; index++) {
                  arrayAuxReg3.push({id: response[index]['id_activ_econ'],text: response[index]['nombre_actividad']});
    
            }       
              this.actividadeconomica = arrayAuxReg3;
    
         })

         this.evaluadorService.obtenerDetalleRegistro(this.id_obstaculo).subscribe(response => {
           

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
    
    
         this.evaluadorService.obtenerDetalleObstaculo(this.id_obstaculo).subscribe(response => {
          this.loading1 = false;
    
           this.listaDetalleObstaculo = response;
           this.codigoObstaculo =  this.listaDetalleObstaculo[0]["codigo_obstaculo"];
           this.nombreTramite = this.listaDetalleObstaculo[0]["nombre_tramite"];
           this.barreraAdministrativa = this.listaDetalleObstaculo[0]["nombre_atributo"];
           this.nombreObstaculo = this.listaDetalleObstaculo[0]["nombre_tipo_atrib"];
           this.identidad = this.listaDetalleObstaculo[0]["id_entidad"];

           this.idbarrera = this.listaDetalleObstaculo[0]["id_barrera"];
           this.codigoregistro = this.listaDetalleObstaculo[0]["codigo_registro"];
           if(this.listaDetalleObstaculo[0]['interna_externa'] == "E"){
            this.respuestaDependenciaBarrera= false;
            this.botonInternos = false;
            this.botonExternos = true;
            this.isEntidad = true;
           }else{
            this.respuestaDependenciaBarrera=  true;
            this.botonInternos = true;
            this.botonExternos = false;
            this.isEntidad = false;
           }

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
           
         })
    
    
         
    
         
  }

  ngOnInit() { window.scrollTo(0, 0); }
  
  
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


  public enviarSolucionExterno(){

    let registro =   {codigo_registro: this.codigoregistro,id_activ_econ: Number(this.selectedActividadEconomica), pregunta_uno: this.actoEntidad,
      pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,
      ilegal: this.ilegal, razonabilidad: this.razonabilidad, informe_final_barrera: this.fileEvidencia,
      resumen: this.resumenUsuario,solucion: this.solucionUsuario,id_barrera: this.idbarrera,
      sustento_condicion: this.sustentocondicion ,tiempo_compromiso: Number(this.tiempocompromiso),
      barrera_admin: Number(this.aceptarBarreraAdmin), barrera_buro: Number(this.aceptarBarreraBuro), id_condicion: Number(this.condicionBA), sustento_barrera: this.sustento,
      id_region: Number(this.selectedRegion) , comentario: this.comentarioDependencia , id_entidad: Number(this.selectedEntidades)
  }


           if(this.selectedRegion == ''){

            Swal({
            type: 'error',
            title: 'Seleccione una Region'
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

           }


  }
  
  
  public enviarAConsultado(){
  
  
    let registro ={destinatario: 0 , codigo_registro: this.codigoregistro , consulta: this.comentarioDependencia  ,
       id_organismo: Number(this.selectedOrganos),id_barrera: this.idbarrera ,id_region: Number(this.selectedRegion), 
       id_activ_econ: Number(this.selectedActividadEconomica),pregunta_uno: this.actoEntidad,
       pregunta_dos: this.transgresion, pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio, ilegal: this.ilegal , razonabilidad: this.razonabilidad} ;

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
              this.evaluadorService.registrarFormulario1(registro).subscribe(response =>{
                
                          Swal(
                            'Hecho!',
                            'Se envió la consulta',
                            'success'
                          ).then(()=>{
                            this.router.navigate(['/evaluador']);
                          }); 
                
                  }) 

            }

            })
  
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
  