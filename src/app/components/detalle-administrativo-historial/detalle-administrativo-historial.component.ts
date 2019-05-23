import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministrativoService} from '../../services/administrativo.service';

@Component({
  selector: 'app-detalle-administrativo-historial',
  templateUrl: './detalle-administrativo-historial.component.html',
  styleUrls: ['./detalle-administrativo-historial.component.css']
})
export class DetalleAdministrativoHistorialComponent implements OnInit {

  public listadoHistorial: any[];
  public idobstaculo:String;
  public numdocremision: String;
  public sustentocondicion: String;
  public aceptar: any;
  public fecharespuesta: string;
  public selectedTipoDocumento: any;
  public condicionBA:any;
  public disabledHistorial:Boolean;
  public tipodocumento:String;
  public acepto: String;
  public loading1: boolean;

  
  constructor(private administrativoService:AdministrativoService,private activeRoute: ActivatedRoute,private router: Router) { 
    this.loading1 = true;
    const routeParams = this.activeRoute.snapshot.params;
    this.idobstaculo = routeParams.id;
    this.disabledHistorial = true;
    this.administrativoService.detalleAdministrativoHistorial(this.idobstaculo).subscribe(response => {
      this.loading1 = false;
      this.listadoHistorial = response;
      this.fecharespuesta = this.listadoHistorial[0]["fecha_respuesta"];
      this.tipodocumento = this.listadoHistorial[0]["nombre_tipo_doc"];
      this.numdocremision = this.listadoHistorial[0]["cod_doc_respuesta"];
      if(this.listadoHistorial[0]["validado"] ==  true){
        this.acepto = "Si"
      }else{
        this.acepto = "No"
      }
      this.condicionBA = this.listadoHistorial[0]["nombre_condicion"];
      this.sustentocondicion = this.listadoHistorial[0]["sustento_barrera"];
    

    });

  }

  ngOnInit() {
  }

}
