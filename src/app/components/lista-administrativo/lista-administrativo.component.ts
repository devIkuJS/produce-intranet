import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { AdministrativoService} from '../../services/administrativo.service';
import {Subject} from 'rxjs/Subject';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { Select2OptionData } from 'ng2-select2';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common'

declare var $:any;

@Component({
  selector: 'app-lista-administrativo',
  templateUrl: './lista-administrativo.component.html',
  styleUrls: ['./lista-administrativo.component.css']
})
export class ListaAdministrativoComponent implements OnInit {

  @ViewChild('dataTable') table : ElementRef; 
  dataTable: any; 
  dtOption: any; 
  dataResponse: any; 
  columnsDataTable: any;
  colorTheme = 'theme-red';
  bsConfig: Partial<BsDatepickerConfig>;
  locale = 'es';
  public regiones: Array<Select2OptionData>;
  public optionsSelect2Region: Select2Options;
  public selectedRegion: string;
  public selectedTipoDocumento: any;
  public entidadesExternas : any[];
  public identidad: any;
  public isPorRemitir: Boolean;
  public tablaVista : Boolean;
  public tablaDataGuardado : any;
  public codsitradoc: string;
  public tiposDocumento: any[];
  public numdocremision: string;
  public diaSeleccionado: string;
  public dtOptions: DataTables.Settings = {};
  public loading: boolean;

  constructor(private administrativoService: AdministrativoService , private _localeService: BsLocaleService , private router: Router , private location: Location , public datepipe: DatePipe) { 
    
        this.loading = true;
    
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
    
    
        this.isPorRemitir = false;
        this.codsitradoc = "";
        this.numdocremision = "";
        this.diaSeleccionado = "";
    
        this._localeService.use(this.locale);
        this.optionsSelect2Region = {
            placeholder: "[ Seleccione una región ]",
            width: "100%"
        }
    
        this.administrativoService.obtenerRegiones().subscribe(response => {
        var arrayAuxRegEditableRegion = [];
          arrayAuxRegEditableRegion.push({id: '',text: ""});
          for (let index = 0; index < response['length']; index++) {
           arrayAuxRegEditableRegion.push({id: response[index]['id_region'],text: response[index]['nombre_region']});
          }
          this.regiones = arrayAuxRegEditableRegion; 
        }); 
    
        this.administrativoService.obtenerListaEntidadRecibido().subscribe(response => {
            this.entidadesExternas = response;
        });
    
       
            
          this.administrativoService.obtenerTiposDocumento().subscribe(response => {
            this.tiposDocumento = response;
            });
    
         
        
    }

