import { Component, OnInit ,OnDestroy, ViewChild , ElementRef } from '@angular/core';
import { AdministrativoService} from '../../services/administrativo.service';
import {Subject} from 'rxjs/Subject';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { Select2OptionData } from 'ng2-select2';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { Location } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.css']
})
export class AdministrativoComponent implements OnInit  {

  public dtOptions: DataTables.Settings = {};
  public nuevosRegistrosDos: any[] = [];
  public dtTrigger1: Subject<any> = new Subject();
  public listaHistorial: any[] = [];
  public dtTrigger2: Subject<any> = new Subject();
  public loading: boolean;
 
constructor(private administrativoService: AdministrativoService , private _localeService: BsLocaleService , private router: Router , private location: Location) { 
    this.loading = true;

}

  ngOnInit() {

    this.administrativoService.obtenerListarRespuestaAdministrativos().subscribe(response => {
      this.nuevosRegistrosDos = response;
      if(!this.nuevosRegistrosDos){
        Swal({
          type: 'error',
          title: 'Error',
          text: 'Ocurrio un error al consultar los datos , por favor consulte a Soporte'
          })
        }else{
         
          this.loading = false;
        }

     $(document).ready(function(){

          $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
            if (settings.sTableId == 'example') {
          
              var min = $('#min').datepicker("getDate");
              var max = $('#max').datepicker("getDate");
              var startDate = new Date(data[4]);
              if (min == null && max == null) { return true; }
              if (min == null && startDate <= max) { return true;}
              if(max == null && startDate >= min) {return true;}
              if (startDate <= max && startDate >= min) { return true; }
              return false;
            } else {
              return true
            }
          })
     
      $("#min").datepicker({ onSelect: function () { 
        table.draw(); }, 
        changeMonth: true, 
        changeYear: true , 
        closeText: 'Cerrar', 
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''});

        $("#max").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true , closeText: 'Cerrar',
          monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
          dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
          weekHeader: 'Sm',
          dateFormat: 'dd/mm/yy',
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: '' });

          var table = $('#example').DataTable({
                  language: {
                      sProcessing:     "Procesando...",
                      sLengthMenu:     "Mostrar _MENU_ registros",
                      sZeroRecords:    "No se encontraron resultados",
                      sEmptyTable:     "Ningún dato disponible en esta tabla",
                      sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                      sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0 registros",
                      sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
                      sInfoPostFix:    "",
                      sSearch:         "Buscar:",
                      sUrl:            "",
                      sInfoThousands:  ",",
                      sLoadingRecords: "Cargando...",
                      oPaginate: {
                        sFirst:    "Primero",
                        sLast:     "Último",
                        sNext:     "Siguiente",
                        sPrevious: "Anterior"
                      },
                      oAria: {
                        sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                        sSortDescending: ": Activar para ordenar la columna de manera descendente"
                      }
                    }
                });
              
        
      
        $('#min, #max').change(function () {
            table.draw();
        });
        
      
        });
 
    
      });

    this.administrativoService.obtenerListaHistorial().subscribe(response => {
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
     this.dtTrigger2.next();
    });
  }




}


  