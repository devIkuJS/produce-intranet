import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordinadorService } from '../../services/coordinador.service';
import { IfStmt } from '@angular/compiler';
import { Select2OptionData } from 'ng2-select2';
import { CookieService } from 'ngx-cookie-service';

declare var $:any;

@Component({
  selector: 'app-detalle-coordinador-aprobar',
  templateUrl: './detalle-coordinador-aprobar.component.html',
  styleUrls: ['./detalle-coordinador-aprobar.component.css']
})
export class DetalleCoordinadorAprobarComponent implements OnInit {

  public organos: Array<Select2OptionData>;
  public optionsSelect2Organos: Select2Options;
  public selectedOrganos: string;
  public textoOrganos: string ;

  public organosProduce: Array<Select2OptionData>;
  public optionsSelect2OrganosProduce: Select2Options;
  public selectedOrganosProduce: string;
  public textoOrganosProduce: string ;

  public codigoregistro:String;
  public tramitedata:String;
  public explicaciondata:String;
  public entidaddata:String;
  public isProduceRegistro:Boolean;
  public organoData:String;
  public isDisabledOptionsOrgano:Boolean;
  public resumenFinal:String;
  public solucionFinal:String;
  public regionData:String;
  public provinciaData:String;
  public distritoData:String;
  public esEditableEvaluador:Boolean;
  public consultasRegistradas: Object[];
  public isDisabledOptions:Boolean;
  public isRequerido:Boolean;
  public isReponder:Boolean;
  public habilitarAprobacion:Boolean;
  public fase:number;
  public detalleobstaculo:any[];
  public detalleobstaculoConsultado:any[];
  public listaevaluadores:any[];
  public selectEvaluador: any;
  public registroValido: any;
  public registroRechazo:any;
  public isValido: Boolean;
  public isRechazo: Boolean;
  public sustentoEvaluador:Boolean;
  public rechazoEvaluador:Boolean;
  public sustentoNegado: String;
  public isAcepta: Boolean;
  public isNoAcepta: Boolean;
  public idevaluador : any;
  public sustentoNoValidado: String;
  public respuestaUsuarioInvalido:String;
  public aceptarInvalidez: any ;
  public idregistro: any;
  public identidad: number;
  public direccion: any;
  public interna_externa: string;



  public loading1: boolean;

