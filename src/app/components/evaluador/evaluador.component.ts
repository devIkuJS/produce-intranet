import { Component, OnInit } from '@angular/core';
import { EvaluadorService } from '../../services/evaluador.service';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

declare var $:any;

@Component({
  selector: 'app-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.css']
})
export class EvaluadorComponent implements OnInit {
 
  public dtOptions: DataTables.Settings = {};
  public nuevosRegistros: any[] = [];
  public dtTrigger1: Subject<any> = new Subject();
  public nuevosRegistrosEvaluados: any[] = [];
  public dtTrigger2: Subject<any> = new Subject();
  public nuevosRegistrosConsultados: any[] = [];
  public dtTrigger3: Subject<any> = new Subject();
  public listaBarreras: any[] = [];
  public dtTrigger4: Subject<any> = new Subject();
  public nuevosRegistrosConsultadosOrganismo: any[] = [];
  public dtTrigger5: Subject<any> = new Subject();
  public listaHistorial: any[] = [];
  public dtTrigger6: Subject<any> = new Subject();

  public loading: boolean;
  public loading1 = false;
  

  constructor(private evaluadorService:EvaluadorService , private cookieService: CookieService , public router: Router) {

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
    
       
    
    
        this.evaluadorService.obtenerListadeRegistrosEvaluadorFASE1(correotemporal).subscribe(response => {
    
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
    
        this.evaluadorService.obtenerListadeRegistrosEvaluadorFASE2(correotemporal).subscribe(response => {
          
         this.nuevosRegistrosEvaluados = response;
         if(!this.nuevosRegistrosEvaluados){
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
    
          this.evaluadorService.listadeBarreras(correotemporal).subscribe(response => {
           this.listaBarreras= response;
           if(!this.listaBarreras){
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
    
    
          this.evaluadorService.obtenerListadeRegistrosEvaluadorFASE3(correotemporal).subscribe(response => {
                
            this.nuevosRegistrosConsultados = response;
            if(!this.nuevosRegistrosConsultados){
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
    
          this.evaluadorService.obtenerListadeRegistrosEvaluadorConsultadoOrganismo(correotemporal).subscribe(response => {

            this.nuevosRegistrosConsultadosOrganismo = response;
            if(!this.nuevosRegistrosConsultadosOrganismo){
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


           this.evaluadorService.obtenerHistorialEmpleado(correotemporal).subscribe(response => {
            
                        this.listaHistorial = response;
                        if(!this.listaHistorial){
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
    
    
    
  }


}
