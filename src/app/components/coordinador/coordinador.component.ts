import { Component, OnInit } from '@angular/core';
import { CoordinadorService} from '../../services/coordinador.service';
import {Subject} from 'rxjs/Subject';
import {LoaderService} from '../../services/loader.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  public nuevosRegistros: any[] = [];
  public dtTrigger1: Subject<any> = new Subject();
  public registrosClasificados: any[] = [];
  public dtTrigger2: Subject<any> = new Subject();
  public registrosEvaluados: any[] = [];
  public dtTrigger3: Subject<any> = new Subject();
  public registrosConsultadoAdministrado: any[] = [];
  public dtTrigger4: Subject<any> = new Subject();
  public registrosConsultadoBA: any[] = [];
  public dtTrigger5: Subject<any> = new Subject();
  public registrosRespuesta: any[] = [];
  public dtTrigger6: Subject<any> = new Subject();
  public listaRespuestasEnviadas: any[] = [];
  public dtTrigger7: Subject<any> = new Subject();
  public listaProcesosSuperacion: any[] = [];
  public dtTrigger8: Subject<any> = new Subject();
  public listaSuperadas: any[] = [];
  public dtTrigger9: Subject<any> = new Subject();

  public loading: boolean;
  
  constructor(private coordinadorServices:CoordinadorService  , private cookieService: CookieService , public loaderService : LoaderService) {
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

    this.coordinadorServices.obtenerListadeRegistrosCoordinador(correotemporal).subscribe(response => {


      this.nuevosRegistros = response;
      if(!this.nuevosRegistros){
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


   this.coordinadorServices.obtenerListadeRegistrosClasificados(correotemporal).subscribe(response => {
      
      this.registrosClasificados = response;
      if(!this.registrosClasificados){
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
      

     this.coordinadorServices.obtenerListadeRegistrosEvaluados(correotemporal).subscribe(response => {
          
        this.registrosEvaluados = response;
        if(!this.registrosEvaluados){
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

 
        this.coordinadorServices.obtenerListarConsultadoAdministrado(correotemporal).subscribe(response => {
         
                this.registrosConsultadoAdministrado = response;
                if(!this.registrosConsultadoAdministrado){
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
          

         this.coordinadorServices.obtenerListarConsultadoOrganismo(correotemporal).subscribe(response => {
            
             this.registrosConsultadoBA = response;
             if(!this.registrosConsultadoBA){
              Swal({
                type: 'error',
                title: 'Error',
                text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
              })
      
            }else{
              this.loading = false;
            }

              this.dtTrigger5.next();
            });
            
  
            this.coordinadorServices.obtenerListadeRegistrosRespuesta(correotemporal).subscribe(response => {
            
                    this.registrosRespuesta = response;

                    if(!this.registrosRespuesta){
                      Swal({
                        type: 'error',
                        title: 'Error',
                        text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
                      })
              
                    }else{
                      this.loading = false;
                    }
                    this.dtTrigger6.next();

              });


              this.coordinadorServices.listaRespuestasEnviadas(correotemporal).subscribe(response => {

                this.listaRespuestasEnviadas = response;
                if(!this.listaRespuestasEnviadas){
                  Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
                  })
          
                }else{
                  this.loading = false;
                }
                this.dtTrigger7.next();
                


              });

              this.coordinadorServices.obtenerListaSuperacion(1,correotemporal).subscribe(response => {
                this.listaProcesosSuperacion = response;
                if(!this.listaProcesosSuperacion){
                  Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
                  })
          
                }else{
                  this.loading = false;
                }
          
                this.dtTrigger8.next();
              });

              this.coordinadorServices.listaSuperadas(1, correotemporal).subscribe(response => {
                this.listaSuperadas = response;
                if(!this.listaSuperadas){
                  Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
                  })
          
                }else{
                  this.loading = false;
                }
          
                this.dtTrigger9.next();
              });


            }

}
