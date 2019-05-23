import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/** Libs **/
import { HttpClient, HttpClientModule, HttpHeaders , HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

/**  Libs Externas  **/
import { Select2Module } from 'ng2-select2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { defineLocale , esLocale } from 'ngx-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxLoadingModule } from 'ngx-loading';
defineLocale('es', esLocale); 

import { DataTablesModule } from 'angular-datatables';
/** Servicios **/
import { EvaluadorService } from './services/evaluador.service';
import { RepresentanteService } from './services/representante.service';
import { CoordinadorService } from './services/coordinador.service';
import {LoaderService} from './services/loader.service';
import { urlService  } from '../app/urlservice';
/** Auth **/
import { AuthGuard } from './guards/auth.guard';
import { AuthEvaluadorGuard } from './guards/authEvaluador.guard';
import { AuthCoordinadorGuard } from './guards/authCoordinador.guard';
import { AuthRepresentanteGuard } from './guards/authRepresentante.guard';
import { AuthAdministrativoGuard } from './guards/authAdministrativo.guard';
/** Components **/
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EvaluadorComponent } from './components/evaluador/evaluador.component';
import { CoordinadorComponent } from './components/coordinador/coordinador.component';
import { RepresentanteComponent } from './components/representante/representante.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { NoAutenticadoComponent } from './components/no-autenticado/no-autenticado.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { SesionExpiradaComponent } from './components/sesion-expirada/sesion-expirada.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { DetalleRegistroComponent } from './components/detalle-registro/detalle-registro.component';
import { DetalleCoordinadorAprobarComponent } from './components/detalle-coordinador-aprobar/detalle-coordinador-aprobar.component';
import { DetalleRepresentanteComponent } from './components/detalle-representante/detalle-representante.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';
import { DetalleConsultadoAdministradoComponent } from './components/detalle-consultado-administrado/detalle-consultado-administrado.component';
import { DetalleConsultadoOrganismoComponent } from './components/detalle-consultado-organismo/detalle-consultado-organismo.component';
import { DetalleCoordinadorRespuestaComponent } from './components/detalle-coordinador-respuesta/detalle-coordinador-respuesta.component';
import { DetalleRegistroConsultadoComponent } from './components/detalle-registro-consultado/detalle-registro-consultado.component';
import { DetalleAdministrativoRespuestaComponent } from './components/detalle-administrativo-respuesta/detalle-administrativo-respuesta.component';
import { DetalleRegistroObstaculoComponent } from './components/detalle-registro-obstaculo/detalle-registro-obstaculo.component';
import { DetalleRepresentanteRespuestaComponent } from './components/detalle-representante-respuesta/detalle-representante-respuesta.component';
import { DetalleRegistroConsultadoOrganismoComponent } from './components/detalle-registro-consultado-organismo/detalle-registro-consultado-organismo.component';
import { DetalleRegistroConsultadoObstaculoComponent } from './components/detalle-registro-consultado-obstaculo/detalle-registro-consultado-obstaculo.component';
import {DetalleRespuestaEnviadoCoordinadorComponent} from './components/detalle-respuesta-enviado-coordinador/detalle-respuesta-enviado-coordinador.component';
import { DetalleAdministrativoHistorialComponent } from './components/detalle-administrativo-historial/detalle-administrativo-historial.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ListaAdministrativoComponent } from './components/lista-administrativo/lista-administrativo.component';
import { DetalleCoordinadorEvaluadoComponent } from './components/detalle-coordinador-evaluado/detalle-coordinador-evaluado.component';
import { DetalleHistorialEvaluadorComponent } from './components/detalle-historial-evaluador/detalle-historial-evaluador.component';





