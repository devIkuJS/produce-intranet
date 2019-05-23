import { Component, OnInit } from '@angular/core';
import { RepresentanteService } from '../../services/representante.service';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

declare var $:any;


@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.css']
})
export class RepresentanteComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  public listaRegistros: any[] = [];
  public dtTrigger1: Subject<any> = new Subject();

  public listaRegistros2: any[] = [];
  public dtTrigger2: Subject<any> = new Subject();

  public listaRegistros3: any[] = [];
  public dtTrigger3: Subject<any> = new Subject();

  public listaRegistros4: any[] = [];
  public dtTrigger4: Subject<any> = new Subject();

  public loading: boolean;


  constructor(private representanteService:RepresentanteService , private cookieService: CookieService) {
    this.loading = true;
  }

  ngOnInit() {

    var correotemporal = this.cookieService.get('produce_email');

    this.dtOptions  = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        processing:     "Procesando...",
        lengthMenu:     "Mostrar _MENU_ registros",
        zeroRecords:    "No se encontraron resultados",
        emptyTable:     "Ningún dato disponible en esta tabla",
        info:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty:      "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered:   "(filtrado de un total de _MAX_ registros)",
        infoPostFix:    "",
        search:         "Buscar:",
        url:            "",
        loadingRecords: "Cargando...",
        paginate: {
          first:    "Primero",
          last:     "Último",
          next:     "Siguiente",
          previous: "Anterior"
        },
        aria: {
          sortAscending:  ": Activar para ordenar la columna de manera ascendente",
          sortDescending: ": Activar para ordenar la columna de manera descendente"
        }
      }
    };
    
    this.representanteService.obtenerListadeRegistrosConsultadoFASE1().subscribe(response => {
      this.listaRegistros = response;
      if(!this.listaRegistros){
        Swal({
          type: 'error',
          title: 'Error',
          text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
        })

      }else{
        this.loading = false;
      }
      this.dtTrigger1.next();
    });

    this.representanteService.obtenerListadeRegistrosConsultadoFASE2().subscribe(response => {
      this.listaRegistros2 = response;
      if(!this.listaRegistros2){
        Swal({
          type: 'error',
          title: 'Error',
          text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
        })

      }else{
        this.loading = false;
      }
      this.dtTrigger2.next();
    }); 

    this.representanteService.obtenerListaSuperacion(0,correotemporal).subscribe(response => {
      this.listaRegistros3 = response;
      if(!this.listaRegistros3){
        Swal({
          type: 'error',
          title: 'Error',
          text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
        })

      }else{
        this.loading = false;
      }

      this.dtTrigger3.next();
    }); 

    this.representanteService.listaSuperadas(0,correotemporal).subscribe(response => {
      this.listaRegistros4 = response;
      if(!this.listaRegistros4){
        Swal({
          type: 'error',
          title: 'Error',
          text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
        })

      }else{
        this.loading = false;
      }

      this.dtTrigger4.next();
    }); 
  }

}
