import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministrativoService} from '../../services/administrativo.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-detalle-administrativo-respuesta',
  templateUrl: './detalle-administrativo-respuesta.component.html',
  styleUrls: ['./detalle-administrativo-respuesta.component.css']
})
export class DetalleAdministrativoRespuestaComponent implements OnInit {

  colorTheme = 'theme-red';
  bsConfig: Partial<BsDatepickerConfig>;
  locale = 'es';
  public idobstaculo:String;
  public tiposDocumento: any[];
  public numdocremision: String;
  public listaCondicionBA:any[];
  public sustentocondicion: String;
  public aceptar: any;
  public fecharespuesta: string;
  public selectedTipoDocumento: any;
  public condicionBA:any;
  public loading1: boolean;

  constructor(private administrativoService:AdministrativoService,private activeRoute: ActivatedRoute,private router: Router , private _localeService: BsLocaleService) {
    this.loading1 = true;
    this._localeService.use(this.locale);

    const routeParams = this.activeRoute.snapshot.params;
    this.idobstaculo = routeParams.id;
    this.aceptar= 0;
    this.condicionBA =0;

    this.administrativoService.obtenerTiposDocumento().subscribe(response => {
      this.loading1 = false;
      this.tiposDocumento = response;
    });

    this.administrativoService.obtenerlistaCondicionBA(2).subscribe(response => {
      this.listaCondicionBA = response;
    })
    
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY' , containerClass: this.colorTheme });
  }

  public changeOfTipoDocumento(e: any){
    this.selectedTipoDocumento = e.target.value; 
}

  guardarRespuesta(){

    let respuesta = {id_obstaculo: Number(this.idobstaculo) , sustento_barrera: this.sustentocondicion , fecha_respuesta: this.fecharespuesta , 
    cod_doc_respuesta:this.numdocremision , id_condicion: Number(this.condicionBA), id_tipo_doc: Number(this.selectedTipoDocumento), validado: Number(this.aceptar)};

    if(this.numdocremision.length == 0){       
     Swal({
     type: 'error',
     title: 'Ingrese el número de documento de remisión'
     })
     return false;
    }else if(this.fecharespuesta.length == 0){
    Swal({
    type: 'error',
    title: 'Seleccione la fecha de respuesta'
    })
    return false;
    }else if(this.selectedTipoDocumento == ''){
    
    Swal({
    type: 'error',
    title: 'Seleccione el tipo de documento'
    })
    return false;
    }else if(!$("input[name='aceptar']:checked").val()){

    Swal({
    type: 'error',
    title: 'Seleccione Si acepta o No'
    })
    return false;
  }else if(!$("input[name='condicionBA']:checked").val()){
    
    Swal({
      type: 'error',
      title: 'Seleccione una condición de Barrera'
    })
        return false;
    }else if(this.sustentocondicion.length == 0){
        
      Swal({
      type: 'error',
      title: 'Ingrese el sustento de condición de la BA'
      })
      
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

            this.administrativoService.guardarRespuesta(respuesta).subscribe(response => {
              
                    Swal(
                      'Hecho!',
                      'Se envió los datos',
                      'success'
                    ).then(()=>{
                     this.router.navigate(['/administrativo']);
              
                    });
              
                  });

          }
  
      
  
    });

    }

    

  }



}
