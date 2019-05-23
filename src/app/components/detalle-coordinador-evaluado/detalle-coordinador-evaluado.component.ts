import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordinadorService } from '../../services/coordinador.service';
import { IfStmt } from '@angular/compiler';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-detalle-coordinador-evaluado',
  templateUrl: './detalle-coordinador-evaluado.component.html',
  styleUrls: ['./detalle-coordinador-evaluado.component.css']
})
export class DetalleCoordinadorEvaluadoComponent implements OnInit {

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


  public actividadeconomica: Array<Select2OptionData>;
  public optionsSelect2ActividadEconomica: Select2Options;
  public textoActividadEconomica: string;

  public selectedActividadEconomica: any;
  public idobstaculo : number;
  public codigoregistro: String;
  public detalleRegistro:any[];
  public tramiteusuario:String;
  public explicaciondata: String;
  public consultaPrincipal: String;
  public respuestaPrincipal: String;
  public listaDetalleObstaculo:any[];
  public codigoObstaculo: String;
  public nombreTramite: String;
  public barreraAdministrativa: String;
  public nombreObstaculo: String;
  public idbarrera: number;
  public idconsulta: number;
  public isProduceRegistro: Boolean;
  public isEntidad: Boolean;
  public botonInternos: Boolean;
  public botonExternos: Boolean;
  public region: String;
  public nombre_organismo: String;
  public actoEntidad: String;
  public transgresion: String;
  public limitalibertad: String;
  public perjuicio: String;
  public categoriaBA: String;
  public ilegal: String;
  public razonabilidad: String;
  public isBotonUno: Boolean;
  public isBotonDos: Boolean;
  public aceptacion:String;
  public sustentoevaluacion: String;
  public seleccionar: String;
  public isDisabledOptions: Boolean;
  public regionNueva: Object;
  public actividadNueva: Object;
  public entidadNueva: Object;
  public organoNueva: Object;

  public loading1: boolean;

  constructor(private coordinadorService: CoordinadorService,private activeRoute: ActivatedRoute,private router: Router) { 
    this.loading1 = true;
    const routeParams = this.activeRoute.snapshot.params;
    this.idobstaculo = routeParams.id;
    this.seleccionar = "1";
    this.isDisabledOptions = true;

    

    
    this.coordinadorService.obtenerDetalleRegistro(this.idobstaculo).subscribe(response => {
      this.detalleRegistro = response;
      this.codigoregistro =  this.detalleRegistro[0]["codigo_registro"];
      this.tramiteusuario = this.detalleRegistro[0]["nombre_tramite"];
      this.explicaciondata = this.detalleRegistro[0]["detalle_registro"];
      if(this.detalleRegistro[0]["destinatario"] == 1){
       this.consultaPrincipal = this.detalleRegistro[0]["consulta"];
       this.respuestaPrincipal = this.detalleRegistro[0]["respuesta"];

     }else{
       this.consultaPrincipal= "";
       this.respuestaPrincipal= "";
     }
      
    })

    this.coordinadorService.obtenerDetalleEvaluado(this.idobstaculo).subscribe(response => {
      
      this.listaDetalleObstaculo = response;

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




      this.optionsSelect2Organos = { placeholder: "[ Seleccione el Órgano/Unidad orgánica/Organismo/Programa ]", width: "100%"};
      if(this.listaDetalleObstaculo[0]["direccion"] == 1){
    
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

      setTimeout(() => {    
      this.loading1 = false;
        this.regionNueva = String(this.listaDetalleObstaculo[0]["id_region"]);
        this.actividadNueva = String(this.listaDetalleObstaculo[0]["id_activ_econ"]);
        this.entidadNueva = String(this.listaDetalleObstaculo[0]["id_entidad"]);
        this.organoNueva = String(this.listaDetalleObstaculo[0]["id_organismo"]);
      }, 1000);
      
      this.codigoObstaculo =  this.listaDetalleObstaculo[0]["codigo_obstaculo"];
      this.region = this.listaDetalleObstaculo[0]["nombre_region"];
      this.nombre_organismo = this.listaDetalleObstaculo[0]["nombre_org"];
      this.actoEntidad = this.listaDetalleObstaculo[0]["pregunta_uno"];
      this.transgresion = this.listaDetalleObstaculo[0]["pregunta_dos"];
      this.limitalibertad = this.listaDetalleObstaculo[0]["pregunta_tres"];
      this.perjuicio = this.listaDetalleObstaculo[0]["pregunta_cuatro"];
      this.ilegal = this.listaDetalleObstaculo[0]["ilegal"];
      this.razonabilidad = this.listaDetalleObstaculo[0]["razonabilidad"];
      this.barreraAdministrativa = this.listaDetalleObstaculo[0]["nombre_obstaculo"];
      this.categoriaBA = this.listaDetalleObstaculo[0]["nombre_tipo_atrib"];
      this.idbarrera = this.listaDetalleObstaculo[0]["id_barrera"];


      if(this.listaDetalleObstaculo[0]['interna_externa'] == "E"){
      this.isProduceRegistro = false;
      this.isEntidad = true;
      this.botonInternos = false;
      this.botonExternos = true;
     }else{
      this.isProduceRegistro = true;
      this.isEntidad = false;
      this.botonInternos = true;
      this.botonExternos = false;
     }

     

  
    })
  }

  ngOnInit() {
  }

  onChangeEnviar(data){

    if(data == "1"){
      this.isBotonUno = false;
    }

    if(data == "0"){
      this.isBotonUno = true;
    }

  
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

  enviarPrimeraEvaluacion(){

     let registro;

    if(Number(this.seleccionar) == 1){
      registro = {bandera: 1, id_barrera: this.idbarrera, sustento_eva1:"" , id_activ_econ: Number(this.selectedActividadEconomica), 
      id_organismo: Number(this.selectedOrganos), pregunta_uno:  this.actoEntidad, pregunta_dos: this.transgresion , pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,ilegal: this.ilegal , razonabilidad: this.razonabilidad , id_region : Number(this.selectedRegion) , id_consulta: 0 ,
      consulta: ""};

    }else{
      registro = {bandera: 0 , id_barrera: this.idbarrera, sustento_eva1: this.sustentoevaluacion , id_activ_econ: Number(this.selectedActividadEconomica), 
        id_organismo: Number(this.selectedOrganos), pregunta_uno:  this.actoEntidad, pregunta_dos: this.transgresion , pregunta_tres: this.limitalibertad,pregunta_cuatro: this.perjuicio,ilegal: this.ilegal , razonabilidad: this.razonabilidad , id_region : Number(this.selectedRegion) , id_consulta: 0 ,
        consulta: ""};
    }
 
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