/** Rutas Disponibles **/ 
const routes: Routes = [
  {path: '', component: InicioComponent, canActivate:[AuthGuard]},
  {path: 'cookies', component: CookiesComponent},
  {path: 'evaluador', component: EvaluadorComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'detalleRegistro/:id', component: DetalleRegistroComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'detalleConsultado/:id', component: DetalleRegistroConsultadoComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'detalleObstaculo/:id', component: DetalleRegistroObstaculoComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'detalleHistorial/:id', component: DetalleHistorialEvaluadorComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'detalleConsultadoObstaculo/:id', component: DetalleRegistroConsultadoObstaculoComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'detalleRegistroConsultadoOrganismo/:id', component: DetalleRegistroConsultadoOrganismoComponent, canActivate:[AuthEvaluadorGuard]},
  {path: 'coordinador', component: CoordinadorComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'detalleRegistroCoordinador/:id', component: DetalleCoordinadorAprobarComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'detalleConsultadoAdministrado/:id', component: DetalleConsultadoAdministradoComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'detalleConsultadoOrganismo/:id', component: DetalleConsultadoOrganismoComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'detalleCoordinadorEvaluado/:id', component: DetalleCoordinadorEvaluadoComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'detalleRespuestaCoordinador/:id', component: DetalleCoordinadorRespuestaComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'detalleRespuestaEnviadoCoordinador/:id', component: DetalleRespuestaEnviadoCoordinadorComponent, canActivate:[AuthCoordinadorGuard]},
  {path: 'representante', component: RepresentanteComponent, canActivate:[AuthRepresentanteGuard]},
  {path: 'administrativo', component: AdministrativoComponent, canActivate:[AuthAdministrativoGuard]},
  {path: 'detalleAdministrativoRespuesta/:id', component: DetalleAdministrativoRespuestaComponent , canActivate:[AuthAdministrativoGuard]},
  {path: 'detalleAdministrativoHistorial/:id', component: DetalleAdministrativoHistorialComponent , canActivate:[AuthAdministrativoGuard]},
  {path: 'listaAdministrativo', component: ListaAdministrativoComponent , canActivate:[AuthAdministrativoGuard]},
  {path: 'detalleRegistroRepresentante/:id', component: DetalleRepresentanteComponent, canActivate:[AuthRepresentanteGuard]},
  {path: 'detalleRespuestaRepresentante/:id', component: DetalleRepresentanteRespuestaComponent, canActivate:[AuthRepresentanteGuard]},
  {path: 'reportes-excel', component: ReportesComponent},
  {path: 'no-autenticado', component: NoAutenticadoComponent},
  {path: 'mantenimiento', component: MantenimientoComponent},
  {path: 'sesion-expirada', component: SesionExpiradaComponent},

  {path: '**', component: NoEncontradoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EvaluadorComponent,
    RepresentanteComponent,
    InicioComponent,
    CookiesComponent,
    NoAutenticadoComponent,
    MantenimientoComponent,
    SesionExpiradaComponent,
    NoEncontradoComponent,
    CoordinadorComponent,
    DetalleRegistroComponent,
    DetalleCoordinadorAprobarComponent,
    DetalleRepresentanteComponent,
    AdministrativoComponent,
    DetalleCoordinadorRespuestaComponent,
    DetalleRegistroConsultadoComponent,
    DetalleAdministrativoRespuestaComponent,
    DetalleRegistroObstaculoComponent,
    DetalleConsultadoAdministradoComponent,
    DetalleConsultadoOrganismoComponent,
    DetalleRepresentanteRespuestaComponent,
    DetalleRegistroConsultadoOrganismoComponent,
    DetalleRegistroConsultadoObstaculoComponent,
    DetalleRespuestaEnviadoCoordinadorComponent,
    DetalleAdministrativoHistorialComponent,
    ReportesComponent,
    ListaAdministrativoComponent,
    DetalleCoordinadorEvaluadoComponent,
    DetalleHistorialEvaluadorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ChartsModule,
    DataTablesModule,
    LoadingBarHttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [DatePipe,CookieService, AuthGuard, AuthEvaluadorGuard, AuthCoordinadorGuard, AuthRepresentanteGuard, AuthAdministrativoGuard, EvaluadorService, RepresentanteService, CoordinadorService , LoaderService , urlService ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