    public recargaData(event: any){
      
             this.identidad = event.target.value;
      
             if(this.identidad != -1){
      
              this.administrativoService.obtenerListadeRegistrosAdministrativos(this.identidad).subscribe(response => {
                var primerArreglo = [];
              
                for(var i=0; i<response["length"];i++){
                  var segundoArreglo = [];
                 segundoArreglo.push(" ");
                 segundoArreglo.push(response[i]["codigo_obstaculo"]);
                 segundoArreglo.push(response[i]["nombre_entidad"]);
                 segundoArreglo.push(response[i]["obstaculo"]);
                 segundoArreglo.push(response[i]["detalle_registro"]);
                let fecha_formato =this.datepipe.transform(response[i]["fecha_historial"], 'dd/MM/yyyy');
                segundoArreglo.push(fecha_formato);
                 segundoArreglo.push(response[i]["codigo_registro"]);
                 segundoArreglo.push(response[i]["id_barrera"]);
                 segundoArreglo.push(response[i]["id_obstaculo"]);
                 primerArreglo.push(segundoArreglo);
                 
                }
      
                if($(this.table)) {
                  if($(this.table).DataTable) {
      
                    $($(this.table).DataTable.tables()).DataTable().rows().remove().draw();
                    $($(this.table).DataTable.tables()).DataTable().destroy();
                    this.columnsDataTable = [
                      {title: "Seleccionar"},
                      {title: "Código de barrera"},
                      {title: "Nombre Entidad"},
                      {title: "Nombre de Barrera"},
                      {title: "Explicación del caso"},
                      {title: "Fecha"}
                
                    ];
      
                    this.dtOption = {
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
                      },
                      destroy: true,
                      columnDefs: [{
                          orderable: false,
                          className: 'select-checkbox',
                          targets: 0
                      }],
                      select: {
                          style: 'multi',
                          selector: 'td:first-child'
                      },
                      data: primerArreglo,
                      columns: this.columnsDataTable
                    }
                    this.dataTable = $(this.table.nativeElement); 
                    this.dataTable.dataTable(this.dtOption);  
      
                  }
                }
              });
      
      
             }else{
      
              if($(this.table)) {
                if($(this.table).DataTable) {
      
                  $($(this.table).DataTable.tables()).DataTable().rows().remove().draw();
                  $($(this.table).DataTable.tables()).DataTable().destroy();
                  this.columnsDataTable = [
                    {title: "Seleccionar"},
                    {title: "Código de barrera"},
                    {title: "Nombre Entidad"},
                    {title: "Nombre de Barrera"},
                    {title: "Explicación del caso"},
                    {title: "Fecha"}
              
                  ];
      
                  this.dtOption = {
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
                    },
                    destroy: true,
                    columnDefs: [{
                        orderable: false,
                        className: 'select-checkbox',
                        targets: 0
                    }],
                    select: {
                        style: 'multi',
                        selector: 'td:first-child'
                    },
                    data: "",
                    columns: this.columnsDataTable
                  }
                  this.dataTable = $(this.table.nativeElement);
                  this.dataTable.dataTable(this.dtOption);  
      
                }
              } 
            }
          }
    
      ngOnInit() {
        
       this.columnsDataTable = [
        {title: "Seleccionar"},
        {title: "Código de barrera"},
        {title: "Nombre Entidad"},
        {title: "Nombre de Barrera"},
        {title: "Explicación del caso"},
        {title: "Fecha"}
    
        ];
        this.dtOption = {
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
          },
          destroy: true,
          columnDefs: [{
              orderable: false,
              className: 'select-checkbox',
              targets: 0
          }],
          select: {
              style: 'multi',
              selector: 'td:first-child'
          },
          data: "",
          columns: this.columnsDataTable
        }
        this.dataTable = $(this.table.nativeElement); 
        this.dataTable.dataTable(this.dtOption);  
    
    
      }
    
      
    
      public enviarData(){
    
        if($(this.table)) {
          if($(this.table).DataTable) {
          this.tablaDataGuardado = $($(this.table).DataTable.tables()).DataTable().rows({ selected: true } ).data().toArray();
            if(this.tablaDataGuardado.length > 0){
              this.tablaVista=true;
               this.isPorRemitir = true;
               $('#ocultar').hide();
              for(let i=0; i<this.tablaDataGuardado.length; i++) {
              }
    
            }else{
    
              Swal({
                type: 'error',
                title: 'Error',
                text: 'Seleccione al menos una barrera',
              })
            }
          }
        }
      }
    
      public retroceder(){
        this.isPorRemitir = false;
        $('#ocultar').show();
        this.tablaVista = false;
      }
    
      public changeOfRegion(e: any){
        this.selectedRegion = e.value; 
      }
    
      public changeOfTipoDocumento(e: any){
        this.selectedTipoDocumento = e.target.value; 
      }
    
    
      public guardarSolucion(){
    
        if(this.codsitradoc.length == 0){
          
         Swal({
              type: 'error',
              title: 'Ingrese el código de SITRADOC'
         })
          
        return false;
          
        }else if(this.numdocremision.length == 0){
                      
         Swal({
              type: 'error',
              title: 'Ingrese el número de documento de remisión'
         })
         return false;
    
        }else if(this.diaSeleccionado.length == 0){
          
        Swal({
              type: 'error',
              title: 'Seleccione la fecha de remisión'
        })
        return false;
        }else if(this.selectedTipoDocumento == ''){
        
        Swal({
              type: 'error',
              title: 'Seleccione el tipo de documento'
        })
        return false;
        }else if(this.selectedRegion == ''){
      
        Swal({
              type: 'error',
              title: 'Seleccione la región'
        })
        return false;
          
        }else{
    
          Swal({
              title: 'Desea enviar estos datos?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, confirmar'
          }).then((result) => {
      
            for (var i =0; i< this.tablaDataGuardado.length;i++){
              let registro ={id_obstaculo: this.tablaDataGuardado[i][7] , cod_sitradoc: this.codsitradoc , cod_doc_emision: this.numdocremision , fecha_envio: this.diaSeleccionado , id_tipo_doc: this.selectedTipoDocumento, id_region: this.selectedRegion };
    
              if (result.value) {
    
                this.administrativoService.guardarSitradoc(registro).subscribe(response => {
                  
                        Swal(
                          'Hecho!',
                          'Se envió los datos a la entidad',
                          'success'
                        ).then(()=>{
                          this.router.navigate(['/administrativo']);
                        this.loading = false;
          
                        });
                      })
    
              }
                
                } 
              });
            }
          }
        }
    
    
      
