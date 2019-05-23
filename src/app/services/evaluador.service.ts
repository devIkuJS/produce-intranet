import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import {of} from 'rxjs/observable/of';
import{Barrera} from '../models/barrera';
import {urlService} from '../urlservice';

@Injectable({
  providedIn: 'root'
})
export class EvaluadorService {

  public domain: String;

  //domain: String = "https://sebasdevapi.azurewebsites.net/";

 /*** detalle registro */
  public itemsInBarreraSubject = new BehaviorSubject<Barrera[]>([]);
  public itemsInBarrera: Barrera[] = [];
   /***detalle consultado administrado */
  public itemsInBarreraSubject1 = new BehaviorSubject<Barrera[]>([]);
  public itemsInBarrera1: Barrera[] = [];

  constructor(private http: HttpClient  , public urlService: urlService) {

    this.domain = this.urlService.base_url;
    
    this.itemsInBarreraSubject.subscribe(response => {
    this.itemsInBarrera = response
    });

    this.itemsInBarreraSubject1.subscribe(response => {
    this.itemsInBarrera1 = response
    
    });
   }

/************************* */
/****GENERAL */

  public agregarBarrera(item: Barrera) {
  this.itemsInBarreraSubject.next([...this.itemsInBarrera, item]);
  } 
  public agregarBarrera1(item: Barrera) {
  this.itemsInBarreraSubject1.next([...this.itemsInBarrera1, item]);
  } 
  public getItems(): Observable<Barrera[]> {
  return this.itemsInBarreraSubject;
  }
  public getItems1(): Observable<Barrera[]> {
  return this.itemsInBarreraSubject1;
  }
  obtenerTramites(){
  return this.http.get(`${this.domain}api/Tramite/`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerEntidades(){
  return this.http.get(`${this.domain}api/Entidad`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerlugarEntidad(identidad){
  return this.http.get(`${this.domain}api/Entidad/Busqueda?id_entidad=${identidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerActividadEconomica(){
  return this.http.get(`${this.domain}api/ActividadEconomica`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerOrganismosBarreras(identidad , direccion){
  return this.http.get(`${this.domain}api/OrganismoBarrera?id_entidad=${identidad}&direccion=${direccion}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerOrganismos(identidad){
    return this.http.get(`${this.domain}api/Organismo?id_entidad=${identidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
    }
  obtenerDetalleObstaculoEvaluador(codigo_registro){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/Detalle/${codigo_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerRegiones(){
  return this.http.get(`${this.domain}api/Regiones`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerProvincias(id_region){
  return this.http.get(`${this.domain}api/Provincia?id_region=${id_region}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDistritos(id_provincia){
  return this.http.get(`${this.domain}api/Distrito?id_provincia=${id_provincia}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  aceptarValidez(cod_registro){
  return this.http.get(`${this.domain}api/Evaluador/AceptarValidez?cod_registro=${cod_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  /****FASE 1 -VALIDADO */
  obtenerListadeRegistrosEvaluadorFASE1(correo_emp){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/Listar?correo_empleado=${correo_emp}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerCambioNegacionEvaluador(dato_sustento,cod_registro){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/Negar?dato_sustento=${dato_sustento}&cod_registro=${cod_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaMotivoInvalidez(){
  return this.http.get<Object[]>(`${this.domain}api/Invalido`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaCondicionTramite(){
  return this.http.get<Object[]>(`${this.domain}api/Atributo/CondicionTramite`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaTiempoTramite(){
  return this.http.get<Object[]>(`${this.domain}api/Atributo/Tiempo`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaCostoTramite(){
  return this.http.get<Object[]>(`${this.domain}api/Atributo/CostoTramite`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaRequisitoTramite(){
  return this.http.get<Object[]>(`${this.domain}api/Atributo/Requisitos`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaGestionTramite(){
  return this.http.get<Object[]>(`${this.domain}api/Atributo/Gestion`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaOtrosTramite(){
  return this.http.get<Object[]>(`${this.domain}api/Atributo/Otros`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerNegacionValidezEvaluador(resultado){
  return this.http.post(`${this.domain}api/Evaluador/NegarValidez`,resultado,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  registrarFormulario1(consulta_mayor_informacion){
  return this.http.post(`${this.domain}api/Evaluador/Consulta`,consulta_mayor_informacion,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  } 
  registrarBarrera(registro){
  return this.http.post(`${this.domain}api/Evaluador/RegistrarBarrera`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  listadeBarreras(correo_emp){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/ListaBarreras?correo_empleado=${correo_emp}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleObstaculo(id_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleEvaluacionBA/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerlistaCondicionBA(id_entidad){
    return this.http.get<Object[]>(`${this.domain}api/Condicion/Lista?id_entidad=${id_entidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
    }
  registrarSolucionExterno(registro){
  return this.http.post(`${this.domain}api/Evaluador/RegistrarSolucionExterno`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  registrarSolucion(registro){
  return this.http.post(`${this.domain}api/Evaluador/RegistrarSolucion`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  /**FASE 2 EVALUADO */
  obtenerListadeRegistrosEvaluadorFASE2(correo_emp){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/ListaEvaluado?correo_empleado=${correo_emp}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  /**FASE 3 CONSULTADO */
  obtenerListadeRegistrosEvaluadorFASE3(correo_emp){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/ListaConsultado?correo_empleado=${correo_emp}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleRegistroEvaluadorFASE3(codigo_registro){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleConsultadoAdministrado/${codigo_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListadeRegistrosEvaluadorConsultadoOrganismo(correo_emp){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/ListaBAConsultado?correo_empleado=${correo_emp}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleConsultadoOrganismo(codigo_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleConsultadoOrganismo/${codigo_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleRegistro(id_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleRegistro/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  /*HISTORIAL */
  obtenerHistorialEmpleado(correo_emp){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/ListaHistorial?correo_empleado=${correo_emp}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleHistorial(id_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleHistorial/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }

  

 
}