  constructor(private coordinadorService:CoordinadorService,private activeRoute: ActivatedRoute,private router: Router , private cookieService: CookieService) {
    this.loading1 = true;

    const routeParams = this.activeRoute.snapshot.params;
    this.isProduceRegistro = false ;
    this.codigoregistro = routeParams.id;
    this.isDisabledOptionsOrgano = true;
    this.consultasRegistradas = [];
    this.isReponder = false;
    this.isRequerido = false;
    this.habilitarAprobacion = true;
    this.isDisabledOptions = true;
    this.registroValido = "1";
    this.registroRechazo = "1";
    this.isValido = false;
    this.isRechazo = false;
    this.sustentoEvaluador= true;
    this.aceptarInvalidez =0;
    this.sustentoNoValidado = "";
    this.respuestaUsuarioInvalido = "";


    var correotemporal = this.cookieService.get('produce_email');

    this.coordinadorService.obtenerListadeEvaluadores(correotemporal).subscribe(response =>{
      var arregloEvaluadores = [];
        for (let index = 0; index < response['length']; index++) {
                        arregloEvaluadores.push({
                                      id_empleado: response[index]['id_empleado'],
                                      datos: response[index]['nombres'] +" "+ response[index]['apellidos'] ,
                                      correo:response[index]['correo_emp']
                        });
        }

        this.listaevaluadores = arregloEvaluadores;
        this.selectEvaluador= this.listaevaluadores[0]['id_empleado'];
    });


    this.optionsSelect2Organos = { placeholder: "[ Seleccione el Órgano/Unidad orgánica/Organismo/Programa ]", width: "100%"};
    this.coordinadorService.obtenerDetalleObstaculoCoordinador(this.codigoregistro).subscribe(response =>{
      this.loading1 = false;
      this.detalleobstaculo = response;

      this.direccion =  this.detalleobstaculo[0]["direccion"] ;

      if(this.detalleobstaculo[0]["direccion"] == true){
        
                this.coordinadorService.obtenerOrganismosBarreras(1960 , 0).subscribe(response =>{
                  var arrayAuxReg2 = [];
                  arrayAuxReg2.push({id: '',text: ""});
                      for (let index = 0; index < response['length']; index++) {
                          arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
                    }
                    this.organos = arrayAuxReg2;
              });
        
              }else{
                this.coordinadorService.obtenerOrganismosBarreras(1960 , 1).subscribe(response =>{
                  var arrayAuxReg2 = [];
                  arrayAuxReg2.push({id: '',text: ""});
                      for (let index = 0; index < response['length']; index++) {
                          arrayAuxReg2.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
                    }
                    this.organos = arrayAuxReg2;
              });
        
              }

              

        this.tramitedata = this.detalleobstaculo[0]['nombre_tramite'];
        this.explicaciondata = this.detalleobstaculo[0]['detalle_registro'];
        this.entidaddata = this.detalleobstaculo[0]['nombre_entidad'];
        this.organoData = this.detalleobstaculo[0]['entidad_organismo'];
        this.regionData = this.detalleobstaculo[0]['nombre_region'];
        this.provinciaData = this.detalleobstaculo[0]['nombre_provincia'];
        this.distritoData = this.detalleobstaculo[0]['nombre_distrito'];
        this.idregistro = this.detalleobstaculo[0]['id_registro'];
        this.identidad = this.detalleobstaculo[0]['id_entidad'];
        this.interna_externa =  this.detalleobstaculo[0]['interna_externa'];

        if(this.detalleobstaculo[0]['interna_externa'] == "E"){
          this.isProduceRegistro = false;
        }else{
          this.isProduceRegistro = true;
        }

        this.idevaluador = this.detalleobstaculo[0]['id_empleado'];
        this.sustentoNoValidado = this.detalleobstaculo[0]['motivo_validez'];
        this.respuestaUsuarioInvalido = this.detalleobstaculo[0]['solucion'];

        if(this.detalleobstaculo[0]['id_fase'] == 3){
        this.isRechazo = true;
        this.sustentoNegado = this.detalleobstaculo[0]['sustento'];
        this.habilitarAprobacion = false;
       }

       if(this.detalleobstaculo[0]['id_fase'] == 21){
        this.isValido = true;
        this.sustentoNegado = this.detalleobstaculo[0]['sustento'];
        this.habilitarAprobacion = false;
       }


    this.optionsSelect2OrganosProduce = { placeholder: "[ Seleccione el Órgano/Unidad orgánica/Organismo/Programa ]", width: "100%"};
    this.coordinadorService.obtenerOrganismos(1960).subscribe(response =>{
      var arrayAuxRegOrganismo = [];
      arrayAuxRegOrganismo.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
              arrayAuxRegOrganismo.push({id: response[index]['id_organismo'],text: response[index]['nombre_org']});
        }
        this.organosProduce = arrayAuxRegOrganismo;
  });

       
        
    });


  }

  ngOnInit() {}

  public changeOfOrganos(e: any): void {
  this.selectedOrganos = e.value;

}

 
  changeEvaluador(event: any) {
    
  this.selectEvaluador = event.target.value;

  }

   
    onAceptaInvalidez(data){
      if(data == "1"){
        this.isAcepta = true;
        this.isNoAcepta = false;
        
      }
      if(data == "0"){
        this.isAcepta = false;
        this.isNoAcepta = true;
      }
    }
   

  asignarEvaluadorFASEVALIDADO(){
      Swal({
        title: 'Desea asignar este caso al presente evaluador?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, enviar'
      }).then((result) => {


          if (result.value) {
            this.coordinadorService.asignarRegistrosToEvaluador(this.codigoregistro,this.selectEvaluador).subscribe(response =>{

          

              Swal(
                'Hecho!',
                'El caso se ha derivado',
                'success'
              ).then(()=>{
                this.router.navigate(['/coordinador']);
              });
              });
         
        }

      })

 
  }

  reasignarDerivacion(){
    
    Swal({
      title: 'Desea reasignar este caso al presente evaluador?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, reasignar'
    }).then((result) => {


        if (result.value) {
          this.coordinadorService.asignarRegistrosToEvaluador(this.codigoregistro,this.selectEvaluador).subscribe(response =>{

            Swal(
              'Hecho!',
              'El caso se ha derivado',
              'success'
            ).then(()=>{
              this.router.navigate(['/coordinador']);
            });
            });
       
      }

    })

  }



  enviarVerificarValidez(){

    let resultado = {validez: Number(this.aceptarInvalidez), codigo_registro: this.codigoregistro, id_evaluador: Number(this.idevaluador) , motivo_validez: this.sustentoNoValidado , solucion: this.respuestaUsuarioInvalido};

    if(this.aceptarInvalidez.checked == false){
      
          Swal({
            type: 'error',
            title: 'Seleccione una opción Si acepta o No acepta'
          })
          
      return false;

    }else if(this.sustentoNoValidado.length == 0) {

      Swal({
        type: 'error',
        title: 'Ingrese sustento por el cual evaluador indica que el registro es inválido'
      })
      
  return false;

    }else if(this.respuestaUsuarioInvalido.length == 0){

      Swal({
        type: 'error',
        title: 'Ingrese la respuesta al usuario'
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

              this.coordinadorService.verificarValidez(resultado).subscribe(response =>{
                
                Swal(
                  'Hecho!',
                  'Se envió la respuesta',
                  'success'
                ).then(()=>{
                  this.router.navigate(['/coordinador']);
                }); 
                
                
              })
         
        }

      })
  

    }
  
  }

  public changeOfOrganosModal(e: any): void {
  this.selectedOrganos = e.value;

}

public changeOfOrganosModalProduce(e: any): void {
this.selectedOrganosProduce = e.value;

}

 derivarProduce(){

   Swal({
    title: 'Desea realizar esta acción ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, registrar'
  }).then((result) => {

      if (result.value) {

        this.coordinadorService.derivarDGPAR_DGPARPA(this.idregistro , this.selectedOrganos , 1960 ).subscribe(response => {
            
          Swal(
            'Hecho!',
            'El registro ha sido derivado',
            'success'
          ).then(()=>{
           this.router.navigate(['/coordinador']);
           $('#myModal').modal('hide');
           $('.modal fade').remove();
       
          }); 
            
            
          })
     
    }

  })

 }

 derivar(){
  
     Swal({
      title: 'Desea realizar esta acción ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar'
    }).then((result) => {
  
        if (result.value) {
  
          this.coordinadorService.derivarDGPAR_DGPARPA(this.idregistro , this.selectedOrganosProduce , this.identidad).subscribe(response => {
              
            Swal(
              'Hecho!',
              'El registro ha sido derivado',
              'success'
            ).then(()=>{
        
             this.router.navigate(['/coordinador']);
             $('#myModal1').modal('hide');
             $('.modal fade').remove();
        
              
            });
              
              
            })
       
      }
  
    })
  
   }


}
